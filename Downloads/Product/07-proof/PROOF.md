# Proof memo — why Eavefile would work

**Standard:** a smaller thesis on fetched facts beats a grand one on plausible ones. This memo is the ledger.

---

## The thesis, tightly

1. **The pain is real and current.** Named homeowners in 2026 describe the exact object: a letter, no inspector, a photo they never saw, a five-figure roof, a deadline, “they need certain kind of paperwork.” Sources: ABC7 March 9 and March 30, 2026; United Policyholders; HN user w10-1 (2024) whose carrier “relented after we remedi­ated and sent photos.”
2. **The market is not a vibe.** NAIC, August 5, 2026: **2,019,799** company-initiated HO nonrenewals in 2024; rates up 96–216% by zone since 2018; 103.3 million policies in force. We do **not** know what share is aerial imagery. We do not need that share to be large for a $49 file to have a path.
3. **The product is the shopping list the incumbents already published.** State Farm to ABC7: recent photos, roofing invoice, inspection report. NerdWallet/Heller: ask why, ask for the image and its date. TDI: ask for the reason in writing; complain if unfair. Connecticut: cosmetic aerials should not support nonrenewal; they may reconsider with updated inspection info. Eavefile is that list, finished, dated, printable.
4. **The gap is real.** Guides exist (UPHELP, NerdWallet, RoofVista, Call The Local). One cloud letter-drafter exists (Copilotly blog). A local, sourced, exhibit-locked packet you can open offline does not.
5. **A reversal has happened without us.** Bennett’s policy was renewed after she hired a contractor and a newsroom called. w10-1’s carrier relented after photos. We claim *the packet is the known instrument*, not that we are the instrument that already worked.
6. **Downside is bounded.** No server. One domain later. Break-even ≈ one sale. Kill at 25 licenses / 90 days.

## Verified vs inferred

| Claim | Status |
|---|---|
| 2,019,799 company-initiated HO nonrenewals in 2024 | **Verified** — NAIC PDF |
| 96–216% rate increase 2018–2024 | **Verified** — NAIC PDF + press |
| 75-day CA / 120-day FL / 60-day TX (2024+) / 60-day CT notice | **Verified** — statutes and TDI/CID pages fetched |
| Bennett quotes and $20k / later $20–50k | **Verified** — ABC7 |
| State Farm “photos / invoice / inspection report” | **Verified** — ABC7 |
| Wrong-house and skylight errors | **Verified** as advocate claims — UPHELP + NerdWallet citing Bach |
| Cosmetic aerials insufficient in CT | **Verified** — CID Feb 6, 2026 + FAQ |
| GA/IN/LA/MD image-age rules | **Verified as NerdWallet’s reporting**, not as statutes |
| eavefile.com available | **Verified** — RDAP 404 |
| $49 will clear | **Inference** — no WTP data |
| Share of nonrenewals that are imagery-conditioned | **Unknown** — NAIC does not split |
| Eavefile would have saved Bennett’s policy | **Not claimed** |
| Checkout will convert | **Unknown** — no checkout exists |

## Why it would work *this month*

The NAIC report is fifteen days old. Hurricane season is open. The ABC7 story is five months old and still the cleanest consumer explanation in English. The statutory clocks (75 / 120 / 60) mean every letter creates a forced session of paperwork. We sell the session.

## Why it might not

- Most 2024 nonrenewals may be catastrophe exits, not photo fights. Then ICP #1 is smaller than it feels.
- Free tier + watermark may be enough for a one-time panic (one case, five exhibits). That is why the kill number is 25, not 250.
- Honor-system license + no checkout = this package cannot take a dollar until a human finishes two forbidden steps.
- A competent clone is a weekend.

## Local verification (2026-08-20)

`python3 04-product/test_eavefile.py` — static + Chromium e2e, all green. Screenshots of the site and a demo case (Santa Ana / State Farm / 56 days / demand letter) are in this folder: `website-home.png`, `app-home.png`, `app-case.png`, `app-letter.png`.

## Two gaps before anyone can pay (same honesty as the prior run)

1. **No payment processor.** Guardrail forbade paid signups. The owner wires checkout.
2. **License is client-side.** `EF1-` + checksum. It is a commercial gesture, not DRM. Explained in the product README.

## What would change my mind

If, after launch, every inbound is “the company left Florida, what do I do,” we built a packet for the wrong slice. Pivot to placement (agents, FAIR, surplus lines) or stop. Do not add features to avoid that sentence.
