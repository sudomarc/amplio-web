# Workflow

## REQUEST

Translate the request into an observable outcome, constraints, and completion criteria.

## UNDERSTAND

Separate facts, assumptions, unknowns, conflicts, and user decisions.

## INSPECT

Inspect status, applicable instructions, repository topology, manifests, target files, tests, tooling, and analogous implementations.

## CLARIFY / ASSUME

Clarify only decisions that materially change the result. Otherwise make the smallest safe assumption and state it.

## PLAN

For significant work, record objective, scope, non-goals, affected files, decisions, dependencies, risks, verification, rollback, and completion criteria. Trivial work may use a one-line plan.

## IMPLEMENT

Use logical batches. Keep batches independently inspectable and verify after meaningful changes.

## TEST

Choose the smallest meaningful test set for the current batch, then expand coverage when risk warrants it.

## REVIEW

Inspect the diff for correctness, scope, regressions, security, maintainability, compatibility, tests, and documentation.

## VERIFY

Use concrete evidence and distinguish `VERIFIED` from `UNVERIFIED`. Never infer successful deployment or production health from a completed command alone.

## DOCUMENT

Update only documentation made stale or required by the change. Record decisions and non-obvious constraints.

## REPORT

Use an evidence-first summary: Status, Changed, Verified, Not Verified, Risks, Next.

## Stop conditions

Stop before editing when target location is unknown, a material instruction conflict exists, architecture is insufficiently understood, or high-risk authorization is missing.
