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
| **B** | **Breakpoints** | Responsive states are explicit and comparable. |
| **R** | **Roles** | Every layer has a clear role: flow, absolute, or target. |
| **I** | **Identity** | Logical elements keep stable keys across breakpoints. |
| **D** | **Dependencies** | Links, modals, states, anchors, and actions are declared. |
| **G** | **Geometry** | Position, size, spacing, and text metrics are reproducible. |
| **E** | **Exceptions** | Assets, fixed heights, overflow, and absolute items are intentional. |

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
BRIDGE-ready = explicit breakpoints + stable identity + declared intent
```

## Why BRIDGE exists

A design that should be transferred by humans, AI agents, or deterministic tools must be authored as a system, not as a visual sketch.

BRIDGE is not tied to any specific platform. It does not prescribe a particular framework, CMS, visual editor, runtime, or design-to-code tool. Target adapters may map the same contract to HTML/CSS, React, Vue, mobile UI, internal tools, or any other implementation surface.

## Core idea

Every layer must have an explicit role:

1. **Flow item** — part of an explicit layout chain, usually Auto Layout / stack / row / grid.
2. **Absolute item** — intentionally removed from flow, usually background, decor, overlay, or visual exception.
3. **Declared target** — an interaction destination such as a modal, section, state, or external URL.

No accidental free-floating layers. No mystery buttons. No responsive versions that silently change content meaning.

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

## Minimal example

```text
Hero Section [bp=1200] [key=hero-section]
  background [abs] [decor] [key=hero-bg]

  content flex [key=content]
    hero-copy flex [key=hero-copy]
      title [text] [key=hero-title]
      subtitle [text] [key=hero-subtitle]

    button-row flex [key=button-row]
      primary [button] [key=primary-cta] [action=link:/pricing]
      secondary [button] [key=contact-cta] [action=modal:contact-modal]

Modal Contact [modal] [key=contact-modal]
  modal-content flex [key=contact-modal-content]
```

## License

MIT.
