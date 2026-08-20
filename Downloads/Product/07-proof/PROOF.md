# Proof — Dayticket

## Why this can go this month
The statute is already in force. The rent is already on Joist and Housecall Pro’s own pages. Contractors are still in a 2026 thread about construction-software hikes. The product is a static file plus an honor-system key. Domain `dayticketfile.com` was unregistered (RDAP 404) on 2026-08-20.

## Verified vs inferred

| Claim | Status |
|---|---|
| BPC § 7159.6 extra not enforceable without scope / amount / schedule | VERIFIED — official leginfo fetch 2026-08-20 |
| BPC § 7159 signed writing before extra starts | VERIFIED — official leginfo fetch 2026-08-20 |
| Joist Elite $32/mo includes change orders; free plan gone | VERIFIED — joist.com/pricing 2026-08-20 |
| Housecall Pro Basic $59/mo annual; extra Essentials users $100/mo | VERIFIED — housecallpro.com/pricing 2026-08-20 |
| Buildertrend 65% / 122% hike quotes + 2026 comments | VERIFIED — ContractorTalk thread fetch |
| Jobber live prices | **UNVERIFIED** — official page HTTP 403; not used |
| CSLB consumer HTML | **UNVERIFIED** — host rejected the fetch |
| $49 will sell | **INFERENCE** |
| HIPAA does not apply to this company | VERIFIED as the HHS rule (covered entity / BA only) plus the product design (no health file). We are not asking HHS for a determination. |

## Engine
`node Downloads/Product/04-product/test.js` — 11 passed (SSN/PAN refusal, unsigned flag, work-before-sign, 7159.6 ticket, totals).

## What would still fail a sale
No checkout (guardrail). Client-side key. Owner must not accept job files by email.

## Dumped
Manila (medicine). Postmark (consumer-complaint letters; user: HIPAA is expensive). Do not revive either.
