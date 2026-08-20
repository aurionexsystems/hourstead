#!/usr/bin/env node
"use strict";
const assert = require("assert");
const M = require("./engine.js");

let passed = 0;
function ok(name, fn) {
  try {
    fn();
    passed++;
    console.log("  ok  " + name);
  } catch (e) {
    console.error("  FAIL  " + name);
    console.error("       " + e.message);
    process.exitCode = 1;
  }
}

console.log("Manila engine tests");

ok("2026 FPL contiguous family of 4 is $33,000 (FR 2026-00755)", () => {
  assert.strictEqual(M.fplFor("contiguous", 4), 33000);
  assert.strictEqual(M.fplFor("contiguous", 1), 15960);
  assert.strictEqual(M.fplFor("alaska", 1), 19950);
  assert.strictEqual(M.fplFor("hawaii", 1), 18360);
  assert.strictEqual(M.fplFor("contiguous", 9), 55720 + 5680);
});

ok("FPL percent: $48,000 / family of 2 contiguous", () => {
  const pct = M.fplPercent(48000, "contiguous", 2);
  assert.ok(pct > 200 && pct < 250, String(pct));
});

ok("money rounding", () => {
  assert.strictEqual(M.money(10.105), 10.11);
  assert.strictEqual(M.money("12.1"), 12.1);
  assert.strictEqual(M.money(2206), 2206);
});

ok("match lines by code + date", () => {
  const m = M.matchLines(
    [
      { code: "99285", date: "2025-06-15", charged: 1800 },
      { code: "71046", date: "2025-06-15", charged: 406 },
    ],
    [
      { code: "99285", date: "2025-06-15", patientResp: 100, allowed: 420, planPaid: 320 },
      { code: "71046", date: "2025-06-15", patientResp: 40, allowed: 90, planPaid: 50 },
    ]
  );
  assert.strictEqual(m.pairs.length, 2);
  assert.strictEqual(m.unmatchedBill.length, 0);
  assert.strictEqual(m.unmatchedEob.length, 0);
});

ok("unmatched bill line flagged", () => {
  const m = M.matchLines([{ code: "99999", charged: 50 }], [{ code: "99213", patientResp: 20 }]);
  assert.strictEqual(m.unmatchedBill.length, 1);
  assert.strictEqual(m.unmatchedEob.length, 1);
});

ok("sample case raises BILL_GT_EOB, PAID_STILL_COLLECTED, FAP, FDCPA", () => {
  const s = M.sampleCase();
  const r = M.flags(s);
  const ids = r.flags.map((f) => f.id);
  assert.ok(ids.includes("BILL_GT_EOB"), ids.join(","));
  assert.ok(ids.includes("PAID_STILL_COLLECTED"));
  assert.ok(ids.includes("FAP_SCREEN"));
  assert.ok(ids.includes("FDCPA_WINDOW"));
  assert.strictEqual(r.billTotal, 2206);
  assert.strictEqual(r.eobPatient, 140);
});

ok("NSA flag only when emergency AND out-of-network", () => {
  const c = M.emptyCase();
  c.emergency = true;
  assert.ok(!M.flags(c).flags.some((f) => f.id === "NSA_EMERGENCY"));
  c.outOfNetwork = true;
  assert.ok(M.flags(c).flags.some((f) => f.id === "NSA_EMERGENCY"));
});

ok("FDCPA window closed after 31 days", () => {
  const c = M.emptyCase();
  c.collectorFirstContact = "2026-07-01";
  c.asOfDate = "2026-08-20";
  const ids = M.flags(c).flags.map((f) => f.id);
  assert.ok(ids.includes("FDCPA_WINDOW_CLOSED"), ids.join(","));
});

ok("GFE $400 threshold", () => {
  const c = M.emptyCase();
  c.uninsured = true;
  c.goodFaithEstimate = 1000;
  c.billTotal = 1400;
  const ids = M.flags(c).flags.map((f) => f.id);
  assert.ok(ids.includes("GFE_400"), ids.join(","));
});

ok("under-$500 bureau note", () => {
  const c = M.emptyCase();
  c.inCollections = true;
  c.billTotal = 71;
  const ids = M.flags(c).flags.map((f) => f.id);
  assert.ok(ids.includes("UNDER_500"), ids.join(","));
});

ok("all 8 letter types render and refuse empty invention of statutes", () => {
  const s = M.sampleCase();
  for (const [id] of M.letterTypes()) {
    const L = M.letters(s, id);
    assert.ok(L.body.length > 80, id);
    assert.ok(L.body.includes("not legal advice"), id);
  }
  assert.throws(() => M.letters(s, "nope"));
});

ok("validation letter cites 15 U.S.C. § 1692g", () => {
  const L = M.letters(M.sampleCase(), "validation");
  assert.ok(L.body.includes("1692g"));
});

ok("demo license verifies", () => {
  assert.strictEqual(M.checkLicense(M.DEMO_KEY), true);
  assert.strictEqual(M.checkLicense("MNL-FAKE-FAKE-FAKE"), false);
  assert.strictEqual(M.checkLicense(""), false);
  const k2 = M.makeLicense("FOUNDING");
  assert.ok(M.checkLicense(k2), k2);
});

ok("daysBetween", () => {
  assert.strictEqual(M.daysBetween("2026-08-01", "2026-08-20"), 19);
});

ok("duplicate codes", () => {
  const d = M.findDuplicates([
    { code: "99213", date: "2026-01-01" },
    { code: "99213", date: "2026-01-01" },
    { code: "99214", date: "2026-01-01" },
  ]);
  assert.strictEqual(d.length, 1);
  assert.strictEqual(d[0].length, 2);
});

if (process.exitCode) {
  console.log("FAILED");
  process.exit(1);
}
console.log(passed + " passed");
