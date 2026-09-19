---
name: verification
description: >
  Use when deciding whether a change is actually verified, selecting evidence, validating completion, or reporting residual uncertainty.
---

# Verification Skill

## When to Use

Use before declaring meaningful work complete, after fixing failures, or whenever evidence must be mapped to a requirement.

## When Not to Use

Do not use as a substitute for the domain-specific testing, security, release, or database skill when those provide the required verification procedure.

## Workflow

1. Translate requirements into observable claims.
2. Select the smallest check that can falsify each important claim.
3. Execute the check and preserve concrete evidence.
4. Classify results as verified, failed, skipped, blocked, or inconclusive.
5. Inspect the final diff and repository state.
6. Report residual uncertainty.

## Decision Rules

- Verification must match risk.
- A passing narrow test is evidence for that behavior, not universal proof.
- Never substitute model confidence for executed evidence.
- Production health requires production/runtime evidence when claimed.

## Checklists

- [ ] Requirements mapped to checks.
- [ ] Relevant commands actually executed.
- [ ] Results inspected.
- [ ] Failures and skipped checks disclosed.
- [ ] Final diff/status reviewed.

## Verification

Use the evidence matrix and completion gates. Keep command output, test names, runtime observations, or other reproducible evidence where useful.

## Failure Modes

Test theater, overclaiming, checking the wrong environment, ignoring flaky results, and treating absence of errors as proof of correctness.

## Reference Files

- `references/evidence-matrix.md`
- `references/completion-gates.md`

## Examples

- `examples/verification-report.md`
