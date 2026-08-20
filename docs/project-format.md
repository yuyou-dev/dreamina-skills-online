# Project Format

## project.json

每个 Project 必须声明：

- `schemaVersion`: 当前为 `1`。
- `id`: 与目录名一致的 ASCII kebab-case 稳定 ID。
- `name`: 与 Skill frontmatter 和 H1 一致的正式名称。
- `status`: 当前使用 `active` 或 `archived`。
- `targetPlatform`: 当前为 `dreamina-web`。
- `skillFile`: Project 内唯一权威安装文件的相对路径。
- `legacyPaths`: 一次性迁移前的旧路径，可为空数组。
- `knowledgeRefs`: 维护时相关的仓库路径，可为空数组。
- `origins`: 来源仓库、提交、路径和 SHA-256；原生 Project 也要记录迁移基线。

## tests/cases.json

场景文件使用 `schemaVersion: 1` 和 `cases` 数组。每个案例包含唯一 `id`、`type`、真实用户输入、可观察的 `expected` 行为和 `forbidden` 行为。

所有 Project 至少覆盖：`trigger`、`boundary`、`missing-required`、`tool-route`、`default-override`、`failure-handling`。测试案例是验收契约，不伪装成已执行的模型输出。

## Skill 单文件

安装文件只使用 `name` / `description` frontmatter，紧跟同名 H1。正文必须自包含，不能要求运行时读取 Project references、知识库或其他 Skill 文件。
