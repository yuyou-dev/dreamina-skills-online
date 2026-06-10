# Preset Extension Guide

本目录用于维护人员整理未来预设草案。即梦在线运行时不应依赖本目录被读取；成熟预设应复制进对应 installable skill，或发展成独立自包含 skill。

## 命名

建议使用英文 kebab-case：

- `amazon-premium-gift-set.md`
- `ring-bridal-series.md`
- `high-jewelry-floral.md`
- `colored-gem-cocktail.md`

## 每个预设应包含

- 适用技能：`珠宝电商素材Skill`、`JewelryDesignSkills`、`脱口秀视频Skill` 或 `大批量执行Skill`
- 触发语：用户说什么时适合用
- 输入字段：必填项和默认值
- 工具链：即梦在线工具的调用顺序
- 提示词模板：图片、视频或设计矩阵模板
- 质量检查：通过标准和失败重试策略
- 禁止项：证书、价格、品牌授权、结构错误、过度复制等风险

## 链式调用要求

每个预设都必须写清楚“下一步工具”，例如：

```text
text2image_v3 生成产品母图后，立即把母图作为 @图片1 交给 image2image_v3 生成槽位图。
image2image_v3 生成主图、微距图、佩戴图后，立即把它们作为 @图片1-@图片3 交给 multi_modal2video。
multi_modal2video 生成片段后，立即交给 video_editor 输出最终成片。
```
