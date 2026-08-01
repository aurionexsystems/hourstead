# Build Log — Run #2 (Product 2)

Mission: execute the master prompt again for a second, different company. Same guardrails: zero spend, publish nothing, invent nothing, all artifacts in `Downloads/Product/Product 2/`, never ask.
Operator: AI Assistant (autonomous run, 2026-07-10).

## Decision log

### D2-000 — "Different product" interpretation
**Q I would have asked:** "Different how — different market, or just a second app?"
**A:** Different market, different customer, different job-to-be-done. Ruled out anything targeting freelancer billing (Hourstead's turf). Kept the zero-spend/local-buildable constraint from the guardrails.

### D2-001 — Vein selection
Probed four veins with searches + fetches: (1) restaurant QR-menu subscriptions, (2) Eventbrite fee flight, (3) photographer gallery platforms, (4) Podium/review-management squeeze. Selection matrix: pain evidence strength × buildability × freshness. Eventbrite: strong pain, unbuildable (needs payments). QR menus: buildable, pain unverified. Galleries: mild pain. **Podium vein won:** primary BBB complaints as fresh as 17 days old, $399+/mo verified, contract-trap pattern, and the core job (ask for a Google review) is perfectly buildable as a static kit. Rejections logged in EVIDENCE.md §5.

### D2-002 — Compliance as the wedge
Research surfaced that Google bans review gating and the FTC began enforcing its reviews rule (Dec 2025 warning letters). Decision: build the kit compliance-first (every customer gets both public-review and private-feedback paths; no incentives, no gating). This turns a legal constraint into the differentiator.

### D2-003 — QR generation approach
Options: (a) write a QR encoder from scratch (Reed-Solomon — error-prone, hard to verify without a scanner), (b) free keyless API. Chose (b): api.qrserver.com, guardrail-compliant ("APIs whose keys are free are fair game"). Verified end-to-end before building: generated PNG decodes back to the exact input URL (margin=20 needed for quiet zone). Outputs embed the PNG as data URI → printed assets self-contained; generation requires being online once, noted in product copy.

### D2-004 — Name
**Askstead** — sibling to Hourstead: the "ask," homesteaded. askstead.com verified available via Verisign RDAP (404) on 2026-07-10; checked, not bought. Also checked and taken: reviewstead, kudocard, praisekit, starstead. The two companies now share a house style ("stead" = tools you own outright) — an intentional studio brand opportunity, logged as inference/option, not a claim.

### D2-005 — Scope
One-time $49 license. Kit generator outputs: counter card, table tent, sticker sheet, poster (all print-CSS), a compliant funnel page (downloadable single HTML), and ask-scripts (SMS/email/receipt). Cut: review monitoring/alerts (needs polling infra), SMS sending (costs money), multi-location dashboards (enterprise job). Free tier: full generator with "Made with Askstead" credit line on printables; license removes it.

### D2-006 — Google review link input
The kit asks the owner to paste their Google review link (Business Profile → "Ask for reviews" short link), with instructions — rather than automating Place ID lookup (needs a Google API key with billing → violates no-spend). 80% solution, logged.

### D2-007 — Pricing review (post-run, owner prompt: "do what you think is best")
Re-examined pricing against anchors. $49 kit held. Gap found and fixed: the GTM's agency 5-kit bundle had no price — set at **$149** (~$30/kit, 39% off singles; deep enough to move consultants, shallow enough to keep single-kit value credible). Added to BUSINESS.md, GTM.md, and the website pricing section (render-verified on the local server).

### D2-008 — LinkedIn channel + 7-day conversion campaign (owner directives, 2026-07-10)
Owner directed LinkedIn as a marketing priority, then set a goal of 7 days of posts optimized for 2-week profit. Fit decision: LinkedIn reaches advisors/agencies, not main-street owners — so the campaign's profit engine is the $149 Agency Bundle, with owner-side $49 licenses arriving via advisor reshares. Delivered `linkedin/7-day-campaign.md` (posts, reshare-bait compliance post as centerpiece, advisor DM scripts, harvest week, $850–$1,900 target labeled target-not-forecast). Same no-invented-numbers rule as Hourstead's campaign.

### D2-009 — Post-mortem fix shipped: offline QR encoder (1.1, 2026-07-10)
Post-mortem's product defect (network dependency at generation time) fixed: built-in QR encoder (byte mode, ECC M, V1–10; GF(256) Reed-Solomon, alignment/version-info/format placement, mask 0), API demoted to fallback for >213-byte links. First verification pass failed on all payloads — root-caused to two real bugs (alignment patterns wrongly skipped on the timing row/col; RS generator built lowest-first but divided highest-first). After fixes: 5/5 payloads (V2–V10) decode exactly via independent decoder; 10-assertion app regression green including decode of a real kit's embedded QR. App synced to 05-website/app; docs updated.

### D2-010 — License file added (owner catch, 2026-07-10)
Same gap as Product 1: paid licenses sold, no license text. Shipped `license.txt` with Askstead-specific terms: per-business Kit License, Agency Bundle as five per-client licenses, generated kits explicitly owned by the user forever, a compliance clause binding licensees not to modify assets into review-gating or incentivized solicitation, and disclosure of the single fallback API call. Flagged for counsel review before launch.

### D2-011 — License-enforcement gap made explicit (owner challenge, 2026-07-10)
Same resolution as Product 1's D-013: the license check is a trust-based formality, not a technical barrier, and this caps the LinkedIn campaign's achievable profit by an unmeasured amount. Made explicit in 07-proof/PROOF.md's bear case and cross-referenced from linkedin/7-day-campaign.md. No unprompted technical hardening added — it would contradict the offline, no-server brand promise Askstead just earned in its own 1.1 release.

## Timeline
- **T+0** — Folder scaffolded. Broad sweep: QR menus, Eventbrite, galleries, Podium.
- **T+1** — Podium vein confirmed: BBB primary complaints fetched (5 verbatim, newest 17 days old); Podium's own page verifies hidden pricing; compliance rules (Google/FTC) verified; BrightLocal 2026 stats fetched.
- **T+2** — QR generate→decode pipeline proven with real API calls. askstead.com available on 6th RDAP check.
- **T+3** — Business + brand docs, logo.
- **T+4** — Product built and browser-verified.
- **T+5** — Website built and verified. GTM, proof memo, README. Done.

## Guardrail compliance
1. No spending — free keyless APIs only (HN Algolia not needed this run; qrserver, RDAP, public pages). Domains checked, not bought.
2. Nothing published — all local; servers on localhost only.
3. Nothing invented — EVIDENCE.md carries fetched URLs; blocked fetches (Trustpilot, cardpaymentoptions 403) explicitly downgraded to corroborating-unverified.
4. All artifacts in `Downloads/Product/Product 2/`. ✅
5. Zero questions asked; 7 self-answered decisions logged.
