# Knowledge Index

本目录保存即梦官方资料、可验证规范、提示词研究和跨项目复用的维护经验。`catalog.json` 是机器可读索引；本文件供维护者浏览。

| ID | 类型 | 内容 |
|---|---|---|
| `dreamina-web-skill-guide` | official | 2026-08-20 官方手册原文快照、来源元数据和规范提炼 |
| `jewelry-prompt-research` | research | 珠宝设计与图像提示词研究 |
| `jewelry-art-design-interview-research` | research | 珠宝形式构成、主石视觉母题、纹样文化转译、动态访谈与 2025-2026 艺术趋势研究 |
| `seedance-2-5-prompt-research` | research | Seedance 2.5 官方展示页完整提示词与能力模式 |
| `chain-batch-execution` | practice | 链式执行、批量、并发、数量守恒与重试经验 |

安装文件不得在运行时引用这些资料。Project 可在 `project.json` 的 `knowledgeRefs` 中记录维护关联，但必要规则必须内联到 `skill/*.md`。
