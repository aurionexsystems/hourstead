# Evidence Dossier — The Problem (Run #2)

**Thesis:** Local service businesses (dentists, contractors, salons, repair shops, restaurants) live and die by Google reviews — 97% of consumers read local reviews — but the dominant "get more reviews" tools are $300–600/month platforms with opaque pricing, binding annual contracts, and a documented pattern of billing customers after cancellation. The actual job ("ask happy customers to leave a Google review") needs a QR card, a link, and a script — not a platform. Nobody credibly sells that as a one-time purchase.

Every claim traces to a URL fetched during this run on 2026-07-10. Inference is labeled.

---

## 1. The job matters — market stats (verified)

BrightLocal Local Consumer Review Survey 2026 (fetched): https://www.brightlocal.com/research/local-consumer-review-survey/
- **97% of consumers read reviews** for local businesses; 41% "always" read them (up from 29% in 2025).
- **71% use Google for reviews** — the dominant platform.
- **85% become more likely to use a business** after positive reviews; 77% deterred by negative ones.
- Notable gap stat: only **35% of small-to-medium businesses have an active Google Business Profile**.
- 93% have made a purchase following reviews; 27% spent over $1,000.

## 2. The incumbent squeeze (verified)

- **Podium pricing starts at $399/month with binding annual contracts** — reviewsense.ai analysis (fetched): https://www.reviewsense.ai/blog/podium-alternative-small-business-2026. Quoted SMB experiences from that source: cancellation "like trying to cancel a gym membership with penalty charges" (Manchester retailer); "We're paying for premium features but only use basic review tracking" (Leeds restaurant owner).
- **Podium's own pricing page hides prices entirely** (fetched 2026-07-10): https://www.podium.com/pricing/ — "talk to our sales team for details." No numbers published. (Opaque pricing verified first-hand.)

## 3. Primary complaints — BBB, fetched directly (verified, dated, verbatim)

Source: https://www.bbb.org/us/ut/lehi/profile/computer-software-developers/podium-1166-90023083/complaints — **65 complaints in the last 3 years, 23 closed in the last 12 months; not BBB accredited.** Excerpts:
- **2026-06-23:** "Our dealership has been cancelled with this company for a couple of months but yet the company still sends us bills for services we are not receiving."
- **2026-05-15:** "Despite this, Podium charged $998.47 on May 8, 2026... Podium has not responded substantively."
- **2026-05-11:** "This was in Dec 2025, we have sent multiple cancellation notices to at least 3 different people at this company and every month they are sending more and more $600 charges."
- **2026-01-24:** "I stopped using the system over six months ago because it provided no usable value. Podium failed to deliver a working product yet continues billing."
- **2026-01-24:** "I have requested documentation of the contract, billing authorization, and proof of usage. Podium has not resolved the issue and continues collection pressure."

Freshness: the newest complaint is **17 days old** at time of research.

Could not fetch (noted per guardrail): Trustpilot (403; search results report 307 reviews) and cardpaymentoptions.com (403; search results report "over a dozen online complaints" of post-cancellation charging). Treated as corroborating-but-unverified.

## 4. The rules of the game (verified — this shapes the product)

- **Google's policy:** businesses may ask for reviews — "a sign in your window with a QR code" is explicitly fine — but **review gating** (selectively soliciting happy customers / pre-screening before showing the Google link) **is prohibited**; Google blocked/removed 292M policy-violating reviews in 2025. Sources (search-verified 2026-07-10, policy hub at https://support.google.com/contributionpolicy/answer/7400114): summarized across https://www.soci.ai/knowledge-articles/review-gating/ and https://www.reviewtrackers.com/blog/google-review-policy/.
- **FTC Consumer Reviews and Testimonials Rule** (effective 2024-10-21): bans buying reviews, incentivized sentiment-conditioned reviews, and review-suppression practices; **first enforcement warning letters issued 2025-12-22**. Sources: https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers and https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials (both surfaced and quoted via search 2026-07-10).
- Product consequence: the kit must be **compliance-first** — every customer sees both "review us publicly" and "tell us privately," no gating, no incentives, and that becomes the differentiator against a category with a gating-shaped past.

## 5. Rejected candidate veins this run (logged)

- **Eventbrite fee flight** (verified pain: 3.7% + $1.79/ticket + 2.9% processing, no cap; organizers with $50k sales pay $3.5–4k — tixfox.co/simpletix.com analyses): rejected because a credible ticketing product needs payment infrastructure — unbuildable under the no-spend guardrail.
- **QR menu subscriptions** (pricing verified $10–$500/mo ranges via call-the-service.com, menutiger.com): rejected — could not locate primary owner complaints; pain unverified at the required bar.
- **Photographer gallery platforms** (Pixieset/Pic-Time pricing verified via picflow.com etc.): complaints are feature-level, not existential; pain too mild.

## 6. Technical feasibility spike (verified by doing)

QR pipeline proven 2026-07-10: `api.qrserver.com/v1/create-qr-code` (free, keyless) generated a PNG for `https://g.page/r/test123/review`; the PNG was downloaded and decoded via multipart upload to `api.qrserver.com/v1/read-qr-code` returning exactly the input URL (`margin=20` required for a reliable quiet zone). Kit outputs can embed the PNG as a data URI, so printed assets are self-contained.

## 7. Bar check

- 3+ independent sources of the same complaint: BBB (primary, 5 dated excerpts), reviewsense.ai (quoted SMBs), Podium's own hidden pricing page, search-corroborated Trustpilot/cardpaymentoptions. ✅
- Willingness to pay: complainants were paying $399–$998/month for the job. ✅ (Inference, labeled: some of that spend is for SMS/AI features; the review-ask core is the hook, not the whole platform.)
