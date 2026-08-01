# Post-Mortem — Product 3: Jobfold (external audit)

**Audit date:** 2026-07-10 · **Auditor's position:** Jobfold was built by a *separate session* — this post-mortem is a review of finished work plus a live verification pass, not a builder's retrospective. Products 1 (Hourstead) and 2 (Askstead) were built in this session; Jobfold appeared in `Product 3/` afterward, following the same phase structure.

## What it is
A local-first change-order builder for small residential contractors: describe the added work, price it (labor + materials + markup %), record schedule impact, attach photos, capture a drawn acknowledgment, print to PDF, download a JSON backup. Offer: free demo, $79 Founding License, $199 five-user Office Pack (hypothesis).

## Verification performed today (live, this session)
- Served `04-product/jobfold.html` locally and exercised it in Chromium:
  - Renders complete with a sensible prefilled example; **zero console errors/warnings**.
  - **Math verified:** labor 680 + materials 120 + 15% markup → $920.00 shown; changing labor to 1000 live-recalculated to $1,288.00 (correct: 1120 × 1.15).
  - **Save draft** persists to localStorage (key `jobfold`); signature canvas present with working 2D context; print and backup buttons present.
- Read all eight package documents in full.

## What the build did well
1. **Evidence honesty is exemplary — arguably the best of the three products.** The dossier separates "one individual account, not a market-size statistic" from supported claims, and its ledger explicitly lists "$79 is what the market will pay — hypothesis; unverified" and "Jobfold prevents disputes — not claimed." The proof memo's "what is not proven" section is longer than its claims section. This is the master prompt's guardrail 3 done properly.
2. **The legal boundary is handled with real discipline.** The app's own UI carries the disclaimer ("documents approval; does not give legal advice or guarantee enforceability"), the brand guide bans enforceability language, and no source is stretched to imply signature validity. For a product adjacent to contracts, this was the biggest trap, and it was avoided.
3. **Tight scope with reasons.** The cut list (e-signing, payments, sync, GPS) maps each cut to the constraint that forced it. The "why not the chargeback-evidence vault" decision shows an alternative was researched and consciously deferred.
4. **Good kill criteria.** "After 100 qualified opens, pause the paid offer if <10 print/export" tests the *workflow*, not vanity metrics — and the instruction to "interview the workflow, not the branding" is the right failure diagnosis.

## Gaps and concerns (ranked)
1. **The Reddit citations cannot be re-verified from this environment.** All three pain sources are reddit.com URLs; every Reddit fetch attempted in this session's runs was blocked. Either the building session could fetch Reddit, or the citations weren't fetched as claimed — this audit cannot distinguish. **Recommended before any launch: re-verify the three threads exist and say what the dossier says** (they carry the entire pain case; the HoneyBook/Bonsai sources only establish the alternative category).
2. **Pricing exists on paper but not in the product.** Unlike Hourstead/Askstead, the app has no license mechanism, gate, or free-tier differentiator — nothing in the artifact distinguishes the $0 demo from the $79 license. The GTM's proof target ("five paid licenses") therefore can't be executed with the shipped artifact. Smallest fix: adopt the sibling products' checksum-key pattern with some visible licensed benefit (e.g., remove a "DEMO" watermark from the printed order).
3. **Evidence base is thinner than its siblings.** Three qualitative threads + two vendor help pages, no BBB/HN-grade primary complaints about the *incumbent tools*, no market stat. The dossier is honest about this — but honesty about thin evidence doesn't thicken it. The chargeback-vault research mentioned in the build log isn't in the package; if it was strong, it should be preserved.
4. **No domain or name check at all** (the brand guide says so openly). Ten minutes of RDAP checks would close it. Also absent: the LinkedIn channel directive and 7-day campaign the owner applied to Products 1–2 — Product 3 predates or ignored those instructions and should be brought into line.
5. **Backup/photo caveat is vague:** "photos where supported by your browser" hedges where the sibling products specify. Worth testing photo round-trip explicitly and stating the result.

## Comparative note (portfolio view)
Jobfold fits the stead-family thesis (local-first, one-time price, ownership) without using the family branding — reasonable, since the name/brand isn't cleared. Its distinctive contribution to the portfolio is the *dispute-prevention moment* wedge: closer to real money-pain than time tracking, further from verified incumbent-rage than either sibling. Strongest docs, thinnest evidence, least finished monetization — in that order.

## Audit follow-up (2026-07-10)
A `license.txt` was added to this package during the portfolio-wide license fix (owner catch: all three products sold licenses with no license text). Terms were drawn from Jobfold's own BUSINESS.md ($79 Founding License, $199 Office Pack) with its not-legal-advice posture made the license's loudest clause; the file notes explicitly that the current build does not yet enforce licensing in-product. Gap #2 (no in-app license mechanism) otherwise remains open.

## Verdict
Ship-adjacent, not ship-ready. The product works (verified today) and the documentation discipline is the portfolio's best. Before market: (1) re-verify or replace the Reddit evidence, (2) implement the license in-product, (3) run the RDAP name check, (4) add the LinkedIn/campaign layer the owner mandated portfolio-wide.
