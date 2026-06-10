# AGENTS.md

## Project Role

This repository contains Markdown skills for Dreamina online custom skills. It is a small public documentation project, not an executable app.

The main deliverables are installable `.md` skill files that can be copied into Dreamina online. Each installable skill must stand alone because Dreamina online may not read sibling Markdown files at runtime.

## Read First

Before significant edits, read:

- `README.md`
- `PROJECT_CONTEXT.md`
- the specific skill file being edited
- `CHANGELOG.md` for recent direction

Use `CHAIN_BATCH_EXECUTION.md` and `presets/README.md` only as maintenance aids. Do not rely on them from inside installable skills.

## File Types

- Installable skills:
  - `JewelryDesignSkills.md`
  - `珠宝电商素材Skill.md`
  - `脱口秀视频Skill.md`
  - `大批量执行Skill.md`
- Project docs:
  - `README.md`
  - `PROJECT_CONTEXT.md`
  - `CHANGELOG.md`
  - `CHAIN_BATCH_EXECUTION.md`
  - `presets/README.md`

## Editing Rules

1. Keep installable skill files self-contained.
2. Do not write installable skills as meta-commentary about testing, platform limitations, or repo structure.
3. Use runtime-ready skill language:
   - trigger scenarios
   - interaction phase
   - execution phase
   - field / required / missing-handling tables
   - explicit tool calls
   - branch conditions
   - quality checks
4. Prefer concrete defaults over asking questions.
5. Ask only when a required field is missing and cannot be inferred.
6. For batch work, include manifest, stable IDs, requested/planned/done/failed/missing counts, dependency rules, and retry policy.
7. For chain workflows, state the next tool and the input artifact after every major step.
8. Keep negative constraints specific and useful.

## Dreamina Skill Style

Use the Dreamina custom skill style:

```Markdown
---
技能名称: ...
技能描述: ...
---

技能内容：

分为**交互阶段**和**执行阶段**。

## 一、交互阶段

### 步骤 1：信息提取
| 字段 | 必填 | 缺失时处理 |
|---|---|---|

## 二、执行阶段

### 步骤 2：工具调用
- 条件 A → `tool_name`
- 条件 B → `another_tool`
```

The skills in this repository may be more detailed than the basic example, but they should still read like instructions executed inside Dreamina, not like project notes.

## Validation Checklist

Before finishing:

- `git -C /Users/yuyou/Data/gemini_dev/SVT项目/dreamina-skills-online status --short`
- Confirm installable skills do not depend on external Markdown at runtime.
- Search for meta wording in installable skills:

```bash
rg "实测|不要假定|外部 Markdown|README|CHAIN_BATCH|运行依赖|本仓库|旁白|上帝" *.md
```

Accept hits in project docs only when they are clearly maintenance notes, not installable skill instructions.

## Git

Commit focused changes in this repository and push to:

<https://github.com/yuyou-dev/dreamina-skills-online>

Do not modify the sibling SVT jewelry repository unless the user explicitly asks.
