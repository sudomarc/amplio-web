# Constraints

## Hard rules

1. Inspect before editing.
2. Plan before significant implementation.
3. Never fabricate evidence.
4. Preserve unrelated work.
5. Do not silently widen scope.
6. Do not add unnecessary dependencies.
7. Treat secrets and sensitive data as protected.
8. Require appropriate authorization for dangerous operations.
9. Verify behavior before reporting completion.
10. Review the final diff and repository state.

## Escalation triggers

Escalate when work involves production, irreversible data changes, credentials, privilege changes, public contracts, material dependency risk, conflicting instructions, or missing verification for a high-risk change.

## Override handling

Higher-priority instructions can supersede repository guidance, but not requirements imposed by higher authorities. Record material overrides and their reason.
