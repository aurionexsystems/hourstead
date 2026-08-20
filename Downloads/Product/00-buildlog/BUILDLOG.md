# Build Log — Dayticket (Run #2, take 3)

Date: 2026-08-20. Autonomous. No questions to the user.

## Killed ideas this run
| Idea | Why dead |
|---|---|
| Hourstead sequel | Already shipped in this repo |
| **Manila (medical bills)** | User: HIPAA is an issue; we cannot store that file; **nothing with medicine** |
| **Postmark (cancel letters)** | User: scrape this idea; HIPAA is an issue and very expensive. Even a local letter file still looks like a consumer-complaint / identity product. Dumped. |
| Security-deposit kit | More identity data than we want |
| Anything that makes us a covered entity or a business associate | HHS: HIPAA Rules apply to covered entities and business associates. We will be neither. |

## Locked problem
Small trades and remodelers do extra work on a handshake, then eat it. California already says a home-improvement extra is not enforceable against the buyer unless it is in writing, signed, and states scope, amount, and schedule/payment effect **before the extra starts** (BPC §§ 7159, 7159.6 — official California legislative text, fetched 2026-08-20).

The apps that print change orders charge rent. Joist’s own pricing page (fetched 2026-08-20, “Last Updated August 2026”) puts **“Add change orders” on Elite at $32/mo** and says the free plan is gone. Housecall Pro’s own pricing page (fetched 2026-08-20) starts at **$59/mo billed annually** ($79 month-to-month) and sells extra users on Essentials at **$100/mo each**. ContractorTalk still has contractors writing about Buildertrend hikes (65%; one Core plan emailed a **122% jump to $699/mo**), with 2026 comments calling the pattern unchanged.

We sell a day ticket you print in the driveway. One file. No card processing. No photo vault. No health fields.

## Data rule
We never receive the `.dayticket` file. The engine flags SSN-shaped and full-PAN-shaped text and refuses to treat them as normal fields. Checkout (owner’s later step) sells a key. Support does not accept emailed tickets, photos of the house, or card numbers.

HIPAA: we are not a health care provider, health plan, clearinghouse, or their business associate (HHS covered-entity page). This company does not do medicine.

## Name
**Dayticket.** Domain `dayticketfile.com` — Verisign RDAP HTTP 404 on 2026-08-20 (checked, not bought).

## Model
$49 once. Free = one job, one extra ticket. Paid = unlimited local jobs/extras and the shop name on the printout. Honor-system key. No merchant account this run.

## Cuts
No dispatch, no GPS, no payments, no photo reports, no 50-state contract engine (CA statutory text + a generic ticket), no live checkout, no posting.

## Self-answered
**Q: Is HVAC “medical”?**  
**A:** No. Housecall Pro lists HVAC next to plumbing and landscaping. We still do not store a customer file.

**Q: Rebuild Postmark with stronger “local only” language?**  
**A:** User said scrape it. HIPAA cost is the constraint. Leave consumer-complaint letters alone.

**Q: X/Twitter?**  
**A:** Pay-per-use. Not used.
