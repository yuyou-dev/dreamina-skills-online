# Project Context

## Background

`dreamina-skills-online` started as a migration target for selected capabilities from the SVT jewelry skill repository into Dreamina online custom skills.

The original goal was to create an online Dreamina version of jewelry design workflows. Through testing, the project expanded into several independent skills:

- a jewelry ecommerce material skill;
- a professional jewelry design skill;
- a choice-driven jewelry design evolution skill;
- a talk-show video skill;
- a cinematic storyboard and Seedance video generation skill;
- a Xiaohei-style Chinese article illustration skill;
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
- `影视镜头生成Skill.md` is an explicit exception: image tasks use `seedream4.7` by default and video tasks use `seedance2.0mini` by default.

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
- structured prompt specs that separate task goal, input role, invariants, allowed changes, construction, material craft, rendering, and negative constraints;
- white-background single-product output as the default for jewelry style design tasks;
- category mix;
- embedded style and craft presets:
  - saturated high jewelry suite;
  - light gold daily fine jewelry;
  - Japanese antique fine jewelry;
  - gold filigree craft;
  - chiseled relief gold;
  - heritage matte 24K gold;
  - 3D hard gold;
  - Italian antique high jewelry.

### 珠宝电商素材Skill.md

Purpose:

- product listing material;
- Amazon 9 images + video;
- Shopify/Tmall/Xiaohongshu presets;
- image, copy, video, quality checks.
- default image generation on the 4.7 model 2k version and default video generation on `seedance2.0fast_vip`.
- slot-level prompt specs that preserve product identity while changing only the current ecommerce slot requirement.

### 珠宝设计进化Skill.md

Purpose:

- choice-driven jewelry evolution;
- base image structure lock;
- 4 / 8 branch evolution matrix;
- element, morphology, style, material, fidelity, intensity, and fusion controls;
- one-pass delivery with candidate review, finalization suggestions, and no follow-up handoff.
- structured candidate prompt specs with explicit preserve/change/rendering/negative fields.

### 脱口秀视频Skill.md

Purpose:

- uploaded character image or video reference;
- topic prompt;
- script confirmation;
- `seedance2.0fast_vip` segmented generation;
- default keyframe/cover image generation on the 4.7 model 2k version;
- `video_editor` final assembly.

### 影视镜头生成Skill.md

Purpose:

- cinematic storyboard reference image generation;
- shot language planning for ads, drama, product videos, interior walkthroughs, food documentary, action chase, POV, sci-fi reveal, and social UGC;
- default image generation on `seedream4.7`;
- default video generation on `seedance2.0mini`;
- quality gates for brief intake, storyboard prompt, storyboard image, Seedance prompt, video output, and final delivery;
- repair prompts for storyboard-grid capture, identity drift, product deformation, random camera motion, excessive action, malformed text, discontinuity, and low-light failure.

### 小黑怪诞正文配图Skill.md

Purpose:

- Chinese article body illustrations;
- single-concept illustration and article shot-list planning;
- Ian Xiaohei style adaptation with attribution;
- 16:9 white-background hand-drawn illustration prompts;
- recurring Xiaohei IP role, visual DNA, composition types, metaphor invention rules, anti-copy rules, and QA checks;
- default image generation on the 4.7 model 2k version unless the user specifies another model.

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
