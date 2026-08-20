# Business design — Manila

## One sentence
A $39 file that lives on the patient’s computer, matches a medical bill to an EOB, runs the clocks that actually exist in federal law, and prints the letters the CFPB-facing guides already tell people to send — without taking a cut of the savings or a copy of the MRI.

## ICP
**Primary:** US adult, 25–64, who this month has a provider statement, an EOB that does not match it, or a collector SMS/letter about a medical account. Household can complete a form. Not looking for a lawyer yet.

**Why this person (evidence, not a vibe):**
- CFPB medical-collection complaints in June–July 2026 still say “I do not owe” (EVIDENCE §1.2).
- KFF (updated 2026-04-30): 41% of adults had medical/dental debt in the 2022 survey; ~half cannot pay a surprise $500 bill out of pocket.
- Peterson-KFF: 20 million adults with >$250 medical debt (2021 SIPP).
- Consumer Reports: medical collections are the most common collector contact (they attribute 1 in 7 adults to CFPB).

**Anti-ICP:** People who want someone else to call the hospital. That is Goodbill/Resolve/CareRoute. We send them there in the FAQ rather than fake the service.

**Secondary:** Adult children of aging parents holding a shoebox of statements. Same file, more accounts.

## Problem statement (customer words)
“The collector is texting me about a bill the hospital said was zero.” — CFPB complaint, Ability Recovery Services, 2026-07-29.  
“I’d never been to that doctor’s office.” — Lauren MacNeill, Consumer Reports, 2022.  
“Never pay the first hospital bill.” — HN, 2025-10-28.

## Solution
Manila is a **folder**, not a portal.

1. Type the bill lines and the EOB lines (from paper).
2. See flags that cite fetched law and fetched reporting.
3. Print a letter. Certified mail.
4. Keep the `.manila` JSON next to the green card.

No account. No upload. No model sees the file.

## Model
| | |
|---|---|
| Charge | **$39 once** — “Founding File” |
| Free | One open file + itemized-bill request letter |
| Paid | Unlimited files, full letter pack, clocks, export |
| Delivery | Static HTML + `engine.js`. Email the folder to yourself. |
| COGS at launch | ~$0 after domain (domain not bought this run) |
| Merchant of record | Owner’s step. Lemon Squeezy / Stripe / Gumroad — all require signups Guardrail 1 forbids. |
| License | Client-side checksum (`MNL-XXXX-XXXX-XX`). Honor system. |

### Why not 20% of savings
That is the incumbent tax. It also requires them to hold the bill. Our wedge is **refusal to hold the bill**. A percentage model would force a server and a BAA conversation we cannot finish under these guardrails.

### Why $39
Fetched anchors: Goodbill 20% cap $1,000; CareRoute 25% cap $1,000; Mediloop $129/bill; Resolve $249–$499 deposit on $5k+ bills. KFF: half of adults cannot float $500. Price is an impulse the night of the text, not a financing decision.  
**INFERENCE:** $39 is a design choice, not a tested price. Pre-committed levers: (1) drop to $29, (2) tighten free letter, (3) raise last.

## Unit economics (arithmetic, not a forecast)
- Domain + LS/Stripe fees **UNVERIFIED until owner signs up**.
- Break-even: **one** paid file after the domain is bought.
- 100 Founding Files = $3,900 gross. That is a target, not a projection.
- Leakage: the license is readable. Treat revenue as an **upper bound**.

## Competition and position

```
                 upload required
                        ▲
     Goodbill           │           CareRoute
     Resolve            │           Mediloop
                        │
     CoveredUSA ────────┼──────── Dollar For (free, hospital FAP only)
                        │
                        │
     PAF (chronic only) │
                        │
                        └────────────► local / no upload
                                   MANILA
```

We do not claim we recover more dollars than a human advocate. We claim you can start **tonight** without giving a startup your member ID.

## Trust & legal
- Not a law firm. Not medical advice. Every letter says so.
- No AMA CPT codebook (copyright).
- No invented testimonials.
- 501(r) / NSA / FDCPA flags are **screens**, not determinations.

## 90-day checkpoint (if launched)
Kill if: zero paid keys after 90 days of actually publishing (owner’s act) **and** no inbound “this letter got a recall” reports.  
Double down if: even a handful of users report a collector pause after the §1692g letter — that is the core loop.

## What we will not do in year one
Become a medical-records pipeline. Become an LLM that emails hospitals. Take a percentage. Sell the file.
