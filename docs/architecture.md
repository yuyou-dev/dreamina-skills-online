# Repository Architecture

本仓库以 Project 为维护边界，以单个 Markdown 为即梦交付边界。

```text
projects/<project-id>/
├── project.json
├── skill/<技能名>.md
├── tests/cases.json
└── references/              # 仅有真实维护资料时创建
```

`skill/*.md` 是唯一权威安装文件，不经过模板拼装，也没有第二份 `dist` 副本。`project.json` 保存稳定 ID、目标平台、旧路径、知识关联和来源追踪；`tests/cases.json` 保存行为验收场景。

`knowledge/` 保存官方原文、规范提炼和研究资料。`docs/` 保存仓库维护规则。两者都不是即梦运行时依赖。

根级 `scripts/validate-projects.mjs` 负责机械验证。Project 内不创建脚本，除非出现该 Project 独有且反复执行的确定性任务。
