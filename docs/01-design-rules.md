# Design rules

A BRIDGE-ready design must be understandable before transfer. In Figma, that comes from a correctly authored structure, stable names, and explicit product intent — not from hand-written technical tags.

## 1. Do not duplicate Figma metadata

Designers must not write layer-name tags for technical properties that Figma already exposes as data:

- node type: text, image, vector, component instance;
- Auto Layout: direction, gap, padding, alignment, wrap;
- frame, group, and component hierarchy;
- positioning, constraints, clip content, dimensions;
- fills, strokes, effects, masks;
- source component, variants, component properties.

The adapter reads these from Figma. A manual tag is needed only when Figma does not know the product intent.

## 2. What designers declare manually

Layer names declare only transfer intent:

- page, route, breakpoint, and view;
- section contract;
- link, action, form field;
- modal or state target;
- decorative visual;
- whole exported asset;
- height, overflow, or explicit exception when it cannot be safely inferred.

## 3. Build structure with Figma

Related elements should be authored as real Figma structure:

- copy and buttons live inside a meaningful parent;
- cards live inside a shared list or grid;
- section title, copy, and CTA live inside the section;
- repeated items are structured consistently;
- random `Frame 53`, `Group 271`, and `copy 2` layers are not part of a ready handoff.

If elements should adapt together, they must not be loose free-floating siblings.

## 4. Image, decor, and asset mean different things

A content image carries information. If removing it changes the meaning, give the layer a stable name.

Decor is visual ornament. If removing it preserves meaning, mark it with `[decor=...]`.

An asset is a visual that should be exported as one whole file instead of being rebuilt from internal layers. Mark it with `[asset=...]`.

```text
product-photo
article-cover
author-avatar
snow-bg [decor=snow-bg]
hero-glow [decor=hero-glow]
promo-poster [asset=promo-poster]
lab-illustration [asset=lab-illustration]
```

## 5. The root frame is a concrete page or section breakpoint

The root frame should carry stable page/view/breakpoint data:

```text
Home Page [bp=1920] [view=default] [page=home] [route=/]
Home Page [bp=375] [view=default] [page=home] [route=/]
```

A breakpoint is the same page at another width, not a new version of meaning or structure.

## 6. Clipping and overflow are decisions

If a frame is a card, viewport, mask, or constrained surface, its overflow behavior must be intentional.

Text coming from a CMS, admin panel, catalog, or localization must not rely on manual line breaks. It should wrap by the width of its text area and have clear overflow behavior.

## 7. Native/editable elements stay native

Text, buttons, form fields, simple shapes, and icons should not be turned into images without a reason. Exported assets are only for complex visuals that the target implementation should not or cannot rebuild.

## 8. The methodology is platform-independent

BRIDGE is not tied to one tool. Figma is the primary design source, but the contract should transfer into frontend frameworks, static HTML/CSS, visual editors, mobile UI, or internal design systems without guessing.
