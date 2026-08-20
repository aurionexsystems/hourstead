# Proof memo — why Manila could work, and what is not proven

Date: 2026-08-20. This is not a guarantee of revenue.

## Definition of done (this run)

| Bar | Status |
|---|---|
| Real problem with fetched primary complaints from the last 60 days | **Met.** CFPB API, June–July 2026 (EVIDENCE §1.2). |
| Named news story, not a persona | **Met.** Lisa Horan, NBC Connecticut, 2025-02-10. |
| Official legal hooks for the product | **Met.** §1692g, NSA/CMS, 501(r), FR 2026 FPL, NCRA $500 policy, vacated CFPB rule. |
| Competitors from their own pages | **Met.** |
| Working product + automated tests | **Met.** `node 04-product/test.js` — 15 passed. |
| Brand + local website | **Met.** |
| GTM the owner can run without us posting | **Met.** |
| Money can change hands today | **Not met, by guardrail.** No merchant account. |
| License is a technical barrier | **Not met, by design.** Honor system. |

**Market-ready** in this package means: everything buildable with $0 and no public posting.  
**Sellable today** would require the owner to connect checkout and issue keys. That step was forbidden, not forgotten.

## Why it would work (the chain, not a mood)

1. **The pain is current.** On 2026-07-29 a consumer told the CFPB a collector was still reporting medical debt after the original provider confirmed a **$0.00** balance. That is not a 2021 PDF. It is this summer.
2. **The pain is large enough to matter and small enough to DIY.** Peterson-KFF: 20 million adults with >$250 medical debt. CR: many collector contacts are **under $500**. Resolve’s published tiers start at $5k and take a deposit. Dollar For will not touch a lab bill. Goodbill’s own FAQ: no collections, no already-paid. The middle is uncovered.
3. **The workflow that works is already known and still not packaged as a local object.** Itemize, match EOB, write, certified mail — HN, CR, CFPB templates. CoveredUSA packages it as an **upload**. We package it as a **folder**.
4. **The legal floor moved the wrong way for patients in 2025.** The CFPB medical-debt credit-report rule was vacated 2025-07-11 (CFPB’s own page). Collectors still have a credit-report stick for balances over $500 after the bureau waiting period. A thirty-day letter is not optional trivia.
5. **Incumbents tax the terrified.** 18–25% of savings, or $129 a bill, plus their copy of the PDF. KFF: half of adults cannot pay a $500 surprise. A $39 file is the price of not negotiating with a percentage while you are being collected on.
6. **Downside is bounded.** Static files. No inventory. No GPU bill. Break-even is one sale after a domain.

## Bear case (also evidenced)

- **We have not sold one.** All revenue numbers in GTM are targets.
- **Honor-system keys leak.** Anyone can read `checkLicense`. Treat $39 × N as a ceiling.
- **Upload-and-forget is what tired people want.** `siliconc0w` asked for an agent that waits on hold. We refused. Some fraction will bounce to CareRoute.
- **Wrong-stat temptation.** The market is trained on “80% of bills have errors.” We will look conservative. That is a feature. It is also a conversion risk.
- **Not legal advice** is load-bearing. A bad letter sent unchanged is on the user; a user who wanted a lawyer will be angry we are a file.
- **HTML-in-a-folder is not a consumer habit** outside HN. **INFERENCE:** distribution is the real risk, not the matcher.

## Verified vs inferred ledger

| Claim | Status | Where |
|---|---|---|
| CFPB: collections on medical bills not owed, +31% (2018–2021) | Verified (archived newsroom page) | EVIDENCE 1.1 |
| July 2026 consumer narratives of medical debt not owed | Verified (CFPB API) | EVIDENCE 1.2 |
| 41% of adults with medical/dental debt (2022 KFF survey) | Verified | KFF 2026-04-30 update page |
| ~half cannot pay unexpected $500 bill | Verified | same |
| 20 million adults, ≥$220B (SIPP 2021, >$250) | Verified as stated by Peterson-KFF | EVIDENCE 1.3 |
| Lisa Horan paid $2,206 then got collections texts | Verified | NBC CT 2025-02-10 |
| §1692g thirty-day written dispute / cease collection | Verified | 15 U.S.C. § 1692g |
| NSA ER / GFE +$400 / 120 days / 1-800-985-3059 | Verified | CMS + CFPB Ask |
| 2026 FPL $15,960 / $33,000 family of 4 | Verified | FR 2026-00755 |
| 501(r) FAP + no ECA before reasonable FAP effort | Verified | IRS page |
| NCRA: medical collections under $500 off reports (2023) | Verified | Equifax IR + TransUnion + Experian |
| CFPB medical-debt reporting rule vacated 2025-07-11 | Verified | CFPB rule page + court PDF + AP |
| Goodbill 20% cap $1k; no collections | Verified | Goodbill official |
| Dollar For free, hospital FAP only, uploads required | Verified | dollarfor.org/faq |
| Resolve ~$5k floor + % + deposit | Verified as published; **internal $249/$250 and $5k/$25k conflicts** | Resolve official |
| manilafile.com available | Verified as RDAP HTTP 404 on 2026-08-20 | not a purchase |
| $39 will convert | **Inference** | BUSINESS |
| Local-file architecture wins vs upload | **Inference** (positioning, not a test) | D-007 |
| 80% bill-error rate | **Rejected** | EVIDENCE 1.3 |
| 65% of bankruptcies are medical | **Rejected** | EVIDENCE 1.3 |

## What got cut
OCR, CPT codebook, hospital MRF ingest, 50-state engine, live checkout, server license, posting. Logged in BUILDLOG D-012 / D-010.

## Honest last line
Manila would work if the owner does the two things this run could not: **accept money** and **put the site where the complainers already are**, using only the sentences we can source. The file is finished. The company is not a company until those two acts.
