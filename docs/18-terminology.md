# BRIDGE terminology

This glossary defines the canonical English terms used by BRIDGE and their precise meaning in the methodology.

## The six principles

| Term | Meaning |
| --- | --- |
| Breakpoints | Explicit responsive states prepared at known widths. |
| Roles | The purpose of a layer as determined by Figma metadata, component source, or BRIDGE intent. |
| Identity | The stable key that links one logical element across breakpoints and states. |
| Dependencies | Links, actions, and the targets they depend on. |
| Geometry | Reproducible size, position, spacing, and text metrics. |
| Exceptions | Intentional deviations with an explicit reason. |

## Design structure

- **Root frame** — the top-level frame for a page, view, breakpoint, or standalone section.
- **Stable identity** — an English `kebab-case` layer name or identity-bearing tag value that does not depend on viewport width.
- **Wrapper** — a parent layer with a real grouping, layout, clipping, surface, or interaction purpose.
- **Source component** — the Figma component from which an instance originates.
- **Page section** — a reusable page-level block sourced from `Page Sections` or declared with `[section]`.

## Variation

- **Breakpoint** — the width represented by a prepared responsive root using `[bp]`.
- **View** — a page or data state represented by `[view]`, such as `default`, `empty`, `loading`, or `error`.
- **Locale** — a language and regional formatting context.
- **Theme** — a visual token context that must not silently change product content.
- **Data scenario** — a QA fixture for long text, empty data, maximum item counts, and other stress cases.

## Transfer and validation

- **Handoff** — delivery of the design and its contract for implementation.
- **BRIDGE-ready** — sufficiently explicit to implement without guessing.
- **Preflight** — the review performed before handoff.
- **Validator** — a tool that evaluates deterministic and heuristic BRIDGE rules.
- **Adapter** — the target-specific layer that maps the BRIDGE contract into an implementation environment.
- **Severity** — `error`, `warning`, or `info` in a validation report.

## Visual intent

- **Content image** — an image whose removal would change product meaning.
- **Decor** — a visual-only layer marked with `[decor]` and excluded from content semantics.
- **Asset** — a visual marked with `[asset]` that should be exported or used as one unit.
- **Fixed height** — an intentional bounded height that requires a reason when content can vary.
- **Overflow policy** — the declared behavior when content exceeds its bounds.

## Writing and naming

- Keep machine-readable names and tag values in English `kebab-case`.
- Keep code, rule IDs, JSON fields, and canonical tags unchanged in translations.
- Use product language for human-facing layer labels and documentation.
- Distinguish handoff, implementation, and asset export: they are different operations.
