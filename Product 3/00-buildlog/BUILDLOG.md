# Build log — Jobfold

## Question: What painful problem is narrow enough to solve locally?

**Decision:** contractor change-order documentation, not generic project management. Research showed that contractor/freelancer communities describe the same failure mode: small added requests become unpaid work because the price and approval are not put in writing before work begins. The product is intentionally a single action at that moment.

## Question: Why not build a full signing or payments platform?

**Decision:** it would need cloud identity, delivery, audit, and legal/compliance work, which conflicts with a useful no-account MVP. Jobfold documents an acknowledgment and produces a printable record; it never claims that its canvas signature is legally binding.

## Question: Why local-first and one-time pricing?

**Decision:** a change order is a document a contractor should retain with the job. Local storage, PDF printing, and JSON backup create immediate value without hosting cost or a customer portal. The $79 license is a testable pricing hypothesis, not a verified willingness-to-pay claim.

## Question: Why this product instead of the researched chargeback-evidence vault?

**Decision:** the evidence-vault research was strong, but Jobfold makes the same prevention principle concrete in a smaller first product: a documented scope, price, photos, and acknowledgment before a dispute exists. This is an inference from the documented workflow advice, not a claim that Jobfold prevents chargebacks.

## What was deliberately cut

Cloud sharing, email delivery, legal e-signing, payments, GPS capture, multi-user sync, and automatic contract analysis. These need service infrastructure or legal verification beyond this local build.
