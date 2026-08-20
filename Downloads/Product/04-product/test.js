const assert = require("assert");
const D = require("./engine.js");

let n = 0;
function ok(name, cond) {
  assert(cond, name);
  n += 1;
  console.log("  ok  " + name);
}

console.log("Dayticket engine");
ok("demo license", D.checkLicense(D.DEMO_KEY) && D.DEMO_KEY.indexOf("DTK-") === 0);
ok("refuses SSN-shaped text", D.looksForbidden("123-45-6789") === "ssn");
ok("refuses PAN-shaped text", D.looksForbidden("4111111111111111") === "pan");
ok("allows last four and email", D.looksForbidden("1111 shop@example.com") === null);

const f = D.sampleFile();
const extra = f.extras[0];
const fl = D.flags(f, extra).map((x) => x.id);
ok("sample flags unsigned + CA schedule present", fl.indexOf("UNSIGNED") >= 0 && fl.indexOf("NO_SCOPE") < 0);
ok(
  "forbidden scan on file with SSN",
  D.flags({ ...f, shopName: "123-45-6789" }, extra).some((x) => x.id === "FORBIDDEN_ID")
);

const t = D.ticket(f, extra, true);
ok("ticket cites 7159.6 and prints amount", /7159\.6/.test(t.body) && /\$1,860/.test(t.body));
ok("ticket has three statutory blanks", /Scope/.test(t.body) && /Amount added/.test(t.body) && /progress payments/.test(t.body));
ok("revised total", D.revisedTotal(f, f.jobs[0]) === 20260);
ok("free limit counts", D.freeLimits(f).jobs === 1 && D.freeLimits(f).extrasOk);

const started = { ...extra, workStartedOn: "2026-08-19", status: "draft" };
ok(
  "work-before-sign flag",
  D.flags(f, started).some((x) => x.id === "WORK_BEFORE_SIGN")
);

console.log(n + " passed");
console.log("DEMO_KEY " + D.DEMO_KEY);
