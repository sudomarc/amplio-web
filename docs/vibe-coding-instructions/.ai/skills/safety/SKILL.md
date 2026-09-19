---
name: safety
description: This skill should be used before destructive, privileged, irreversible, credential-affecting, production-impacting, or remote-execution actions.
---

# Safety Skill

## Trigger Examples

Recursive deletion, force push, hard reset, branch deletion, production data mutation, destructive migration, privilege escalation, secret rotation, firewall changes, downloaded-command execution, and broad permission changes.

## Workflow

1. Identify the exact action.
2. Identify the target and scope.
3. Determine whether it is reversible.
4. Check authorization.
5. Prefer a dry run or read-only inspection.
6. Minimize scope.
7. Create a rollback or recovery path when possible.
8. Confirm before execution when required.

## Hard Stop

Never execute `rm -rf` on an uncertain path, `git push --force` on shared history, destructive SQL without validated scope, or arbitrary `curl | bash` without explicit trusted-source authorization and a safer reviewed alternative.

## Reference

- `references/dangerous-actions.md`
- `references/safe-shell-patterns.md`
