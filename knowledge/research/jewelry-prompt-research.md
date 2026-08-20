# Jewelry Prompt Research Notes

## Scope

This note summarizes the prompt logic extracted from three designer-authored Feishu documents and the OpenAI GPT image prompting guide. It is a maintainer reference only. Installable Dreamina skills must include any required runtime rules directly inside their own files.

OpenAI reference:

- <https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide>

## Prompt Pattern

For jewelry image tasks, use a structured prompt rather than a single descriptive paragraph:

1. Task goal: state whether the job is original design, reference variation, sketch rendering, ecommerce standardization, or style evolution.
2. Input role: classify the input as nude gemstone, sketch, existing jewelry, element image, material reference, or style reference.
3. Invariants: explicitly lock what must stay unchanged, such as stone color, cut, proportion, silhouette, composition center, construction, or product identity.
4. Change area: state what may change, such as setting, secondary stones, metal finish, decorative language, edge rhythm, or ecommerce scene.
5. Jewelry construction: specify wearable support, setting method, connectors, chain, ring shank, bail, clasp, ear post, hinge, prongs, bezel, or bridge.
6. Material and craft: specify metal color, finish, gemstone plan, craft density, surface texture, and how details are made physically.
7. Rendering and background: default to white or very light gray background, centered single product, soft studio lighting, clean silhouette, realistic metal reflection, gemstone fire, and subtle contact shadow.
8. Negative constraints: block text, logo, watermark, certificate, price, extra props, copied brand forms, unsupported stones, floating structures, toy/plastic/cartoon feel, and dense clutter.

## Jewelry-Specific Findings

- Good jewelry prompts separate input preservation from design translation. A nude stone should preserve color, cut, transparency, proportion, and visual focus. A sketch should preserve layout, proportion, perspective, symmetry, and composition center. An element image should preserve recognizable rhythm, layers, outline language, or decorative grammar.
- White-background product output is the default for style design tasks. Ecommerce or campaign backgrounds should only be used when the user asks for them.
- Craft words need measurable density. Examples: filigree can occupy 70-90% for full filigree or 10-30% for mixed surfaces; gemstone layouts can be clustered, radiating, haloed, edge-emphasized, or graduated.
- Material color needs explicit exclusions. For 24K gold, specify rich warm yellow gold, not pale 18K gold, white gold, gray gold, orange copper, plated plastic, or mirror-polished commercial gold.
- High jewelry depends on massing and rhythm: clear visual center, full and gathered silhouette, secondary stones that support edges and flow, and limited empty space.
- Daily fine jewelry depends on restraint: small volume, rounded lightweight metal lines, limited accent stones, and no heavy full pavé unless requested.
- Antique and craft-led styles need texture grammar: milgrain, beaded edge, micro pavé, brushed satin, bas-relief, filigree, openwork lace, rope border, or chiseled relief.

## OpenAI Pattern Adapted For Jewelry

The official image prompting guide repeatedly uses a production pattern that maps well to jewelry:

- Treat the prompt as a spec.
- Explicitly separate what changes from what stays invariant.
- Preserve identity, geometry, camera angle, framing, and lighting when editing.
- For sketch-to-render, preserve layout, proportions, and perspective, then add plausible materials and lighting.
- For product mockups, use a plain white opaque background, centered product, crisp silhouette, no halos, light polishing, and subtle contact shadow.
- For multi-image work, define each input role and tell the model how to combine them.

## Recommended Skill Enhancements

- Add a `prompt_spec` stage before image generation in jewelry skills.
- Require each generated prompt to include `input_role`, `preserve`, `change`, `construction`, `material_craft`, `rendering`, and `negative_constraints`.
- Add craft presets for high-value jewelry tasks: gold filigree, chiseled relief gold, heritage matte gold, 3D hard gold, Italian antique fine jewelry, Japanese antique fine jewelry, light gold daily fine jewelry, and saturated commercial high jewelry.
- Keep design output white-background by default unless the user explicitly requests ecommerce lifestyle, model wearing, packaging, campaign, or platform-specific backgrounds.
