# AGENTS.md

## Project Role

This public repository maintains Dreamina Web custom skills as independent Projects. The installable artifact for every Project is exactly one self-contained Markdown file under `projects/<id>/skill/`.

## Read First

Before significant edits, read:

- `README.md`
- `docs/project-context.md`
- `docs/architecture.md`
- the target Project's `project.json`, `skill/*.md`, and `tests/cases.json`
- `CHANGELOG.md`

For imports, also read `docs/cross-platform-migration.md` and the target Project's source audit. Read knowledge references only when the current Project lists them in `knowledgeRefs`.

## Editing Rules

1. Keep every installable Skill self-contained. Runtime rules must not depend on Project references, repository docs, knowledge files, or another Skill.
2. Use only `name` and `description` in frontmatter, followed immediately by an H1 identical to `name`.
3. Write runtime-ready language: trigger boundary, interaction phase, execution phase, required-field handling, explicit tools, branches, quality gates, retry policy, and final output.
4. Use the official tool names recorded in `knowledge/official/dreamina-web-skill-guide/contract.md`.
5. Preserve parameter precedence: user request > panel/session defaults > Skill defaults > tool constraints > general fallback.
6. For counted work, preserve stable IDs and requested/planned/done/failed/missing counts.
7. For video references, enforce no BGM before final `clip_join`, delayed aspect-ratio collection, and correct subject/resource binding.
8. Add or update behavioral cases in `tests/cases.json` whenever Skill behavior changes.
9. Keep source provenance in `project.json`; imported Projects also need `references/source-audit.md`.
10. Prefer simple repository-wide validation over Project-specific scripts.

## Validation

Before finishing, run:

```bash
npm test
git diff --check
rg "技能名称:|技能描述:|video_editor|text2image_v3|image2image_v3|README|CHAIN_BATCH|本仓库" projects/*/skill/*.md
git status --short
```

The `rg` command should return no installable-Skill hits. Generated media and real Dreamina execution are not part of the repository test suite.

## Git

Commit focused changes and push to <https://github.com/yuyou-dev/dreamina-skills-online>. Do not modify source repositories used for read-only migration research.
