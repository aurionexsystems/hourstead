# Build Log — Manila (Run #2)

Mission: build a complete company from scratch, evidence-first, zero spend, everything inside `Downloads/Product/`.
Operator: autonomous agent. Date: 2026-08-20.
Rule: never ask the user; log every self-answered question here.

This repo already contains Run #1 (Hourstead, freelancer time-tracking). This run does **not** extend Hourstead. New problem, new brand, new product.

## Phase plan

| Phase | Deliverable | Folder |
|---|---|---|
| 0 | Workspace + this log | 00-buildlog |
| 1 | Pain-point research, evidence dossier | 01-research |
| 2 | Business design | 02-business |
| 3 | Brand | 03-brand |
| 4 | Working product | 04-product |
| 5 | Marketing website | 05-website |
| 6 | GTM | 06-gtm |
| 7 | Proof memo | 07-proof |

## Decision log

### D-000 — Do not reuse Hourstead
**Q I would have asked:** "The repo already has a company. Should I improve it?"
**Self-answer:** No. The brief is "start with nothing but the open internet" and "find a real, painful, underserved problem." Hourstead is prior work. Building another one-file timer would be safest, not best.

### D-001 — Research channels after X failed
**Q:** "Use Twitter/X for live complaints?"
**A:** X MCP tools returned `user-not-enrolled` / Pay-per-use. Guardrail 1 forbids new paid enrollment. Rerouted to: CFPB Consumer Complaint Database API (free, official, dated July 2026), HN Algolia API, fetched news/gov pages. Logged X as attempted-blocked.

### D-002 — Problem selection
**Q:** "Which pain, of all pains on the internet?"
**A:** Medical bills that people do not understand and often do not owe — collectors, credit reporting, EOB/bill mismatch, paid-still-collected.

Scored candidates this run:

| Vein | Currency | Verifiable quotes | Buildable this month, $0 | Underserved vs incumbents | Verdict |
|---|---|---|---|---|---|
| Harvest-class SaaS revolt | Stale for this repo (Run #1) | Yes | Yes | No (we already shipped it) | Reject |
| Codex Windows lag (Aug 2026) | This week | Yes (GitHub) | No (not a company) | n/a | Reject |
| Security-deposit recovery | Evergreen | Mostly SEO, few primary fetches | Yes | Crowded (Nolo, CA courts, DepositDeadline) | Reject |
| Subscription click-to-cancel (rule vacated 2025) | Real | Mixed | Yes | Rocket Money / Pine exist | Reject |
| Prior-auth appeals | Real (CBS/KFF) | Yes | Weak (needs payer APIs) | CareRoute etc. | Reject |
| **Medical bill / EOB / collector file** | **CFPB filings 2026-07-29** | **Yes, official + named news** | **Yes, local file** | **Paid advocates take 10–25% and require uploads; Dollar For is charity-care only** | **Lock** |

Why this one wins: the CFPB's own words are the category name — "Attempts to collect debt not owed." Complaints in that category were fetched this run with dates in June–July 2026. A federal rule that would have pulled medical debt off credit reports was vacated 2025-07-11 (CFPB's own rule page). The expert advice (itemize, match the EOB, write, certified mail) is consistent across HN, Consumer Reports, and CFPB — and almost nobody does it because the workflow is a pile of tabs. Paid tools want the bill uploaded. That is the gap.

### D-003 — 80% error-rate claim
**Q:** "Can I lead with '80% of hospital bills have errors'?"
**A:** No. Repeated constantly; originates with Medical Billing Advocates of America (an advocate trade group). Not treated as a fact in our deliverables. Consumer Reports (2022) attributes "almost half" to Patient Advocate Foundation — also not a peer-reviewed rate. We use CFPB complaint language and named case stories instead.

### D-004 — 65% of bankruptcies are medical
**Q:** "Use the Himmelstein bankruptcy stat?"
**A:** An HN comment on 2026-08-10 repeated it via a third-party ranking site. The figure is contested in the literature. **Not used.** Stick to KFF / Peterson-KFF / CFPB numbers we actually fetched.

### D-005 — Product shape
**Q:** Software, service, or content?
**A:** Software: a local medical-bill file. Guardrail 1 kills paid OCR APIs, paid CPT licenses, and a staffed negotiation shop. A file the patient keeps is also the brand (see D-007). We do not ship AMA CPT descriptors (copyright). Users type codes/descriptions from their own bill.

### D-006 — Name
**Q:** What do we call it?
**A:** **Manila.** Domain `manilafile.com` — Verisign RDAP HTTP 404 on 2026-08-20 (checked, not bought). The object *is* the product: a manila folder on the kitchen table. Rejected: Hold the Bill (clear, available, campaign-shaped), Prove I Owe (available, too fight-club), AfterEOB (available, jargon-first), Holdfast (`.health` only; `.com` taken).

### D-007 — Privacy is the wedge, not "AI"
**Q:** Should this be an LLM bill-reader?
**A:** CoveredUSA already markets "upload your bill, we analyze, we delete." Goodbill/Resolve/CareRoute/Mediloop/Dollar For all require documents. An HN comment (siliconc0w, 2025-10-28) even asked for an "LLM-powered medical billing agent." We go the other way on purpose: **the file never leaves the machine.** That is the only honest $0 architecture and the only claim we can keep under Guardrail 2 (publish nothing, upload nothing). Surprise is the refusal.

### D-008 — Price
**Q:** What do we charge people who may already be in medical debt?
**A:** $39 one-time Founding File. Anchors fetched: Goodbill 20% of savings cap $1,000; CareRoute 25% cap $1,000; Mediloop $129/bill; Resolve deposit $249–$499 before a 10–25% cut; KFF (updated 2026-04-30) says about half of adults could not pay an unexpected $500 medical bill out of pocket. A percentage of savings is how you charge the terrified. A $39 file is an impulse the night the collector texts. Free tier: one case + itemized-bill request letter. Paid: unlimited cases, full letter pack, clocks, export. Lever if conversion fails: drop to $29 before raising.

### D-009 — License enforcement
Honor-system client-side key (mod-97). Same structural honesty as Run #1: DRM would require a server and would contradict "the file is yours." Documented in PROOF, not hidden.

### D-010 — Checkout
No payment processor. Guardrail 1. Owner's remaining step. Stated in README and PROOF on the first writing, not after pushback.

### D-011 — Legal posture
We generate letters citing statutes we fetched. We are not a law firm. Every letter and the website say so. We do not promise savings, credit-score repair, or that a collector will stop.

### D-012 — Scope cuts (80% rule)
Cut from 1.0: OCR/photo bill ingest (would need a model or paid API); live hospital MRF price lookup; 50-state statute engine; AMA CPT codebook; e-file to CFPB/CMS; certified-mail postage purchase; multi-patient household vault. Cut = logged, not forgotten.

### D-013 — Sample data
No invented "customer testimonials." In-app sample is labeled SAMPLE. The NBC Connecticut Lisa Horan story ($2,206 paid, then collections) is cited in research/proof, not impersonated as a user of Manila.

## Timeline

- **T+0** — Read brief. Created `Downloads/Product/` + branch `cursor/company-from-scratch-9214`.
- **T+1** — X billed/blocked. Broad sweep. Codex-lag dead end. Deposit/subscription/prior-auth scored and rejected.
- **T+2** — CFPB API returned July 2026 medical-collection complaints. Locked problem.
- **T+3** — Official pages fetched (CFPB, CMS, IRS 501(r), FR 2026 FPL, FDCPA §1692g, KFF, Peterson-KFF, AP, Equifax/Experian/TransUnion, competitor sites).
- **T+4** — Name + model locked. Product + site + package written.
- **T+5** — Local tests. Proof memo. Definition of done.

## Guardrail compliance

1. No new spending. No paid APIs. Domains checked via RDAP, not bought.
2. Nothing published. Site and app are local files.
3. Every market claim in EVIDENCE.md / PROOF.md traces to a fetched URL. Inferences labeled.
4. All artifacts under `Downloads/Product/`.
5. No questions to the user. Blocked tools rerouted.
