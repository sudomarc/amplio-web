# Vibe Coding Instructions

A repository-native instruction system for disciplined AI coding agents, with a controlled evidence-driven self-improvement loop.

## Why this exists

AI coding agents are capable of producing large changes quickly. The failure mode is not only bad code. It is also premature coding, misunderstood architecture, silent scope expansion, unverifiable claims, dependency drift, accidental destructive actions, and loss of context across sessions.

This repository turns those concerns into a layered operating system:

## Web development and design layer

The framework now separates web concerns that benefit from independent reasoning: design direction, design systems, responsive behavior, motion, forms UX, accessibility, browser QA, performance, SEO, browser-facing security, and Next.js-specific work.

Provider-neutral primary and specialist agent profiles live under `.ai/agents/`. The intended pipeline is `DESIGN DIRECTION → ARCHITECTURE → IMPLEMENT → BROWSER VERIFY → SPECIALIST REVIEW → FINAL DIFF`. Specialists are routed by changed surface and risk rather than invoked indiscriminately.

- always-on core policy for identity, mindset, workflow, communication, and constraints;
- task-specific skills for planning, implementation, debugging, review, security, testing, and engineering domains;
- references for detailed procedures and edge cases;
- examples and templates for progressive disclosure;
- compatibility guides for Codex, Claude Code, ChatGPT Projects, and GitHub Copilot;
- a master prompt for hosts that cannot reliably load modular repository instructions;
- a controlled self-improvement system that collects evidence, detects recurrence, proposes bounded changes, validates them, and records outcomes.

## Core philosophy

### Plan before code

Every implementation begins with an observable goal, bounded scope, known constraints, and a verification strategy. Tiny changes use tiny plans; complex changes use living plans.

### Verify, do not assume

Use repository tools, tests, type checks, linters, builds, diffs, and runtime checks as evidence. Do not replace evidence with confidence.

### Surface uncertainty

State unknowns, assumptions, conflicting evidence, and unverified behavior explicitly.

### Preserve human control

Self-improvement is controlled evolution, not unrestricted self-modification. Confidence never authorizes a change to governance.

## Self-improvement system

```text
REAL-WORLD USE
      ↓
OBSERVE / COLLECT
      ↓
ANALYZE / CLASSIFY
      ↓
ROOT-CAUSE HYPOTHESIS
      ↓
PROPOSE
      ↓
VALIDATE
      ↓
APPROVE* / APPLY
      ↓
TEST / REGRESSION CHECK
      ↓
MEASURE
      ↓
RECORD OUTCOME
      └──────────────→ NEXT CYCLE

* Human approval is mandatory for governed changes.
```

### Evidence and memory

The durable record store lives in `.ai/self-improvement/records/`:

- `observations/` stores evidence and recurrence classification;
- `proposals/` stores bounded changes, risks, and validation plans;
- `outcomes/` stores post-change measurements and regression results.

The periodic collector at `scripts/self_improvement_cycle.py` produces transient evidence artifacts (`cycle-report.json` and `cycle-report.md`). It does not decide that a rule should change.

### Anti-drift

The system explicitly supports `ADD`, `REMOVE`, `MERGE`, `SIMPLIFY`, and `REPLACE`. A useful improvement can be deletion or consolidation rather than another rule.

## GitHub integration

The repository contains the repository-level Custom Agent profile at `.github/agents/self-improvement.agent.md`. GitHub's current documentation supports repository custom agents under `.github/agents/` and `.agent.md` profiles with YAML frontmatter:

https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents
https://docs.github.com/en/copilot/reference/custom-agents-configuration

A weekly GitHub Actions workflow at `.github/workflows/self-improvement.yml` runs deterministic collection, stores the run evidence as an artifact, and creates an issue when candidate signals are found. When `COPILOT_GITHUB_TOKEN` is configured, the workflow can additionally invoke the custom agent in an isolated branch and open a draft pull request after validation. GitHub documents Copilot CLI automation from Actions and recommends minimal tool permissions in automated runs:

https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/automate-with-actions
https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/run-cli-programmatically

Because this is a user-owned repository, the organization-only built-in `GITHUB_TOKEN` Copilot billing path cannot be assumed. The documented personal-token route is `COPILOT_GITHUB_TOKEN`; configuring that secret and an eligible Copilot plan is an external prerequisite that this repository cannot verify by itself:

https://docs.github.com/en/copilot/how-tos/github-agentic-workflows/creating-github-agentic-workflows
https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli

The workflow uses weekly scheduling plus manual dispatch. GitHub Actions supports scheduled workflows and `workflow_dispatch`; scheduled workflows run from the latest commit on the default branch:

https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax

## Validation

The framework validator is `scripts/validate_instructions.py`. It checks required paths, governance markers, Markdown links, the Custom Agent contract, and explicit workflow permissions. The self-improvement workflow runs this validator before opening an automated draft PR.

## Using it in another repository

Copy the policy entry files and the `.ai/` directory into the target repository. Preserve paths so references remain valid. Then adapt only project-specific sections such as runtime, framework, commands, architecture, branching, tests, deployment, and ownership.

Do not blindly copy project-specific rules from this repository into another project. This repository defines a general operating system, not application-specific truth.

## What this repository does not guarantee

It does not guarantee perfect agent behavior. Instruction-following is probabilistic, tools vary, repositories contain ambiguous requirements, and validation has blind spots. The purpose is to make decisions, evidence, changes, and uncertainty reviewable.

## Further reading

Start with `.ai/self-improvement/daily-cycle.md`, `MASTER-PROMPT.md`, `AGENTS.md`, and the relevant skill. For source attribution of the framework's public design references, see `docs/sources.md`.
