/**
 * Manila engine — pure functions, no DOM.
 * Sources for numbers/rules are cited in 01-research/EVIDENCE.md.
 * This file is not legal advice.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.Manila = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const CHARSET = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // no I, O
  const LICENSE_PREFIX = "MNL";

  const FPL_2026 = {
    contiguous: [15960, 21640, 27320, 33000, 38680, 44360, 50040, 55720],
    extra: 5680,
    alaska: [19950, 27050, 34150, 41250, 48350, 55450, 62550, 69650],
    alaskaExtra: 7100,
    hawaii: [18360, 24890, 31420, 37950, 44480, 51010, 57540, 64070],
    hawaiiExtra: 6530,
    source: "https://www.govinfo.gov/content/pkg/FR-2026-01-15/html/2026-00755.htm",
    effective: "2026-01-13",
  };

  function money(n) {
    const x = Number(n);
    if (!Number.isFinite(x)) return 0;
    return Math.round((x + Number.EPSILON) * 100) / 100;
  }

  function moneyFmt(n) {
    return money(n).toLocaleString("en-US", { style: "currency", currency: "USD" });
  }

  function parseDate(s) {
    if (!s) return null;
    const d = new Date(s + (String(s).length === 10 ? "T00:00:00" : ""));
    return Number.isNaN(d.getTime()) ? null : d;
  }

  function daysBetween(a, b) {
    const da = parseDate(a);
    const db = parseDate(b);
    if (!da || !db) return null;
    return Math.floor((db.getTime() - da.getTime()) / 86400000);
  }

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  function fplFor(region, householdSize) {
    const size = Math.max(1, Math.floor(Number(householdSize) || 1));
    let table, extra;
    if (region === "alaska") {
      table = FPL_2026.alaska;
      extra = FPL_2026.alaskaExtra;
    } else if (region === "hawaii") {
      table = FPL_2026.hawaii;
      extra = FPL_2026.hawaiiExtra;
    } else {
      table = FPL_2026.contiguous;
      extra = FPL_2026.extra;
    }
    if (size <= 8) return table[size - 1];
    return table[7] + extra * (size - 8);
  }

  function fplPercent(income, region, householdSize) {
    const fpl = fplFor(region, householdSize);
    const inc = money(income);
    if (fpl <= 0) return null;
    return Math.round((inc / fpl) * 1000) / 10;
  }

  function normCode(c) {
    return String(c || "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");
  }

  function lineKey(line) {
    return [normCode(line.code), String(line.date || ""), String(line.description || "").trim().toLowerCase()].join("|");
  }

  function sumLines(lines, field) {
    return money((lines || []).reduce((a, l) => a + (Number(l[field]) || 0), 0));
  }

  function matchLines(billLines, eobLines) {
    const bills = (billLines || []).map((l, i) => ({ ...l, _i: i }));
    const eobs = (eobLines || []).map((l, i) => ({ ...l, _i: i, _used: false }));
    const pairs = [];
    const unmatchedBill = [];
    const unmatchedEob = [];

    function takeMatch(b, pred) {
      const j = eobs.findIndex((e) => !e._used && pred(e, b));
      if (j < 0) return null;
      eobs[j]._used = true;
      return eobs[j];
    }

    for (const b of bills) {
      const code = normCode(b.code);
      let e =
        (code &&
          takeMatch(b, (x) => normCode(x.code) === code && (!b.date || !x.date || x.date === b.date))) ||
        (code && takeMatch(b, (x) => normCode(x.code) === code)) ||
        takeMatch(
          b,
          (x) =>
            String(x.description || "").trim().toLowerCase() &&
            String(x.description || "").trim().toLowerCase() === String(b.description || "").trim().toLowerCase()
        );
      if (e) {
        const billed = money(b.charged);
        const allowed = money(e.allowed);
        const planPaid = money(e.planPaid);
        const patient = money(e.patientResp);
        const gap = money(billed - (Number.isFinite(Number(e.patientResp)) ? patient : billed));
        pairs.push({
          bill: b,
          eob: e,
          billed,
          allowed,
          planPaid,
          patient,
          billMinusPatient: money(billed - patient),
        });
      } else unmatchedBill.push(b);
    }
    for (const e of eobs) if (!e._used) unmatchedEob.push(e);
    return { pairs, unmatchedBill, unmatchedEob };
  }

  function findDuplicates(lines) {
    const map = new Map();
    (lines || []).forEach((l, i) => {
      const k = normCode(l.code) + "|" + String(l.date || "");
      if (!normCode(l.code)) return;
      if (!map.has(k)) map.set(k, []);
      map.get(k).push({ ...l, _i: i });
    });
    return [...map.values()].filter((g) => g.length > 1);
  }

  function flags(c) {
    const out = [];
    const billLines = c.billLines || [];
    const eobLines = c.eobLines || [];
    const match = matchLines(billLines, eobLines);
    const billTotal = money(c.billTotal != null && c.billTotal !== "" ? c.billTotal : sumLines(billLines, "charged"));
    const eobPatient = money(
      c.eobPatientTotal != null && c.eobPatientTotal !== "" ? c.eobPatientTotal : sumLines(eobLines, "patientResp")
    );
    const alreadyPaid = money(c.alreadyPaid);

    if (billLines.length && eobLines.length && billTotal > eobPatient + 0.009) {
      out.push({
        id: "BILL_GT_EOB",
        severity: "high",
        title: "Bill is higher than the EOB patient-responsibility total",
        detail:
          "The provider bill (" +
          moneyFmt(billTotal) +
          ") exceeds what the EOB lists as your share (" +
          moneyFmt(eobPatient) +
          "). Consumer-facing explainers (and in-network contracts) treat the EOB patient responsibility as the controlling number. Difference: " +
          moneyFmt(billTotal - eobPatient) +
          ".",
        cite: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-surprise-medical-bill-and-what-should-i-know-about-the-no-surprises-act-en-2123/",
      });
    }

    if (alreadyPaid > 0 && (c.collectorName || c.inCollections)) {
      out.push({
        id: "PAID_STILL_COLLECTED",
        severity: "high",
        title: "You recorded a payment, and a collector is still in the file",
        detail:
          "Paid " +
          moneyFmt(alreadyPaid) +
          " is on this file. A collector named on a paid account is the pattern in CFPB medical-debt complaints and in the 2025 NBC Connecticut paid-then-collected ER story. Send validation and write the original provider with proof of payment.",
        cite: "https://www.nbcconnecticut.com/investigations/nbc-ct-responds/nbc-ct-responds-helps-somers-consumer-after-paid-bill-sent-to-collections/3496225/",
      });
    }

    const dups = findDuplicates(billLines);
    if (dups.length) {
      out.push({
        id: "DUP_CODES",
        severity: "med",
        title: "Same code appears more than once on the same date",
        detail:
          dups
            .map((g) => (g[0].code || "?") + " × " + g.length + (g[0].date ? " on " + g[0].date : ""))
            .join("; ") + ". Could be a legitimate repeat, or a duplicate charge. Ask the provider to itemize.",
        cite: "https://www.consumerreports.org/money/debt-collection/fight-when-contacted-by-a-debt-collector-for-a-medical-bill-a8932597676/",
      });
    }

    if (match.unmatchedBill.length && eobLines.length) {
      out.push({
        id: "BILL_NO_EOB",
        severity: "med",
        title: "Bill lines with no matching EOB line",
        detail:
          match.unmatchedBill.length +
          " bill line(s) did not match an EOB line by code or description. HN commenters and consumer guides treat this as a reason to request the claim form (CMS-1500 / UB-04) and ask whether insurance was billed.",
        cite: "https://news.ycombinator.com/item?id=35866470",
      });
    }

    if (c.emergency && c.outOfNetwork) {
      out.push({
        id: "NSA_EMERGENCY",
        severity: "high",
        title: "Emergency + out-of-network — No Surprises Act screen",
        detail:
          "CMS: the No Surprises Act (effective 2022-01-01) generally protects against unexpected out-of-network bills for emergency room visits, certain non-emergency care at in-network facilities, and air ambulance. This flag is a screen, not a determination that the Act applies to this plan.",
        cite: "https://www.cms.gov/medical-bill-rights",
      });
    }

    if (c.uninsured && c.goodFaithEstimate && billTotal >= money(c.goodFaithEstimate) + 400) {
      out.push({
        id: "GFE_400",
        severity: "high",
        title: "Uninsured / self-pay bill is ≥ $400 over the good-faith estimate",
        detail:
          "CFPB / CMS: if you are uninsured or not using insurance and the billed amount is at least $400 above the good-faith estimate, and you got the bill within the last 120 calendar days, a federal dispute process may be available. Help desk 1-800-985-3059.",
        cite: "https://www.cms.gov/medical-bill-rights",
      });
    }

    if (c.householdIncome !== "" && c.householdIncome != null && c.householdSize) {
      const pct = fplPercent(c.householdIncome, c.fplRegion || "contiguous", c.householdSize);
      if (pct != null && pct <= 400) {
        out.push({
          id: "FAP_SCREEN",
          severity: pct <= 200 ? "high" : "med",
          title: "Income is " + pct + "% of 2026 HHS FPL — ask about hospital financial assistance",
          detail:
            "2026 HHS poverty guideline for this household is " +
            moneyFmt(fplFor(c.fplRegion || "contiguous", c.householdSize)) +
            " (Federal Register 2026-01-15). Nonprofit hospitals must have a written financial assistance policy under IRC 501(r)(4) and may not use extraordinary collection actions before making reasonable efforts to determine FAP eligibility. Dollar For (nonprofit) only does this paperwork, and only for hospital bills — they do not negotiate errors.",
          cite: "https://www.irs.gov/charities-non-profits/financial-assistance-policy-and-emergency-medical-care-policy-section-501r4",
        });
      }
    }

    if (c.collectorFirstContact) {
      const days = daysBetween(c.collectorFirstContact, c.asOfDate || todayISO());
      const sent = !!c.validationSentOn;
      if (days != null && days >= 0 && days <= 30 && !sent) {
        out.push({
          id: "FDCPA_WINDOW",
          severity: "high",
          title: "FDCPA validation window: " + (30 - days) + " day(s) left",
          detail:
            "15 U.S.C. § 1692g: if you notify the collector in writing within thirty days after receipt of the validation notice that the debt is disputed, the collector must cease collection of the disputed debt until it mails verification. Day count here uses the first-contact date you typed, not a court finding of 'receipt.'",
          cite: "https://www.law.cornell.edu/uscode/text/15/1692g",
        });
      } else if (days != null && days > 30 && !sent) {
        out.push({
          id: "FDCPA_WINDOW_CLOSED",
          severity: "med",
          title: "Thirty-day validation window appears closed — you can still dispute",
          detail:
            "§ 1692g(c) says failure to dispute is not an admission of liability. The strongest cease-collection trigger is a written dispute inside thirty days. Write anyway; keep using certified mail.",
          cite: "https://www.law.cornell.edu/uscode/text/15/1692g",
        });
      }
    }

    if (c.inCollections && money(c.amountCollected || c.billTotal || 0) < 500 && !c.creditReported) {
      out.push({
        id: "UNDER_500",
        severity: "low",
        title: "Alleged medical collection is under $500",
        detail:
          "Equifax, Experian, and TransUnion announced (2023-04-11) that medical collection debt with an initial reported balance under $500 was removed from U.S. consumer credit reports. A collector can still contact you. This is a bureau policy, not the vacated 2025 CFPB rule.",
        cite: "https://investor.equifax.com/news-events/press-releases/detail/1286/equifax-experian-and-transunion-remove-medical-collections",
      });
    }

    if (!eobLines.length && billLines.length && !c.uninsured) {
      out.push({
        id: "NO_EOB_YET",
        severity: "med",
        title: "No EOB lines in this file",
        detail:
          "Do not treat the provider's first number as the amount due. Request the EOB from the insurer and an itemized bill (CMS-1500 or UB-04) from the provider before paying.",
        cite: "https://news.ycombinator.com/item?id=33602559",
      });
    }

    return { flags: out, match, billTotal, eobPatient };
  }

  function addrBlock(who) {
    return [who.name, who.address1, who.address2, [who.city, who.state, who.zip].filter(Boolean).join(", ")]
      .filter(Boolean)
      .join("\n");
  }

  function letterHeader(c) {
    const today = c.asOfDate || todayISO();
    const you = addrBlock({
      name: c.patientName || "[Your name]",
      address1: c.patientAddress1,
      address2: c.patientAddress2,
      city: c.patientCity,
      state: c.patientState,
      zip: c.patientZip,
    });
    return { today, you };
  }

  function disclaimer() {
    return (
      "\n\n—\nThis letter was drafted in Manila, a local file. It is a starting template, not legal advice, " +
      "not a representation that any statute applies to your facts, and not an attorney-client communication. " +
      "Read it. Edit it. Send only what is true."
    );
  }

  function letters(c, type) {
    const { today, you } = letterHeader(c);
    const provider = c.providerName || "[Provider / hospital billing office]";
    const collector = c.collectorName || "[Collector legal name]";
    const insurer = c.insurerName || "[Insurer / plan]";
    const acct = c.accountNumber || "[Account / statement number]";
    const dos = c.dateOfService || "[Date of service]";
    const amt = moneyFmt(c.billTotal || sumLines(c.billLines, "charged"));
    const eobAmt = moneyFmt(c.eobPatientTotal || sumLines(c.eobLines, "patientResp"));
    const claim = c.claimNumber || "[Claim number]";
    const patient = c.patientName || "[Patient name]";

    const commonOpen =
      you +
      "\n\n" +
      today +
      "\n\nRe: Patient " +
      patient +
      " / Account " +
      acct +
      " / Date of service " +
      dos +
      "\n\n";

    const types = {
      itemized: {
        title: "Request for itemized bill and claim form",
        to: provider,
        body:
          commonOpen +
          "To: " +
          provider +
          "\n\nI am writing to request a complete itemized statement for the account above, including CPT/HCPCS (or revenue) codes, units, dates, and charges, plus a copy of the claim form you submitted (CMS-1500 or UB-04).\n\nPlease also confirm:\n1. Whether this account has been submitted to my insurer (" +
          insurer +
          "), and the claim number;\n2. Whether any balance has been placed with a collection agency, and if so the agency's legal name;\n3. Whether a financial assistance / charity-care application is available for this facility, and how to apply (see IRC 501(r) for nonprofit hospital facilities).\n\nPlease send the itemization to the address above. I dispute any amount I cannot reconcile to an itemized claim and an Explanation of Benefits.\n\nSincerely,\n" +
          patient +
          disclaimer(),
      },
      mismatch: {
        title: "Bill does not match EOB — dispute to provider",
        to: provider,
        body:
          commonOpen +
          "To: " +
          provider +
          "\n\nI have compared your bill of " +
          amt +
          " to the Explanation of Benefits from " +
          insurer +
          " (claim " +
          claim +
          "), which lists patient responsibility of " +
          eobAmt +
          ".\n\nI dispute the difference. Please:\n1. Reprocess the account so it matches the EOB patient responsibility, or\n2. Provide a written explanation, with codes, of every dollar above that figure;\n3. Recalling any collection placement while this is open.\n\nI will not pay an amount that exceeds the EOB patient responsibility until this is resolved. If this involves emergency or certain in-network-facility care, see the No Surprises Act consumer rights at cms.gov/medical-bill-rights (Help Desk 1-800-985-3059).\n\nSincerely,\n" +
          patient +
          disclaimer(),
      },
      insurer: {
        title: "Ask insurer to reprocess / explain",
        to: insurer,
        body:
          commonOpen +
          "To: " +
          insurer +
          " Member Services / Appeals\n\nPlease send a complete Explanation of Benefits for claim " +
          claim +
          " (date of service " +
          dos +
          ", provider " +
          provider +
          "), including original codes, allowed amounts, and the coverage decision for each line.\n\nThe provider is billing me " +
          amt +
          ". I need to know, in writing:\n1. Whether the claim was received and processed;\n2. Whether any line was denied, recoded, or bundled, and why;\n3. The exact patient-responsibility total you consider correct.\n\nIf a provider coding error caused a denial (for example preventive vs diagnostic), please identify the correction you need and send a copy I can forward.\n\nSincerely,\n" +
          patient +
          "\nMember ID: " +
          (c.memberId || "[Member ID]") +
          disclaimer(),
      },
      validation: {
        title: "FDCPA § 1692g validation — collector",
        to: collector,
        body:
          commonOpen +
          "To: " +
          collector +
          "\n\nThis is a notice that I dispute the alleged debt and request validation under the Fair Debt Collection Practices Act, 15 U.S.C. § 1692g.\n\nThis is not a refusal to pay a debt I actually owe. It is a request for competent evidence that I am obligated to pay you the amount you state.\n\nPlease mail:\n1. The amount of the alleged debt, itemized (principal, interest, fees);\n2. The name and address of the original creditor;\n3. Documentation of your right to collect (assignment / chain of title);\n4. The date of service, provider name, and patient name as they appear on the original account;\n5. Any judgment, if you claim one.\n\nUntil validation is mailed, cease collection of the disputed debt. Do not report or continue reporting this item without noting that it is disputed.\n\nSincerely,\n" +
          patient +
          disclaimer(),
      },
      fcra: {
        title: "FCRA dispute — credit reporting",
        to: c.bureauName || "[Equifax / Experian / TransUnion]",
        body:
          commonOpen +
          "To: Consumer dispute department\n\nI dispute the medical-collection trade line described below as inaccurate or unverifiable under the Fair Credit Reporting Act.\n\nFurnisher / collector: " +
          collector +
          "\nOriginal creditor: " +
          provider +
          "\nAccount: " +
          acct +
          "\nAmount reported: " +
          amt +
          "\n\nReason: " +
          (c.fcraReason ||
            "I do not owe this amount as reported. The original provider balance and/or insurance processing does not match the collection item. Please conduct a reasonable investigation and delete or correct the item.") +
          "\n\nPlease send the results of your investigation in writing.\n\nSincerely,\n" +
          patient +
          disclaimer(),
      },
      fap: {
        title: "Financial assistance / 501(r) cover letter",
        to: provider,
        body:
          commonOpen +
          "To: " +
          provider +
          " Financial Assistance / Patient Financial Services\n\nI am requesting a determination of eligibility under this facility's financial assistance policy for account " +
          acct +
          ".\n\nHousehold size: " +
          (c.householdSize || "[size]") +
          "\nHousehold income (annual, as I understand it): " +
          (c.householdIncome ? moneyFmt(c.householdIncome) : "[income]") +
          "\n2026 HHS FPL used for screening in my file: " +
          (c.householdSize
            ? moneyFmt(fplFor(c.fplRegion || "contiguous", c.householdSize))
            : "[see aspe.hhs.gov / FR 2026-01-15]") +
          "\n\nPlease send the FAP, the application, and the list of required documents. IRS 501(r)(4) materials state a hospital facility may not deny assistance based on omitted information that the FAP or application did not specifically require, and that extraordinary collection actions require reasonable efforts to determine FAP eligibility first.\n\nIf this account is already at a collection agency, please recall it while the application is pending.\n\nSincerely,\n" +
          patient +
          disclaimer(),
      },
      nsa: {
        title: "No Surprises Act / good-faith estimate notes",
        to: "CMS No Surprises Help Desk (keep a copy; call 1-800-985-3059)",
        body:
          commonOpen +
          "Notes for a No Surprises Act or good-faith-estimate dispute (cms.gov/medical-bill-rights).\n\nProvider: " +
          provider +
          "\nInsurer: " +
          insurer +
          "\nEmergency: " +
          (c.emergency ? "yes" : "no / unknown") +
          "\nOut-of-network (as I understand it): " +
          (c.outOfNetwork ? "yes" : "no / unknown") +
          "\nUninsured / self-pay: " +
          (c.uninsured ? "yes" : "no") +
          "\nGood-faith estimate: " +
          (c.goodFaithEstimate ? moneyFmt(c.goodFaithEstimate) : "[none entered]") +
          "\nBill: " +
          amt +
          "\n\nI am asking for a written explanation of any balance bill or amount more than $400 above a good-faith estimate. I understand the Help Desk is 1-800-985-3059 (CMS states 8am–8pm EST, 7 days).\n" +
          disclaimer(),
      },
      cfpb: {
        title: "CFPB complaint narrative (draft)",
        to: "Consumer Financial Protection Bureau — report at consumerfinance.gov (do not invent facts)",
        body:
          "Draft narrative. File only what is true. The CFPB complaint database is public in redacted form.\n\n" +
          today +
          "\n\nI am writing about a medical bill / medical collection.\n\nProvider: " +
          provider +
          "\nCollector: " +
          collector +
          "\nInsurer: " +
          insurer +
          "\nAccount: " +
          acct +
          "\nDate of service: " +
          dos +
          "\nAmount billed to me: " +
          amt +
          "\nEOB patient responsibility (if known): " +
          eobAmt +
          "\nAmount I already paid: " +
          moneyFmt(c.alreadyPaid || 0) +
          "\n\nWhat happened:\n" +
          (c.narrative ||
            "[Describe, in dates: the visit, the bill, the EOB, calls, payment, and the collection notice. Do not guess.]") +
          "\n\nWhat I want: validation or deletion of an amount I do not owe; the account recalled from collections; a written itemization that matches the EOB.\n" +
          disclaimer(),
      },
    };

    if (!types[type]) throw new Error("unknown letter type: " + type);
    return types[type];
  }

  function letterTypes() {
    return [
      ["itemized", "Itemized bill request"],
      ["mismatch", "EOB mismatch — provider"],
      ["insurer", "Insurer reprocess"],
      ["validation", "FDCPA validation"],
      ["fcra", "Credit-report dispute"],
      ["fap", "Financial assistance"],
      ["nsa", "No Surprises notes"],
      ["cfpb", "CFPB narrative"],
    ];
  }

  function emptyCase() {
    return {
      id: "c_" + Math.random().toString(36).slice(2, 10),
      created: todayISO(),
      patientName: "",
      patientAddress1: "",
      patientAddress2: "",
      patientCity: "",
      patientState: "",
      patientZip: "",
      memberId: "",
      providerName: "",
      insurerName: "",
      collectorName: "",
      bureauName: "",
      accountNumber: "",
      claimNumber: "",
      dateOfService: "",
      collectorFirstContact: "",
      validationSentOn: "",
      asOfDate: todayISO(),
      billTotal: "",
      eobPatientTotal: "",
      alreadyPaid: "",
      amountCollected: "",
      goodFaithEstimate: "",
      householdIncome: "",
      householdSize: 1,
      fplRegion: "contiguous",
      emergency: false,
      outOfNetwork: false,
      uninsured: false,
      inCollections: false,
      creditReported: false,
      nonprofitHospital: false,
      narrative: "",
      fcraReason: "",
      billLines: [],
      eobLines: [],
      log: [],
    };
  }

  function sampleCase() {
    const c = emptyCase();
    c.id = "c_sample";
    c.patientName = "A. Sample";
    c.patientAddress1 = "1 Example Street";
    c.patientCity = "Somers";
    c.patientState = "CT";
    c.patientZip = "06071";
    c.providerName = "Example Memorial Hospital — billing (SAMPLE)";
    c.insurerName = "Example Health Plan (SAMPLE)";
    c.collectorName = "Example Recovery LLC (SAMPLE)";
    c.accountNumber = "SAMP-2206";
    c.claimNumber = "EOB-0091";
    c.dateOfService = "2025-06-15";
    c.collectorFirstContact = "2026-08-01";
    c.asOfDate = "2026-08-20";
    c.billTotal = 2206;
    c.eobPatientTotal = 140;
    c.alreadyPaid = 2206;
    c.inCollections = true;
    c.emergency = true;
    c.householdIncome = 48000;
    c.householdSize = 2;
    c.nonprofitHospital = true;
    c.narrative =
      "SAMPLE FILE — invented names, public-pattern numbers. A $2,206 ER invoice that was paid, then a collector still appeared, is the documented 2025-02-10 NBC Connecticut / Lisa Horan pattern (johnson memorial / NES Health). This sample is not that person.";
    c.billLines = [
      { code: "99285", date: "2025-06-15", description: "ED visit (as printed on SAMPLE bill)", charged: 1800 },
      { code: "71046", date: "2025-06-15", description: "Chest imaging (SAMPLE)", charged: 406 },
    ];
    c.eobLines = [
      { code: "99285", date: "2025-06-15", description: "ED visit", allowed: 420, planPaid: 320, patientResp: 100 },
      { code: "71046", date: "2025-06-15", description: "Chest imaging", allowed: 90, planPaid: 50, patientResp: 40 },
    ];
    c.log = [{ date: "2026-08-01", note: "SAMPLE: first collector text logged." }];
    return c;
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
    if (k.length !== 13 || k.slice(0, 3) !== LICENSE_PREFIX) return false;
    return k.slice(11) === checksum2(k.slice(0, 11));
  }

  function makeLicense(payload8) {
    let body = normalizeKey(payload8).slice(0, 8);
    while (body.length < 8) body += "X";
    const head = LICENSE_PREFIX + body;
    const raw = head + checksum2(head);
    return raw.slice(0, 3) + "-" + raw.slice(3, 7) + "-" + raw.slice(7, 11) + "-" + raw.slice(11);
  }

  const DEMO_KEY = makeLicense("DEMOFILE");

  function newLine(kind) {
    if (kind === "eob") return { code: "", date: "", description: "", allowed: "", planPaid: "", patientResp: "" };
    return { code: "", date: "", description: "", charged: "" };
  }

  return {
    FPL_2026,
    money,
    moneyFmt,
    parseDate,
    daysBetween,
    todayISO,
    fplFor,
    fplPercent,
    matchLines,
    findDuplicates,
    flags,
    letters,
    letterTypes,
    emptyCase,
    sampleCase,
    checkLicense,
    makeLicense,
    DEMO_KEY,
    newLine,
    sumLines,
    normCode,
    lineKey,
    addrBlock,
  };
});
