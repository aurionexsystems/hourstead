# Dayticket — the finished package (Run #2)

**Dumped:** Manila (medicine) and Postmark (cancel letters). HIPAA is expensive. Nothing with medicine. No consumer-complaint identity file.

**Shipped (2026-08-20):** a local extra-work / change-order ticket for trades. Signed extras. No card processing. No job file on our servers.

## Try it
Open **[04-product/dayticket.html](04-product/dayticket.html)** (keep `engine.js` beside it). Click **SAMPLE**.  
Demo key: `DTK-DEM0-F1LE-D0`

```bash
python3 -m http.server 8766 --directory Downloads/Product/05-website
```

http://localhost:8766 · http://localhost:8766/app/dayticket.html

`node Downloads/Product/04-product/test.js` — 11 passed.

## Package

| | |
|---|---|
| 0 | [BUILDLOG.md](00-buildlog/BUILDLOG.md) — two dumps + this lock |
| 1 | [EVIDENCE.md](01-research/EVIDENCE.md) — BPC 7159/7159.6, Joist, Housecall Pro, ContractorTalk |
| 2 | [BUSINESS.md](02-business/BUSINESS.md) — $49, no feed |
| 3 | [BRAND.md](03-brand/BRAND.md) — dayticketfile.com RDAP 404 |
| 4 | [04-product/](04-product/README.md) — working file |
| 5 | [05-website/index.html](05-website/index.html) |
| 6 | [GTM.md](06-gtm/GTM.md) |
| 7 | [PROOF.md](07-proof/PROOF.md) |
| — | [license.txt](license.txt) |

## Thesis
The extra is where a remodel loses money. California already requires a signed writing. The apps rent you that signature line. We sell the pad.

## Gaps
No checkout (guardrail). Honor-system key. Owner must not accept job files by email.
