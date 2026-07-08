# Changelog

## 2026-07-08

- Added `Seedance2.5创作大师Skill.md` as a standalone installable Dreamina skill.
- Captured complete Seedance 2.5 official showcase prompts in `SEEDANCE25_PROMPT_RESEARCH.md`:
  - 29 full prompt strings from the official page's rendered content, async component data, and official text data;
  - model signals including 30-second narrative, full-modal reference expansion, controlled editing, multilingual presentation, 4-30 second duration, 24fps, and video-editing support;
  - prompt pattern summary for time-axis beats, visual throughline locks, reference binding, second-level shot control, controlled edits, materials, physics, and multilingual text.
- The new skill covers Seedance 2.5 long video creation, multi-reference video, text-to-video, image-to-video, controlled video editing, multilingual text video, QA gates, repair rules, and final delivery.
- Set the new skill's default video model to Seedance 2.5 / `seedance2.5` / the platform's corresponding Seedance 2.5 video model; reference-image tasks default to the 4.7 model 2k version unless the user specifies another model.
- Updated project indexes and context docs to list the new active skill and research document.
- Added `Seedance2.5天马行空Skill.md` as a standalone installable Dreamina skill for extreme-imagination Seedance 2.5 video generation.
- The new wild skill covers 30-second surreal video concepts, up to 50 reference assets, layered reference star maps, deep mutation editing, impossible-rule prompt design, extreme-scene templates, QA gates, failure-type repair, and overload degradation.
- Updated project indexes and context docs to list the new wild Seedance 2.5 skill and its model defaults.

## 2026-06-29

- Added `小黑怪诞正文配图Skill.md` as a standalone installable Dreamina skill.
- Adapted the Ian Xiaohei article-illustration method into a single-file Dreamina workflow:
  - article digestion and cognitive-anchor extraction;
  - shot-list planning for one or more body illustrations;
  - Xiaohei IP rules, visual DNA, composition types, metaphor invention, and anti-copy constraints;
  - `text2image` / `image2image` generation branches;
  - QA gates and repair rules for over-formal diagrams, decorative Xiaohei, excessive text, unclear metaphors, and bad Chinese labels.
- Set the new skill's default image model to the 4.7 model 2k version; user-specified model versions still override the default.
- Updated project indexes to list the new active skill.

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
- Tightened `影视镜头生成Skill.md` after online testing:
  - explicitly forbids falling back to 5.0 / latest / auto-upgraded image models when the user has not specified a model;
  - requires `seedream4.7` / 4.7 to be selected in image tool parameters;
  - treats storyboard images as intermediate artifacts when the user requested video;
  - caps each Seedance 2.0 generation task at 15 seconds;
  - makes single-video generation the default and treats 9 / 16 / 25 panel storyboards as rhythm references, not automatic multi-video splits.
- Refined the cinematic skill's storyboard strategy:
  - panel count now represents rhythm density and visual guidance, not video duration;
  - 9 / 16 / 25 panel storyboards can drive one high-density Seedance video;
  - multi-video generation is only used when the user explicitly asks for multi-segment output or post-production assembly.

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
