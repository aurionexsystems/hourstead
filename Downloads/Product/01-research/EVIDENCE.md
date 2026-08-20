# Evidence dossier — Manila

Fetch window: **2026-08-20**. Every quote and number below was taken from a URL retrieved this run (HTTP GET, CFPB API, or HN Algolia). If a page timed out on the first tool and succeeded on retry, it is still marked fetched. **INFERENCE** and **UNVERIFIED** are labeled.

X (Twitter) trends/search were attempted via MCP and returned `user-not-enrolled` / pay-per-use. Not used. Reddit HTML was not relied on.

---

## 1. The problem, in the government’s words

### 1.1 People are collected on for medical bills they say they do not owe

**URL:** https://www.consumerfinance.gov/about-us/newsroom/cfpb-report-spotlights-medical-billing-challenges/  
**Fetched:** 2026-08-20. Page note on site: archived; last modified Jun. 25, 2026.

> “Many Americans feel forced to pay medical bills that they have already paid or never owed to begin with,” said CFPB Director Rohit Chopra.

> “The credit reporting system should not be used as a weapon to coerce patients into paying medical bills they do not owe.”

> “From 2018 to 2021, complaints about collection attempts on medical bills that were not owed increased by 31%.”

> “People also report learning of an outstanding medical bill only after experiencing a drop in their credit score”

**Also fetched (PDF):** https://files.consumerfinance.gov/f/documents/cfpb_complaint-bulletin-medical-billing_report_2022-04.pdf  
Bulletin: in medical debt collection complaints, attempts to collect a debt the consumer says is not owed “makes up nearly half of complaints.”

### 1.2 This is still happening in July 2026 (primary complaints)

**API:** `https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/`  
Query this run: medical + owe/owed/insurance/EOB/hospital, `date_received_min=2026-07-01`, sort `created_date_desc`.  
**Returned total:** 534 hits for that query window (API `hits.total.value`).

Verbatim excerpts (CFPB redacts names as `XXXX`; amounts as `{ $ }`):

| Complaint date (API) | Issue | Company (as reported) | State | What they wrote |
|---|---|---|---|---|
| 2026-07-29 | False statements | Ability Recovery Services, LLC | LA | “attempting to collect and report medical debt that I do not owe … continuing collection activity even though the original medical provider confirmed that my balance is {$0.00}.” First item “{$1500.00}”; Experian deleted after failed validation; then “reported another account instead.” |
| 2026-07-23 | False statements | Credit Consulting Services, Inc. | CA | “collection bill from XXXX … owed for a medical bill”; under {$500.00}; “They added interest on this first notice” |
| 2026-07-08 | Attempts to collect debt not owed | Hollis Cobb Associates | WA | “continues to attempt collection on a fraudulent medical debt … fabricated 2023 service date, and a balance that does not exist.” |
| 2026-07-05 | Written notification | Credit Bureau Systems | IN | multiple medical collections “{$510.00}, {$3000.00}, {$740.00}, and {$3600.00}” disputed as “billing, coding” problems |
| 2026-07-01 | Written notification | First Federal Credit Control | PA | “treatment associated with this account was never completed. Additionally, I paid for the medical services that I actually received.” |
| 2026-06-22 | Attempts to collect debt not owed | Ability Recovery Services, LLC | MA | “{$4700.00}” on credit; “the debt was not mine”; collector then said it was for a daughter |
| 2026-06-16 | False statements | Transworld Systems Inc. | IL | “NO SHOW” fee after a video visit the consumer says they attended; later paid a copay at a real visit |

**UNVERIFIED:** We did not independently confirm the underlying medical facts. These are consumer narratives the CFPB publishes.

### 1.3 How big the debt is (surveys, not our measurement)

**KFF, updated Apr 30, 2026:** https://www.kff.org/health-costs/americans-challenges-with-health-care-costs/  
Fetched 2026-08-20.

- “In 2022, about four in ten adults (41%) reported having debt due to medical or dental bills”
- “Just under half of U.S. adults say that it is very or somewhat difficult for them to afford their health care costs (44%).” (KFF Health Tracking Poll: May 2025)
- “About half of U.S. adults say they would not be able to pay an unexpected medical bill that came to $500 out of pocket.” Includes “one in five (19%) who would not be able to pay it at all”

**Peterson-KFF Health System Tracker:** https://www.healthsystemtracker.org/brief/the-burden-of-medical-debt-in-the-united-states/  
Fetched 2026-08-20. SIPP adults with **>$250** unpaid medical bills as of December 2021:

- “20 million people (nearly 1 in 12 adults) owe medical debt.”
- “at least $220 billion in medical debt.”
- “14 million people (6% of adults) … over $1,000” and “3 million people (1% of adults) … more than $10,000.”
- CFPB figure as quoted on that page: “$88 billion in medical debt is reflected on Americans’ credit reports”

**KFF Health News / Diagnosis: Debt:** https://kffhealthnews.org/diagnosis-debt/  
Fetched. “More than 100 million people in America — a startling 41% of adults — are saddled with medical bills they cannot pay” (same 2022 survey family). “A quarter of those with debt owe more than $5,000.”

**Do not use:** “65% of bankruptcies are medical.” Repeated on HN 2026-08-10 (item 49238856) via a third-party ranking site. Contested in the literature. **Not a Manila claim.**

**Do not use:** “80% of hospital bills contain errors.” Advocate-trade-group figure (Medical Billing Advocates of America) repeated on 2026 marketing pages (BillKarma, Umbra, Orbdoc). **Not a Manila claim.** Consumer Reports (below) attributes “almost half” to Patient Advocate Foundation — also not peer-reviewed. We do not lead with a rate we cannot defend.

---

## 2. Named people, not personas

### 2.1 Lisa Horan — paid $2,206, then collections

**URL:** https://www.nbcconnecticut.com/investigations/nbc-ct-responds/nbc-ct-responds-helps-somers-consumer-after-paid-bill-sent-to-collections/3496225/  
**Fetched:** 2026-08-20. By Caitlin Burchill; published Feb 10, 2025.

- “Lisa Horan paid a $2,206 invoice for an emergency room visit last summer.”
- ER at Johnson Memorial Hospital in June; check cashed in October; January texts from a collector offering “40% off.”
- Check payable to NES Health (staffing contractor; hospital statement: dissolution November 2024).
- Horan: “I spent a total of about four hours on the phone.”
- Hospital later: account “credited for her previous payment.”

### 2.2 Lauren MacNeill — $71 for an office she had never visited

**URL:** https://www.consumerreports.org/money/debt-collection/fight-when-contacted-by-a-debt-collector-for-a-medical-bill-a8932597676/  
**Fetched:** 2026-08-20. Lisa L. Gill; Aug 26, 2022.

- Collector said she owed $71 to an urgent care near Westport, Conn.
- “I’d never been to that doctor’s office,” she says.
- CR: “MacNeill is one of an estimated 43 million people who get contacted by debt collection agencies for unpaid medical bills each year.”
- CR, attributing CFPB: medical bills are “the most common reason collection agencies contact consumers—affecting 1 in 7 adult Americans.”
- CR, attributing Caitlin Donovan, Patient Advocate Foundation: “Almost half of all medical bills contain at least one error.”
- Practical advice on the page: get the written validation notice; **30 days** to dispute in writing; collectors can still contact you even when small medical collections drop off credit reports.

### 2.3 Hacker News — do not pay the first number

**https://news.ycombinator.com/item?id=33602559** (comment, fetched via search/snippet + Algolia family): wait for insurance; “never pay a medical bill unless you're damn sure you're responsible for the amount.”

**https://news.ycombinator.com/item?id=35866470** — “I have $4000+ in collections because insurance didn't pay for what they were supposed to.” Replies: get itemized ICD/CPT, cross-reference the EOB.

**https://news.ycombinator.com/item?id=45735918** — fetched 2026-08-20. `siliconc0w` on 2025-10-28:

> “Never pay the first hospital bill if it's a non-trivial amount and you've waited a few months to get all the bills.”

> “There is definitely a business in a LLM-powered medical billing agent that could handle this end to end”

**INFERENCE:** The commenter wants a staffed/LLM agent. Manila is the opposite architecture (local file). The comment is evidence of demand, not of our method.

**https://news.ycombinator.com/item?id=44079760** — `AStonesThrow` (2025-05-24): negotiated a $30,000 uninsured hospital bill; “downloaded their [CFPB] letter templates”; tracked every account.

**https://news.ycombinator.com/item?id=49238856** — `_DeadFred_`, **2026-08-10** (this month): medical-debt statistics pile-on under an unrelated thread. Currency check: the topic is still being used as a civic fact in August 2026.

---

## 3. The legal furniture (what the letters stand on)

### 3.1 FDCPA validation — 15 U.S.C. § 1692g

**URL:** https://www.law.cornell.edu/uscode/text/15/1692g  
Also: https://www.govinfo.gov/content/pkg/USCODE-2023-title15/html/USCODE-2023-title15-chap41-subchapV-sec1692g.htm  
Fetched 2026-08-20.

- Written notice within **five days** of initial communication (unless already in that communication).
- Consumer has **thirty days** after receipt to dispute in writing.
- On written dispute, collector “shall cease collection of the debt, or any disputed portion thereof, until the debt collector obtains verification.”
- Failure to dispute “may not be construed by any court as an admission of liability.”

### 3.2 No Surprises Act / good-faith estimate

**CFPB:** https://www.consumerfinance.gov/ask-cfpb/what-is-a-surprise-medical-bill-and-what-should-i-know-about-the-no-surprises-act-en-2123/  
**CMS:** https://www.cms.gov/medical-bill-rights  
Fetched.

- Effective January 1, 2022.
- Generally covers ER, certain non-emergency OON at in-network facilities, air ambulance.
- Uninsured/self-pay: if billed **at least $400** over the good-faith estimate and the bill arrived within **120 calendar days**, a dispute process may apply.
- Help desk: **1-800-985-3059** (CMS: 8am–8pm EST, 7 days).

### 3.3 Nonprofit hospital financial assistance — IRC 501(r)(4)

**URL:** https://www.irs.gov/charities-non-profits/financial-assistance-policy-and-emergency-medical-care-policy-section-501r4  
Fetched.

- Written FAP must apply to emergency and other medically necessary care at the hospital facility.
- FAP-eligible individual “may not be charged more than Amounts Generally Billed (AGB)” for that care.
- Facility must make “reasonable efforts” to determine FAP eligibility before extraordinary collection actions.
- Billing statements must include a conspicuous notice about financial assistance.

### 3.4 2026 HHS poverty guidelines

**URL:** https://www.govinfo.gov/content/pkg/FR-2026-01-15/html/2026-00755.htm  
Federal Register Vol. 91, No. 10; FR Doc. 2026-00755; effective January 13, 2026.

48 states + D.C. (annual): 1 $15,960; 2 $21,640; 3 $27,320; 4 $33,000; 5 $38,680; 6 $44,360; 7 $50,040; 8 $55,720; then +$5,680 each additional person.  
Alaska and Hawaii tables used in `engine.js` come from the same notice.

### 3.5 Medical debt on credit reports — 2023 bureau policy vs vacated 2025 CFPB rule

**Joint NCRA PR (Equifax IR), 2023-04-11:** https://investor.equifax.com/news-events/press-releases/detail/1286/equifax-experian-and-transunion-remove-medical-collections  
Also TransUnion: https://newsroom.transunion.com/equifax-experian-and-transunion-remove-medical-collections-debt-under-500-from-us-credit-reports/

- Medical collection debt with initial reported balance **under $500** removed from U.S. consumer credit reports.
- Paid medical collections off reports as of **July 1, 2022**.
- Unpaid medical collections delayed from six months to **one year**.
- “nearly 70 percent of the total medical collection debt tradelines” removed (their figure).

**Experian Ask Experian:** https://www.experian.com/blogs/ask-experian/medical-debt-and-your-credit-score/  
Fetched. Confirms under-$500 off reports; unpaid over $500 can appear after a **365-day** grace; CFPB Jan 2025 rule discussed as held/vacated in later agency materials.

**CFPB rule page:** https://www.consumerfinance.gov/rules-policy/final-rules/prohibition-on-creditors-and-consumer-reporting-agencies-concerning-medical-information-regulation-v/  
Fetched. Rule issued January 7, 2025. **Vacated July 11, 2025** by E.D. Tex. in *Cornerstone Credit Union League v. CFPB*. Materials “for reference only.”

**AP:** https://apnews.com/article/cfpb-medical-debt-credit-reports-41f212ee6b89f9902deb267d75ab8443  
Judge Sean Jordan; CFPB had estimated the rule would remove **$49 billion** from **15 million** Americans’ reports; expected average score increase **20 points** (CFPB, as reported by AP).

**Court order PDF fetched:** https://litigationtracker.law.georgetown.edu/wp-content/uploads/2025/01/Cornerstone-Credit-Union-League-et-al_2025.07.11_MEMORANDUM-OPINION-AND-ORDER.pdf  
“the Medical Debt Rule … is hereby SET ASIDE and VACATED.”

**INFERENCE:** After July 2025, a patient cannot rely on a federal wipe of medical collections from credit reports. The voluntary under-$500 / paid-off / one-year-delay bureau policies are the floor that remains — as those companies have stated. Collectors still call (Consumer Reports; CFPB complaints this month).

### 3.6 Hospital price transparency exists (we do not ingest it in 1.0)

**URL:** https://www.cms.gov/priorities/key-initiatives/hospital-price-transparency  
Fetched. Required since January 1, 2021: machine-readable file + shoppable-service display. CY 2026 enforcement start **April 1, 2026** (as stated on that CMS page, last modified 2026-07-21).

Cut from 1.0 (logged): live MRF lookup.

---

## 4. Competitors (official pages only)

Fetched 2026-08-20. Comparison blogs were leads only.

| Name | URL | What they take | What they require | Gap vs Manila |
|---|---|---|---|---|
| **Dollar For** | https://dollarfor.org/faq/ | $0 (donor funded). “Nothing. Zero. Zilch.” | Patient form + income docs + uploads. “Dollar For only helps with hospital bills.” Not HIPAA covered entity (their FAQ). | Charity-care applications only. No EOB match, no collector letters. |
| **Goodbill** | https://www.goodbill.com/patients + help center | **20% of savings, cap $1,000**. FAP filing: no fee (help article). | Bills / medical records; privacy page lists SSN among identification data they may hold. **Hospital only; not collections; not already paid.** | Cannot help Lisa Horan’s pattern (paid, then collected). Requires upload. |
| **Resolve** | https://www.resolvemedicalbills.com/ | Deposit **$249 or $250** (homepage vs FAQ conflict) / **$499** + **25% or 10%** with minimum-fee rules. Pricing tables start at **$5–15k** bills. | “upload your bill documents” | Percentage + deposit. Official pages conflict on $249/$250 and on the large-bill minimum-fee trigger ($5k vs $25k). |
| **Mediloop** | https://mediloop.ai/pricing | Flat **$69 / $129 / $499/yr**. No % of savings. | “photo or a PDF.” FAQ: not collections; pricing page: contact for collections. | Upload. Official collections policy contradicts itself. |
| **CareRoute Bill Defense** | https://www.careroute.ai/bill-defense | **25%** (18% premium), **cap $1,000**. Collections in scope. | “bill details and a photo.” Privacy (May 3, 2026): uses Anthropic + OpenAI; not generally a HIPAA covered entity. | Upload + model APIs. |
| **CoveredUSA Analyzer** | https://coveredusa.org/en/medical-bill-analyzer | “completely free” | Upload PDF/image. “analyzed in memory and deleted.” Claims “80% of hospital bills… have errors.” | Closest DIY cousin. Requires upload; leads with the 80% stat we refuse. |
| **Patient Advocate Foundation** | https://www.patientadvocate.org/connect-with-services/faq/ | Free | Phone/email case management | **Serious/chronic illness only.** FAQ: no accidents, broken bones, “non-chronic illnesses.” |
| **BillShark** | https://billshark.com/support | 40% of household-bill savings | Upload | Official eligible list is internet/cable/etc. **Not medical.** |
| **CoPatient** | https://copatient.com/ | None published | — | Homepage is now “Payment Integrity Solutions” B2B. Old consumer 25–35% figures are **not** current official facts. |

**Underserved slice (INFERENCE from the table, not a survey):**  
Insured or recently-insured people with **sub-$5k** bills, **already paid** bills, **collector** letters, or **non-hospital** providers, who will not upload PHI to a startup, and who do not have a serious/chronic PAF-eligible diagnosis. That is exactly the CFPB complaint pile.

---

## 5. Willingness to pay (what we can and cannot claim)

**Verified:** people already pay 18–25% of savings or $129+/bill to strangers who take the PDF (Goodbill, CareRoute, Mediloop, Resolve — official pages above). Dollar For is free and capacity-constrained (“not able to answer or return phone calls at this time,” their FAQ).

**Verified:** about half of adults say they could not pay an unexpected **$500** bill out of pocket (KFF, 2026-04-30 update).

**INFERENCE:** A $39 one-time file is cheaper than one hour of Horan’s phone time valued at a hospital-billing hourly, and cheaper than Goodbill’s $200 on a $1,000 save. It is not “validated conversion.” We have not sold a copy.

**UNVERIFIED:** Conversion rate, support burden, how many people can operate a static HTML file.

---

## 6. Sources attempted and dropped

| Attempt | Result |
|---|---|
| X `get_trends_by_woeid`, `search_news` | HTTP client-forbidden, pay-per-use enrollment |
| CFPB complaint HTML detail `/search/detail/24729283` | Timed out; API body used instead |
| Equifax consumer education article | Timed out; Equifax IR PR used |
| Resolve `/how-we-work`, some Dollar For subpages | Timeout/404; not invented |
