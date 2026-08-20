# dreamina-skills-online

即梦 Web 自定义 Skill 的项目化维护仓库。每个 Skill 位于独立 Project 中，安装文件始终是一个完整、自包含的 Markdown，不依赖仓库内其他文件运行。

## Skills

| Project | 可安装 Skill | 用途 |
|---|---|---|
| `jewelry-design` | [专业珠宝设计技能](projects/jewelry-design/skill/专业珠宝设计技能.md) | 单款、批量、系列、参考图变体和材质矩阵 |
| `jewelry-design-evolution` | [珠宝设计进化技能](projects/jewelry-design-evolution/skill/珠宝设计进化技能.md) | 选择题驱动的 4/8 方向珠宝进化 |
| `jewelry-ecommerce-materials` | [珠宝电商素材技能](projects/jewelry-ecommerce-materials/skill/珠宝电商素材技能.md) | 多平台珠宝商品图、文案和短视频 |
| `grill-me-jewelry` | [Grill-Me珠宝创作](projects/grill-me-jewelry/skill/Grill-Me珠宝创作.md) | 四轮深度访谈、Seedream 5.0 Pro 材质控制和高质量候选生成 |
| `talk-show-video` | [脱口秀视频生成技能](projects/talk-show-video/skill/脱口秀视频生成技能.md) | 角色脚本、分段生成和完整成片 |
| `cinematic-shot-generation` | [影视镜头生成技能](projects/cinematic-shot-generation/skill/影视镜头生成技能.md) | 分镜、关键帧、Seedance 视频和修复 |
| `seedance-2-5-creator` | [Seedance2-5创作大师](projects/seedance-2-5-creator/skill/Seedance2-5创作大师.md) | Seedance 2.5 长叙事、多参考和可控编辑 |
| `seedance-2-5-imagination` | [Seedance2-5天马行空](projects/seedance-2-5-imagination/skill/Seedance2-5天马行空.md) | 极限想象力、50 素材和深度变异编辑 |
| `xiaohei-article-illustration` | [小黑怪诞正文配图技能](projects/xiaohei-article-illustration/skill/小黑怪诞正文配图技能.md) | 中文文章的小黑怪诞手绘正文配图 |
| `batch-execution` | [大批量执行规划技能](projects/batch-execution/skill/大批量执行规划技能.md) | 数量守恒、依赖、分批、并发和重试规划 |

## Repository Layout

- `projects/`: 每个 Skill 的安装文件、manifest、测试场景和必要来源审计。
- `knowledge/`: 即梦官方资料快照、可验证规范、提示词研究和共享实践。
- `docs/`: 仓库架构、Project 格式、迁移方法和项目背景。
- `scripts/`: 无第三方依赖的机械校验工具。

## Validation

```bash
npm test
```

校验包括 Project manifest、Skill frontmatter、正式名称、同名 H1、自包含性、官方工具名、场景测试覆盖、知识索引路径和官方手册哈希。

## Maintenance

修改前阅读 [项目背景](docs/project-context.md)、[仓库架构](docs/architecture.md) 和对应 Project。跨平台导入遵循 [迁移规范](docs/cross-platform-migration.md)，并在 `project.json` 中记录来源提交和哈希。

Grill-Me 的珠宝展示图反推、Seedream 5.0 Pro 实测与提示词结论记录在 [珠宝展示质量研究](projects/grill-me-jewelry/references/jewelry-display-quality-research.md)。

Public repository: <https://github.com/yuyou-dev/dreamina-skills-online>
