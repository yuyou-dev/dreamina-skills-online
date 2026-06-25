---
技能名称: 影视镜头生成Skill
技能描述: 影视分镜与 Seedance 视频生成复合技能。用于广告片、剧情短片、产品广告、空间漫游、食物纪录片、动作追逐、武侠动作、POV 探索、科幻揭示、口播/UGC、图生视频、分镜图转视频、多参考图转视频等任务。用户给一句影视镜头需求、上传参考图或要求生成连续镜头时，先生成可控分镜参考图，再默认使用 seedance2.0mini 生成视频，最后进行视频质量检查与必要修复。图片默认模型必须选择 seedream4.7 / 4.7，不使用 5.0、Seedream 5.0、最新默认模型或自动升级模型；用户明确指定图片或视频模型版本时按用户指定执行。
---

技能内容：

分为**交互阶段**和**执行阶段**。交互阶段把用户需求规范化为影视镜头 brief；执行阶段按“分镜参考图 → 分镜 QA → Seedance 视频生成 → 视频 QA / 修复 → 最终交付”的链路执行。

链式调用要求：每个复杂任务都必须写明下一步工具和输入素材。用户要求视频时，分镜图只是中间参考素材，不是最终交付；分镜图通过 QA 后必须继续生成 Seedance prompt 并调用视频工具。分镜图未通过质量检查时，不得进入视频生成。视频生成失败时按失败类型修复，不得无诊断重跑。

默认模型要求：

- 图片生成默认使用 `seedream4.7` / 4.7，必须在图片工具参数中显式选择该模型。
- 视频生成默认使用 `seedance2.0mini`。
- 用户明确指定图片模型或视频模型版本时，按用户指定执行。
- 不得把图片模型自动升级为 5.0、Seedream 5.0、最新模型或平台智能默认模型，除非用户明确指定 5.0。
- Seedance 2.0 系列单次视频生成最长 15 秒；超过 15 秒必须拆成多个 5-8 秒或不超过 15 秒的分段，再用 `video_editor` 拼接。

## 一、触发范围

### 1.1 应使用本技能的情况

- 用户要求生成影视分镜、电影感短片、广告片、产品视频、剧情短片、空间漫游、动作追逐、科幻揭示、食物纪录片、POV 探索、口播/UGC 或社媒短视频。
- 用户上传一张或多张参考图，希望转成连续视频镜头。
- 用户要求先做分镜图、故事板、镜头脚本、shot list，再生成 Seedance 视频。
- 用户只给一句需求，例如“做一个 15 秒高端运动鞋未来感广告”“把这个空间做成镜头漫游”“用这张产品图生成 12 秒商业视频”。
- 用户强调一致性，例如角色一致、产品形态不变、空间连续、品牌调性稳定、镜头运动可控。

### 1.2 不应使用本技能的情况

- 用户只需要静态海报、单张图片、纯文案或脚本，不需要视频链路。
- 用户要求伪造现实人物的误导性发言、新闻事件、违法危险行为、仇恨骚扰、露骨色情或其他不适合生成的视频内容。
- 用户需要大批量跨 SKU / 跨项目执行，且核心问题是数量守恒、分批、并发和重试；此时优先使用批量规划技能，再把单个视频任务交给本技能。

## 二、工具映射

| 工具名 | 本技能用途 | 下一步 |
|---|---|---|
| `generate_form_for_info_collection` | 当核心主体、目标或必要参考素材缺失且无法推断时收集信息 | 表单完成后进入输入规范化 |
| `creation_agent_search` | 可选：搜索公开风格、产品类别、场景参考或行业视觉语汇 | 搜索结果只作为风格和镜头参考，不编造事实 |
| `text2image` | 无上传图时生成分镜参考图、关键帧、产品/角色母图 | 输出通过分镜 QA 后进入视频 prompt |
| `image2image` | 基于上传角色、产品、空间或草图生成分镜参考图 | 输出通过分镜 QA 后进入视频 prompt |
| `image2video` | 单张分镜图、关键帧或产品图生成短视频 | 适合 5-8 秒、动作较少、主体单一任务 |
| `multi_frame2video` | 多张关键帧按起承转合生成连续视频 | 适合明确 start / middle / end 或多关键帧任务 |
| `start_end2video` | 控制开始帧到结束帧的强连续变化 | 适合空间推拉、产品开合、情绪转折、镜头揭示 |
| `multi_modal2video` | 多参考图 + 文本综合生成视频 | 适合角色/产品/环境/分镜/品牌元素分离的任务 |
| `video_editor` | 拼接多段视频、修剪节奏、合成最终成片 | 所有分段完成后必须调用 |
| `image_super_resolution` | 高清化已通过身份与结构检查的分镜图或关键帧 | 高清图继续作为视频参考图 |

在线版适配：

- 图片工具必须显式选择 `seedream4.7` / 4.7。不要选择 5.0、Seedream 5.0、最新默认模型、自动推荐模型或会自动升级到 5.0 的图片入口。
- 如工具界面存在多个图片入口，只能使用能明确选择 `seedream4.7` / 4.7 的 `text2image` / `image2image` 入口；如果某个 v3 入口默认绑定 5.0 或无法选择 4.7，则不得使用该入口。
- 视频工具默认模型填写 `seedance2.0mini`；若界面展示名不同，选择最接近 Seedance 2.0 Mini 的视频模型。
- 不输出本地命令、任务查询命令或下载命令。

## 三、交互阶段

### 3.1 信息提取

先从用户输入和上传素材中提取字段。

| 字段 | 必填 | 默认值 | 缺失时处理 |
|---|---|---|---|
| 任务类型 | 是 | 自动路由 | 从语义推断；无法判断时按 `cinematic_short` |
| 主体类型 | 是 | 无 | 缺少核心主体且无法从素材推断时，调用 `generate_form_for_info_collection` |
| 视频目标 | 是 | 生成 1 条完整短视频 | 缺失时按“可展示的电影感短视频” |
| 参考素材 | 否 | 无 | 有上传素材则分析其角色、产品、环境、风格特征和素材角色 |
| 参考模式 | 否 | 单分镜图 | 多图时自动分配主体、环境、分镜、品牌元素角色 |
| 时长 | 否 | 12-15 秒 | 短镜头默认 6-8 秒；复杂广告默认 12-15 秒 |
| 画幅 | 否 | 16:9 | 明确短视频、竖屏、口播、社媒时默认 9:16 |
| 风格 | 否 | 电影感、清晰、可控 | 从用户形容词提取；缺失时使用任务类型默认风格 |
| 主体身份锁 | 是 | 自动生成 | 基于素材或描述提取外观、产品形态、材质、颜色、比例 |
| 镜头需求 | 否 | 稳健镜头组合 | 用户指定运镜时遵循；高风险运镜需加强约束 |
| 风险点 | 否 | 自动识别 | 产品变形、角色漂移、低光、快速动作、文本、logo、复杂转场 |
| 输出目标 | 否 | 完整视频 + 过程分镜图 + QA 摘要 | 用户只要 prompt 时仅输出 prompt 与 QA；用户要求视频时不得停在分镜图 |
| 图片模型 | 否 | `seedream4.7` | 用户指定时按指定 |
| 视频模型 | 否 | `seedance2.0mini` | 用户指定时按指定 |

### 3.2 必要追问规则

只在以下情况追问：

- 没有主体描述，也没有可分析的参考素材。
- 用户要求还原某个具体产品、角色或空间，但没有提供足够身份信息。
- 用户要求品牌 logo、文字、字幕或 UI，但没有给出准确内容。
- 用户要求多段成片，但没有给出总时长且无法从平台语境推断。

其他字段使用默认值继续执行。

### 3.3 输入规范化输出

```Markdown
# 影视镜头 Brief

| 字段 | 设定 |
|---|---|
| task_type |  |
| subject_type |  |
| duration |  |
| aspect_ratio |  |
| image_model | seedream4.7 |
| video_model | seedance2.0mini |
| single_video_max_duration | 15 秒 |
| reference_mode |  |
| identity_lock |  |
| style |  |
| risk_points |  |
| deliverable |  |
```

## 四、执行阶段

### 4.1 任务路由

根据需求选择任务类型，并绑定默认布局、镜头策略和风险控制。

| task_type | 适用场景 | 默认分镜布局 | 默认镜头策略 | 主要风险 |
|---|---|---|---|---|
| `product_ad` | 商品广告、品牌视频、材质展示 | 4 格或 3x3 | CU / ECU + slow push-in + orbit_arc | 产品变形、logo 乱字、材质漂移 |
| `cinematic_short` | 一句剧情、电影感短片 | 3 格或 4 格 | EWS → MS → CU，慢推或跟拍 | 角色漂移、动作跳跃 |
| `drama_scene` | 情绪表演、对话、人物反应 | 3 格 | MS / MCU / CU，克制运镜 | 表情不稳、多余人物 |
| `interior_walkthrough` | 室内、房产、展厅、空间漫游 | 4 格或 6 格 | WS + first_person / tracking / pull_out | 空间断裂、门窗位置漂移 |
| `food_documentary` | 食物、饮品、料理过程 | 6 格 | CU / ECU 微距、蒸汽、手部动作 | 手部变形、食物状态不连续 |
| `action_chase` | 追逐、跑酷、车辆、赛博动作 | 3x3 或拆段 | tracking / handheld / whip_pan | 动作过猛、方向混乱、低光失败 |
| `martial_arts` | 武侠、格斗、招式、对峙 | 4 格或 6 格 | WS 动作完整 + CU 反应 + orbit_arc | 肢体变形、打击不连续 |
| `pov_horror` | 第一人称探索、惊悚、暗光空间 | 3 格或 4 格 | first_person + subtle handheld | 低光噪声、随机晃动 |
| `sci_fi_reveal` | 科幻奇观、巨物揭示、未来城市 | 3 格或 4 格 | EWS / WS + slow push-in / pull_out | 尺度混乱、特效过载 |
| `social_ugc` | 口播、达人展示、轻剧情短视频 | 3 格 | MS / MCU，稳定机位和轻动作 | 口型、字幕、表情漂移 |

路由规则：

- 主体为商品且用户目标是销售、展示、广告 → `product_ad`。
- 主体为空间且用户提到漫游、看房、走进、展示空间 → `interior_walkthrough`。
- 主体为食物饮品且强调制作、质感、热气、切开、倒入 → `food_documentary`。
- 用户提到追逐、奔跑、打斗、赛博街道、车辆 → `action_chase`，必要时拆成多段 5-8 秒。
- 用户提到科幻、巨构、揭示、舱门、未来城市 → `sci_fi_reveal`。
- 无明确类别但要电影感短片 → `cinematic_short`。

## 五、创意方向生成

进入工具调用前，先生成 2-3 个方向，并默认选择最稳健方向执行。

| 方向 | 用途 | 约束 |
|---|---|---|
| 稳健版 | 默认执行方向 | 主体少、动作少、镜头清晰、可控度高 |
| 电影增强版 | 用户追求质感时使用 | 强化光影、景深、转场和镜头动机 |
| 压力测试版 | 用户明确要复杂动作或强风格时使用 | 可用低光、快节奏、复杂运动，但必须标注风险 |

每个方向包含：

- `logline`：一句镜头概念。
- `visual_concept`：主体、环境、光线、色彩、情绪。
- `storyboard_layout`：3 格、4 格、6 格或 3x3。
- `camera_plan`：镜头尺寸、运镜、转场。
- `risk_level`：low / medium / high。
- `seedance_difficulty`：简单 / 中等 / 困难。

默认执行规则：

- 用户没有明确选择时，执行“稳健版”。
- 如果用户指定“更电影”“更酷”“更炸”，可执行“电影增强版”。
- 只有用户明确要求复杂动作、追逐、强特效、多场景，才执行“压力测试版”。

## 六、分镜参考图

### 6.1 分镜布局选择

| 布局 | 用途 | 建议时长 | 说明 |
|---|---|---|---|
| 单关键帧 | 单镜头图生视频、产品慢镜头 | 5-8 秒 | 适合主体稳定、动作简单 |
| 3 格 | 起承转、剧情短镜头、科幻揭示 | 8-12 秒 | 默认稳健布局 |
| 4 格 | 空间漫游、产品广告、情绪递进 | 10-15 秒 | 平衡细节与连续性 |
| 6 格 | 食物过程、完整动作、广告节奏 | 12-15 秒 | 每格只承载一个动作 beat；超过 15 秒必须拆段 |
| 3x3 | 复杂广告、追逐、压力测试 | 总时长 15-25 秒时必须拆段 | 风险高；拆成多个 5-8 秒分段，单个 Seedance 任务不得超过 15 秒 |

分镜图规则：

- 分镜布局可以规划完整成片，但任何单次 Seedance 2.0 视频生成不得超过 15 秒。
- 规划时长超过 15 秒时，把分镜拆为 `CM-V01`、`CM-V02` 等多个视频分段，每段 5-8 秒或不超过 15 秒。
- 每格只表达一个清晰 beat，不把多个动作塞进同一格。
- 保持主体、环境、光线、色彩连续。
- 不生成文字说明、字幕、台词框、水印、界面元素。
- 如需要箭头，只能极小地放在格间空隙中，不进入电影画面。
- 分镜参考图用于后续 Seedance 理解镜头顺序，不是最终视频画面。

### 6.2 分镜参考图 Prompt 模板

使用此模板生成 `text2image` 或 `image2image` 提示词：

```text
Create a {aspect_ratio} cinematic {layout} storyboard reference sheet for an image-to-video model.

Purpose:
This image will be used as a visual storyboard reference for Seedance 2.0. It should lock character/product identity, environment, lighting, color palette, and shot sequence.

Scene:
{scene_description}

Main Subject:
{subject_description}
Keep the same {identity_lock_attributes} consistent across all panels.

Identity Lock:
- Character or product silhouette:
- Face / product shape:
- Wardrobe / material:
- Main colors:
- Scale and proportion:
- Elements that must not change:

Storyboard Beats, {reading_order}:
Panel 1: {beat_1}
Panel 2: {beat_2}
Panel 3: {beat_3}
Panel 4: {beat_4_if_needed}
Panel 5: {beat_5_if_needed}
Panel 6: {beat_6_if_needed}

Camera Language:
{shot_sizes_and_angles}

Visual Style:
{style_family}, {lighting}, {palette}, {texture}, {lens_feel}, high production quality.

Layout Constraints:
Clean {grid_description}, thin gutters, no captions, no speech bubbles, no watermark, no UI, no extra text. If motion arrows are needed, keep them tiny and only in the gutters, not inside the cinematic frames.

Output:
High-quality video-ready storyboard reference image, {resolution}, {aspect_ratio}.
```

分镜 prompt 阻断规则：

- 生成分镜参考图 prompt 后，先执行 `storyboard_prompt` QA。
- `storyboard_prompt >= 80` 才能进入 `text2image` / `image2image`。
- `storyboard_prompt < 80` 时必须重写 prompt，不能调用图片工具。

### 6.3 分镜工具调用

无上传参考图：

```text
下一步工具: text2image
模型: seedream4.7 / 4.7；用户指定图片模型版本时按用户指定；不得使用 5.0 或自动升级模型
输入素材: 规范化 brief + 分镜参考图 prompt
输出: SB-REF-01 分镜参考图
下一步: 对 SB-REF-01 执行 storyboard_image QA；通过后立即生成 Seedance prompt；`seedance_prompt >= 85` 后调用视频工具；不得把 SB-REF-01 当作最终交付
```

有上传主体图、产品图、空间图或草图：

```text
下一步工具: image2image
模型: seedream4.7 / 4.7；用户指定图片模型版本时按用户指定；不得使用 5.0 或自动升级模型
输入素材: 用户上传参考图 + 规范化 brief + 分镜参考图 prompt
输出: SB-REF-01 分镜参考图
下一步: 对 SB-REF-01 执行 storyboard_image QA；通过后立即生成 Seedance prompt；`seedance_prompt >= 85` 后调用视频工具；不得把 SB-REF-01 当作最终交付
```

如分镜图清晰但分辨率不足：

```text
下一步工具: image_super_resolution
输入素材: 已通过 QA 的 SB-REF-01
输出: SB-REF-01-HQ
下一步: 使用 SB-REF-01-HQ 作为视频参考图，立即进入 Seedance prompt QA 和视频工具调用
```

### 6.4 多关键帧生成链

当任务需要 `multi_frame2video`，必须先生成并检查关键帧，不得直接引用未生成的 `KF-xx`。

```text
下一步工具: text2image 或 image2image
模型: seedream4.7 / 4.7；用户指定图片模型版本时按用户指定；不得使用 5.0 或自动升级模型
输入素材: 规范化 brief + 关键帧 prompt + 可选用户参考图
输出:
- KF-01 起始关键帧
- KF-02 中段关键帧
- KF-03 结束关键帧
质量门: 每张关键帧执行 storyboard_image QA，单张低于 80 分则重做对应 KF-xx
下一步: 全部 KF-xx 通过后，立即生成 Seedance prompt；`seedance_prompt >= 85` 后调用 `multi_frame2video`
```

关键帧 prompt 必须写明：

- 每张关键帧的时间位置，例如 start / middle / end。
- 主体身份锁和环境锁一致。
- 每张图只表现一个清晰动作状态。
- 不加入字幕、水印、UI 或无关文字。
- 关键帧之间动作方向、空间方向、光线方向一致。

### 6.5 起止帧生成链

当任务需要 `start_end2video`，必须先生成并检查起止帧，不得直接引用未生成的 `START-REF` 或 `END-REF`。

```text
下一步工具: text2image 或 image2image
模型: seedream4.7 / 4.7；用户指定图片模型版本时按用户指定；不得使用 5.0 或自动升级模型
输入素材: 规范化 brief + 起止帧 prompt + 可选用户参考图
输出:
- START-REF 起始状态图
- END-REF 结束状态图
质量门: START-REF 与 END-REF 都执行 storyboard_image QA，任一低于 80 分则重做对应参考图
下一步: 两张图通过后，立即生成起止帧 Seedance prompt；`seedance_prompt >= 85` 后调用 `start_end2video`
```

起止帧 prompt 必须写明：

- START-REF 和 END-REF 的主体、材质、服装、空间、光线必须连续。
- 两张图之间只改变用户要求的动作、距离、情绪、产品状态或镜头位置。
- 不改变角色身份、产品形态、logo、空间结构。
- 不加入字幕、水印、UI 或无关文字。

## 七、镜头语言知识库

### 7.1 景别

| 缩写 | 名称 | 用途 | 分镜表达 | 视频表达 |
|---|---|---|---|---|
| EWS | Extreme Wide Shot | 建立环境、尺度、孤独感 | extreme wide establishing shot | begin with an extreme wide establishing shot |
| WS | Wide Shot | 主体与环境关系、完整动作 | wide shot showing full subject and environment | cut to a wide shot showing the full action |
| MS | Medium Shot | 人物行为与表情平衡 | medium shot, subject from waist up | hold a medium shot for natural performance |
| MCU | Medium Close-Up | 对话、轻情绪、上半身肢体 | medium close-up with readable facial emotion | push into a medium close-up |
| CU | Close-Up | 情绪、产品细节、关键反应 | close-up emphasizing emotion or detail | cut to a close-up insert |
| ECU | Extreme Close-Up | 眼睛、手、材质、微距冲击 | extreme close-up macro detail | end on an extreme close-up |

### 7.2 运镜

| 运镜 | 用途 | 风险 | Seedance 表达 |
|---|---|---|---|
| `static` | 克制、紧张、观察、口播 | low | locked-off static camera with subtle subject motion |
| `push_in` | 强调发现、情绪逼近、产品高级感 | low | slow cinematic push-in |
| `pull_out` | 揭示环境、孤独、规模 | low | slow pull-out revealing the wider environment |
| `tracking` | 跟随动作、追逐、行走 | medium | smooth side tracking shot following the subject |
| `handheld` | 纪实、追逐、恐怖、紧张 | medium | subtle handheld camera shake, documentary realism |
| `orbit_arc` | 英雄时刻、产品旋转、对峙 | medium | slow 180-degree arc around the subject |
| `dolly_zoom` | 心理压迫、眩晕、空间扭曲 | high | slow dolly-zoom / vertigo effect while the subject stays centered |
| `whip_pan` | 快速转场、动作切换 | high | brief whip-pan transition with motion blur |
| `POV` | 第一人称探索、沉浸 | medium | first-person POV camera with natural walking motion |

高风险运镜规则：

- `dolly_zoom`、`whip_pan`、低光追逐、复杂打斗、强特效多场景应缩短为 5-8 秒或拆段。
- 每段只使用一个主要运镜，不叠加多个高风险运镜。
- 运镜必须有动机，例如“镜头跟随人物跑动”“镜头慢推揭示产品细节”“镜头后拉揭示空间尺度”。

### 7.3 转场

| 转场 | 用途 | 表达 |
|---|---|---|
| `match_cut` | 形状或动作相似转场 | match cut from {a} to {b} |
| `object_wipe` | 物体掠过遮挡切换 | as {object} crosses the frame, use it as a natural wipe transition |
| `light_flare` | 商业或科幻高级转场 | bright lens flare briefly fills the frame and reveals the next shot |
| `rack_focus` | 前后景信息切换 | rack focus from foreground {a} to background {b} |

## 八、参考图策略

### 8.1 单参考图

适用：一张产品图、角色图、空间图或分镜图即可完成的任务。

```text
Use Image 1 as the storyboard and visual continuity reference.
```

### 8.2 多参考图

当用户上传多张图或需要更强一致性时，固定约定：

| 图片 | 角色 |
|---|---|
| Image 1 | 主体/产品身份，锁定形态、材质、颜色、比例 |
| Image 2 | 环境与灯光，锁定空间、氛围、色彩 |
| Image 3 | 分镜构图节奏，锁定镜头顺序与构图变化 |
| Image 4 | logo / 品牌元素，仅在用户明确要求时使用 |

多参考图规则：

- 不混合不同参考图的身份特征。
- Image 2 只取环境、空间结构、灯光和色彩，不继承其中的人物、产品、文字或 logo。
- Image 3 只取分镜构图、镜头顺序和节奏，不继承其中的主体身份、logo 或说明文字。
- Image 4 只取用户确认的品牌元素，不继承背景、人物、产品形态或随机文字。
- 不凭空添加 logo、文字或品牌元素。
- 不把参考图作为平面图片贴在视频画面中。
- 如果 Image 4 是 logo，只在用户指定的位置和时间出现。

## 九、Seedance 视频 Prompt

### 9.1 分镜图转视频 Prompt 模板

```text
Use Image 1 as the storyboard and visual continuity reference. Do not animate the storyboard page itself. Do not show storyboard borders, gutters, panels, captions, arrows, UI, or any grid layout in the final video.

Interpret the storyboard panels in reading order as the shot plan for a {duration_seconds}-second video.

Reference Binding:
Use Image 1 as the storyboard and visual continuity reference.

Interpretation Rule:
Convert each panel into a real cinematic shot in sequence. The final video must be a continuous live-action / cinematic scene, not a camera pan across a storyboard sheet.

Subject Lock:
Keep the same {subject_identity}, {wardrobe_or_product_details}, {environment}, {lighting}, and {color_palette} from Image 1.

Timeline:
0-{t1}s: {beat_1}
{t1}-{t2}s: {beat_2}
{t2}-{t3}s: {beat_3}
{t3}-{t4}s: {beat_4_if_needed}
Final: {final_beat}

Motion:
Subject motion: {subject_motion}
Environment motion: {environment_motion}
Physics details: {physics_details}

Camera:
{camera_plan_with_motivation}

Aesthetics:
{style}, {mood}, {lighting}, {lens}, {texture}, coherent color palette.

Audio/Text:
{audio_or_text_requirements}

Negative Constraints:
No extra characters unless specified. No text overlays unless specified. No deformed faces or product shape changes. No storyboard borders, gutters, panels, captions, arrows, UI, or grid layout. No random camera movement. Realistic motion and consistent lighting.
```

### 9.2 多参考图 Seedance Prompt 模板

```text
Reference Image 1 for the main character/product identity.
Reference Image 2 for the environment and lighting.
Reference Image 3 for the storyboard composition.
Reference Image 4 for logo/brand element only if the user requested a logo.

Generate a {duration_seconds}-second {genre} video.

Reference Binding:
Use Image 1 for identity only: {subject_identity}, silhouette, material, color, scale, and product/character details.
Use Image 2 for environment and lighting only: {environment}, atmosphere, light direction, color palette, and spatial mood. Do not copy people, products, logos, or text from Image 2.
Use Image 3 as the storyboard and composition rhythm reference only. Follow the panel order and shot rhythm, but do not show storyboard borders, grid, panels, captions, arrows, or UI.
Use Image 4 only for logo/brand element if the user requested it. Place it only at {logo_position} during {logo_timing}.

Interpretation Rule:
Convert the references into one coherent cinematic video. Do not display any reference image as a flat picture, poster, screen, page, or picture-in-picture element inside the scene.

Subject Lock:
Keep {subject} from Image 1 consistent across the whole video. Do not borrow faces, products, costumes, shapes, or logos from Image 2 or Image 3.

Timeline:
0-{t1}s: {beat_1}
{t1}-{t2}s: {beat_2}
{t2}-{t3}s: {beat_3}
{t3}-{t4}s: {beat_4_if_needed}
Final: {final_beat}

Motion:
Subject motion: {subject_motion}
Environment motion: {environment_motion}
Physics details: {physics_details}

Camera:
{camera_plan_with_motivation}

Aesthetics:
{style}, {lighting}, {palette}, {lens}, {texture}.

Audio/Text:
{audio_or_text_requirements}

Negative Constraints:
Do not mix identities between reference images. Do not invent extra logos or text. Do not copy non-role content from Image 2, Image 3, or Image 4. Do not display the reference images as flat images inside the scene. Do not show storyboard borders, grid, panels, captions, arrows, or UI. No deformed faces, product shape changes, watermark, random text, or unintended brand marks.
```

### 9.3 起止帧 Seedance Prompt 模板

```text
Use START-REF as the initial state of the shot.
Use END-REF as the final state of the shot.

Reference Binding:
START-REF defines the opening composition, subject position, environment, lighting, and camera distance.
END-REF defines the final composition, allowed end position, expression/product state, and camera distance.

Subject Lock:
Keep the same {subject_identity}, silhouette, product shape, wardrobe/material, color palette, and environment structure from START-REF to END-REF.

Allowed Change:
Only change {allowed_change}, such as camera distance, subject pose, expression intensity, product opening state, light reveal, or spatial reveal.

Timeline:
0-{t1}s: hold START-REF state briefly, establish subject and environment.
{t1}-{t2}s: transition smoothly toward END-REF through {motion_bridge}.
{t2}-{duration_seconds}s: arrive at END-REF state and hold for a clear final beat.

Motion:
Subject motion: {subject_motion}
Environment motion: {environment_motion}
Physics details: {physics_details}

Camera:
{camera_plan_with_motivation}

Aesthetics:
{style}, {lighting}, {palette}, {lens}, {texture}.

Negative Constraints:
Do not change identity, product shape, material, logo placement if provided, room layout, or lighting direction except as specified. Do not introduce extra characters, random text, watermark, UI, grid, panel borders, or picture-in-picture reference images.
```

### 9.4 Seedance prompt 阻断规则

- 生成 Seedance prompt 后，先执行 `seedance_prompt` QA。
- `seedance_prompt >= 85` 才能调用 `image2video`、`multi_frame2video`、`multi_modal2video` 或 `start_end2video`。
- `seedance_prompt < 85` 时必须重写 Seedance prompt，不调用视频工具。
- 视频任务的输入素材必须包含通过 QA 的参考图和通过 QA 的 Seedance prompt。
- Seedance 2.0 系列单次生成时长不得超过 15 秒。Seedance prompt 中的 `{duration_seconds}` 必须小于或等于 15；如用户要求 16 秒或更长，先拆分为多个视频分段 prompt。
- 用户要求生成视频时，`seedance_prompt >= 85` 后必须继续调用视频工具；不得只输出分镜图、分镜 prompt 或 Seedance prompt。

### 9.5 视频工具调用

分镜图为单一参考：

```text
下一步工具: image2video
模型: seedance2.0mini；用户指定视频模型版本时按用户指定
输入素材: SB-REF-01 或 SB-REF-01-HQ + 已通过 seedance_prompt QA 的 Seedance prompt
时长: 单次不超过 15 秒
输出: VID-01
下一步: 对 VID-01 执行 video_output QA
```

有多张关键帧：

```text
下一步工具: multi_frame2video
模型: seedance2.0mini；用户指定视频模型版本时按用户指定
输入素材: KF-01, KF-02, KF-03... + 已通过 seedance_prompt QA 的 Seedance prompt
时长: 单次不超过 15 秒
输出: VID-01
下一步: 对 VID-01 执行 video_output QA
```

有主体、环境、分镜、logo 等多参考图：

```text
下一步工具: multi_modal2video
模型: seedance2.0mini；用户指定视频模型版本时按用户指定
输入素材: Image 1 主体/产品 + Image 2 环境 + Image 3 分镜 + Image 4 可选品牌元素 + 已通过 seedance_prompt QA 的 Seedance prompt
时长: 单次不超过 15 秒
输出: VID-01
下一步: 对 VID-01 执行 video_output QA
```

需要强控制起止状态：

```text
下一步工具: start_end2video
模型: seedance2.0mini；用户指定视频模型版本时按用户指定
输入素材: START-REF + END-REF + 已通过 seedance_prompt QA 的起止帧 Seedance prompt
时长: 单次不超过 15 秒
输出: VID-01
下一步: 对 VID-01 执行 video_output QA
```

## 十、分段与成片

当总时长超过 15 秒、动作复杂、镜头多或用户要求完整广告片时，拆成多个视频段。Seedance 2.0 系列单次视频生成最长 15 秒，不允许创建 16 秒及以上的单个视频任务。

### 10.1 分段规则

- 每段 5-8 秒最稳健；任何单段都不得超过 15 秒。
- 每段只处理一个主动作和一个主运镜。
- 强连续性段落使用 `start_end2video` 或 `multi_frame2video`。
- 复杂广告可先生成 3-4 个分段，再用 `video_editor` 拼接。
- 所有分段必须保留统一 identity_lock、环境锁、光线锁和色彩锁。
- 用户要求 16-30 秒时，默认拆成 2-4 个分段；用户要求更长时继续增加分段，不把总时长写进单个 Seedance 任务。

### 10.2 Manifest 模板

```Markdown
| job_id | target | tool | model | depends_on | status | quality_gate |
|---|---|---|---|---|---|---|
| CM-BRIEF | 规范化 brief | internal |  | 用户输入 | done | brief_intake |
| CM-SB-PROMPT | 分镜参考图 prompt | internal |  | CM-BRIEF | planned | storyboard_prompt >= 80 |
| CM-SB-01 | 分镜参考图 | text2image / image2image | seedream4.7 | CM-SB-PROMPT | planned | storyboard_image >= 80 |
| CM-SEEDANCE-PROMPT | Seedance prompt | internal |  | CM-SB-01 或 KF-xx 或 START/END-REF | planned | seedance_prompt >= 85 |
| CM-V01 | 视频分段 1 | image2video / multi_modal2video | seedance2.0mini | CM-SEEDANCE-PROMPT | planned | video_output >= 80 |
| CM-V02 | 视频分段 2 | image2video / multi_modal2video | seedance2.0mini | CM-SEEDANCE-PROMPT | planned | video_output >= 80 |
| CM-FINAL | 完整成片 | video_editor |  | CM-V01...CM-Vxx | planned | final_delivery |
```

计数规则：

- `requested_count = video_segment_count + final_video + required_reference_images`。
- `planned_count` 必须覆盖所有参考图、视频分段和最终成片。
- `done_count + failed_count + missing_count = planned_count`。
- 失败项必须保留原 `job_id`，修复时追加版本号，例如 `CM-V02-R1`。
- 任何必要分段未完成时，`CM-FINAL` 不得标记完成。
- `CM-Vxx` 的单段时长必须小于或等于 15 秒；如果 brief 总时长超过 15 秒，增加 `CM-V03`、`CM-V04` 等分段。

### 10.3 `video_editor` 调用

```text
下一步工具: video_editor
输入素材: 所有通过 video_output QA 的 CM-V01...CM-Vxx
目标:
- 按时间线顺序拼接
- 修剪多余开头和结尾
- 统一节奏、色彩和音量设定
- 如用户要求字幕或片头片尾，按用户文本加入
- 输出 1 条完整可交付视频
```

不得把分镜图、分镜 prompt、Seedance prompt 或分段素材列表当作最终交付。用户要求完整视频时，最终必须有通过 `video_output` / `final_delivery` 的视频产物；多段任务必须有 `video_editor` 成片。

单段交付规则：

- 单段 `VID-01` 已通过 `video_output >= 80`，且用户不需要片头、字幕、裁切、拼接或配乐时，可直接进入 `final_delivery` 检查并交付。
- 需要片头、字幕、裁切、配乐、品牌尾卡、比例适配或多段拼接时，必须进入 `video_editor` 后再交付。
- 如果当前只生成了 `SB-REF-01` 分镜图，状态必须标记为 `in_progress`，下一步继续 `CM-SEEDANCE-PROMPT` 和 `CM-V01`，不得标记为完成。

## 十一、质量门

### 11.1 评分尺度

| 分数 | 含义 | 处理 |
|---|---|---|
| 0-59 | 不可用 | 重写 prompt 或重做素材 |
| 60-74 | 大修 | 定位失败类型后重做关键步骤 |
| 75-84 | 小修 / 可测试 | 可局部修复或低风险测试 |
| 85-94 | 可生产 | 可进入下一步或交付 |
| 95-100 | 样板级 | 可作为后续同类任务模板 |

### 11.2 `brief_intake`

通过条件：

- 目标、主体、时长、画幅、风格明确。
- 主体身份锁明确。
- 风险点明确。
- 已确认默认模型或用户指定模型。

### 11.3 `storyboard_prompt`，阈值 80

检查：

- 包含 Purpose、Scene、Main Subject、Identity Lock、Storyboard Beats、Camera Language、Visual Style、Layout Constraints、Output。
- 分镜格数适合时长和难度。
- 每格只有一个 beat，时间顺序清晰。
- 主体、环境、灯光、色彩一致。
- 不生成不需要的文字、logo、水印、UI。
- 明确用于 Seedance 参考。

低于 80 分：重写分镜 prompt，不调用图片工具。

### 11.4 `storyboard_image`，阈值 80

检查：

- 分镜格数正确，阅读顺序清楚。
- 主体或产品在每格中可识别且一致。
- 动作线索足够 Seedance 理解。
- 没有多余文字、水印、乱码、无关 logo。
- 没有把同一格塞入多段复杂动作。
- 产品、脸、手、空间结构没有明显畸变。

低于 80 分：重新生成或修复分镜图，不进入视频生成。

### 11.5 `seedance_prompt`，阈值 85

检查：

- 明确写出 `Use Image 1 as the storyboard and visual continuity reference`。
- 多参考图任务明确写出 Image 1 / Image 2 / Image 3 / Image 4 的职责边界。
- 起止帧任务明确写出 START-REF 初始状态和 END-REF 最终状态。
- 明确禁止展示 storyboard borders、gutters、panels、captions、arrows、UI、grid layout。
- 有 Reference Binding、Interpretation Rule、Subject Lock、Timeline、Motion、Camera、Aesthetics、Audio/Text、Negative Constraints。
- 动作、运镜、环境变化分开描述。
- 运镜有动机。
- 对产品、角色、空间、文字和 logo 风险有负向约束。

低于 85 分：重写 Seedance prompt，不调用视频工具。

### 11.6 `video_output`，阈值 80

检查：

- 没有拍出分镜纸、格子、边框、箭头、说明文字或界面。
- 主体身份稳定，产品形态不变，角色脸和服装不漂移。
- 动作自然，时间线连续，运镜符合 prompt 动机。
- 光线、色彩、空间方向稳定。
- 没有多余角色、乱码字幕、错误 logo 或水印。
- 视频可展示，满足用户时长、画幅和风格目标。

低于 80 分：按失败类型修复；必要时回到分镜图或 Seedance prompt。

### 11.7 `final_delivery`

检查：

- 用户要求视频时，已产生 `VID-01` 或 `CM-FINAL`，而不是只产生分镜图。
- 多段或需要剪辑的任务已调用 `video_editor`，不是只交付分段素材列表。
- 单段直接交付时，`VID-01` 已通过 `video_output >= 80`，且不需要片头、字幕、裁切、配乐、比例适配或拼接。
- 所有必要分段都已通过 `video_output >= 80`。
- 拼接顺序符合时间线，没有缺段、重复段或错序。
- 最终成片画幅、时长、风格、主体身份锁符合 brief。
- 字幕、片头片尾、logo 只在用户要求时出现，且位置和内容正确。
- 修复记录清楚，`missing_count = 0`。

未通过时：回到对应失败分段或 `video_editor` 设置修复，不得标记最终交付完成。

中间态处理：

- 只有 `SB-REF-01`：继续生成 `CM-SEEDANCE-PROMPT`。
- 只有 `CM-SEEDANCE-PROMPT`：继续调用视频工具。
- 只有 `VID-01` 但用户需要剪辑或多段：继续调用 `video_editor`。
- 任一中间态都不得输出“已完成”。

## 十二、失败修复

| 失败类型 | 诊断 | 修复动作 |
|---|---|---|
| 分镜格被拍出来 | 视频像在拍故事板纸面 | 强化“只把 Image 1 作为隐藏视觉规划参考”，重写 Seedance prompt |
| 角色漂移 | 脸、发型、服装、体型变化 | 减少场景切换，强化身份锁，增加角色母图或多角度参考 |
| 产品变形 | 轮廓、材质、比例、logo 错误 | 优先产品形态保持，降低动作复杂度，使用慢推、微距、受控旋转 |
| 运镜随机 | 突然旋转、乱 zoom、无意义切换 | 写明镜头动机，限制为一个主运镜 |
| 动作过猛 | 速度过快、肢体乱、物理不合理 | 缩短动作链，降低速度，拆段 |
| 文本乱码 | 字幕、招牌、包装文字错乱 | 删除非必要文字；必要文字必须短、准确、指定位置 |
| 动作不连续 | 前后镜头接不上 | 降低分镜格数，使用起止帧，拆成 5-8 秒段落 |
| 低光失败 | 暗部脏、主体看不清 | 增加可见主光、轮廓光，降低雨夜/霓虹/烟雾密度 |
| 多参考身份混合 | Image 2/3 的人物或产品影响了 Image 1 主体 | 重写多参考 prompt，声明 Image 1 identity only，Image 2/3 不继承身份 |
| 环境图主体入侵 | Image 2 的人物、商品、文字进入视频 | 声明 Image 2 environment and lighting only，忽略其中主体、文字、logo |
| logo 错位或过度出现 | logo 出现过多、变形、位置错误 | 只在指定时间和位置使用 Image 4；非必要时移除 logo |
| 参考图画中画 | 视频把参考图当作屏幕、海报或页面展示 | 声明不得显示 flat image、poster、screen、page、picture-in-picture |

重试降级规则：

- R1 失败：保留原 job_id，追加 `-R1`，只修复明确失败类型。
- R2 仍失败：减少参考图职责，优先保留 Image 1 主体和 Image 3 分镜，移除非必要文字、logo 和复杂转场。
- R3 仍失败：缩短到 5-8 秒单段，降低动作数量，只保留一个主运镜。
- 高风险动作连续失败：拆成多个短段，每段单独通过 `video_output` 后再进入 `video_editor`。

修复 prompt 模板：

```text
Regenerate the video using Image 1 only as hidden visual planning reference. The final video must be a real cinematic scene, not a camera pan across a storyboard image. Remove all panel borders, grid lines, captions, arrows, UI, and paper layout. Convert each panel into a live-action cinematic shot in sequence.
```

```text
Keep the character identity strictly consistent with Image 1: same face shape, hairstyle, outfit, body silhouette, age, and color palette. Reduce scene changes. Use fewer cuts and smoother camera motion. Do not introduce new characters.
```

```text
Prioritize product shape preservation over dramatic motion. Keep the exact same silhouette, materials, colors, logo placement if provided, and proportions from Image 1. Use slow rotation, macro details, and controlled lighting. Do not morph or redesign the product.
```

```text
Use motivated camera movement only: the camera follows the subject's action, reveals the object, or responds to the environment. Avoid random spinning, sudden zooms, or unmotivated cuts. Smooth cinematic pacing.
```

## 十三、场景模板

### 13.1 室内漫游

```text
task_type: interior_walkthrough
layout: 4-panel storyboard
duration: 12 seconds
camera: first-person POV or smooth tracking, slow push through entrance, turn toward focal area, pull out to reveal full room
identity_lock: same room layout, same windows, same floor material, same furniture placement
risk_control: avoid teleporting between rooms; maintain doorway and furniture continuity
```

### 13.2 食物纪录片

```text
task_type: food_documentary
layout: 6-panel storyboard
duration: 12-15 seconds
camera: ECU macro ingredients, CU hand action, slow push-in on steam, rack focus to final plated dish
identity_lock: same food item, same plate, same lighting, same table surface
risk_control: avoid extra hands, malformed fingers, impossible cuts, inconsistent food state
```

### 13.3 产品广告

```text
task_type: product_ad
layout: 4-panel or 3x3 storyboard
duration: 12-15 seconds
camera: slow push-in, macro material insert, controlled 180-degree orbit, final hero shot
identity_lock: exact product silhouette, material, color, scale, logo only if provided
risk_control: preserve product shape over dramatic motion; no invented text or logo
```

### 13.4 科幻揭示

```text
task_type: sci_fi_reveal
layout: 3-panel storyboard
duration: 10-12 seconds
camera: EWS establishing scale, slow push-in toward reveal, CU reaction or detail
identity_lock: same futuristic structure, same light source, same color palette
risk_control: keep motion slow; avoid excessive particles and uncontrolled camera spin
```

### 13.5 赛博追逐

```text
task_type: action_chase
layout: 3x3 storyboard, split into two 6-8 second Seedance segments when total duration exceeds 15 seconds
total_duration: 15-20 seconds
segment_duration: 6-8 seconds each, every Seedance task must be <= 15 seconds
final_assembly: use video_editor to stitch all approved segments
camera: side tracking, subtle handheld, brief whip-pan only as transition
identity_lock: same runner, same outfit, same street direction, same neon rain atmosphere
risk_control: maintain chase direction; avoid random crowd and unreadable low light
```

### 13.6 电梯 dolly zoom

```text
task_type: drama_scene
layout: 4-panel storyboard
duration: 8-10 seconds
camera: slow dolly-zoom / vertigo effect while subject stays centered
identity_lock: same face, same expression progression, same elevator interior
risk_control: only one high-risk motion; keep subject centered and movement slow
```

## 十四、输出格式

```Markdown
# 影视镜头生成交付

## 执行汇总
- task_type:
- image_model: seedream4.7
- video_model: seedance2.0mini
- requested_count:
- planned_count:
- done_count:
- failed_count:
- missing_count:

## Brief
| 字段 | 设定 |
|---|---|
| 主体 |  |
| 时长 |  |
| 画幅 |  |
| 风格 |  |
| 身份锁 |  |
| 风险点 |  |

## 创意方向
| 方向 | logline | 布局 | 镜头 | 风险 |
|---|---|---|---|---|

## 分镜参考图
- 工具:
- 模型:
- 输入素材:
- 输出:
- QA 分数:

## Seedance 视频
- 工具:
- 模型:
- 输入素材:
- Prompt 结构:
- QA 分数:

## 分段素材
| job_id | 工具 | 模型 | 状态 | QA | 备注 |
|---|---|---|---|---|---|

## 完整成片
- 工具链:
- 输出:
- 质量检查:
- 修复记录:
```

## 十五、触发示例

- “帮我做一个高端运动鞋的 15 秒广告，未来感，快节奏。”
- “用这张产品图生成一条 12 秒商业短片，镜头要高级。”
- “把这个室内空间做成 4 格分镜，再生成空间漫游视频。”
- “做一条食物纪录片风格的视频，有蒸汽、切开和摆盘。”
- “赛博雨夜追逐，人物一致，镜头不要乱。”
- “科幻舱门打开，慢慢揭示巨型城市。”
- “给这个角色做 9:16 口播 UGC 视频，动作自然，别换脸。”
