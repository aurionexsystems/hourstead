# Why Askstead Works — The Proof Memo

## The argument, in five steps

1. **The job is proven valuable.** 97% of consumers read local-business reviews; 71% check Google; 85% are more likely to choose after positive reviews (BrightLocal 2026, fetched). Businesses demonstrably pay $399+/month to get reviews asked for (Podium's category — reviewsense.ai, fetched).

2. **The incumbent solution actively hurts its buyers.** Verified first-hand: Podium's own pricing page publishes no prices ("talk to sales"). Verified primary: 65 BBB complaints in 3 years, with dated excerpts from May–June 2026 of businesses billed $600–$998/month *after cancelling*. The category's pricing power rests on owners not realizing the core job is a QR code, a link, and an honest ask.

3. **The unbundled product is buildable and built.** The review-ask core needs zero infrastructure: Askstead generates print-ready assets and a compliant feedback page locally in the browser. Working today, verified: 14/14 scripted assertions green, and the exact QR bytes the app embeds were decoded by an independent endpoint back to the exact review URL. Printed cards will scan.

4. **Regulation is a tailwind, not a risk.** Google bans review gating; the FTC's reviews rule took effect Oct 2024 with first enforcement letters Dec 2025 (both verified). Askstead is compliant by construction — both feedback doors shown to everyone, no incentives — which converts every future enforcement headline into free positioning against gating-era incumbents.

5. **The economics cannot lose big.** Fixed costs ≈ one domain. Break-even ≈ one $49 license. All launch channels are free (SEO, YouTube, communities, agency word-of-mouth). Downside bounded at "nobody buys"; information value of the launch is nearly free. Same asymmetry that justified Hourstead — this is a portfolio of cheap, real options.

## Verified vs. inferred

**Verified (fetched 2026-07-10):**
- BrightLocal 2026 consumer stats — brightlocal.com
- Podium hidden pricing — podium.com/pricing (first-hand)
- BBB: 65 complaints, 5 dated verbatim excerpts — bbb.org (primary)
- Podium $399/mo + annual contracts + SMB quotes — reviewsense.ai
- Google gating ban & FTC rule/enforcement dates — support.google.com policy hub via soci.ai / reviewtrackers.com; ftc.gov (rule Q&A + press release), surfaced via search
- QR pipeline — proven by execution (generate → decode round-trip, twice: spike + app-embedded bytes)
- askstead.com available — Verisign RDAP 404

**Inferred (labeled):**
- That a meaningful share of the "wants reviews, won't rent a platform" ring will pay $49 for packaging + compliance (the core conversion bet; kill criteria set)
- That incumbents won't publish a $49 tier (their sales-motion economics argue against it)
- Agency channel behavior (plausible, untested)

**Could not verify (said so):**
- Trustpilot review contents (403; count of 307 reviews known only from search results)
- cardpaymentoptions.com complaint aggregation (403)
- Podium's exact current list price beyond "starting $399/mo" (vendor hides it — that opacity is itself the verified fact)

## The honest bear case
- **The free-DIY ceiling:** a QR generator is free and a canny owner can DIY the whole kit. Counter: the buyer isn't buying the QR — she's buying done-and-correct in 10 minutes. Etsy sellers profitably sell *static review card templates* at similar prices with none of the compliance or generation features (inference from category logic, unverified — flagged).
- **Single-product plateau:** $49 × small volume is beer money, not a business. Counter: it's one house in the stead family; the studio thesis (own-it-outright tools for independents) amortizes brand, site patterns, and audience across products — Hourstead and Askstead already share a house style, a license mechanism, and a GTM mechanic.
- **QR API dependency:** **Fixed in 1.1** — built-in offline QR encoder ships; the API is now fallback-only for unusually long links. See [04-product/README.md](../04-product/README.md).
- **License enforcement is a formality, not a barrier — this caps achievable revenue by an unknown amount.** The Kit License check (`licensed()`) is the same pattern as Hourstead's: an unobfuscated client-side regex + mod-97 checksum, with no server, no key registry, nothing to revoke. Anyone who opens dev tools can read it and either bypass it or hand-derive a valid key. This is deliberate — server-side validation would mean the generator needs to phone home, which contradicts "runs in your browser, we never see your business" (now also true offline, post-1.1) — but it means the credit line and the $49/$149 gates are trust-based, not technically enforced. The mitigating argument (buyers vs. crackers are largely different populations, especially for a non-technical local-business owner) is reasoning by analogy, not data — Askstead hasn't launched, so real leakage is unmeasured. Any revenue target in GTM.md or the LinkedIn campaign is an upper bound gated by this, not a guarantee.

## Definition of done — checklist
- [x] Real, painful, underserved problem — primary BBB complaints ≤17 days old, fetched
- [x] Business designed (ICP, model, $49 pricing, competitor table, kill criteria)
- [x] Product built and verified (14/14 assertions; QR decode round-trip proven)
- [x] Brand (Askstead; askstead.com RDAP-available; logo; voice)
- [x] Website built, verified serving the generator
- [x] GTM with 30-day calendar and channels matched to a non-HN audience
- [x] Proof memo with verified/inferred/unverified ledger
- [x] Zero spend · zero publishing · zero questions · all artifacts in Downloads/Product/Product 2/

## What "market-ready" does and does not mean here
Same two caveats as Hourstead's proof memo, restated for this product: (1) **no live checkout exists** — no Lemon Squeezy product, no payment page, no key delivery; only GTM.md's plan for one. Guardrail 1 forbids me from opening a paid account, so this is a structural boundary, not an oversight — connecting a payment processor is the owner's remaining step. (2) **the license check itself doesn't enforce payment** even once a checkout exists (see the bear case above). Revenue figures in GTM.md and linkedin/7-day-campaign.md are upper bounds contingent on both gaps being closed, not guarantees.
