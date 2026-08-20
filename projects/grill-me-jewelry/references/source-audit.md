# Grill Me 珠宝来源审计

## 来源

- Repository: `https://github.com/yuyou-dev/SVT-Jewelry-Skills-Image-2.git`
- Commit: `57b47cbd217bda657b1fa8fab78fada3b6729f88`
- Core Skill: `.agents/skills/jewelry-grill-me/SKILL.md`
- Core SHA-256: `1aa53009d467c4522604faa4a086e82a05ca6461dd8f680b5ee74f9915fe240c`
- Design frontier: `.agents/skills/jewelry-grill-me/references/design-frontier.md`
- Frontier SHA-256: `ce9f3c22668fc29dd2e294eeedc45ba04f06e5d8609153967266568cb0a877b7`

外部仓库仅用于只读调研。本 Project 不复制其插件 UI、运行脚本或 provider 实现。

## 保留的行为

- 显式 Grill Me 或极端模糊度触发。
- 创作地基、意义内核、设计语言、变化与交付四轮探索。
- 每轮最多四个当前可回答问题，已知事实不重复。
- 每轮累计摘要、答案持续保留、设计者主观问题不代答。
- 四轮之后的独立确认门。
- 多候选至少改变三个可见设计轴。
- 确认前不得开始图片生成。

## 即梦映射

| 源能力 | 即梦处理 |
|---|---|
| 专用 Apps UI 问卷 | `generate_form_for_info_collection` |
| 子 Skill 路由 | 删除，访谈、候选规划、生成和 QA 全部内联 |
| Image-2/provider job | `text2image` 或 `image2image` |
| 搜索事实与工艺背景 | `creation_agent_search` |
| 高清输出 | `image_super_resolution` |
| 插件 UI、Gallery、MCP 工具发现 | 删除 |
| 运行时参考文件 | 核心规则内联到安装文件 |

## 明确删除

迁移后的 Skill 不询问 provider、并发度、费用或内部任务编号，不输出 CLI、HTML、JSON UI、插件资源 URI 或本地工程路径。来源中的 Codex 调用语法和 UI policy 不进入即梦安装文件。
