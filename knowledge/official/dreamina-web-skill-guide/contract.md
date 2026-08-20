# 即梦 Web Skill 可验证规范

本文件是对 2026-08-20 保存的官方手册的维护层提炼。安装到即梦的 Skill 不得在运行时依赖本文件，必须把需要的规则直接写入单文件正文。

## 单文件交付

- 一个 Skill 只交付一个独立 `.md` 文件。
- YAML frontmatter 只能包含 `name` 和 `description`。
- `name` 长度为 1-30 个 Unicode 字符，只能使用汉字、英文字母、半角数字和位于片段之间的单个半角连字符。
- `description` 为 500 字内单段，说明核心产出、触发场景和不适用边界。
- frontmatter 后第一个正文元素必须是 `# <name>`，并与 `name` 完全一致。
- Skill 正文不得要求读取仓库 README、知识库、测试文件或其他 Markdown。

## 工具清单

允许在 Skill 中作为即梦工具调用的名称：

- `text2image`
- `image2image`
- `foreground_segmentation`
- `image_super_resolution`
- `text2video`
- `image2video`
- `start_end2video`
- `multi_frame2video`
- `multi_modal2video`
- `clip_join`
- `generate_form_for_info_collection`
- `creation_agent_search`

官方手册的工具速查表将最终拼接工具定义为 `clip_join`。本仓库以该定义为准，不在安装文件中使用旧名称 `video_editor`。

## 参数继承

参数优先级固定为：

1. 用户本轮明确要求。
2. 用户账号、当前面板或当前会话默认设置。
3. 原 Skill 已声明的运行默认值。
4. 工具 schema 和平台能力约束。
5. 官方手册建议的缺省值。

禁止静默换模型、降分辨率、改变比例或缩减用户明确数量。多张图片默认并行；只有明确上下游依赖时串行。

## 表单与素材

- `generate_form_for_info_collection` 只收集文字、单选和多选信息，不能上传附件。
- 图片、视频、音频、Logo 和其他文件必须由用户在表单外上传或使用当前会话已有资源。
- 必填字段缺失且无法推断时才阻塞；可选字段使用合理默认值。

## 视频纪律

- 参考素材与视频片段生成阶段不生成 BGM。
- 只有最终 `clip_join` 且用户明确要求配乐时才加入 BGM。
- 分镜或 Clip 计划确认前不单独追问画幅；即将生成素材或视频且仍缺失时再收集。
- 有参考素材时默认使用 `multi_modal2video`。
- 普通素材按输入顺序写作 `@图片N`、`@视频N`、`@音频N`。
- 来自用户参考的角色、产品、物品或场景主体写作 `<subject>主体名称</subject>`，并在图片输入参数中绑定真实 `resource_id`。

## 机械检查

校验器至少检查 frontmatter、名称、描述、H1、自包含性、工具名、Project manifest、场景测试类型、知识文件路径和原始资料哈希。机械检查不能替代真实场景的行为验收。
