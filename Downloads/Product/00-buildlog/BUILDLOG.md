# Build Log — Postmark (Run #2, take 2)

Date: 2026-08-20. Autonomous. No questions to the user.

## Killed ideas this run
| Idea | Why dead |
|---|---|
| Hourstead sequel | Already shipped in this repo |
| **Manila (medical bills)** | User: HIPAA is an issue; we cannot store that customer file safely; **nothing with medicine**. Killed in-run. All Manila artifacts deleted from `Downloads/Product/`. |
| Codex Windows lag | A bug, not a company |
| Security-deposit kit | Crowded SEO; more identity data than we want to invite |

## Locked problem
People cannot cancel recurring charges. The FTC’s nationwide click-to-cancel rule was **vacated 2025-07-08**. ROSCA (15 U.S.C. § 8403) and state automatic-renewal laws (e.g. California BPC § 17602) still require a simple / online cancel. CFPB complaints in June–July 2026 still say “I cannot cancel” and “they called my dispute friendly fraud.” Rocket Money’s own pages say they pull **transaction history** via Plaid. We will not.

## Data rule (the actual constraint)
We do not store customer files. The product has **no medical fields**, rejects SSN-shaped and full-PAN-shaped input, and never asks for a bank login. Checkout (owner’s later step) should sell a key, not receive a `.postmark` file. Support policy: we do not accept forwarded bills, bank PDFs, or screenshots of cards.

## Name
**Postmark.** Domain `postmarkfile.com` — Verisign RDAP HTTP 404 on 2026-08-20 (checked, not bought). The dated letter is the product.

## Model
$29 once. Free = first cancel notice. Paid = follow-up, issuer notes, FTC/AG drafts. Honor-system key. No merchant account this run.

## Cuts
No bank aggregator, no “we’ll call them,” no 50-state ARL engine (CA + federal only), no live checkout, no posting.

## Self-answered
**Q: Rebuild Manila with local-only HIPAA language?**  
**A:** User said no. Dump medicine.

**Q: Isn’t a name/address still PII?**  
**A:** Yes. It stays on their machine. We still do not receive it. That is different from holding everyone’s EOBs.

**Q: X/Twitter?**  
**A:** Pay-per-use. Not used.
