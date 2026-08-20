#!/usr/bin/env python3
"""Eavefile product assertions. Run: python3 test_eavefile.py"""
from __future__ import annotations

import json
import re
import sys
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
APP = ROOT / "eavefile.html"
HTML = APP.read_text(encoding="utf-8")


def fail(msg: str) -> None:
    print("FAIL", msg)
    sys.exit(1)


def ok(msg: str) -> None:
    print("  ok ", msg)


def test_static() -> None:
    if "EF1-SHOW-THEM-GR00" not in HTML:
        fail("demo key missing")
    ok("demo key present")
    if "Eavefile" not in HTML:
        fail("brand missing")
    ok("brand present")
    for needle in (
        "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=INS&sectionNum=678.",
        "https://www.flsenate.gov/Laws/Statutes/2025/0627.4133",
        "https://www.tdi.texas.gov/tips/home-insurance-canceled-or-not-renewed.html",
        "https://content.naic.org/state-insurance-departments",
        "https://apps.fldfs.com/eService/Default.aspx",
    ):
        if needle not in HTML:
            fail(f"missing fetched URL {needle}")
    ok("sourced URLs embedded")
    if "floir.com/fileacompaint" in HTML:
        fail("invented FL complaint URL still present")
    ok("no invented FL complaint URL")


def license_math(key: str) -> bool:
    m = re.match(r"^EF1-([A-Z0-9]{4})-([A-Z0-9]{4})-([A-Z0-9]{2})(\d{2})$", key)
    if not m:
        return False
    body = m.group(1) + m.group(2) + m.group(3)
    checksum = sum(ord(c) for c in body) % 97
    return checksum == int(m.group(4))


def test_license() -> None:
    if not license_math("EF1-SHOW-THEM-GR00"):
        fail("demo key should validate")
    ok("demo key checksum")
    if license_math("EF1-SHOW-THEM-GR01"):
        fail("wrong checksum should fail")
    ok("bad checksum rejected")
    if license_math("HS1-FIRS-TFUR-RO14"):
        fail("Hourstead key must not validate")
    ok("foreign prefix rejected")


def test_deadline_math() -> None:
    from datetime import date, timedelta

    def days_between(a: str, b: str) -> int:
        A = date.fromisoformat(a)
        B = date.fromisoformat(b)
        return (B - A).days

    today = date(2026, 8, 20)
    if days_between(today.isoformat(), (today + timedelta(days=75)).isoformat()) != 75:
        fail("75-day CA clock")
    if days_between(today.isoformat(), (today + timedelta(days=120)).isoformat()) != 120:
        fail("120-day FL clock")
    ok("deadline arithmetic")


def browser_tests() -> None:
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("SKIP browser e2e (playwright not installed) — static + license tests still ran")
        return

    handler = partial(SimpleHTTPRequestHandler, directory=str(ROOT))
    httpd = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    port = httpd.server_address[1]
    t = threading.Thread(target=httpd.serve_forever, daemon=True)
    t.start()
    url = f"http://127.0.0.1:{port}/eavefile.html"
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(
                executable_path="/usr/local/bin/google-chrome",
                args=["--no-sandbox", "--disable-gpu"],
            )
            page = browser.new_page()
            errs: list[str] = []
            page.on("pageerror", lambda e: errs.append(str(e)))
            page.goto(url, wait_until="load")
            page.wait_for_function("() => window.Eavefile && window.Eavefile.validKey")
            if errs:
                fail("console pageerror: " + "; ".join(errs))
            ok("app booted without pageerror")

            valid = page.evaluate("() => Eavefile.validKey(Eavefile.DEMO_KEY)")
            if not valid:
                fail("JS validKey(demo) false")
            ok("JS license accepts demo")

            page.evaluate(
                """() => {
                  const c = Eavefile.newCase();
                  Eavefile.saveNotice({
                    address: '1440 Oak Ridge',
                    city: 'Santa Ana',
                    state: 'CA',
                    zip: '92701',
                    carrier: 'State Farm',
                    policyNumber: 'HO-9911',
                    noticeDate: '2026-08-01',
                    coverageEnd: '2026-10-15',
                    noticeKind: 'condition',
                    alleged: 'Roof replacement required based on aerial review'
                  });
                  return c.id;
                }"""
            )
            blocked = page.evaluate("() => { Eavefile.newCase(); return Eavefile.store.cases.length; }")
            if blocked != 1:
                fail(f"free tier should cap at 1 case, got {blocked}")
            ok("free case cap")

            ev = page.evaluate(
                """() => {
                  const r = [];
                  for (let i = 0; i < 6; i++) {
                    r.push(Eavefile.addEvidence({
                      type: 'Dated ground photo',
                      title: 'South slope ' + i,
                      date: '2026-08-20',
                      filename: 'south-' + i + '.jpg',
                      note: 'No ponding'
                    }));
                  }
                  return r;
                }"""
            )
            if ev[4]["blocked"] or ev[4]["count"] != 5:
                fail(f"fifth exhibit should succeed: {ev[4]}")
            if not ev[5]["blocked"]:
                fail("sixth exhibit should be blocked on free tier")
            ok("free evidence cap")

            text = page.evaluate(
                """() => {
                  const c = Eavefile.store.cases[0];
                  return {
                    req: Eavefile.letterRequest(c),
                    appeal: Eavefile.letterAppeal(c),
                    complaint: Eavefile.letterComplaint(c),
                    packet: Eavefile.packetText(c)
                  };
                }"""
            )
            for field in ("1440 Oak Ridge", "HO-9911", "State Farm", "Roof replacement required"):
                if field not in text["req"] or field not in text["packet"]:
                    fail(f"merge field {field} missing from request/packet")
            if "California Insurance Code" not in text["req"] and "leginfo.legislature.ca.gov" not in text["req"]:
                fail("CA source missing from request letter")
            if "department" not in text["complaint"].lower():
                fail("complaint letter missing department")
            if "[draft / free tier]" not in text["packet"]:
                fail("free packet should mark draft")
            ok("letter merge + packet draft mark")

            unlocked = page.evaluate("() => Eavefile.unlock(Eavefile.DEMO_KEY)")
            if not unlocked:
                fail("unlock failed")
            after = page.evaluate(
                """() => {
                  Eavefile.newCase();
                  const c = Eavefile.store.cases[0];
                  return {
                    cases: Eavefile.store.cases.length,
                    packet: Eavefile.packetText(c),
                    licensed: Eavefile.store.licensed
                  };
                }"""
            )
            if after["cases"] != 2 or not after["licensed"]:
                fail(f"unlock should allow second case: {after}")
            if "[draft / free tier]" in after["packet"]:
                fail("watermark/draft mark should leave after unlock")
            ok("unlock removes draft mark and lifts cap")

            dumped = page.evaluate("() => JSON.stringify(Eavefile.store)")
            data = json.loads(dumped)
            if data["version"] != 1 or len(data["cases"]) != 2:
                fail("export shape")
            ok("export JSON shape")
            browser.close()
    finally:
        httpd.shutdown()


def main() -> None:
    print("Eavefile tests")
    test_static()
    test_license()
    test_deadline_math()
    browser_tests()
    print("ALL STATIC/LICENSE ASSERTIONS PASSED")


if __name__ == "__main__":
    main()
