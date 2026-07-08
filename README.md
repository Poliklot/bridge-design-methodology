# BRIDGE

## Breakpoints · Roles · Identity · Dependencies · Geometry · Exceptions

**Designs that can cross the gap.**

BRIDGE is a target-independent methodology for making interface designs transferable: from Figma or any other design source into code, design systems, no-code tools, internal editors, or AI-assisted implementation pipelines.

Languages: [English](README.md) · [Русский](README.ru.md)

> **BRIDGE is not a tool and not a platform adapter.**  
> BRIDGE is the contract that makes a design understandable before anyone tries to implement it.

## The name

**BRIDGE** means that the design is no longer an isolated picture. It becomes a bridge between intention and implementation.

The acronym is the methodology:

| Letter | Principle | Rule |
| --- | --- | --- |
| **B** | **Breakpoints** | Responsive states are explicit and comparable as one logical tree. |
| **R** | **Roles** | A layer role is clear from Figma structure, UI Kit metadata, or a required BRIDGE intent tag. |
| **I** | **Identity** | Logical elements keep stable keys and tree positions across breakpoints. |
| **D** | **Dependencies** | Links, modals, states, anchors, and actions are declared. |
| **G** | **Geometry** | Position, size, spacing, and text metrics are reproducible. |
| **E** | **Exceptions** | Assets, fixed heights, overflow, decor, and non-standard behavior are intentional. |

## Brand vocabulary

Use the name consistently:

- **BRIDGE-ready design** — a design that can be transferred without guessing.
- **BRIDGE Contract** — the structured data expected from the design.
- **BRIDGE Preflight** — the checklist before handoff.
- **BRIDGE Adapter** — a target-specific implementation layer.
- **BRIDGE Linter** — a future validator for design mistakes.
- **BRIDGE Exception** — an intentional deviation with an explicit reason.

Short formula:

```text
BRIDGE-ready = explicit breakpoints + stable responsive tree + declared intent
```

## Why BRIDGE exists

A design that should be transferred by humans, AI agents, or deterministic tools must be authored as a system, not as a visual sketch.

BRIDGE is not tied to any specific platform. It does not prescribe a particular framework, CMS, visual editor, runtime, or design-to-code tool. Target adapters may map the same contract to HTML/CSS, React, Vue, mobile UI, internal tools, or any other implementation surface.

## Core idea

BRIDGE separates two things:

1. **Figma metadata** — the technical truth of the design: node type, Auto Layout, hierarchy, constraints, positioning, component source, variants.
2. **BRIDGE intent tags** — product meaning Figma does not know by itself: page, route, section, link, action, field, modal, state, decor, asset, exception.

Designers do not duplicate technical properties by hand. They build proper structure in Figma and use tags only for transferable intent.

No accidental free-floating layers. No mystery buttons. No responsive versions that silently change content meaning or rebuild the element tree.

## Start here

- [Design rules](docs/01-design-rules.md)
- [Layer naming and identity](docs/02-layer-naming-and-identity.md)
- [Responsive breakpoints](docs/03-responsive-breakpoints.md)
- [Transfer contract](docs/04-transfer-contract.md)
- [Interactions and targets](docs/05-interactions-and-targets.md)
- [Wrapper policy](docs/06-wrapper-policy.md)
- [Height and overflow](docs/07-height-and-overflow.md)
- [Preflight checklist](docs/08-preflight-checklist.md)
- [Common designer mistakes](docs/09-common-designer-mistakes.md)
- [Hard cases and edge cases](docs/10-hard-cases-and-edge-cases.md)
- [Validation and autochecks](docs/11-validation-and-autochecks.md)
- [Project roadmap](docs/12-project-roadmap.md)
- [Tag grammar](docs/13-tag-grammar.md)
- [Components, UI Kit, and Page Sections](docs/14-components-and-ui-kit.md)
- [Page routing and views](docs/15-page-routing-and-views.md)
- [Variation axes](docs/16-variation-axes.md)
- [Validator rule catalog](validator/rules.json)

## Tooling

BRIDGE Assistant, the Figma helper plugin for this methodology, is maintained in a separate private/local repository:

```text
bridge-figma-assistant
```

## Minimal example

```text
Home Page [page=home] [route=/] [bp=1200] [view=default]
  Hero [section=home-hero]
    hero-bg [decor=hero-bg]

    hero-copy
      hero-title
      hero-subtitle

    button-group
      primary-cta [link=primary-cta] [href=/pricing]
      contact-cta [control=contact-cta] [action=modal:contact-modal]

Contact Modal [modal=contact-modal]
  contact-modal-content
```

## License

MIT.
