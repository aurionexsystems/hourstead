/**
 * Dayticket engine — local only. No network.
 * Extra-work tickets for trades. Not a health product.
 * We do not receive this file.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.Dayticket = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const CHARSET = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const PREFIX = "DTK";
  const FORBIDDEN = {
    ssn: /\b\d{3}-?\d{2}-?\d{4}\b/,
    pan: /\b(?:\d[ -]?){13,19}\b/,
  };
  const CA_NOTE =
    "Note About Extra Work and Change Orders. Extra Work and Change Orders become part of the contract once the order is prepared in writing and signed by the parties prior to the commencement of work covered by the new change order. The order must describe the scope of the extra work or change, the cost to be added or subtracted from the contract, and the effect the order will have on the schedule of progress payments. (Cal. Bus. & Prof. Code § 7159(d)(13); enforceability: § 7159.6.)";

  function money(n) {
    const x = Number(n);
    if (!Number.isFinite(x)) return 0;
    return Math.round((x + Number.EPSILON) * 100) / 100;
  }
  function moneyFmt(n) {
    return money(n).toLocaleString("en-US", { style: "currency", currency: "USD" });
  }
  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }
  function parseDate(s) {
    if (!s) return null;
    const d = new Date(String(s).length === 10 ? s + "T00:00:00" : s);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  function daysBetween(a, b) {
    const da = parseDate(a);
    const db = parseDate(b);
    if (!da || !db) return null;
    return Math.floor((db.getTime() - da.getTime()) / 86400000);
  }
  function looksForbidden(s) {
    const t = String(s || "");
    if (FORBIDDEN.ssn.test(t)) return "ssn";
    const digits = t.replace(/\D/g, "");
    if (digits.length >= 13 && digits.length <= 19 && FORBIDDEN.pan.test(t)) return "pan";
    return null;
  }
  function scanObject(obj, hits) {
    if (!obj || typeof obj !== "object") return hits;
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === "string") {
        const why = looksForbidden(v);
        if (why) hits.push({ field: k, why });
      } else if (Array.isArray(v)) v.forEach((x) => scanObject(x, hits));
      else if (v && typeof v === "object") scanObject(v, hits);
    }
    return hits;
  }

  function emptyJob() {
    return {
      id: "j_" + Math.random().toString(36).slice(2, 10),
      name: "",
      ownerName: "",
      site: "",
      originalAmount: "",
      startedOn: "",
      inCalifornia: true,
      notes: "",
    };
  }
  function emptyExtra() {
    return {
      id: "x_" + Math.random().toString(36).slice(2, 10),
      jobId: "",
      dated: todayISO(),
      scope: "",
      labor: "",
      materials: "",
      amount: "",
      scheduleEffect: "",
      status: "draft",
      signedOn: "",
      workStartedOn: "",
    };
  }
  function emptyFile() {
    return {
      id: "f_" + Math.random().toString(36).slice(2, 10),
      created: todayISO(),
      shopName: "",
      licenseNo: "",
      phone: "",
      email: "",
      asOfDate: todayISO(),
      jobs: [],
      extras: [],
      log: [],
    };
  }

  function sampleFile() {
    const f = emptyFile();
    f.id = "f_sample";
    f.shopName = "Oak Street Build (SAMPLE)";
    f.licenseNo = "CSLB-000000";
    f.phone = "(510) 555-0100";
    f.email = "shop@example.com";
    f.asOfDate = "2026-08-20";
    f.jobs = [
      {
        id: "j_sample",
        name: "Kitchen — 14 Oak (SAMPLE)",
        ownerName: "A. Homeowner (SAMPLE)",
        site: "14 Oak St, Oakland CA",
        originalAmount: 18400,
        startedOn: "2026-07-08",
        inCalifornia: true,
        notes: "SAMPLE job. Invented. Pattern: verbal extras on a remodel.",
      },
    ];
    f.extras = [
      {
        id: "x_sample",
        jobId: "j_sample",
        dated: "2026-08-18",
        scope: "Move gas range 18 inches; patch floor; relocate shutoff (SAMPLE)",
        labor: "6 hours carpenter + plumber assist",
        materials: "Gas flex, flange, plywood patch",
        amount: 1860,
        scheduleEffect: "Adds 1 working day; no change to next progress payment date.",
        status: "draft",
        signedOn: "",
        workStartedOn: "",
      },
    ];
    f.log = [{ date: "2026-08-18", note: "SAMPLE: owner asked for the range move on site." }];
    return f;
  }

  function jobById(file, jobId) {
    return (file.jobs || []).find((j) => j.id === jobId) || null;
  }
  function extrasForJob(file, jobId) {
    return (file.extras || []).filter((x) => x.jobId === jobId);
  }
  function extrasTotal(file, jobId) {
    return extrasForJob(file, jobId).reduce((s, x) => s + money(x.amount), 0);
  }
  function revisedTotal(file, job) {
    return money(job && job.originalAmount) + extrasTotal(file, job && job.id);
  }

  function flags(file, extra) {
    const out = [];
    const hits = scanObject({ file, extra }, []);
    if (hits.length) {
      out.push({
        id: "FORBIDDEN_ID",
        severity: "high",
        title: "This file looks like it contains a Social Security number or a full card number",
        detail: "Dayticket refuses those fields. Delete them. A contractor ticket does not need either.",
        cite: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7159.6",
      });
    }
    if (!extra) return out;
    const job = jobById(file, extra.jobId);
    if (!String(extra.scope || "").trim()) {
      out.push({
        id: "NO_SCOPE",
        severity: "high",
        title: "No scope on this extra",
        detail: "California BPC § 7159.6: an extra is not enforceable against a buyer unless it sets forth the scope of work.",
        cite: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7159.6",
      });
    }
    if (!money(extra.amount)) {
      out.push({
        id: "NO_AMOUNT",
        severity: "high",
        title: "No dollar amount on this extra",
        detail: "§ 7159.6 also wants the amount added or subtracted from the contract, in writing, before the extra starts.",
        cite: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7159.6",
      });
    }
    if (job && job.inCalifornia && !String(extra.scheduleEffect || "").trim()) {
      out.push({
        id: "NO_SCHEDULE",
        severity: "med",
        title: "No schedule / payment effect (California job)",
        detail: "§ 7159.6(a)(3): the effect on progress payments or the completion date.",
        cite: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7159.6",
      });
    }
    if (extra.status !== "signed") {
      out.push({
        id: "UNSIGNED",
        severity: "high",
        title: "Not signed yet",
        detail: "Print it. Get both names. Do the work after. A handshake on the driveway is how extras disappear.",
        cite: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7159.6",
      });
    }
    if (extra.workStartedOn && extra.status !== "signed") {
      out.push({
        id: "WORK_BEFORE_SIGN",
        severity: "high",
        title: "Work date is set, ticket is not signed",
        detail: "§ 7159(c)(5): a change-order form becomes part of the contract only if it is in writing and signed before that work starts.",
        cite: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7159",
      });
    }
    if (job && money(job.originalAmount) > 0) {
      const pct = extrasTotal(file, job.id) / money(job.originalAmount);
      if (pct >= 0.2) {
        out.push({
          id: "EXTRAS_HEAVY",
          severity: "med",
          title: "Signed and unsigned extras are " + Math.round(pct * 100) + "% of the original contract",
          detail: "INFERENCE, not a statute: a pile of extras is where owners fight. Get the next one signed before material.",
          cite: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7159.6",
        });
      }
    }
    return out;
  }

  function ticket(file, extra, paid) {
    const job = jobById(file, extra && extra.jobId) || emptyJob();
    const shop = (file && file.shopName) || "[Shop name]";
    const date = (extra && extra.dated) || todayISO();
    const amt = moneyFmt(extra && extra.amount);
    const orig = moneyFmt(job.originalAmount);
    const rev = moneyFmt(revisedTotal(file, job));
    const ca = !!(job && job.inCalifornia);
    const header = paid ? shop : shop + " (unsigned shop block — unlock the file to print your name)";
    const body = [
      "DAYTICKET — extra work / change order",
      header,
      (file && file.licenseNo ? "License " + file.licenseNo : "") +
        (file && file.phone ? "  ·  " + file.phone : ""),
      "",
      "Dated: " + date,
      "Job: " + (job.name || "[job]"),
      "Owner: " + (job.ownerName || "[owner]"),
      "Site: " + (job.site || "[site]"),
      "Original contract: " + orig,
      "This extra: " + amt,
      "Revised contract if this extra is signed: " + rev,
      "",
      "1. Scope of extra work or change",
      (extra && extra.scope) || "[scope required]",
      "",
      "Labor: " + ((extra && extra.labor) || "—"),
      "Materials: " + ((extra && extra.materials) || "—"),
      "",
      "2. Amount added or subtracted from the contract",
      amt,
      "",
      "3. Effect on progress payments or completion date",
      (extra && extra.scheduleEffect) || "[required on California home-improvement jobs]",
      "",
      ca ? CA_NOTE : "Get this signed before the extra starts. Keep a copy with the job.",
      "",
      "Owner signature _________________________ date ________",
      "Contractor signature ____________________ date ________",
      "",
      "Not a law firm. Not a payment app. This ticket stays on this computer unless you print it.",
    ]
      .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
      .join("\n");
    return {
      title: "Dayticket " + date + " — " + (job.name || "job"),
      body: body,
    };
  }

  function freeLimits(file) {
    return {
      jobs: (file.jobs || []).length,
      extras: (file.extras || []).length,
      jobsOk: (file.jobs || []).length <= 1,
      extrasOk: (file.extras || []).length <= 1,
    };
  }

  function normalizeKey(key) {
    return String(key || "")
      .toUpperCase()
      .replace(/[^0-9A-Z]/g, "")
      .replace(/[IO]/g, (c) => (c === "I" ? "1" : "0"));
  }
  function checksum2(body) {
    let sum = 0;
    for (let i = 0; i < body.length; i++) {
      const idx = CHARSET.indexOf(body[i]);
      sum += (idx < 0 ? 0 : idx) * (i + 3);
    }
    return CHARSET[sum % CHARSET.length] + CHARSET[(sum * 7 + body.length) % CHARSET.length];
  }
  function checkLicense(key) {
    const k = normalizeKey(key);
    if (k.length !== 13 || k.slice(0, 3) !== PREFIX) return false;
    return k.slice(11) === checksum2(k.slice(0, 11));
  }
  function makeLicense(payload8) {
    let body = normalizeKey(payload8).slice(0, 8);
    while (body.length < 8) body += "X";
    const head = PREFIX + body;
    const raw = head + checksum2(head);
    return raw.slice(0, 3) + "-" + raw.slice(3, 7) + "-" + raw.slice(7, 11) + "-" + raw.slice(11);
  }

  const DEMO_KEY = makeLicense("DEMOFILE");

  return {
    money,
    moneyFmt,
    todayISO,
    daysBetween,
    looksForbidden,
    scanObject,
    emptyJob,
    emptyExtra,
    emptyFile,
    sampleFile,
    jobById,
    extrasForJob,
    extrasTotal,
    revisedTotal,
    flags,
    ticket,
    freeLimits,
    checkLicense,
    makeLicense,
    DEMO_KEY,
    CA_NOTE,
    FORBIDDEN,
  };
});
