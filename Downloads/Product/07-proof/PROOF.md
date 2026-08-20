# Proof — Postmark

## Why it could work
1. **Current complaints.** CFPB 2026-07-13: Albert “repeated requests to cancel” failed. 2026-06-15: AmEx $1,000 autorenew without the notice they asked for. 2026-06-06: $700 annual renew, merchant silent.
2. **Law still has a handle.** ROSCA § 8403 is in force. CA § 17602 is in force. The vacated FTC rule is not — we say so.
3. **Incumbents want the feed.** Rocket Money, official: they view transaction data. We sell the opposite.
4. **Data surface is small and local.** No medicine. Engine rejects SSN/PAN shapes. We never receive the file. That is the answer to “we cannot store this safely.”
5. **Bounded cost.** Static files. One domain. One sale covers it.

## Why it might not
- Untested $29.  
- Honor-system keys.  
- Tired people will still click “Connect bank.”  
- ROSCA is not every subscription (internet negative option). We can over-flag; letters say so.  
- No checkout in this package.

## Verified vs inferred

| Claim | Status |
|---|---|
| CFPB cancel/recurring quotes Jun–Jul 2026 | Verified (API) |
| Eighth Circuit vacated click-to-cancel 2025-07-08 | Verified as reported on fetched firm pages + HN thread; **UNVERIFIED** we did not fetch the slip opinion this take |
| 15 U.S.C. § 8403 simple mechanism | Verified (FTC enrolled PDF + LII URL) |
| Amazon ROSCA order 2025-09-25 | Verified (FTC PDF) |
| CA BPC 17602 online cancel + 2025-07-01 amendment date | Verified (leginfo) |
| Rocket Money views transaction data via Plaid | Verified (rocketmoney.com/security) |
| RM privacy collects balances / history / card info | Verified (privacy-notice) |
| postmarkfile.com available | RDAP 404 on 2026-08-20 |
| $29 converts | **Inference** |
| Dated letter stops a charge | **Inference** (plausible; not measured) |

## Definition of done
Working local product + tests (9 passed) + sourced package + no medical + no customer-file server. **Not** live checkout.

## Manila
Killed. Do not revive. Do not store medical bills.
