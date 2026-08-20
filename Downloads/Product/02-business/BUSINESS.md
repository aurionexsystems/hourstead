# Business design — Eavefile

**Decision date:** 2026-08-20. Every market fact is in `01-research/EVIDENCE.md`. Preferences that are not facts are marked **inference**.

---

## One sentence

A $49 one-time, local-first case file that turns an aerial-imagery insurance notice into a printable packet: demand the photo, attach ground-truth exhibits, cite a sourced state card, and file (or threaten to file) with the department of insurance.

## Why this and not the other live problems

| Candidate | Verdict |
|---|---|
| Freelancer time + invoices | Already shipped in this repo as Hourstead. Not a new company. |
| Claude / ChatGPT usage-drain bugs (Aug 2026) | Real (GitHub #72680). We cannot refund or reset a vendor ledger. |
| Google AI Overviews smearing small businesses (Business Insider, Aug 2026) | Hotter headline. Closed loop is “report to Google and wait.” Weaker than a 30–120 day statutory clock. |
| Subscription-cancel hell | Crowded; FTC click-to-cancel stalled. Not underserved. |
| **Aerial-imagery HO nonrenewals** | **Won.** Named homeowners this year. Regulator count published **Aug. 5, 2026**. Carrier-written shopping list for the packet. No dedicated local product. |

**Q we answered for ourselves:** *Is this just “Hourstead for insurance”?*  
**A:** Same architecture (one HTML file, one-time license, no server) because the guardrails and the trust problem are the same — you do not want the company that holds your appeal file to be another subscription that can non-renew *you*. The ICP, the deadline, the letters, and the state law table are a different business.

## ICP

**Primary (panic):** A U.S. homeowner who received a condition letter or nonrenewal in the last 14 days, suspects or was told aerial/drone/satellite imagery was used, and has a coverage-end date on the page.

**Secondary (prevention):** Same homeowner, ~60 days before renewal, walking the lot the way NerdWallet’s sources say to (Heller: shop quotes ~2 months out; Hixson: maintain roof/trees/debris).

**Not the ICP:** Carriers exiting a ZIP entirely (photos will not change a market withdrawal). People who need a new policy more than an appeal — we tell them to shop the same day (Hixson).

## Job to be done

When the letter arrives I am “just kind of stuck” (Bennett) and they “need certain kind of paperwork.” I need that paperwork assembled tonight, with my state’s notice rules attached, without creating an account that becomes another vendor.

## Offer

| Tier | What | Price |
|---|---|---|
| Walk the lot | Sourced flag checklist | $0 forever |
| Free case | 1 property, 5 exhibits, watermarked letters | $0 |
| **Founding License** | Unlimited cases, no watermark, no exhibit cap, export | **$49 once** |

**Why $49, not $79 (Hourstead) or $29:** **Inference.** Panic SKU; lower than a single roofer trip; high enough to signal “this is the real packet.” No WTP survey exists. Pre-committed levers if 90-day data is thin: (1) drop to $29, (2) add a $9 single-case key, (3) raise free exhibit cap so the watermark is the only paywall.

**Why one-time:** The customer is already being rented by a carrier. Selling them another subscription to fight the first one is off-brand and indefensible against the evidence. Cost of goods after the file is written ≈ $0.

## Unit economics (inference, bounded)

- COGS: domain the owner buys later (~retail .com; we did not buy). No hosting required if they open the HTML. Optional static host (Cloudflare Pages / GitHub Pages) is free.
- Break-even: **one** paid license after the domain.
- Support: email later (not stood up; guardrail). In-app disclaimer is the support model for v1.
- Refunds: honor-system key. Pirates were never going to be the ICP.

## Why a local file is the product, not a compromise

1. The packet contains policy numbers, addresses, and photos of a house. A server we cannot afford to harden is a liability.
2. Bennett’s fear was a remote process she did not consent to. Asking her to upload the roof to *our* cloud is tone-deaf.
3. Guardrails forbade paid APIs and accounts. The architecture that fits the rules also fits the pitch.

## Competition and positioning

We do not compete with United Policyholders; we link people to them. We do not compete with agents. We compete with **the blank weekend** after the letter — Word, panic, and a roofer’s blog. Copilotly’s cloud letter-drafter is the closest software; we differentiate on (a) no upload, (b) sourced state cards with URLs, (c) evidence locker + full packet, (d) one-time price.

## Channels (see GTM)

The NAIC report is **15 days old** as of this run. That is the news hook. Secondary: hurricane-season anxiety; ABC7-style local-TV consumer desks (we do not contact them in this run). Tertiary: SEO for queries that already exist (“aerial imagery home insurance non-renewal”).

## Risks we accept

| Risk | What we know | Mitigation |
|---|---|---|
| Thin moat | A competent dev copies the HTML in a week | Brand + sourced cards + being first with this exact object. Stated in PROOF. |
| Market-exit nonrenewals | NAIC does not split causes | Homepage and app say so. Shop in parallel. |
| License is honor-system | Same as Hourstead | Intentional. No server. |
| No checkout | Guardrail | Owner’s job; documented. |
| Wrong-state legal advice | Real malpractice risk | Cards are quotations/summaries with dates; “not legal advice”; unverified states get NAIC directory only. |

## Kill criteria (pre-committed)

If the owner launches with a real checkout: **fewer than 25 Founding Licenses in 90 days** and no inbound “this saved my renewal” note → kill or rebuild around agents (B2B packet-for-brokers), not consumers. Do not quietly raise the price to hide a dead offer.
