# Askstead — Business Design

*All market claims trace to [../01-research/EVIDENCE.md](../01-research/EVIDENCE.md). Inferences labeled.*

## One-liner
**Askstead turns your happy customers into Google reviews — with a printed kit you buy once, not a platform you rent forever.**

## The problem (verified)
97% of consumers read reviews for local businesses; 71% check Google (BrightLocal 2026). The tools sold to solve this are $399+/month platforms with hidden pricing (Podium's own page: "talk to sales"), binding annual contracts, and 65 BBB complaints in 3 years — including businesses billed $600–$998/month *after cancelling* (BBB excerpts dated May–June 2026). A dentist doesn't need an "AI Employee." She needs customers to actually tap a link at the moment they're happiest.

## The customer (ICP)
1. **Primary — the main-street operator.** Dentist, plumber, salon owner, auto shop, restaurant. 1–3 locations, no marketing staff, already knows reviews drive their Google ranking. Has either been burned by a Podium-class contract or been scared off by the sales call.
2. **Secondary — the agency/consultant.** Local-SEO freelancers who set up review funnels for many small clients and would rather pay once per kit than resell a subscription. (Also a distribution channel.)

Sizing (inference, labeled): the incumbent category prices at $4,800+/yr per location, so even microscopic share of "businesses that want reviews but not a platform" clears an indie bar. The verified stat that only 35% of SMBs even maintain a Google Business Profile shows how far upstream of "platform-ready" most of this market is.

## The product
A single-file generator app (`askstead.html`, runs locally in the browser). The owner enters their business name, their Google review link, brand color, and a private-feedback email. It generates a complete **review-ask kit**:
- **Printables** (print-to-PDF, self-contained): counter card, fold-in-half table tent, 12-up sticker sheet, window poster — each with a scannable QR pointing at the Google review form.
- **Funnel page** (downloadable single HTML file, hostable anywhere free): shows *every* visitor both options — "Review us on Google" and "Tell the owner privately" — side by side. **No gating, by design.**
- **Ask scripts**: copy-paste SMS/email/receipt lines that follow Google's and the FTC's rules (no incentives, no sentiment-conditioning).

QR codes are fetched once from a free keyless API at generation time and embedded as data URIs (pipeline verified end-to-end: generated PNG decodes back to the exact URL).

## Compliance as moat (verified rules → design)
Google prohibits review gating; the FTC's Consumer Reviews Rule (effective Oct 2024, first warning letters Dec 2025) bans suppression and incentivized-sentiment reviews. Incumbents grew up in a gating-tolerant era; Askstead is compliance-first and says so on every asset. When enforcement makes news, Askstead's positioning strengthens automatically.

## Business model
- **Free:** full generator, all assets, with a small "Made with Askstead" credit line on printables and funnel footer.
- **Kit License — $49 one-time, per business:** removes the credit line, unlocks all four print formats and funnel color themes, includes 1.x updates.
- **Agency Bundle — $149 one-time, 5 kit licenses:** for local-SEO consultants setting up funnels for clients (~$30/kit keeps per-kit value meaningful while rewarding the multiplier channel; see GTM channel 2).
- Merchant of record: Lemon Squeezy (chosen, not purchased — no-spend guardrail). License key format implemented client-side (AS1-…, mod-97 checksum), honor-system by design.
- Costs ≈ domain (~$10/yr) + static hosting free tier. Break-even ≈ one license.

Comparison the buyer actually does:
| | Podium-class | Askstead |
|---|---|---|
| Price | $399+/mo, annual contract | $49 once |
| Cancellation | BBB complaint pattern | nothing to cancel |
| Pricing page | "talk to sales" | the price is on the page |
| Compliance | gating-era legacy | compliant by construction |
| What you get | platform + AI + SMS suite | the 20% that gets reviews |

Honest scope note (inference): Podium buyers who need SMS campaigns, webchat, and payments are not Askstead customers. Askstead serves the much larger ring of businesses that only need the ask.

## Kill criteria
90 days post-launch: **≥30 licenses (~$1.5k)** or ≥3 agency multi-kit buyers to continue investment; below that, keep free, stop pushing.

## Risks
- **"Free QR generators exist"** — true; they produce a naked QR, not a compliant funnel + print-ready branded kit + scripts. The $49 buys packaging, compliance, and not having to think. Watch conversion to validate.
- **Google changes review-link mechanics** — mitigated: kit regenerates in minutes; 1.x updates included.
- **API dependency for QR** — single point at generation time only; fallback plan (embed an offline encoder) is the top 1.1 item.
