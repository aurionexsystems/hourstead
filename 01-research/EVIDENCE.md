# Evidence Dossier — The Problem

**Thesis:** Freelancers and small consulting teams who bill by the hour are being squeezed by subscription time-tracking/invoicing tools — most acutely Harvest, whose new owner (Bending Spoons) restructured pricing around per-seat rent **plus usage-based fees on invoices, projects, clients, and tasks**. Users are actively looking for exits *right now* (Jan–Jul 2026). The deeper pain: your billing history — the record of your business — is hostage to a vendor whose pricing can change at any renewal.

Every item below traces to a URL fetched during this run on 2026-07-10. Inference is labeled.

---

## 1. The trigger event (verified)

- Harvest was acquired by Bending Spoons in 2025. Pricing was restructured to per-seat base + usage fees.
  Source (fetched): https://www.operating.app/blog-posts/harvest-alternatives-price-increase — "some customers are receiving renewal notices that reference Enterprise plans and usage-based or Flex billing. Public community posts have also reported steep renewal increases."
- **From Harvest's own pricing page** (fetched 2026-07-10): https://www.getharvest.com/pricing
  - Teams $9/seat/mo, Enterprise $14/seat/mo, and on paid plans: "additional invoices, projects, clients, and tasks are billed based on what you use."
  - Even the Free plan (1 seat, 2 projects) carries the disclaimer: "The usage of some features may require the payment of fees."
- Renewal-shock examples reported by TrackingTime's analysis (fetched): https://trackingtime.co/time-tracking-software/harvest-price-increase-agencies.html
  - A single-seat account billed "$12 per month" restructured to "$1,900" billing.
  - A small team: $130/yr → $168/yr + est. $720 in usage fees.
  - An account auto-moved to an enterprise tier "over $19,000 per year."
  - The article itself flags these as outliers — but notes "the pricing mechanism that produced them applies to every account." (Note: these are secondhand reports relayed by a competitor's blog; treated as directional, not load-bearing.)

## 2. Users are leaving — primary quotes (verified, fetched via HN Algolia API)

All from Hacker News, thread https://news.ycombinator.com/item?id=46707699 ("Tell HN: Bending Spoons laid off almost everybody at Vimeo yesterday", 471 points / 505 comments, 2026-01-21) unless noted. Fetched via https://hn.algolia.com/api/v1/search:

- **burningChrome** (comment 46711126): "I use Harvest for my freelance invoicing and started seeing the huge notice at the top of the app and was wondering how this was going to impact my stuff going forward. I'm also very leery having gone through a horrible Evernote experience. If anybody has any good alternatives, I'm all ears."
- **TWDan** (46711669): "rumors of large price increases already surfacing" after Bending Spoons bought Harvest.
- **dwedge** (46710534): still paying grandfathered Harvest pricing "until I can... be sure I don't need it"; switched to Solidtime.
- **dwedge** (46710471): Harvest's "sign up and pricing page seems more or less abandoned"; planning to "roll my own version."
- **rickydroll** (46709180): Harvest user for time-tracking and invoicing; "doesn't trust Bending Spoons" after Evernote; actively considering switching.
- **dangoor** (46711581): on Meetup under the same owner — "Their massive price increases have really driven people away."
- Reddit thread exists at r/HarvestApp: "Purchase by Bending Spoons" (2026-01-23), surfaced via HN Algolia (story 46727619) pointing to https://old.reddit.com/r/HarvestApp/comments/1q25xpy/purchase_by_bending_spoons/ — **could not fetch (Reddit blocked); existence verified via API, contents unverified.**

## 3. The pattern is systemic, and freshly in the news (verified)

TechCrunch, 2026-07-05 (fetched): https://techcrunch.com/2026/07/05/what-is-bending-spoons-everything-to-know-about-aols-acquirer/
- Bending Spoons' model: make acquired products "more financially successful — with tech and AI, but also often through price hikes and layoffs."
- Portfolio: Vimeo ($1.38B), AOL, Eventbrite ($500M), WeTransfer, Evernote, Meetup, Filmic + more. 500M MAU, 9M paying customers.
- Evernote: free tier cut to 50 notes (Nov 2023). WeTransfer: free tier cut to 10 transfers/mo (Dec 2024). Vimeo: mass layoffs (Jan 2026).
- **IPO'd on Nasdaq July 2026 at >$25B** — public-market growth pressure now applies. (Reuters filing story also seen via HN: reuters.com, 2026-06-08.)

Inference (labeled): a newly public company with 4 founders holding >80% voting power and a stated price-hike playbook will keep raising prices on portfolio products. Harvest users' fear is rational.

## 4. Competitor pricing (verified from vendors' own pages, fetched 2026-07-10)

| Tool | Free tier | Paid w/ invoicing | Notes |
|---|---|---|---|
| Harvest (https://www.getharvest.com/pricing) | 1 seat, 2 projects, fee disclaimer | $9–14/seat/mo **+ usage fees on invoices/projects/clients/tasks** | Bending Spoons-owned |
| Toggl Track (https://toggl.com/track/pricing/) | "limited number of users", no invoicing | Starter $9/user/mo; Premium $18 | Invoicing from Starter |
| Clockify (https://clockify.me/pricing) | 5 users, no invoicing | Standard $5.49–6.99/seat/mo for invoicing | Cheapest incumbent |
| Solidtime (https://www.solidtime.io/) | free tier; AGPL self-host | "fair pricing", EN 16931 e-invoices | Open source, **server-based** (SaaS or self-hosted deployment), 15k users, 8.6k GitHub stars |

Gap (inference, labeled): every option is either a subscription with per-seat rent, or requires running a server. **No credible zero-server, own-your-data-as-a-file, one-time-purchase option** aimed at solo freelancers and 1–5 person consultancies. dwedge's "roll my own version" is the tell: demand exists past what the market supplies.

## 5. Market size (verified source, third-party aggregation)

Demandsage (fetched): https://www.demandsage.com/freelance-statistics/ — 76.4M US freelancers (~38% of workforce), $1.27T annual contribution to US economy, projected ~50% of workforce by 2027 (citing Upwork). Even capturing hourly-billing freelancers only, the serviceable audience is tens of millions in the US alone. (The 76.4M figure uses a broad definition; treated as ceiling, not SAM.)

## 6. Bar check

Minimum bar was: 3+ independent sources of the same complaint, at least one showing willingness to pay or tool-switching.
- Independent sources: Harvest's own pricing page, operating.app, trackingtime.co, TechCrunch, 6 distinct HN users. ✅
- Willingness to pay / switching: dwedge pays grandfathered pricing while migrating; burningChrome shopping for alternatives; dangoor confirms churn pattern at Meetup. ✅
