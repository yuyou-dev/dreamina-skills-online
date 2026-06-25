# dreamina-skills-online

即梦在线版自定义技能说明文档项目。

本仓库沉淀一组可直接安装到即梦在线版的 Markdown skill。每个可安装 skill 都应当是**独立、自包含、可单文件运行**的说明文档：即梦运行时不应依赖 README、共享规范、`presets/` 或其他 Markdown 被自动读取。

## Project Purpose

本项目用于把 SVT 珠宝设计与多步骤内容生产经验迁移到即梦在线工具链，并逐步沉淀成可复用 skill：

- 专业珠宝设计与批量出款。
- 选择题驱动的珠宝设计进化。
- 珠宝电商图文视频物料生产。
- 角色脱口秀视频生成。
- 影视分镜参考图与 Seedance 视频镜头生成。
- 大批量任务规划、数量守恒、分批和并发执行。

## Installable Skills

| 文件 | 技能名称 | 用途 | 状态 |
|---|---|---|---|
| [JewelryDesignSkills.md](JewelryDesignSkills.md) | JewelryDesignSkills | 专业珠宝设计、批量出款、系列设计、参考图变体、材质矩阵 | active |
| [珠宝设计进化Skill.md](珠宝设计进化Skill.md) | 珠宝设计进化 | 上传底座或描述雏形后，用选择题生成一次性 4/8 个进化候选，并输出候选评审与定稿收尾建议 | active |
| [珠宝电商素材Skill.md](珠宝电商素材Skill.md) | 珠宝电商素材Skill | 珠宝产品 + 简单描述生成全套电商图、文案和视频 | active |
| [脱口秀视频Skill.md](脱口秀视频Skill.md) | 脱口秀视频Skill | 上传角色 + 一句话主题，确认脚本后生成并拼接脱口秀视频 | active |
| [影视镜头生成Skill.md](影视镜头生成Skill.md) | 影视镜头生成Skill | 影视分镜参考图、镜头语言、Seedance 视频生成、视频 QA 与修复 | active |
| [大批量执行Skill.md](大批量执行Skill.md) | 大批量执行Skill | 大型项目拆解、任务清单、分批、并发、数量校验和执行包输出 | active |

## Support Documents

| 文件 | 用途 | 运行时依赖 |
|---|---|---|
| [AGENTS.md](AGENTS.md) | 后续 Codex/agent 接手本仓库时的工作规则 | 否 |
| [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) | 背景、约束、设计原则、当前方向 | 否 |
| [CHANGELOG.md](CHANGELOG.md) | 记录重要迭代和提交主题 | 否 |
| [JEWELRY_PROMPT_RESEARCH.md](JEWELRY_PROMPT_RESEARCH.md) | 珠宝提示词研究备忘，整合设计师提示词与 OpenAI 图像提示词范式 | 否 |
| [CHAIN_BATCH_EXECUTION.md](CHAIN_BATCH_EXECUTION.md) | 链式调用、批量、并发的共享维护备忘 | 否 |
| [presets/README.md](presets/README.md) | 未来预设扩展的命名和字段约定 | 否 |
| [LICENSE](LICENSE) | MIT License | 否 |

## Key Constraints

- 可安装 skill 文件必须自包含，不能写成“请参考另一个 Markdown 后执行”。
- 技能内容应符合即梦自定义 skill 写法：明确触发场景、交互阶段、执行阶段、字段表、工具调用、分支条件、质量检查。
- 工具名应使用即梦在线版工具清单中的名称，例如 `text2image`、`image2image`、`multi_modal2video`、`video_editor`、`generate_form_for_info_collection`。
- 默认模型规则：视频类任务默认使用 `seedance2.0fast_vip`；图片类任务默认使用 4.7 模型的 2k 版；用户明确指定模型版本时按用户指定执行。
- `影视镜头生成Skill.md` 使用独立默认：图片模型 `seedream4.7`，视频模型 `seedance2.0mini`；用户明确指定模型版本时按用户指定执行。
- 对链式调用要写明“下一步工具”和“输入素材”，避免停在单步图、脚本、分段素材或计划摘要。
- 大批量任务要先建立 manifest，保证数量守恒、依赖完整、失败项可重试。
- 对珠宝 skill，重点保留主石/元素/草稿特征，补充品类配比、宝石排列、构图密度、画面表现和负向约束。
- 款式设计类珠宝任务默认输出白底或极浅灰白背景的单件产品图；只有用户明确要求电商场景、佩戴图、包装图、广告海报或生活方式图时才改变背景。

## Recommended Workflow

1. 修改前先读 [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) 和本 README。
2. 如果修改可安装 skill，直接编辑对应 `.md` 文件，确保规则在该文件内完整出现。
3. 如果新增能力，优先判断是：
   - 扩展已有 skill 的一个预设；
   - 新增一个独立 skill；
   - 只更新维护说明。
4. 修改后搜索旁白式表达，避免出现“实测发现”“不要假定”“参考某文件”等运行时无意义文字。
5. 检查触发、字段、工具链、批量逻辑、质量门是否完整。
6. 提交并推送到 GitHub。

## Current Repository

Public GitHub repository:

<https://github.com/yuyou-dev/dreamina-skills-online>
