# Build Log — Groundsight

**Run date:** 2026-08-20  
**Operator:** autonomous agent (no human mid-run answers)  
**Working directory:** `/workspace/Downloads/Product/`  
**Branch:** `cursor/company-from-scratch-9b75`

This file is the decision diary. Every question a founder would have asked the owner is answered here, with the why.

---

## Phase 0 — Setup

- Created branch `cursor/company-from-scratch-9b75` off `main`.
- Created `Downloads/Product/` as required. Prior repo artifacts (Hourstead, July 2026) are treated as history only — not reused as a product.
- X/Twitter MCP tools returned `Client Forbidden` / pay-per-use enrollment. **Q: Use X anyway?** **A: No.** Guardrail 1 forbids new paid services. Logged as blocked source; fallback = HN Algolia (free JSON), fetched news/regulator pages, advocacy orgs.

---

## Phase 1 — Problem hunt (in progress)

### Q: What problem should we pick?
**A (working thesis, pending source lock):** Homeowners are being non-renewed or given 30–60 day “fix this or lose coverage” letters based on aerial/drone/satellite imagery they were never shown. The pain is acute, dated August 2026 in multiple news cycles, and the existing “products” are blog posts from roofers plus a nonprofit explainer — not a kit a homeowner can finish tonight.

### Why not the other live candidates?
| Candidate | Why it lost |
|---|---|
| Freelancer time/invoicing | Already built as Hourstead in this repo. Repeating it is not a new company. |
| Claude/ChatGPT usage-billing bugs | Real (GitHub #72680, Aug 2026) but the vendor owns the ledger; a third-party app cannot refund or reset usage. |
| Google AI Overviews smearing small businesses | Very current (Business Insider, Aug 2026) but the “product” is mostly “report to Google and wait.” Weaker closed loop than a deadline-driven packet. |
| Subscription cancel hell | Crowded (Rocket Money et al.) and FTC click-to-cancel is stalled — real, not underserved. |
| Late invoices / cash-flow gap | Real SMB pain, too close to Hourstead’s lane. |

### Q: Is this “inventing a market”?
**A: No, if we can fetch:** (1) named homeowner quotes, (2) regulator stats, (3) carrier statements that documentation is the path, (4) the absence of a dedicated consumer app. If any of those fail, we downgrade the thesis in the evidence file.

---


---

## Phase 1 close — problem locked

**Decision D-001:** Build **Eavefile**, a local-first case file for homeowners answering aerial/drone/satellite insurance notices.

**Q: Why this over Google AI Overviews (also Aug 2026, named owners)?**  
**A:** AIO is a reputational smear with no statutory clock and no carrier-written shopping list. The insurance letter has both. Closed loop > hotter headline.

**Q: Why not ask the user which problem they prefer?**  
**A:** Guardrail: never ask. The evidence rank is in EVIDENCE.md.

**Q: Use X/Twitter?**  
**A:** MCP returned pay-per-use forbidden. Logged, abandoned.

**Q: Quote the Austin Gartenmann / $3,000 tree-trim story?**  
**A:** KUT URL 404'd. Do not quote as verified. NPR lede fetched; UPHELP covers the Texas pattern.

**Q: Include Massachusetts cosmetic-roof bulletin as a first-class card?**  
**A:** Mass.gov PDF/Q&A 403'd. Cite only via UPHELP, second-hand, not as a state card.

**Q: Invent DOI complaint URLs for GA/IN/LA/MD?**  
**A:** No. NAIC directory only, after we fetched it.

---

## Phase 2 — business / brand

**D-002:** $49 one-time Founding License. Free = 1 case / 5 exhibits / watermark. Walk-the-lot free forever.  
**Q: Why not subscription?** The customer is already being rented.  
**Q: Why not $79?** Different ICP (panic vs freelancer ops). Inference. Levers pre-committed.

**D-003:** Name **Eavefile**. `groundsight.com` taken (RDAP 200). `eavefile.com` RDAP 404. Not purchased.

**D-004:** Architecture = one HTML file. Same reason as Hourstead plus a new one: we will not ask a person who just got surveilled from the sky to upload their roof to us.

---

## Phase 3 — product cuts

Shipped: case, clock, sourced state cards, walk-the-lot, evidence locker, 3 letters, packet, export/import, honor-system license.

**Cut from 1.0:** File System Access auto-save (Hourstead 1.1 lesson — logged as first 1.1, not blocking). OCR. Photo bytes in IndexedDB. Checkout. 50-state table. Emailing anyone.

**Q: Is the license "real"?**  
**A:** Commercially real, technically a checksum. Same honesty as Hourstead. Documented in PROOF.

---

## Phase 4 — proof posture

We claim the packet is the known instrument (State Farm's own words; NerdWallet; TDI; CID). We do **not** claim Eavefile caused Bennett's renewal. ABC7 did.

