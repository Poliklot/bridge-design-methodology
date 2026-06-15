# Design rules

## 1. Every layer is either flex or absolute

For AI transfer, there are only two valid layout states:

- **Flex** — a child belongs to an Auto Layout parent and participates in flow.
- **Absolute** — a child is intentionally removed from flow and has explicit coordinates.

If a layer is neither clearly in flex nor explicitly absolute, the transfer is ambiguous.

## 2. Containers express structure

Use Auto Layout containers for semantic groups:

- `section-body flex`
- `content flex`
- `hero flex`
- `hero-copy flex`
- `button-row flex`
- `cards-grid flex`
- `stats-row flex`

Do not position related items as free siblings.

## 3. Absolute is only for intentional exceptions

Use absolute for:

- backgrounds;
- decorative assets;
- overlays;
- complex atomic illustrations;
- masks / exported visual posters.

Absolute layers should usually have explicit tags such as `[asset]`, `[decor]`, `[shape]`, or `[abs]` depending on the target pipeline.

## 4. Root frames are fixed breakpoint canvases

A root section frame should have a known breakpoint width and a stable name:

```text
Pricing Section [bp=1200]
Pricing Section [bp=320]
```

The root may be a fixed-size Auto Layout container with padding and `clip content` enabled.

## 5. Clip content is intentional

If a frame is a bounded surface/card/section, enable clip content.

If an element must visually overflow, make the overflowing item absolute and put it at the correct hierarchy level.

## 6. Native/editable elements stay native

Prefer native text, native buttons, and native shapes. Use asset fallbacks only for complex visuals that the target builder cannot reproduce accurately.
