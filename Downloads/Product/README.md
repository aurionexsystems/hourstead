# Eavefile — the finished package (2026-08-20)

A company built from the open internet in one autonomous run. Local-first case file for homeowners answering an **aerial-imagery insurance notice**. One-time **$49** Founding License. No server, no account, no subscription.

## Try it in 15 seconds

Open **[04-product/eavefile.html](04-product/eavefile.html)** in a browser.

1. Start a case file.  
2. Set a coverage-end date (the clock is the product).  
3. Add an exhibit.  
4. Open Letters → print.  
5. Unlock with the demo key: `EF1-SHOW-THEM-GR00`

Or serve the site: `python3 -m http.server 8320 --directory 05-website` → http://localhost:8320

## The package

| | What | Where |
|---|---|---|
| 0 | Build log — every decision and self-answered question | [00-buildlog/BUILDLOG.md](00-buildlog/BUILDLOG.md) |
| 1 | Evidence — every claim traces to a fetched URL | [01-research/EVIDENCE.md](01-research/EVIDENCE.md) |
| 2 | Business — ICP, $49, kill criteria | [02-business/BUSINESS.md](02-business/BUSINESS.md) |
| 3 | Brand — Eavefile, copper eave, `eavefile.com` RDAP-available | [03-brand/BRAND.md](03-brand/BRAND.md) |
| 4 | **The product** — working single-file app + tests | [04-product/](04-product/README.md) |
| 5 | Marketing site — static, local | [05-website/index.html](05-website/index.html) |
| 6 | GTM — 30-day calendar, unsent drafts | [06-gtm/GTM.md](06-gtm/GTM.md) |
| 7 | Proof — verified vs inferred | [07-proof/PROOF.md](07-proof/PROOF.md) |
| — | License | [license.txt](license.txt) |

## The thesis in one paragraph

Insurers initiated **2,019,799** homeowners nonrenewals in 2024 (NAIC, published Aug. 5, 2026). A visible, ugly slice of that is the drone/satellite letter: no inspector, a photo you were never shown, a $20k roof, a deadline. Linda Bennett said they had the wrong house; three weeks later State Farm renewed her. The carrier already specified the packet — photos, invoice, inspection report. Eavefile is that packet as a file you own. Cost to launch after this repo: one domain and a checkout the owner wires. Break-even: one sale.

## Two honest gaps

**(1)** No live checkout — paid signup was forbidden. **(2)** The license key is an unobfuscated client-side check. Both are documented in the proof memo. Neither is a pretend “already selling.”
