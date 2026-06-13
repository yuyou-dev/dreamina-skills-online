# Project Context

## Background

`dreamina-skills-online` started as a migration target for selected capabilities from the SVT jewelry skill repository into Dreamina online custom skills.

The original goal was to create an online Dreamina version of jewelry design workflows. Through testing, the project expanded into several independent skills:

- a jewelry ecommerce material skill;
- a professional jewelry design skill;
- a talk-show video skill;
- a standalone large-batch execution skill.

## Dreamina Online Constraints

The working assumption for installable skills:

- The user may paste or install one Markdown skill at a time.
- A skill may not reliably read sibling Markdown files.
- A skill should not depend on repo-local references at runtime.
- Therefore every installable skill must include the rules it needs inside the file itself.

Project support docs can reference each other because they are for maintainers, not for Dreamina runtime.

## Dreamina Tool Surface

The uploaded Dreamina custom skill guide describes these tools:

- `text2image`
- `image2image`
- `foreground_segmentation`
- `image_super_resolution`
- `text2video`
- `image2video`
- `start_end2video`
- `multi_frame2video`
- `multi_modal2video`
- `video_editor`
- `generate_form_for_info_collection`
- `creation_agent_search`

Some Dreamina examples mention `text2image_v3` and `image2image_v3`. Skills may mention v3 variants when useful, but should still stay compatible with the generic tool names.

Default model policy:

- Video tasks use `seedance2.0fast_vip` by default.
- Image tasks use the 4.7 model 2k version by default.
- If the user explicitly specifies a model version, use the user-specified version instead of the default.

## Design Principles

### Self-Contained Skill Files

Installable skills must not say:

- "read README"
- "see CHAIN_BATCH_EXECUTION.md"
- "refer to presets/"
- "as tested, Dreamina cannot..."

Instead, write the executable rule directly in the skill:

- "先生成任务清单"
- "每个任务使用稳定 job_id"
- "视频分段完成后调用 `video_editor`"

### Runtime Language

Skill text should read like operational instructions inside Dreamina:

- when to trigger;
- what fields to extract;
- when to ask the user;
- which tool to call;
- what defaults to use;
- how to verify quality.

Avoid project-management narration inside installable skills.

### Chain Completion

Complex workflows should not stop at intermediate outputs:

- product images should continue into video when video is requested;
- generated segments should continue into `video_editor`;
- batch plans should continue into current-batch execution packages;
- failed items should keep their IDs and retry status.

### Quantity Integrity

For counted work, counts are binding:

- N designs means N `design_id`s;
- N SKUs means every SKU gets its expected slot count;
- N video segments means every segment reaches `done` or `failed`;
- `missing_count > 0` means the delivery is incomplete.

## Current Skills

### JewelryDesignSkills.md

Purpose:

- professional jewelry design;
- high-quality product images;
- batch design;
- reference/stone/sketch transformation.

Recent direction:

- richer prompt density;
- preserved main stone/color/cut/proportion;
- default image generation on the 4.7 model 2k version unless the user specifies another model;
- category mix;
- three embedded style presets:
  - saturated high jewelry suite;
  - light gold daily fine jewelry;
  - Japanese antique fine jewelry.

### 珠宝电商素材Skill.md

Purpose:

- product listing material;
- Amazon 9 images + video;
- Shopify/Tmall/Xiaohongshu presets;
- image, copy, video, quality checks.
- default image generation on the 4.7 model 2k version and default video generation on `seedance2.0fast_vip`.

### 脱口秀视频Skill.md

Purpose:

- uploaded character image or video reference;
- topic prompt;
- script confirmation;
- `seedance2.0fast_vip` segmented generation;
- default keyframe/cover image generation on the 4.7 model 2k version;
- `video_editor` final assembly.

### 大批量执行Skill.md

Purpose:

- planning skill for large projects;
- manifest, counts, dependencies, batching, concurrency;
- default model assignment for image and video jobs;
- output execution packages for another skill.

## Future Iteration Ideas

- Add more jewelry design presets into `JewelryDesignSkills.md` directly when they are core.
- Add separate installable skills for large domains instead of overloading existing files.
- Build a small validation script only if the repo grows enough to need mechanical checks.
- Keep README concise and move detailed maintenance notes here.
