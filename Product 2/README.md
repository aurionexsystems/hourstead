# Askstead — the finished package (Run #2)

**A second company built from scratch in one autonomous run, 2026-07-10.**
A print-it-yourself Google review kit for local businesses — QR counter cards, table tents, stickers, a compliant feedback page, and ask scripts. **$49 once**, versus the $399+/month platforms whose BBB complaints include billing customers after cancellation.

## Try it in 30 seconds
Open **[04-product/askstead.html](04-product/askstead.html)** in a browser — works fully offline as of 1.1 (built-in QR encoder). Enter any business name and a link like `https://g.page/r/test123/review`, hit **Generate my kit**, flip through the tabs, print something. Demo license key: `AS1-BELL-BELL-BE30`.

Or the full experience: `python -m http.server 8320 --directory "Product 2/05-website"` → http://localhost:8320

## The package
| | What | Where |
|---|---|---|
| 0 | Build log — decisions + self-answered questions | [00-buildlog/BUILDLOG.md](00-buildlog/BUILDLOG.md) |
| 1 | Evidence dossier — fetched URLs, incl. primary BBB complaints | [01-research/EVIDENCE.md](01-research/EVIDENCE.md) |
| 2 | Business design | [02-business/BUSINESS.md](02-business/BUSINESS.md) |
| 3 | Brand (askstead.com verified available) | [03-brand/BRAND.md](03-brand/BRAND.md) |
| 4 | **The product** — working generator + verification | [04-product/](04-product/README.md) |
| 5 | Marketing website | [05-website/index.html](05-website/index.html) |
| 6 | Go-to-market — SEO/agency/YouTube channels, 30-day calendar | [06-gtm/GTM.md](06-gtm/GTM.md) |
| 7 | Proof memo — verified vs inferred ledger | [07-proof/PROOF.md](07-proof/PROOF.md) |
| — | License (free tier, Kit License, Agency Bundle terms) | [license.txt](license.txt) |

## The thesis in one paragraph
97% of consumers read local reviews and 71% check Google (BrightLocal 2026), so main-street businesses pay $399+/month to platforms whose own pricing pages hide prices and whose BBB file shows post-cancellation billing as recently as last month. But the job that actually produces a review — a visible, honest, effortless ask at the moment of satisfaction — is a printed QR card, a compliant feedback page, and the right words. Askstead generates exactly that, locally in the browser, for $49 once. Google's gating ban and the FTC's reviews rule make "compliant by construction" a moat that strengthens with every enforcement headline. Costs ≈ a domain; break-even ≈ one sale; launchable this month.
