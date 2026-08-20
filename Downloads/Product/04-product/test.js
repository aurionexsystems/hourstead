#!/usr/bin/env node
"use strict";
const assert = require("assert");
const P = require("./engine.js");
let n = 0;
function ok(name, fn) {
  try {
    fn();
    n++;
    console.log("  ok  " + name);
  } catch (e) {
    console.error("  FAIL  " + name + "\n       " + e.message);
    process.exitCode = 1;
  }
}
console.log("Postmark engine");
ok("demo license", () => {
  assert.strictEqual(P.checkLicense(P.DEMO_KEY), true);
  assert.strictEqual(P.checkLicense("PMK-FAKE-FAKE-FAKE"), false);
  assert.ok(P.checkLicense(P.makeLicense("FOUNDING")));
});
ok("refuses SSN-shaped text", () => {
  assert.strictEqual(P.looksForbidden("123-45-6789"), "ssn");
});
ok("refuses PAN-shaped text", () => {
  assert.strictEqual(P.looksForbidden("4111111111111111"), "pan");
});
ok("allows last four and email", () => {
  assert.strictEqual(P.looksForbidden("1111"), null);
  assert.strictEqual(P.looksForbidden("sample@example.com"), null);
});
ok("sample flags charge-soon, still-charging, CA, ROSCA", () => {
  const f = P.sampleFile();
  const ids = P.flags(f, f.subs[0]).map((x) => x.id);
  assert.ok(ids.includes("CHARGE_SOON"), ids.join(","));
  assert.ok(ids.includes("STILL_CHARGING"));
  assert.ok(ids.includes("CA_ARL"));
  assert.ok(ids.includes("ROSCA"));
});
ok("forbidden scan on file with SSN", () => {
  const f = P.emptyFile();
  f.yourName = "123-45-6789";
  const ids = P.flags(f, P.emptySub()).map((x) => x.id);
  assert.ok(ids.includes("FORBIDDEN_ID"));
});
ok("all letters cite no-PAN rule and render", () => {
  const f = P.sampleFile();
  for (const [id] of P.letterTypes()) {
    const L = P.letters(f, f.subs[0], id);
    assert.ok(L.body.includes("Not legal advice"), id);
    assert.ok(/full card|card number/i.test(L.body), id);
  }
  assert.throws(() => P.letters(f, f.subs[0], "nope"));
});
ok("cancel letter cites 8403", () => {
  const L = P.letters(P.sampleFile(), P.sampleFile().subs[0], "cancel");
  assert.ok(L.body.includes("8403"));
});
ok("daysBetween", () => {
  assert.strictEqual(P.daysBetween("2026-08-20", "2026-09-01"), 12);
});
if (!process.exitCode) console.log(n + " passed");
