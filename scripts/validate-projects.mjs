import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const projectsRoot = path.join(root, "projects");
const requiredCaseTypes = new Set([
  "trigger",
  "boundary",
  "missing-required",
  "tool-route",
  "default-override",
  "failure-handling",
]);
const allowedTools = new Set([
  "text2image",
  "image2image",
  "foreground_segmentation",
  "image_super_resolution",
  "text2video",
  "image2video",
  "start_end2video",
  "multi_frame2video",
  "multi_modal2video",
  "clip_join",
  "generate_form_for_info_collection",
  "creation_agent_search",
]);
const toolFamily = /^(?:text2image|image2image|foreground_segmentation|image_super_resolution|text2video|image2video|start_end2video|multi_frame2video|multi_modal2video|video_editor|clip_join|generate_form_for_info_collection|creation_agent_search)(?:_v3)?$/;
const namePattern = /^[\p{Script=Han}A-Za-z0-9]+(?:-[\p{Script=Han}A-Za-z0-9]+)*$/u;
const errors = [];

function fail(location, message) {
  errors.push(`${location}: ${message}`);
}

function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    fail(path.relative(root, file), `invalid JSON (${error.message})`);
    return null;
  }
}

function parseFrontmatter(file, content) {
  if (!content.startsWith("---\n")) {
    fail(file, "must start with YAML frontmatter");
    return null;
  }
  const end = content.indexOf("\n---\n", 4);
  if (end === -1) {
    fail(file, "frontmatter is not closed");
    return null;
  }
  const fields = {};
  for (const line of content.slice(4, end).split("\n")) {
    const separator = line.indexOf(":");
    if (separator < 1) {
      fail(file, `invalid frontmatter line: ${line}`);
      continue;
    }
    fields[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  const keys = Object.keys(fields).sort();
  if (keys.join(",") !== "description,name") {
    fail(file, "frontmatter must contain only name and description");
  }
  return { fields, body: content.slice(end + 5).trimStart() };
}

function sha256(file) {
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

function walkMarkdown(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMarkdown(fullPath));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(fullPath);
  }
  return files;
}

if (!existsSync(projectsRoot)) {
  fail("projects", "directory is missing");
}

const projectIds = new Set();
const projectNames = new Set();
const legacyPaths = new Set();
const projectDirs = existsSync(projectsRoot)
  ? readdirSync(projectsRoot).filter((entry) => statSync(path.join(projectsRoot, entry)).isDirectory()).sort()
  : [];

for (const directory of projectDirs) {
  const projectRoot = path.join(projectsRoot, directory);
  const manifestFile = path.join(projectRoot, "project.json");
  const casesFile = path.join(projectRoot, "tests", "cases.json");
  if (!existsSync(manifestFile)) {
    fail(`projects/${directory}`, "project.json is missing");
    continue;
  }

  const manifest = readJson(manifestFile);
  if (!manifest) continue;
  for (const key of ["schemaVersion", "id", "name", "status", "targetPlatform", "skillFile", "legacyPaths", "knowledgeRefs", "origins"]) {
    if (!(key in manifest)) fail(`projects/${directory}/project.json`, `missing ${key}`);
  }
  if (manifest.schemaVersion !== 1) fail(`projects/${directory}/project.json`, "schemaVersion must be 1");
  if (manifest.id !== directory) fail(`projects/${directory}/project.json`, "id must match directory name");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(manifest.id ?? "")) fail(`projects/${directory}/project.json`, "id must be ASCII kebab-case");
  if (projectIds.has(manifest.id)) fail(`projects/${directory}/project.json`, "duplicate project id");
  projectIds.add(manifest.id);
  if (projectNames.has(manifest.name)) fail(`projects/${directory}/project.json`, "duplicate skill name");
  projectNames.add(manifest.name);
  if (manifest.status !== "active" && manifest.status !== "archived") fail(`projects/${directory}/project.json`, "invalid status");
  if (manifest.targetPlatform !== "dreamina-web") fail(`projects/${directory}/project.json`, "targetPlatform must be dreamina-web");

  const skillFile = path.join(projectRoot, manifest.skillFile ?? "");
  if (!existsSync(skillFile)) {
    fail(`projects/${directory}/project.json`, `skillFile does not exist: ${manifest.skillFile}`);
  } else {
    const relativeSkill = path.relative(root, skillFile);
    const content = readFileSync(skillFile, "utf8");
    const parsed = parseFrontmatter(relativeSkill, content);
    if (parsed) {
      const { name, description } = parsed.fields;
      if (name !== manifest.name) fail(relativeSkill, "frontmatter name must match project.json name");
      if ([...String(name ?? "")].length < 1 || [...String(name ?? "")].length > 30 || !namePattern.test(name ?? "")) {
        fail(relativeSkill, "name violates Dreamina length or character rules");
      }
      if (!description || [...description].length > 500 || description.includes("\n")) fail(relativeSkill, "description must be one non-empty paragraph within 500 characters");
      const firstLine = parsed.body.split("\n", 1)[0];
      if (firstLine !== `# ${name}`) fail(relativeSkill, "first body element must be an H1 matching name");
    }
    if (/\b(?:README|CHAIN_BATCH_EXECUTION)\b|本仓库|外部 Markdown/.test(content)) fail(relativeSkill, "contains a repository/runtime dependency reference");
    if (/(?:^|[\s`/])[^\s`/]+\.md(?:[\s`),]|$)/m.test(content)) fail(relativeSkill, "must not reference another Markdown file at runtime");
    for (const match of content.matchAll(/`([^`]+)`/g)) {
      const token = match[1];
      if (toolFamily.test(token) && !allowedTools.has(token)) fail(relativeSkill, `unsupported or deprecated tool name: ${token}`);
    }
    for (const deprecated of ["技能名称:", "技能描述:", "video_editor", "text2image_v3", "image2image_v3"]) {
      if (content.includes(deprecated)) fail(relativeSkill, `contains deprecated syntax: ${deprecated}`);
    }
    if (directory === "grill-me-jewelry") {
      for (const required of [
        "本技能只接受三类创作输入",
        "本技能只交付一种结果",
        "主石视觉指纹",
        "珠宝艺术设计知识",
        "纹样设计",
        "文化语义",
        "前后关联的问题树",
        "完整、标准、纯白背景的珠宝设计图",
        "确认前禁止调用任何图片工具",
        "用户已主动说明视觉灵魂时，直接锁定",
        "用户已说明主石角色时直接跳过",
        "没有尚未解决、且答案仍会显著改变成图的 open 或 conflict 项",
        "未启用的字段直接省略",
        "每次通常问 1-3 个问题，最多 4 个",
        "设计师必须主动提出 3 条原创命题",
        "必须放在同一个首轮表单的两个字段中",
        "至少改变三个可见轴",
        "不得复用完整轮廓",
        "最终回复只保留"
      ]) {
        if (!content.includes(required)) fail(relativeSkill, "missing Grill-Me scope contract: " + required);
      }
      const drift = content.match(/证书|鉴定|实验室|科研|佩戴工程|制造风险|旧珠宝|草图|维修|maker_confirm|prototype_required/);
      if (drift) fail(relativeSkill, "contains out-of-scope Grill-Me domain: " + drift[0]);
      const presentationDrift = content.match(/四轮|浅灰|中性灰|灰白背景|灰色背景|白到浅灰/);
      if (presentationDrift) fail(relativeSkill, "contains out-of-scope Grill-Me presentation: " + presentationDrift[0]);
      for (const tool of [
        "creation_agent_search",
        "foreground_segmentation",
        "text2video",
        "image2video",
        "start_end2video",
        "multi_frame2video",
        "multi_modal2video",
        "clip_join"
      ]) {
        if (content.includes(tool)) fail(relativeSkill, "contains out-of-scope Grill-Me tool: " + tool);
      }
    }
  }

  const skillDirectory = path.join(projectRoot, "skill");
  const skillMarkdown = existsSync(skillDirectory) ? readdirSync(skillDirectory).filter((file) => file.endsWith(".md")) : [];
  if (skillMarkdown.length !== 1) fail(`projects/${directory}/skill`, "must contain exactly one installable Markdown file");

  for (const legacy of Array.isArray(manifest.legacyPaths) ? manifest.legacyPaths : []) {
    if (legacyPaths.has(legacy)) fail(`projects/${directory}/project.json`, `duplicate legacy path: ${legacy}`);
    legacyPaths.add(legacy);
    if (existsSync(path.join(root, legacy))) fail(`projects/${directory}/project.json`, `legacy path still exists: ${legacy}`);
  }
  for (const ref of Array.isArray(manifest.knowledgeRefs) ? manifest.knowledgeRefs : []) {
    if (!existsSync(path.join(root, ref))) fail(`projects/${directory}/project.json`, `knowledgeRef does not exist: ${ref}`);
  }
  if (!Array.isArray(manifest.origins) || manifest.origins.length === 0) {
    fail(`projects/${directory}/project.json`, "origins must contain at least one source");
  } else {
    for (const origin of manifest.origins) {
      if (!origin.kind || !origin.repository || !origin.commit || !origin.path || !/^[a-f0-9]{64}$/.test(origin.sha256 ?? "")) {
        fail(`projects/${directory}/project.json`, "each origin requires kind, repository, commit, path and sha256");
      }
    }
  }

  if (!existsSync(casesFile)) {
    fail(`projects/${directory}`, "tests/cases.json is missing");
  } else {
    const suite = readJson(casesFile);
    if (suite) {
      if (suite.schemaVersion !== 1 || !Array.isArray(suite.cases)) fail(path.relative(root, casesFile), "invalid test suite shape");
      const ids = new Set();
      const foundTypes = new Set();
      for (const testCase of suite.cases ?? []) {
        if (!testCase.id || ids.has(testCase.id)) fail(path.relative(root, casesFile), "case ids must be present and unique");
        ids.add(testCase.id);
        foundTypes.add(testCase.type);
        if (!testCase.input || !Array.isArray(testCase.expected) || testCase.expected.length === 0 || !Array.isArray(testCase.forbidden)) {
          fail(path.relative(root, casesFile), `invalid case shape: ${testCase.id ?? "unknown"}`);
        }
      }
      const projectRequiredTypes = new Set(requiredCaseTypes);
      if (directory === "grill-me-jewelry") {
        for (const type of [
          "artistic-domain-order",
          "question-limit",
          "confirmation-gate",
          "quantity-integrity",
          "candidate-distance",
          "local-correction",
          "main-stone-visual",
          "context-replan",
          "multi-turn-replan",
          "pattern-culture",
          "trend-language",
          "standard-white-output",
          "scope-boundary"
        ]) {
          projectRequiredTypes.add(type);
        }
        const requiredCases = new Map([
          ["gm-main-stone-visual-fingerprint", ["在任何表单前读取@图片1", "要求用户重新描述图片"]],
          ["gm-main-stone-complete-intent-skip", ["跳过所有已知问题", "再问最想保留哪个特征"]],
          ["gm-scope-nonwhite-output", ["只交付完整标准白底珠宝设计图", "生成场景"]],
          ["gm-artistic-domain-order", ["同一个首轮表单的两个字段中", "先让用户选择抽象构成术语"]],
          ["gm-no-seed-designer-proposes", ["至少改变三个可见轴", "继续问想要什么感觉"]],
          ["gm-cultural-source", ["只有用户表达个人记忆意图时才追问个人关系", "直接贴藻井图案"]],
          ["gm-no-text-final", ["不混入长篇设计简报或提示词", "把文字方案当最终交付"]]
        ]);
        const casesById = new Map((suite.cases ?? []).map((testCase) => [testCase.id, testCase]));
        for (const [id, phrases] of requiredCases) {
          const testCase = casesById.get(id);
          if (!testCase) {
            fail(path.relative(root, casesFile), `missing required Grill-Me behavior case: ${id}`);
            continue;
          }
          const contract = [...testCase.expected, ...testCase.forbidden].join("\n");
          for (const phrase of phrases) {
            if (!contract.includes(phrase)) fail(path.relative(root, casesFile), `${id} is missing contract phrase: ${phrase}`);
          }
        }
      }
      for (const type of projectRequiredTypes) {
        if (!foundTypes.has(type)) fail(path.relative(root, casesFile), `missing required case type: ${type}`);
      }
    }
  }
}

const catalogFile = path.join(root, "knowledge", "catalog.json");
const catalog = existsSync(catalogFile) ? readJson(catalogFile) : null;
if (!catalog) {
  fail("knowledge/catalog.json", "knowledge catalog is missing");
} else {
  for (const entry of catalog.entries ?? []) {
    for (const field of ["source", "metadata", "contract"]) {
      if (entry[field] && !existsSync(path.join(root, "knowledge", entry[field]))) fail("knowledge/catalog.json", `${entry.id} references missing ${field}`);
    }
  }
}

const officialMetadataFile = path.join(root, "knowledge", "official", "dreamina-web-skill-guide", "2026-08-20", "metadata.json");
const officialMetadata = existsSync(officialMetadataFile) ? readJson(officialMetadataFile) : null;
if (officialMetadata) {
  const sourceFile = path.join(path.dirname(officialMetadataFile), officialMetadata.file);
  if (!existsSync(sourceFile)) fail(path.relative(root, officialMetadataFile), "official source file is missing");
  else if (sha256(sourceFile) !== officialMetadata.sha256) fail(path.relative(root, sourceFile), "official source hash does not match metadata");
}

for (const markdownFile of walkMarkdown(root)) {
  const content = readFileSync(markdownFile, "utf8");
  for (const match of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const rawTarget = match[1].trim().replace(/^<|>$/g, "");
    if (/^(?:https?:|mailto:|#)/.test(rawTarget)) continue;
    const target = rawTarget.split("#", 1)[0].split("?", 1)[0];
    if (!target) continue;
    const resolved = path.resolve(path.dirname(markdownFile), target);
    if (!existsSync(resolved)) fail(path.relative(root, markdownFile), `broken local link: ${rawTarget}`);
  }
}

if (errors.length > 0) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${projectDirs.length} Dreamina projects and the knowledge catalog.`);
