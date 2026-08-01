# The Stead Portfolio — two companies, two autonomous runs

> **Run #2 lives in [Product 2/](Product%202/README.md): Askstead** — a $49-once Google review kit for local businesses, built against verified $399+/month incumbents with BBB complaint files. Same method, different market: primary evidence → business → brand → working product → website → GTM → proof.

---

# Hourstead — the finished package (Run #1)

**A company built from scratch in one autonomous run, 2026-07-10.**
Time tracking + invoicing that lives in a single file you own. One-time $79 license. No server, no account, no subscription. Built for the wave of users fleeing acquisition-driven price hikes (Harvest under Bending Spoons — which IPO'd this month).

## Try it in 10 seconds
Open **[04-product/hourstead.html](04-product/hourstead.html)** in any browser. Add a client, start the timer, make an invoice. Demo license key: `HS1-FIRS-TFUR-RO14`.

Or serve the full experience: `python -m http.server 8318 --directory 05-website` → http://localhost:8318

## The package
| | What | Where |
|---|---|---|
| 0 | Build log — every decision + self-answered question | [00-buildlog/BUILDLOG.md](00-buildlog/BUILDLOG.md) |
| 1 | Evidence dossier — every claim traced to a fetched URL | [01-research/EVIDENCE.md](01-research/EVIDENCE.md) |
| 2 | Business design — ICP, model, pricing, competition | [02-business/BUSINESS.md](02-business/BUSINESS.md) |
| 3 | Brand — name, logo, voice (hourstead.com verified available) | [03-brand/BRAND.md](03-brand/BRAND.md) |
| 4 | **The product** — working single-file app + test results | [04-product/](04-product/README.md) |
| 5 | Marketing website — static, verified locally | [05-website/index.html](05-website/index.html) |
| 6 | Go-to-market — 30-day launch calendar, channels, kill criteria | [06-gtm/GTM.md](06-gtm/GTM.md) |
| 7 | Proof memo — why it works; verified vs inferred ledger | [07-proof/PROOF.md](07-proof/PROOF.md) |
| — | License (free tier + Founding License terms) | [license.txt](license.txt) |

## The thesis in one paragraph
Hourly-billing freelancers' business records are held in subscription tools whose pricing changes at the owner's whim — Harvest now charges usage fees per invoice (their own pricing page). Users are publicly hunting for exits; the alternatives are all more rent or more ops. Hourstead removes the dependency itself: the whole business in one portable file, paid for once. Cost to launch ≈ one domain; break-even ≈ one sale; every channel to the customer is free and already mapped. Bounded downside, real upside, launchable this month.

## Two honest gaps before anyone can actually pay (see 07-proof/PROOF.md)
This package is everything buildable without spending money or opening an account — which, under the run's guardrails, was always the ceiling, not "already selling." Two things remain, both explained in full in each product's proof memo: **(1)** no payment processor is connected — no live checkout exists for either product, because creating one requires a paid signup the guardrails forbid; that step is the owner's. **(2)** the license check in both apps is an unobfuscated client-side formality, not a technical barrier — real, but a deliberate trade-off against building a server, explained in each PROOF.md.
