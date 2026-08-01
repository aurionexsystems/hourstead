# Hourstead — Business Design

*All market claims trace to [../01-research/EVIDENCE.md](../01-research/EVIDENCE.md). Inferences labeled.*

## One-liner
**Hourstead is a time-tracking and invoicing app that lives in a single file you own — no server, no account, no subscription, no landlord.**

## The problem (verified)
Hourly-billing freelancers and micro-consultancies rent their business records from SaaS vendors. When the vendor changes hands, pricing changes at renewal — Harvest under Bending Spoons now charges per-seat rent **plus usage fees per invoice, project, client, and task** (Harvest's own pricing page, fetched 2026-07-10). Users are publicly shopping for exits; one HN user is literally building his own replacement (dwedge, HN 46710471).

## The customer (ICP)
1. **Primary — the Harvest refugee.** Solo freelancer or 1–5 person consultancy, bills hourly, sends 2–20 invoices/month, already paid $100–$400/yr for tooling, burned once (Evernote/Meetup/Harvest), high trust sensitivity. Found where the complaints are: HN, r/freelance, r/HarvestApp.
2. **Secondary — the spreadsheet holdout.** Never adopted SaaS billing tools *because* of subscriptions; tracks time in Excel/Notes. Hourstead is the first tool that matches their mental model: "it's just a file."

US ceiling: 76.4M freelancers (Demandsage/Upwork, verified as claim, broad definition). Realistic SAM (inference): hourly-billing independents who invoice clients directly — even 5% of the ceiling is ~3.8M people; we need thousands, not millions.

## The product
A single-file, local-first web app (`hourstead.html`): timer + timesheet, clients & projects with rates, invoice builder that generates print-perfect PDFs (browser print), and one-click export/import of the entire business as a portable JSON **"stead file."** Works from a double-clicked file, a USB stick, or any static host. No account. No telemetry. Data never leaves the machine.

Why this beats the incumbents at the job (inference from verified gap):
- Harvest/Toggl/Clockify: subscription + (for Harvest) usage fees; data hostage to renewal terms.
- Solidtime: open source but **server-based** — self-hosting a Laravel deployment is beyond the solo freelancer.
- Hourstead: zero infrastructure. The exit strategy *is* the product: your file works forever, whatever happens to us.

## Business model
- **Free forever:** full tracker + invoicing, up to 3 active clients, "Made with Hourstead" footer on invoices.
- **Founding License — $79 one-time, per person:** unlimited clients, invoice themes, no footer, priority email support, all 1.x updates. Pay again only if you want a future 2.0 (Sketch/Sublime model).
- Delivered as a license key that unlocks the same file. Sales via a merchant-of-record (Lemon Squeezy/Paddle — chosen, not signed up for, per no-spend guardrail).
- Cost structure: ~$0 COGS (static hosting), no infra scaling. Break-even is effectively the founder's time.

**Pricing levers (pre-committed order):** $79 is anchored on incumbents' annual cost (Harvest ≥$108/seat/yr, Toggl $108–216/yr) and one-time indie tools (TablePlus $89), and is *not* the first thing to change if conversion disappoints. The likelier failure mode: many solo freelancers run ≤3 active clients, so the free cap may never bite, leaving only the invoice footer converting. Lever order: (1) lower the cap to 2 active clients, (2) move invoice themes to paid, (3) only then touch the price. Decide with data at the 90-day checkpoint, not before.

Revenue sketch (inference, conservative): Harvest alone has enough churning users that comparison-page SEO + launch spikes reaching 20k visitors in 90 days is plausible; at 2% free-adoption and 15% free→paid, that's ~60 licenses ≈ $4.7k in 90 days — a signal test, not a living. The business scales on SEO compounding ("Harvest alternative", "invoice app no subscription") and word-of-mouth in freelance communities. Kill criteria: <20 licenses in first 90 days post-launch.

## Competition & moat
| | Price | Data ownership | Setup |
|---|---|---|---|
| Harvest | $9–14/seat/mo + usage fees | vendor DB | account |
| Toggl | $9–18/user/mo | vendor DB | account |
| Clockify | $5.49+/seat/mo for invoicing | vendor DB | account |
| Solidtime | free/self-host (AGPL) | your server | deploy a server |
| **Hourstead** | **$0 / $79 once** | **a file on your disk** | **open one file** |

Honest moat assessment: the tech is copyable in weeks. The durable assets are (1) the positioning — "the anti-subscription" is a story incumbents structurally cannot tell, since it destroys their revenue model; (2) trust compounding in communities that are allergic to VC-backed tools; (3) the open stead-file format as a switching-cost *reducer* that paradoxically builds loyalty. This is a lifestyle-business-shaped company by design: no VC, no growth mandate, which is itself the brand promise (we can't rug-pull; there's nothing to acquire).

## Why now (verified)
Bending Spoons IPO'd on Nasdaq at >$25B in July 2026 — *this month* (TechCrunch, 2026-07-05). Public-market pressure on a company with a documented price-hike playbook keeps this pain in the news cycle. The refugee stream is active today.

## Decision log (questions I answered myself)
- **"SaaS or one-time?"** One-time. The entire verified pain is subscription resentment; charging rent would poison the positioning. Trade-off accepted: no recurring revenue → offset by ~zero costs and major-version upgrades.
- **"Open source?"** Source-visible file, but not OSS-licensed at launch. Solidtime owns the OSS lane; Hourstead's lane is zero-setup ownership. Revisit if trust demands it.
- **"Teams features?"** No. Multi-user sync requires a server, which breaks the core promise. 1–5 person teams share by exchanging stead files or running separate seats.
