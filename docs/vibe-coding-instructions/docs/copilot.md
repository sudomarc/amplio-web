# GitHub Copilot Compatibility

GitHub documents repository-wide instructions in `.github/copilot-instructions.md`, path-specific instruction files under `.github/instructions/**/*.instructions.md`, prompt files, and agent instructions such as `AGENTS.md` and `CLAUDE.md` for supported agent surfaces.

This repository uses those mechanisms conservatively: repository-wide rules remain short, path-specific rules contain language-specific guidance, and deeper policy remains under `.ai/`.

Copilot may not follow custom instructions deterministically in every interaction. Therefore instruction files should supplement, not replace, real verification.

Sources: `docs/sources.md`.
