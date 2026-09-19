# Codex Compatibility

Codex recognizes `AGENTS.md` as project guidance and applies scoped instruction files according to repository location. This repository therefore keeps the canonical policy in the root `AGENTS.md` and supports deeper local instructions when a target repository needs them.

For Codex tasks, the recommended practice is to inspect the applicable `AGENTS.md` files, project documentation, and repository tooling before editing. Use `.ai/skills/` as a modular policy library rather than assuming every skill is automatically loaded.

OpenAI's public Codex source describes directory-scoped `AGENTS.md` discovery and precedence behavior. The OpenAI Cookbook also presents persistent planning documents and iterative development workflows as practical conventions rather than mandatory Codex file requirements.

Sources: `docs/sources.md`.
