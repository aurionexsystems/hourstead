# Post-Mortem — Product 2: Askstead

**Run date:** 2026-07-10 · **Status at write-up:** definition of done met; package complete, product verified; post-run additions (Agency Bundle $149, LinkedIn channel + 7-day campaign) applied.

## What we set out to do
Re-execute the master prompt for a second company in a *different* market, same guardrails, working inside `Product 2/`.

## Outcome
Askstead: a browser-local generator producing a six-piece Google-review ask kit (printables + compliant feedback page + scripts), $49 once, $149 agency bundle. 14/14 product assertions passed; the exact QR bytes the app embeds were independently decoded back to the input URL. askstead.com RDAP-verified available.

## What went well
1. **Fast, honest vein rejection.** Four candidate markets probed; three rejected with reasons logged (Eventbrite: unbuildable under no-spend; QR menus: pain unverifiable; galleries: pain too mild). The discipline of writing down *why not* kept the run from anchoring on the first plausible idea.
2. **BBB as a primary source was a find.** Where run #1 leaned on HN, this run got dated, verbatim, 17-days-old complaints from a fetchable BBB page — arguably stronger evidence than run #1's, for an audience that isn't on HN at all.
3. **Compliance research changed the product, not just the copy.** Discovering the Google gating ban + FTC rule *before* designing meant the feedback page was built compliant (both doors, always) instead of retrofitted — and produced the campaign's best marketing asset (the reshare-bait compliance post).
4. **Verify-before-build on the risky dependency.** The QR generate→decode round-trip was proven with real API calls *before* a line of product code depended on it — including discovering the quiet-zone (`margin`) requirement that would otherwise have shipped unscannable cards.
5. **Channel-audience honesty.** When the owner directed LinkedIn, the plan didn't pretend dentists are there; it pivoted the LinkedIn profit engine to the agency bundle. Matching the directive to reality beats obeying it literally.

## What went wrong / friction
1. **Two 403s (Trustpilot, cardpaymentoptions)** forced downgrading known-rich complaint sources to "corroborating, unverified." The BBB carried the evidentiary load alone. Fallback source lists (run #1's lesson) would have helped; the lesson repeated because it wasn't yet written down anywhere durable.
2. **zxing.org decode failed silently** (server-side fetch blocked → "Bad Image"), initially reading like a QR-quality problem. ~3 tool calls burned before rerouting to multipart upload against qrserver's read endpoint. Lesson: when a verification tool fails, first distinguish "artifact is bad" from "verifier can't see the artifact."
3. **The QR API is a single online dependency** at generation time. Acceptable for 1.0 (printed outputs have zero runtime dependency), but the offline encoder belongs in 1.1 and the product copy had to spend words explaining the one-time-online requirement.
4. **Naming took 6 RDAP checks** despite run #1's lesson arriving mid-run (batching started only after the first three misses).

## Surprises
- Podium hiding prices behind "talk to sales" was verified *first-hand* on their own page — opaque pricing turned out to be a checkable fact, not just a complaint theme, and became a website comparison-table row.
- The kit concept got *stronger* when the funnel page was forced compliant: "both doors open to everyone" reads as integrity, not legal hedging. Constraint improved the product's character.

## Open risks going to market
- **The DIY ceiling is the core bet:** a free QR code is genuinely adequate for some buyers. The $49 sells done-and-correct; conversion data is the only referee (kill criteria: 30 licenses or 3 bundles / 90 days).
- Agency channel behavior is inferred, not tested; it's also the LinkedIn profit engine — a double dependency on one unproven channel.
- Etsy template sellers are a real low-price flank noted in the proof memo's bear case; unverified prevalence.

## Fix addendum (same day)
Item 3 (QR API dependency) **fixed in 1.1**: built-in offline QR encoder shipped; API now fallback-only for over-long links — see D2-009 in the build log. Fittingly, the fix itself validated this post-mortem's lesson #2: the encoder's first verification pass failed on every payload, and the failures were real bugs (alignment-pattern skip, Reed-Solomon convention mismatch) caught precisely because the decode-API verification loop existed. Items 1, 2, 4 are process lessons, not artifacts.

## Do differently next time
1. Maintain a standing "fallback sources per claim type" list (review sites → BBB, complaints → BBB/HN/status pages) — this run's 403 scramble was run #1's Reddit scramble wearing a different hat.
2. When a third-party verifier errors, verify the verifier before touching the artifact.
3. Batch name candidates from the first check (now written down twice; do it).
