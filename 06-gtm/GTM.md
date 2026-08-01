# Hourstead — Go-to-Market Plan (launch month: July 2026)

*Nothing here has been posted anywhere, per guardrail 2. This is the plan the owner executes.*

## Positioning
For hourly-billing freelancers burned by subscription tools, Hourstead is the time tracker + invoice maker you **own**: one file, one-time $79 license, no server to shut down and no renewal to reprice. Unlike Harvest/Toggl/Clockify (rent) and Solidtime (run your own server), Hourstead requires neither rent nor ops.

## Why launch now (verified timing)
Bending Spoons IPO'd on Nasdaq this month at >$25B (TechCrunch 2026-07-05, fetched — see [../01-research/EVIDENCE.md](../01-research/EVIDENCE.md)). Every news cycle about them re-opens the "should I leave Harvest/Evernote/WeTransfer" question. The refugee stream is warm *now*.

## Channels, in order

### 1. Show HN (week 1)
The single highest-leverage move. The evidence dossier's complaint thread is itself a 505-comment HN thread where users asked for exactly this ("If anybody has any good alternatives, I'm all ears" — burningChrome). Title: **"Show HN: Hourstead – time tracking and invoicing in one HTML file you own"**. HN reliably rewards single-file/local-first/anti-subscription builds. Prep: FAQ answers from the site, honest "what it doesn't do" comment posted first by the author.

### 2. Community threads where the pain lives (weeks 1–2)
- r/HarvestApp ("Purchase by Bending Spoons" thread is live), r/freelance, r/consulting, r/smallbusiness.
- Rule: participate as a named builder, disclose, lead with the free version. These communities convert on honesty and ban spam.

### 3. Comparison SEO (weeks 2–4, compounds forever)
Competitor blogs already rank for "Harvest alternatives" (operating.app, trackingtime.co — both fetched); the query volume is proven by their investment. Pages to ship:
- "Harvest alternative without a subscription" (anchor page — mirrors verified usage-fee facts, links to sources)
- "Time tracking apps you pay for once (2026)"
- "How to export your data from Harvest" (pure utility; captures leavers at the moment of exit)
- "The stead file format" (open-format docs as trust marketing)

### 4. Directories & lists (week 3+)
AlternativeTo (listed under Harvest/Toggl/Clockify alternatives), Product Hunt (after HN, not before — PH traffic converts worse but adds backlinks), privacytools/local-first software lists (audience is ideologically aligned).

### 5. LinkedIn — founder-led organic (weeks 1–4, then standing)
Owner directive (2026-07-10): LinkedIn is a priority marketing channel. It fits Hourstead's ICP directly — independent consultants and fractional professionals sell their services there, so tool talk reads as shop talk, not spam.
- **Motion:** founder posts from a personal profile (company pages get no organic reach; personal accounts of builders do). 2–3 posts/week, organic only during the zero-budget phase — no LinkedIn ads.
- **Post archetypes:** (a) build-in-public — "I sell software like a hammer: $79, yours" with the pricing-philosophy story; (b) the evidence story — what the Bending Spoons IPO means if your billing tool is in their portfolio (screenshots of the verified pricing mechanics, sourced); (c) practical — "your time log is your business record; here's how to make sure you can always walk away with it" (stead-file export as the hook); (d) launch/changelog moments.
- **Comment strategy:** the highest-leverage LinkedIn surface is other people's threads — freelance-finance creators and fractional-exec communities discussing tool costs. Useful comments, disclosure, no links unless asked.
- **Fit warning (honest):** LinkedIn rewards consistency over spikes; treat it as the compounding channel alongside SEO, with HN as the spike. Measure by profile-to-site clicks and inbound DMs, not impressions.
- **Ready-to-post material:** full 7-day conversion campaign (posts, first comments, DM scripts, harvest-week plan, revenue targets) in [../linkedin/7-day-campaign.md](../linkedin/7-day-campaign.md); early drafts in [linkedin-posts.md](linkedin-posts.md).

### 6. The IPO news cycle (opportunistic)
Whenever Bending Spoons makes news (earnings, next acquisition), the owner posts a measured comment/thread with the escape-hatch guide. Not gloating — useful.

## Sales infrastructure (chosen, not yet purchased — no-spend guardrail)
- Domain: hourstead.com (verified available 2026-07-10, ~$10/yr when bought).
- Merchant of record: **Lemon Squeezy** (handles global VAT, license keys, 5%+50¢/sale, no monthly fee) — fits one-time licenses; Paddle as fallback.
- Hosting: any static host's free tier (Cloudflare Pages/GitHub Pages). Total fixed cost to launch: ≈ the domain.

## Messaging by audience
| Audience | Lead message |
|---|---|
| Harvest refugees | "Your renewal can't surprise you if there's no renewal." |
| Spreadsheet holdouts | "As simple as your spreadsheet, but it makes real invoices." |
| Local-first/HN crowd | "One HTML file. Plain-JSON data. Read the source." |
| Accountant-adjacent | "Your books in a file your accountant can actually open." |

## 30-day calendar
- **D1–2:** buy domain, deploy site+app, set up Lemon Squeezy product + license webhook (key format already implemented).
- **D3:** Show HN, morning US time. Owner online all day answering. Same day: LinkedIn launch post (archetype a).
- **D4–7:** community threads; collect objections → FAQ updates. LinkedIn cadence starts (2–3 posts/wk, archetypes rotate).
- **D8–14:** ship 2 comparison pages + Harvest-export guide; submit AlternativeTo.
- **D15:** Product Hunt.
- **D16–30:** SEO page #3–4, iterate on free→paid conversion (footer copy, 3-client cap messaging), first "changelog" post to signal liveness.

## Metrics & kill criteria
- Leading: site visits, app opens (count locally-reported? No — no telemetry. Use only: downloads/page views from host logs, license sales, support emails).
- 90-day bar (from [../02-business/BUSINESS.md](../02-business/BUSINESS.md)): **≥20 licenses (~$1.6k)** to continue investing; <20 → keep as free portfolio tool, stop marketing spend (which is ~$0 anyway).
- Qualitative: 5+ unsolicited "I switched from X" mentions = positioning confirmed.

## Risks (honest)
- **HN launch flops** (timing/luck): mitigation — SEO pages don't depend on it; relaunch angle available ("1.1 with e-invoice export").
- **Incumbent copies "one-time" tier:** structurally unlikely (cannibalizes ARR), and if it happens, it validates the category we lead on trust.
- **3-client cap too generous** (solo devs often have ≤3 clients): watch conversion; the footer, not the cap, may be the real converter. Adjustable in a minor release.
