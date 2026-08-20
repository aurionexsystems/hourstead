/**
 * Postmark engine — local only. No network. No medical fields.
 * We do not receive this file. Sources cited in 01-research/EVIDENCE.md.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.Postmark = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const CHARSET = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const PREFIX = "PMK";
  const FORBIDDEN = {
    ssn: /\b\d{3}-?\d{2}-?\d{4}\b/,
    pan: /\b(?:\d[ -]?){13,19}\b/,
  };

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
    if (FORBIDDEN.pan.test(t.replace(/[^\d]/g, "").length >= 13 ? t : "")) {
      const digits = t.replace(/\D/g, "");
      if (digits.length >= 13 && digits.length <= 19) return "pan";
    }
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

  function emptySub() {
    return {
      id: "s_" + Math.random().toString(36).slice(2, 10),
      merchant: "",
      amount: "",
      cycle: "monthly",
      signedUpHow: "online",
      signedUpOn: "",
      nextCharge: "",
      lastCharge: "",
      accountEmail: "",
      last4: "",
      cancelTriedOn: "",
      cancelHow: "",
      stillCharging: false,
      state: "CA",
      notes: "",
    };
  }

  function emptyFile() {
    return {
      id: "f_" + Math.random().toString(36).slice(2, 10),
      created: todayISO(),
      yourName: "",
      address1: "",
      city: "",
      region: "",
      zip: "",
      asOfDate: todayISO(),
      issuerName: "",
      subs: [],
      log: [],
    };
  }

  function sampleFile() {
    const f = emptyFile();
    f.id = "f_sample";
    f.yourName = "A. Sample";
    f.address1 = "1 Example Street";
    f.city = "Oakland";
    f.region = "CA";
    f.zip = "94612";
    f.issuerName = "Example Card (SAMPLE)";
    f.asOfDate = "2026-08-20";
    f.subs = [
      {
        id: "s_sample",
        merchant: "Example Stream Co. (SAMPLE)",
        amount: 19.99,
        cycle: "monthly",
        signedUpHow: "online",
        signedUpOn: "2025-11-02",
        nextCharge: "2026-08-25",
        lastCharge: "2026-08-01",
        accountEmail: "sample@example.com",
        last4: "1111",
        cancelTriedOn: "2026-08-10",
        cancelHow: "clicked every settings page; no cancel control (SAMPLE)",
        stillCharging: true,
        state: "CA",
        notes: "SAMPLE — invented merchant. Pattern taken from public CFPB/HN cancel complaints, not a real account.",
      },
    ];
    f.log = [{ date: "2026-08-10", note: "SAMPLE: attempted in-app cancel; no control found." }];
    return f;
  }

  function flags(file, sub) {
    const out = [];
    const asOf = file.asOfDate || todayISO();
    const hits = scanObject({ file, sub }, []);
    if (hits.length) {
      out.push({
        id: "FORBIDDEN_ID",
        severity: "high",
        title: "This file looks like it contains a Social Security number or a full card number",
        detail:
          "Postmark refuses those fields. Delete them. We do not want them, and you should not keep a full PAN in a letter file. Last four digits are enough for an issuer note.",
        cite: "https://www.rocketmoney.com/privacy-notice",
      });
    }
    if (!sub) return out;

    const until = daysBetween(asOf, sub.nextCharge);
    if (until != null && until >= 0 && until <= 10) {
      out.push({
        id: "CHARGE_SOON",
        severity: "high",
        title: "Next charge in " + until + " day(s)",
        detail: "A dated written cancel before the next draft is the paper trail issuers ask for when a merchant keeps billing.",
        cite: "https://www.law.cornell.edu/uscode/text/15/8403",
      });
    }
    if (sub.signedUpHow === "online" && /phone|chat|mail|cannot|can't|no cancel/i.test(sub.cancelHow || "")) {
      out.push({
        id: "HARDER_THAN_SIGNUP",
        severity: "high",
        title: "You signed up online; cancel is not online (as you described it)",
        detail:
          "ROSCA (15 U.S.C. § 8403) requires a simple mechanism to stop recurring internet negative-option charges. The vacated 2024 FTC click-to-cancel rule is not in force (Eighth Circuit, 2025-07-08). ROSCA and state automatic-renewal laws still are. California BPC § 17602(d) requires an online, at-will cancel when signup was online (contracts on/after 2025-07-01 for the AB 2863 amendments).",
        cite: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=17602",
      });
    }
    if (sub.stillCharging && sub.cancelTriedOn) {
      out.push({
        id: "STILL_CHARGING",
        severity: "high",
        title: "You already asked to cancel and they are still charging",
        detail:
          "That is the CFPB pattern from summer 2026 (e.g. Albert recurring fee after repeated cancel attempts, complaint received 2026-07-13). Write again, then take the paper to the issuer and to ReportFraud.ftc.gov.",
        cite: "https://www.consumerfinance.gov/data-research/consumer-complaints/",
      });
    }
    if ((sub.state || file.region) === "CA") {
      out.push({
        id: "CA_ARL",
        severity: "med",
        title: "California automatic-renewal screen",
        detail:
          "Cal. Bus. & Prof. Code § 17602: a business that lets a consumer accept an automatic renewal online must let them terminate online, at will, without steps that obstruct or delay immediate termination. Retention offers must sit next to a live “click to cancel” (or words to that effect) for contracts entered, amended, or extended on or after July 1, 2025 (subdivision (j)). This is a screen, not a finding that the merchant is in California or that your contract date qualifies.",
        cite: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=17602",
      });
    }
    if (sub.signedUpHow === "online") {
      out.push({
        id: "ROSCA",
        severity: "med",
        title: "ROSCA simple-mechanism screen (internet negative option)",
        detail:
          "15 U.S.C. § 8403: unlawful to charge an internet negative-option sale unless the seller clearly discloses material terms before taking billing information, gets express informed consent, and provides simple mechanisms to stop recurring charges. The FTC used ROSCA against Amazon Prime (stipulated order filed 2025-09-25) after a court found Prime subject to ROSCA.",
        cite: "https://www.law.cornell.edu/uscode/text/15/8403",
      });
    }
    return out;
  }

  function addr(file) {
    return [file.yourName || "[Your name]", file.address1, [file.city, file.region, file.zip].filter(Boolean).join(", ")]
      .filter(Boolean)
      .join("\n");
  }

  function disclaimer() {
    return (
      "\n\n—\nDrafted in Postmark, a local file. Not legal advice. Not a representation that ROSCA, " +
      "any state automatic-renewal law, or a card-network rule applies to these facts. Send only what is true. " +
      "Do not put a full card number or Social Security number in this letter."
    );
  }

  function letters(file, sub, type) {
    const today = file.asOfDate || todayISO();
    const you = addr(file);
    const m = (sub && sub.merchant) || "[Merchant legal name]";
    const amt = moneyFmt((sub && sub.amount) || 0);
    const email = (sub && sub.accountEmail) || "[account email]";
    const name = file.yourName || "[Your name]";
    const last4 = (sub && sub.last4) || "[last four only]";

    const types = {
      cancel: {
        title: "Written cancellation notice",
        to: m,
        body:
          you +
          "\n\n" +
          today +
          "\n\nTo: " +
          m +
          "\n\nI cancel this subscription, effective immediately.\n\nAccount email: " +
          email +
          "\nAmount I have been charged: " +
          amt +
          " (" +
          ((sub && sub.cycle) || "recurring") +
          ")\nHow I enrolled (as I recall it): " +
          ((sub && sub.signedUpHow) || "[online/phone]") +
          "\n\nThis is a written request to stop all recurring charges. If you offer an internet negative-option, 15 U.S.C. § 8403 requires a simple mechanism to stop recurring charges. If this account is a California automatic renewal accepted online, see Cal. Bus. & Prof. Code § 17602.\n\nConfirm cancellation in writing to the address above. Do not reply by asking me to call a retention desk if I enrolled online.\n\nSincerely,\n" +
          name +
          disclaimer(),
      },
      followup: {
        title: "Second notice — still charging",
        to: m,
        body:
          you +
          "\n\n" +
          today +
          "\n\nTo: " +
          m +
          "\n\nI already requested cancellation on " +
          ((sub && sub.cancelTriedOn) || "[date]") +
          " by " +
          ((sub && sub.cancelHow) || "[method]") +
          ". Charges have continued.\n\nI repeat: cancel the subscription on account " +
          email +
          ". Refund any charge posted after that first request. Confirm in writing.\n\nIf charges continue I will dispute them with my card issuer as a cancelled recurring transaction and I will file with the FTC at ReportFraud.ftc.gov and with my state attorney general.\n\nSincerely,\n" +
          name +
          disclaimer(),
      },
      issuer: {
        title: "Notes for your card issuer (you send this — we never see it)",
        to: file.issuerName || "[Issuer / bank]",
        body:
          today +
          "\n\nTo: " +
          (file.issuerName || "[Issuer]") +
          "\n\nPlease treat this as a dispute of a cancelled recurring transaction.\n\nMerchant: " +
          m +
          "\nAmount: " +
          amt +
          "\nCard last four only: " +
          last4 +
          "\nI requested cancellation on: " +
          ((sub && sub.cancelTriedOn) || "[date]") +
          "\nI am enclosing a copy of my written notice. I am not sending you my full card number in this note.\n\nI want the posting reversed and future recurring drafts from this merchant blocked.\n\nSincerely,\n" +
          name +
          disclaimer(),
      },
      ftc: {
        title: "FTC ReportFraud draft (facts only)",
        to: "ReportFraud.ftc.gov — file only what is true",
        body:
          today +
          "\n\nMerchant: " +
          m +
          "\nAmount / cycle: " +
          amt +
          " / " +
          ((sub && sub.cycle) || "") +
          "\nEnrolled: " +
          ((sub && sub.signedUpHow) || "") +
          " on " +
          ((sub && sub.signedUpOn) || "[unknown]") +
          "\nCancel attempt: " +
          ((sub && sub.cancelTriedOn) || "[none]") +
          " — " +
          ((sub && sub.cancelHow) || "") +
          "\nStill charging: " +
          (sub && sub.stillCharging ? "yes" : "no / unknown") +
          "\n\nWhat happened:\n" +
          ((sub && sub.notes) || "[Dates only. No full card number. No Social Security number.]") +
          "\n\nWhat I want: cancellation confirmed; recurring charges stopped; refund of post-cancel drafts.\n" +
          disclaimer(),
      },
      ag: {
        title: "State attorney general draft",
        to: "[Your state AG consumer division]",
        body:
          you +
          "\n\n" +
          today +
          "\n\nI am writing about a subscription I cannot cancel in the same way I started it.\n\nMerchant: " +
          m +
          "\nState I am in: " +
          ((sub && sub.state) || file.region || "[state]") +
          "\nEnrolled: " +
          ((sub && sub.signedUpHow) || "") +
          "\nCancel attempt: " +
          ((sub && sub.cancelTriedOn) || "[none]") +
          "\n\nPlease see my enclosed written notice. I am not attaching a bank statement or a full card number.\n" +
          disclaimer(),
      },
    };
    if (!types[type]) throw new Error("unknown letter: " + type);
    return types[type];
  }

  function letterTypes() {
    return [
      ["cancel", "Cancel notice"],
      ["followup", "Still charging"],
      ["issuer", "Issuer notes"],
      ["ftc", "FTC draft"],
      ["ag", "State AG draft"],
    ];
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
    emptySub,
    emptyFile,
    sampleFile,
    flags,
    letters,
    letterTypes,
    checkLicense,
    makeLicense,
    DEMO_KEY,
    FORBIDDEN,
  };
});
