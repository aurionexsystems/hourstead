# Why Hourstead Works — The Proof Memo

## The argument, in five steps

1. **The pain is real and current.** Harvest's own pricing page (fetched 2026-07-10) confirms usage-based fees on invoices, projects, clients, and tasks on top of per-seat pricing. Six distinct HN users in a Jan 2026 thread describe distrust, active switching, or building their own replacement. Two independent competitor analyses document renewal shock. This is not a hypothesis — it is on the vendor's own website.

2. **The pain is durable, not a news blip.** The acquirer's playbook (price hikes + layoffs across Evernote, WeTransfer, Meetup, Vimeo, Filmic — TechCrunch, 2026-07-05) is now backed by public-market obligations after a >$25B Nasdaq IPO *this month*. The pressure that creates refugees is structural and increasing.

3. **The market is unserved on the exact axis of the pain.** Every incumbent answer is either another subscription (Toggl, Clockify, FreshBooks) or a server to operate (Solidtime). The pain is *dependence*; the alternatives all reproduce it in milder form. One HN user's stated plan was "roll my own version" — the market's supply gap, stated by the demand side. Hourstead is the only shape of product that eliminates the dependency rather than discounting it: no server, no account, data as a portable file, one-time license.

4. **The product exists and works.** Not a mockup: a scripted end-to-end test on 2026-07-10 verified client cap, timer, invoice math ($420 subtotal / $42 tax / $462 total), billed-state transitions, license validation and unlock, and export integrity, with zero console errors. Marketing site built and verified serving the app. Total marginal cost to operate: ~a domain name.

5. **The economics cannot lose big.** Fixed costs ≈ $10/yr (domain). Break-even ≈ one license sale. Every distribution channel in the GTM is free (HN, communities, SEO). The downside is bounded at "nobody buys it"; the upside at a healthy indie income; the expected information value of launch (does anti-subscription positioning convert?) costs almost nothing to obtain. This asymmetry is the strongest single reason to take it to market this month.

## What's verified vs. inferred

**Verified (fetched URLs, 2026-07-10):**
- Harvest pricing + usage fees — getharvest.com/pricing
- Toggl, Clockify pricing — vendors' pages
- 6 primary user complaints/switching signals — HN via hn.algolia.com API (comment IDs in [../01-research/EVIDENCE.md](../01-research/EVIDENCE.md))
- Bending Spoons playbook, portfolio, IPO — techcrunch.com (2026-07-05)
- Renewal-shock examples — trackingtime.co, operating.app (secondhand; flagged directional)
- Solidtime's positioning (server-based OSS) — solidtime.io
- US freelancer market scale — demandsage.com (broad definition; used as ceiling only)
- hourstead.com available — Verisign RDAP 404

**Inferred (labeled as such throughout):**
- That the Bending Spoons pattern continues post-IPO (motivated by structure, not proven)
- SAM sizing and all conversion/revenue numbers (sketches with stated assumptions, not forecasts)
- That "roll my own" sentiment generalizes beyond the quoted individuals

**Could not verify (said so):**
- Contents of the r/HarvestApp Reddit thread (Reddit blocks fetching; existence confirmed via HN API pointer)
- Exact prevalence of renewal shock (vendor doesn't publish; examples are self-reported outliers)

## The honest bear case
- Demand for *escape* may exceed demand for *this escape*: refugees might just pick Clockify's $5.49 tier and move on. Counter: those users were reachable anyway at near-zero cost; the positioning targets the trust-sensitive minority, which is small but loyal and vocal.
- No recurring revenue means the business plateaus. True — by design. It's a profitable indie product, not a venture story. The master prompt asked for a company that *works*, and this one works at a scale one person can own.
- localStorage is a fragile primary store (browser data clearing loses un-exported work). **Fixed in 1.1:** File System Access API auto-save to a real file on disk, verified working — see [04-product/README.md](../04-product/README.md).
- **License enforcement is a formality, not a barrier — this caps achievable revenue by an unknown amount.** `licensed()` is ~7 lines of unobfuscated client-side JS: a regex shape check plus a mod-97 checksum, readable and reproducible by anyone who opens dev tools (demonstrated in this run: a valid key was hand-derived from the release name in under a minute). There is no server, no key registry, nothing to revoke. This is a deliberate trade-off, not an oversight — technical protection (server validation, obfuscation) would contradict the core promise ("read the source, own the file, no server required"), so it was rejected on brand-coherence grounds, not evaluated and dismissed on revenue grounds. The mitigating argument: the population able to trivially bypass a client-side checksum overlaps poorly with the population willing to pay $79 for convenience — for the actual buyer, pasting a paid-for key is less friction than finding and maintaining a crack. But this is reasoning by analogy to how unprotected indie licensing has historically performed elsewhere (e.g., Sublime Text's famously bypassable but long-commercially-successful license check), **not a claim verified for Hourstead specifically** — nothing has launched, so real conversion-vs-leakage data doesn't exist yet. Net effect: any revenue projection or GTM target should be read as an upper bound gated by unmeasured piracy, not a number the license mechanism guarantees.

## Definition of done — checklist
- [x] Real, painful, underserved problem, evidenced from the open internet with fetched URLs
- [x] Business designed around it (model, ICP, pricing, competition, kill criteria)
- [x] Product built and verified working
- [x] Brand built (name, domain checked not bought, logo, voice)
- [x] Website built and verified serving the product
- [x] GTM plan with 30-day calendar
- [x] Proof of why it works, with verified/inferred/unverified ledger
- [x] Zero spend · zero publishing · zero questions asked · all artifacts in Downloads/Product/

## What "market-ready" does and does not mean here
Two things are true and worth separating, surfaced only after being pressed on it — should have been stated this plainly from the start:

1. **No live checkout exists for either product.** There is no Lemon Squeezy product, no payment page, no automated key delivery — only a plan describing one (GTM.md). This is not an oversight; guardrail 1 ("no signups that require payment info, no new paid services") structurally forbids me from creating one. So "a finished package I could take to market this month" means *everything buildable without spending money or opening an account* — it does not mean "already able to receive a payment." The remaining step (connect a payment processor) is real work, on the order of an afternoon, that only the human owner can legally/financially do.
2. **Even once a checkout exists, the license itself doesn't enforce payment.** See "The honest bear case" above — `licensed()` is an unobfuscated client-side checksum, bypassable by anyone who opens dev tools. This is a deliberate brand-coherence trade-off, not a bug, but it means projected revenue is an upper bound, not a guarantee, independent of gap 1.

Neither gap means the package is worthless or the work is undone — the evidence, product, brand, website, and plan are all real and verified. It means "sellable this month" should be read precisely as "buildable-without-spending is done; the two steps that require spending money or accepting some leakage are the owner's, by design of the guardrails," not as "money could change hands today."
