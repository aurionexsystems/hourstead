# Manila — the finished package (Run #2)

**A company built from scratch in one autonomous run, 2026-08-20.**  
A local medical-bill file: match the statement to the EOB, run the thirty-day clock, print the letters. One-time $39 Founding File. No server, no account, no percentage of your savings. Built for people the CFPB is still hearing from — collectors on bills they say they do not owe — after the 2025 rule that would have wiped medical debt off credit reports was vacated.

Hourstead (Run #1) stays in the repo root. This company lives here.

## Try it in 20 seconds
Open **[04-product/manila.html](04-product/manila.html)** (keep `engine.js` beside it). Click **Load SAMPLE**. Read **The match**. Open **Letters**.  
Demo key: `MNL-DEM0-F1LE-NV`

Or the full site:

```bash
python3 -m http.server 8765 --directory Downloads/Product/05-website
```

http://localhost:8765 · http://localhost:8765/app/manila.html

## The package

| | What | Where |
|---|---|---|
| 0 | Build log — every decision + self-answered question | [00-buildlog/BUILDLOG.md](00-buildlog/BUILDLOG.md) |
| 1 | Evidence — every claim traced to a fetched URL | [01-research/EVIDENCE.md](01-research/EVIDENCE.md) |
| 2 | Business — ICP, model, $39, competition | [02-business/BUSINESS.md](02-business/BUSINESS.md) |
| 3 | Brand — Manila, logos, voice (`manilafile.com` RDAP 404) | [03-brand/BRAND.md](03-brand/BRAND.md) |
| 4 | **The product** — working file + 15 green tests | [04-product/](04-product/README.md) |
| 5 | Marketing website — static, local | [05-website/index.html](05-website/index.html) |
| 6 | Go-to-market — 30-day calendar, nothing posted | [06-gtm/GTM.md](06-gtm/GTM.md) |
| 7 | Proof memo — verified vs inferred | [07-proof/PROOF.md](07-proof/PROOF.md) |
| — | License draft | [license.txt](license.txt) |

## The thesis in one paragraph
Medical bills are the most ordinary collector contact in America, and a slice of them are not owed — the CFPB has been saying so for years, and consumers were still filing that sentence in July 2026. The expert workflow (itemize, match the EOB, write, certified mail) is public and unpackaged as an object you keep. Paid advocates take 18–25% and the PDF; Dollar For is free and hospital-charity-care only; Goodbill’s own FAQ refuses collections and already-paid accounts. Manila is the folder those people would have opened the night of the text. Cost to launch ≈ one domain; break-even ≈ one sale; every launch channel is free and already mapped. Bounded downside. Real legal hooks. Unproven conversion.

## Two gaps before anyone can pay
**(1)** No payment processor — guardrail, not an oversight. **(2)** The license check is an honor-system checksum. Both are in the proof memo on the first writing.
