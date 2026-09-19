---
name: agent-orchestration
description: This skill should be used when a task benefits from multiple specialized agents, parallel analysis, delegated review, or explicit agent handoffs.
---

# Agent Orchestration Skill

Use multiple agents only when decomposition creates real independent value. Keep one agent responsible for final integration. Give each delegate a narrow scope, inputs, expected output, and stop condition. Do not allow parallel agents to make overlapping writes without coordination.

## Web routing

- Visual redesign: `ui-reviewer` + `visual-qa`
- Responsive layout: `responsive-reviewer` + `visual-qa`
- Accessibility-sensitive UI: `accessibility-reviewer`
- Forms or auth: `forms-ux-reviewer` + `accessibility-reviewer` + `browser-tester`
- Shared components: `component-reviewer` + `ui-reviewer`
- Next.js rendering or cache behavior: `nextjs-specialist` + `performance-auditor`
- Public/indexable pages: `seo-auditor` + `performance-auditor`
- Browser-facing security: `web-security-reviewer`

## Delegation contract

Every delegate receives role, exact scope, relevant files or diff, required inputs, output format, permissions, and stop condition. Run independent read-only reviews in parallel only when the host can isolate them safely. The primary agent remains responsible for final integration.

Useful reviewer roles include correctness, tests, error handling, types, security, comments, and simplification. This mirrors the specialization pattern demonstrated in Anthropic's public PR review tooling while keeping the implementation repository-neutral.

References: `references/delegation.md`, `references/parallel-review.md`, `examples/delegated-review.md`.
