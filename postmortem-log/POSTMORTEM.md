# Post-Mortem — Product 1: Hourstead

**Run date:** 2026-07-10 · **Status at write-up:** definition of done met; package complete, product verified working; post-run additions (pricing levers, LinkedIn channel + 7-day campaign) applied.

## What we set out to do
Build a complete company from open-internet evidence: real pain → business → brand → working product → website → GTM → proof, zero spend, nothing published, no questions asked.

## Outcome
Hourstead: local-first time tracking + invoicing in one HTML file, $79 one-time Founding License. 14/14 end-to-end product assertions passed (invoice math, client cap, license unlock, timer, export). hourstead.com RDAP-verified available. Full evidence chain with fetched URLs.

## What went well
1. **The evidence-first sequencing paid off.** Committing to "no claim without a fetched URL" before ideating forced the product thesis to emerge from the Harvest/Bending Spoons complaint stream rather than from a preconceived app idea. The strongest asset in the package — the vendor's own pricing page confirming per-invoice usage fees — was found because the bar demanded primary sources.
2. **Timing luck was caught, not just encountered.** The Bending Spoons IPO (July 2026, days before the run) turned a chronic complaint into an acute news cycle. The GTM is built around that window.
3. **The HN Algolia API was the workhorse.** When Reddit blocked all fetches, one free JSON API produced six named, dated, verbatim user complaints — the dossier's spine.
4. **Architecture as positioning.** "No server" isn't just cheap to build — it *is* the marketing claim (can't be rug-pulled). Product and pitch are the same fact, which made every downstream document easier to write honestly.
5. **Scripted browser verification.** Testing by assertion (not eyeballing) caught nothing this time — but produced a citable verification record that the proof memo could lean on.

## What went wrong / friction
1. **Reddit is unfetchable from this environment.** The single richest complaint source (r/HarvestApp thread) is cited as existence-only. Worked around via HN; acceptable, but the dossier is HN-skewed as a result.
2. **Domain squatting burned time.** Nine RDAP checks to find one available name. Lesson: generate 10+ candidates *before* checking, check in parallel batches of three, prefer invented compounds over dictionary pairs.
3. **Early search queries were too narrow.** The first two searches (long quoted phrases + year) returned nothing. Broad queries with one distinctive term worked immediately. ~10 minutes lost.
4. **localStorage as primary store is the product's weakest joint.** Mitigated by export nudges and the stead-file-as-canonical framing, but a browser data wipe before first export loses work. File System Access API auto-save is correctly the top 1.1 item — arguably it should have been in 1.0.
5. **Free tier may be too generous** (flagged in GTM, re-confirmed in pricing review): many solo freelancers run ≤3 active clients, so the cap may never trigger. The pre-committed lever order (cap → paid themes → price) now exists in BUSINESS.md, but this is the #1 conversion risk.

## Surprises
- The "roll my own version" HN comment — the demand side literally describing the supply gap — was the single most persuasive datum found all run.
- One-time pricing generated the least internal friction of any decision; the verified pain made subscription pricing indefensible on-brand, which shows how much easier decisions get when evidence, not preference, constrains them.

## Open risks going to market
- Thin technical moat (copyable in weeks) — the bet is positioning + trust, stated honestly in the proof memo.
- No willingness-to-pay data until launch; kill criteria (20 licenses / 90 days) is the test.
- LinkedIn channel is unproven for this ICP at $0 spend; targets in linkedin/7-day-campaign.md are labeled targets, not forecasts.

## Fix addendum (same day)
Item 4 (localStorage weakest joint) **fixed in 1.1**: File System Access API auto-save shipped, verified, synced to the website copy — see D-011 in the build log. Item 5 (free-tier generosity) deliberately left to the 90-day data per the pre-committed lever order. Items 1–3 are process lessons, not artifacts.

## Do differently next time
1. Batch domain candidates and check in parallel from the start.
2. Treat "one API worked around a blocked source" as a pattern: list fallback data sources per research vein before starting.
3. Consider shipping the top mitigations (auto-save) inside 1.0 when they defend the core promise, even at the cost of a day.
