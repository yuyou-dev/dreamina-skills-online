# Changelog

## 2026-06-25

- Added `影视镜头生成Skill.md` as a standalone installable Dreamina skill.
- The new skill turns cinematic and commercial video briefs into a complete chain:
  - input normalization and task routing;
  - 2-3 creative directions with a stable default route;
  - storyboard reference image prompts and QA;
  - Seedance prompt construction and video generation;
  - video QA, failure-type repair, and final `video_editor` delivery.
- Embedded cinematic shot language, storyboard layouts, reference-image strategies, quality gates, repair prompts, and scenario templates.
- Set the skill-specific defaults to image model `seedream4.7` and video model `seedance2.0mini`; user-specified model versions still override defaults.

## 2026-06-23

- Added `JEWELRY_PROMPT_RESEARCH.md` to summarize designer-authored jewelry prompt patterns and OpenAI image prompting patterns for maintainers.
- Strengthened jewelry prompt construction across installable skills:
  - added structured prompt specs for task goal, input role, preserve/change rules, construction, material craft, rendering, and negative constraints;
  - made white or very light gray single-product backgrounds the default for jewelry style design tasks unless the user requests ecommerce, campaign, wearing, packaging, or scene backgrounds;
  - added craft/style rules for gold filigree, chiseled relief gold, heritage matte 24K gold, 3D hard gold, and Italian antique high jewelry;
  - added ecommerce slot-level prompt templates that preserve product identity while changing only slot-specific presentation.
- Started local Codex plugin packaging for `dremina-skill-market` as an application-level Dreamina skill market that can pair with the existing `dreamina` CLI plugin.

## 2026-06-14

- Added `珠宝设计进化Skill.md` as a standalone installable Dreamina skill.
- The new skill turns jewelry evolution theory into a choice-driven workflow:
  - base image structure lock;
  - selectable fidelity, intensity, fusion strategy, element theme, morphology, style, and material;
  - 4 / 8 candidate evolution matrix;
  - candidate review and finalization suggestions.
- Revised `珠宝设计进化Skill.md` after online testing:
  - removed follow-up evolution flows;
  - changed the end state to one-pass delivery with candidate review;
  - kept only finalization actions such as super-resolution, detail suggestions, design archive, and ecommerce handoff.
- Updated project indexes to list the new active skill.

## 2026-06-13

- Added global default model rules across installable skills:
  - video tasks default to `seedance2.0fast_vip`;
  - image tasks default to the 4.7 model 2k version;
  - user-specified model versions override these defaults.
- Added model fields to batch planning and execution package templates.

## 2026-06-10

- Enriched `JewelryDesignSkills.md` with high-density jewelry prompt fields:
  - input source handling;
  - locked reference rules;
  - category mix;
  - design density;
  - main stone and secondary stone planning;
  - render style and negative constraints.
- Added embedded jewelry design presets:
  - `saturated_high_jewelry_suite`;
  - `light_gold_daily_fine_jewelry`;
  - `japanese_antique_fine_jewelry`.
- Reworked installable skill wording to remove meta-commentary and align with Dreamina runtime style.
- Added `大批量执行Skill.md` as a standalone, self-contained planning skill for large batch projects.
- Strengthened batch, chain, concurrency, and quantity-integrity rules across skills.

## 2026-06-06

- Added `脱口秀视频Skill.md` for uploaded character to talk-show video workflows.
- Added default `seedance2.0fast_vip` segmented generation and `video_editor` assembly rules.

## 2026-06-05

- Split the original single skill into:
  - `珠宝电商素材Skill.md`;
  - `JewelryDesignSkills.md`.
- Clarified ecommerce versus design responsibilities.
- Added early batch and chain guidance.

## 2026-06-04

- Created the repository.
- Added the first Dreamina online jewelry ecommerce skill draft.
