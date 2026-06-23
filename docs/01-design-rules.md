# Design rules

BRIDGE designs must be understandable before they are transferred. A layer is not “done” just because it looks correct visually.

## 1. Every layer has a role

For transfer, every layer must be one of the following:

- **Flow** — participates in layout flow through Auto Layout, stack, row, column, grid, or an equivalent layout model.
- **Absolute** — intentionally removed from flow and positioned by explicit coordinates.
- **Target** — a declared destination for an interaction, such as a modal, section, state, or external URL.

If a layer is neither clearly in flow nor explicitly absolute, the transfer is ambiguous.

## 2. Containers express structure

Use layout containers for semantic groups:

- `section-body flex`
- `content flex`
- `hero flex`
- `hero-copy flex`
- `button-row flex`
- `cards-grid flex`
- `stats-row flex`

Do not position related items as free siblings when they should behave as a group.

## 3. Absolute is only for intentional exceptions

Use absolute positioning for:

- backgrounds;
- decorative assets;
- overlays;
- complex atomic illustrations;
- masks / exported visual posters;
- elements that intentionally overflow a bounded parent.

Absolute layers should have explicit tags such as `[abs]`, `[asset]`, `[decor]`, `[shape]`, or `[overlay]`.

## 4. Root frames are fixed breakpoint canvases

A root section frame should have a known breakpoint width and a stable name:

```text
Pricing Section [bp=1200]
Pricing Section [bp=320]
```

The root may be a fixed-size canvas snapshot. Internal content should still expose layout intent.

## 5. Clip content is intentional

If a frame is a bounded surface, card, viewport, or section, define its overflow behavior.

If an element must visually overflow, make the overflowing item absolute and put it at the correct hierarchy level.

## 6. Native/editable elements stay native

Prefer native text, native buttons, and native shapes. Use asset fallbacks only for complex visuals that the target implementation cannot reproduce accurately.

## 7. No platform-specific assumptions in the methodology

BRIDGE is independent from any single implementation target. A target adapter may map BRIDGE to a framework, static HTML/CSS, a visual editor, a mobile UI, or another design system, but the source design contract remains the same.
