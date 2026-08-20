# Postmark — the finished package (Run #2)

**Killed first:** Manila, a medical-bill file. HIPAA / we cannot store that customer data. **Nothing with medicine.**

**Shipped instead (2026-08-20):** a local subscription-cancellation file. Dated letters. No bank connection. No PHI.

## Try it
Open **[04-product/postmark.html](04-product/postmark.html)** (keep `engine.js` beside it). Click **SAMPLE**.  
Demo key: `PMK-DEM0-F1LE-K8`

```bash
python3 -m http.server 8766 --directory Downloads/Product/05-website
```

http://localhost:8766 · http://localhost:8766/app/postmark.html

`node Downloads/Product/04-product/test.js` — 9 passed.

## Package

| | |
|---|---|
| 0 | [BUILDLOG.md](00-buildlog/BUILDLOG.md) — Manila kill + this lock |
| 1 | [EVIDENCE.md](01-research/EVIDENCE.md) — CFPB Jun–Jul 2026, ROSCA, CA 17602, Amazon order, Rocket Money |
| 2 | [BUSINESS.md](02-business/BUSINESS.md) — $29, no feed |
| 3 | [BRAND.md](03-brand/BRAND.md) — postmarkfile.com RDAP 404 |
| 4 | [04-product/](04-product/README.md) — working file |
| 5 | [05-website/index.html](05-website/index.html) |
| 6 | [GTM.md](06-gtm/GTM.md) |
| 7 | [PROOF.md](07-proof/PROOF.md) |
| — | [license.txt](license.txt) |

## Thesis
Click-to-cancel is not federal law this year. Recurring charges still are. ROSCA and California’s ARL still give you a written handle. The apps that “just cancel it” want your transactions. We sell a postmark you keep.

## Gaps
No checkout (guardrail). Honor-system key. Owner must not accept customer files by email.
