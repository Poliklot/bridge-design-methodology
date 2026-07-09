# Responsive breakpoints

## Explicit root frames

Create sibling frames for each responsive version:

```text
Home Page [bp=1920] [view=default] [page=home] [route=/]
Home Page [bp=1280] [view=default] [page=home] [route=/]
Home Page [bp=768] [view=default] [page=home] [route=/]
Home Page [bp=375] [view=default] [page=home] [route=/]
```

A tool may infer the breakpoint from frame width, but an explicit tag is safer for handoff and comparison.

`[bp=...]` belongs on the responsive root. Child layer names and identity-bearing tag values must not repeat the breakpoint name or width.

Bad:

```text
// root has [bp=768]
Отзывы мобилка [control=button-reviews-box-768]

// root has [bp=375]
Отзывы мобилка [control=button-reviews-box-375]
```

Good:

```text
// root has [bp=768]
reviews-box [control=button-reviews-box]

// root has [bp=375]
reviews-box [control=button-reviews-box]
```

## Same element set, different layout

A responsive breakpoint is the same screen laid out for another width. It is not a second screen and not a new structure.

Root frames for the same page, state, or section must keep:

- the same important elements with the same keys;
- the same nesting: an element stays inside the same parent;
- the same number of list/card items unless the list is explicitly modeled as dynamic;
- the same actions, targets, and text for the same elements.

Breakpoints may change sizes, spacing, wrapping, Auto Layout direction, order, visibility, and constraints. They must not silently create elements, remove elements, or move the same element into another parent.

Order and visibility are breakpoint properties:

- elements may change order inside the same parent;
- an element may be hidden on one breakpoint and visible on another;
- hiding an element does not mean deleting it: the same key should remain in the structure;
- a visible element must not be replaced by a separate mobile-only or desktop-only copy.

The forbidden case is not “the element is currently hidden”. The forbidden case is “this key exists in one breakpoint but is completely absent in another” or “this key moved to another parent”.

Decorative and asset layers follow the same rule. `[decor]` changes semantic importance and accessibility behavior; it does not allow the layer to disappear on mobile. `[asset]` changes transfer/export policy; it does not remove the need for a stable root identity.

```text
// desktop
sneg [decor] [asset]

// mobile
sneg [decor] [asset]
```

If `sneg` exists on desktop but is absent on mobile, the validator must report a responsive identity error. If desktop has `sneg [decor] [asset]` but mobile has only `sneg`, the validator must report visual intent drift.

If item count or nesting must change, this is not an ordinary breakpoint. Model it as a state, component variant, collection rule, platform variant, or explicit BRIDGE exception.

```text
// desktop
button-group
  primary-cta [link=primary-cta] [href=/pricing]
  secondary-cta [control=secondary-cta] [action=modal:contact-modal]

// mobile
button-group
  primary-cta [link=primary-cta] [href=/pricing]
  secondary-cta [control=secondary-cta] [action=modal:contact-modal]
```

The group direction and sizes may change in Figma, but the element set and nesting stay the same.

## Wrapper changes need a reason

Do not introduce random wrappers between breakpoints. The element structure is part of the contract, so prefer adding the same meaningful wrapper to every breakpoint and changing only its Figma settings.

A wrapper that exists only on one breakpoint is an exception. It is valid only when it represents a real need: grouping, list, grid, clipping area, overlay/decor scope, semantic region, or target-specific grouping. The reason must be explicit.

Bad:

```text
// mobile
mystery-wrapper
  hero-title
```

Good:

```text
// mobile
hero-copy
  hero-title
```

## Text meaning must survive the breakpoint

A breakpoint may change size, wrapping, order, and visibility. It must not change element text or structure.

## Exact breakpoints first, fluid behavior later

First transfer exact breakpoint values. Only after that should a system add interpolation, fluid rules, or container-query behavior.
