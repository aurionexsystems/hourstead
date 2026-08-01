# Build Log

Mission: build a complete company from scratch, evidence-first, zero spend, everything local in `Downloads/Product/`.
Operator: AI Assistant (autonomous run, 2026-07-10). Rule: never ask the user; log every self-answered question here.

## Phase plan

| Phase | Deliverable | Folder |
|---|---|---|
| 0 | Workspace + build log | 00-buildlog |
| 1 | Pain-point research, evidence dossier (real URLs) | 01-research |
| 2 | Business design: ICP, model, pricing, competitors | 02-business |
| 3 | Brand: name, voice, identity | 03-brand |
| 4 | Working product | 04-product |
| 5 | Marketing website (local, static) | 05-website |
| 6 | GTM plan | 06-gtm |
| 7 | Proof memo: why this works, what's verified vs inferred | 07-proof |

## Decision log

### D-000 — Phase structure
**Q I would have asked:** "What kind of company — software, service, content?"
**Self-answer:** Software (a product I can actually *build* end-to-end this run with zero spend). Guardrail 1 kills anything needing inventory, paid infra, or paid APIs. A local-first web product can be finished, demonstrated, and taken to market this month. Deliverable quality is testable, which supports Guardrail 3.

### D-001 — Research method
Search recent (2025–2026) complaint threads across niches where (a) people already pay for tools, (b) incumbents are widely resented, (c) a small product can win on focus. Candidate hunting grounds: Reddit niche-professional subs, forums, review sites. Every complaint used as evidence must come from a URL actually fetched this run. Minimum bar to proceed: 3+ independent sources of the same complaint, at least one showing willingness to pay or active tool-switching.

### D-002 — Problem selection
**Q:** "Which pain, of all pains on the internet?"
**A:** Acquisition-driven subscription squeeze on freelancer billing tools (Harvest/Bending Spoons). Chosen because it scored highest on: currency (IPO this month keeps it hot), verifiability (vendor's own pricing page confirms the mechanism), buildability (a real product shippable this run, zero spend), and audience reachability (the complainers congregate on HN/Reddit, free channels). Rejected veins: Etsy-seller tools and landlord software (search results too thin to verify quickly), QuickBooks resentment (pain verified but product unbuildable to a credible level in one run).

### D-003 — Primary-source strategy after Reddit blocked fetches
Reddit is unfetchable from this environment. Rerouted to the HN Algolia API (free, JSON) which yielded 6 named users with verbatim complaints. Logged the Reddit thread as existence-verified/contents-unverified rather than pretending.

### D-004 — Business model: one-time license, not SaaS
The verified pain IS subscriptions; charging rent would poison the position. Accepted trade-off: plateauing revenue, offset by ~zero fixed costs. (Full reasoning in 02-business/BUSINESS.md.)

### D-005 — Name
Nine candidate .com domains checked via Verisign RDAP; all squatted except **hourstead.com (404 = available)**. Name also carries the brand thesis (homestead = own, don't rent). Checked, not bought, per guardrail 1.

### D-006 — Product scope cuts (80% rule)
Cut from 1.0: projects (descriptions suffice), multi-currency per client, recurring invoices, expenses, team sync (breaks no-server promise), File System Access auto-save (top 1.1 item). Cut = logged, not forgotten.

### D-007 — License enforcement is honor-system
Key validation is client-side and readable in source. Deliberate: DRM contradicts the ownership brand, and non-payers were never customers. The key format (mod-97 checksum) exists so a merchant-of-record can issue keys without a server.

### D-008 — Screenshots not saved as files
Browser tooling verified UI live (screenshots reviewed in-session); saving image files added no decision value. Verification results recorded textually in 04-product/README.md.

### D-009 — Pricing review (post-run, owner prompt: "do what you think is best")
$79 re-validated against anchors (≥$108/yr incumbents; $89-class one-time indie tools) and kept. Real conversion risk identified as the free tier, not the price: many solo freelancers run ≤3 active clients, so the cap may never bite. Added a pre-committed lever order to BUSINESS.md (tighten cap → paid invoice themes → price last), to be decided with data at the 90-day checkpoint.

### D-010 — LinkedIn 7-day conversion campaign (owner goal, 2026-07-10)
Owner set goal: 7 days of LinkedIn posts per product, optimized for profit within 2 weeks. Delivered `linkedin/7-day-campaign.md`: daily posts (launch → verified-receipts → demo → pricing-model objection → exit-door checklist → FAQ → recap), first-comment link discipline, DM close scripts, days 8–14 harvest plan, and a revenue target labeled target-not-forecast ($630–$1,900). Hard rule embedded: Day 7 "results" post uses real numbers or none — no invented social proof.

### D-011 — Post-mortem fix shipped: stead-file auto-save (1.1, 2026-07-10)
Post-mortem's product defect (localStorage-only live store) fixed: File System Access API auto-save with IndexedDB handle persistence and permission-resume; fallback note for non-Chromium browsers. Verified in-browser (API detection, UI states, IDB round-trip, save-path + invoice-math regression, no console errors); the native picker dialog itself is flagged for one manual click-through. App synced to 05-website/app.

### D-012 — License file added (owner catch, 2026-07-10)
Owner spotted a real gap: the package sold a $79 license with no license text anywhere. Shipped `license.txt` — source-visible proprietary terms matching the business design (free tier grant, per-person Founding License, no redistribution, honor-system keys named as binding, no warranty, user data explicitly excluded from our copyright). Written in brand voice; flagged for counsel review before launch like the trademark check.

### D-013 — License-enforcement gap made explicit (owner challenge, 2026-07-10)
Owner pressed on whether a trivially-crackable client-side license check ("licensed()" — 7 lines, regex + mod-97 checksum, no server, no registry) means the profit-maximizing intent behind the LinkedIn goal wasn't actually achievable. Resolution: the goal's checkable deliverable (7 days of posts, correctly placed) was met; the goal's *intent* (maximize profit) was never fully verifiable during this run regardless, since nothing was published or sold — but the license gap is a real, previously under-stated dependency of that intent, not just a documented trade-off. Made explicit, unhedged, in 07-proof/PROOF.md's bear case and cross-referenced from the LinkedIn campaign's revenue-math section, so any revenue figure in the package reads as an upper bound gated by unmeasured leakage, not a guarantee. Declined to add technical protection (obfuscation/server validation) unprompted: both would contradict the "read the source, own the file, no server" brand promise that the license text itself makes; this is a positioning trade-off to revisit only if real launch data shows meaningful leakage, not something to fix reflexively.

### D-014 — "Sellable this month" precision fix (owner challenge, 2026-07-10)
Owner clarified the challenge wasn't about the LinkedIn campaign but the master prompt's core deliverable: is this actually a sellable product? Surfaced, unprompted this time, a bigger and previously understated gap than license crackability: **no live checkout exists for either product** — no payment processor connected, no key delivery, only a described plan (GTM.md). This is structural, not an oversight: guardrail 1 forbids paid signups, so connecting Lemon Squeezy/Stripe was never something this run could do — it's the owner's remaining step. Rewrote both proof memos' "definition of done" to distinguish *market-ready = everything buildable without spending* from *market-ready = money could change hands today*, and added the same precision to the root README. This should have been stated this plainly from the first proof memo, not after three rounds of pushback.

---

## Timeline

- **T+0** — Read master prompt. Created folder structure. Started research sweep.
- **T+1** — Broad complaint sweep; first hit: Harvest 2026 price restructuring under Bending Spoons.
- **T+2** — Primary sources secured via HN Algolia API (6 users, verbatim). TechCrunch macro piece (2026-07-05) ties it to a fresh IPO. Competitor pricing fetched from vendors' own pages. EVIDENCE.md shipped.
- **T+3** — Business design + brand. hourstead.com verified available on the 9th RDAP check. Logos drawn (SVG).
- **T+4** — Product built (single-file app, ~700 lines). Scripted E2E test: all 14 assertions green, invoice math exact, zero console errors.
- **T+5** — Website built, served locally, CTA-to-app verified (HTTP 200, correct payload).
- **T+6** — GTM plan with 30-day calendar. Proof memo with verified/inferred/unverified ledger. Package README. **Definition of done met.**

## Guardrail compliance
1. **No spending:** only free endpoints used (HN Algolia, Verisign RDAP, public pages). Domains checked, none bought.
2. **Nothing published:** all artifacts local; servers bound to localhost; no posts, emails, or messages sent.
3. **Nothing invented:** every quote/stat carries its fetched URL in EVIDENCE.md; inferences and unverifiable items labeled.
4. **All artifacts in Downloads/Product/.** ✅
5. **Zero questions asked;** 8 self-answered decisions logged above.
