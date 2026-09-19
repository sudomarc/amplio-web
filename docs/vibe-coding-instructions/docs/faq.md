# FAQ

## Why require a plan for tiny changes?
Because the plan scales with complexity. A tiny change still benefits from an explicit expected outcome and verification.

## Does this mean the agent must ask permission before every edit?
No. Approval depends on the host workflow. The invariant is that a plan exists; an explicit direct-execution authorization can remove a separate approval checkpoint.

## Why progressive disclosure?
Loading every rule and example into every task wastes context and increases instruction collisions. Core policy is durable; skills and references are selective.

## Why have both AGENTS.md and CLAUDE.md?
They serve different ecosystem conventions. `AGENTS.md` is the canonical policy in this repository; `CLAUDE.md` is a compatibility entry point for Claude Code and other clients that recognize it.

## Is this an Anthropic or OpenAI official standard?
No. It is an original repository that synthesizes public patterns from multiple ecosystems. See `docs/sources.md`.

## Should every skill contain everything?
No. Keep `SKILL.md` focused on triggers, workflow, checks, and navigation. Put detailed material in references and concrete patterns in examples.

## Can the agent work autonomously?
Only within the permissions and approvals of the host environment. Autonomy does not remove the need for planning, safety, and verification.

## Why distinguish severity and confidence?
A low-confidence suspicion should not be presented as a critical defect. Severity and confidence answer different questions.

## What if a test cannot run?
State the environmental limitation. Use available alternative evidence, but do not describe the behavior as verified by the unavailable test.

## What if instructions conflict?
Apply higher-priority and more-specific rules. If the conflict remains material, stop and surface it.

## How should production work differ?
Production, data, credential, infrastructure, and release changes require stronger verification, explicit scope, and clearer rollback or containment plans.

## Can this repository be copied into any project?
As a baseline, yes. Then adapt project-specific commands, architecture, languages, deployment rules, security requirements, and ownership conventions.

## What is the master prompt for?
It provides a single portable operating prompt for hosts that cannot consume a repository of modular instructions.

## Does this force chain-of-thought disclosure?
No. The system asks for concise reasoning summaries, assumptions, evidence, and decisions rather than private chain-of-thought.
