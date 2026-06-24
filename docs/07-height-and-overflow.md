# Height and overflow

Fixed height is one of the most common sources of transfer bugs. BRIDGE requires height intent to be explicit.

## Default preference

Prefer content-driven sizing:

- text layers hug content;
- cards grow with content;
- sections define padding and min-height rather than clipping content;
- repeated cards align through grid rules, not hidden overflow.

## When fixed height is allowed

Fixed height is valid for:

- root breakpoint canvases;
- buttons and controls with a design-system size;
- icons and images with fixed aspect ratio;
- bounded cards when equal height is intentional;
- masks, posters, and exported visual assets;
- scrollable areas with an explicit overflow strategy.

Declare the reason:

```text
card [card=feature-card] [height=fixed] [reason=equal-card-grid]
```

## Text and fixed height

A text layer with fixed height must define what happens when content changes.

Bad:

```text
description [text=description] [height=fixed]
```

Good:

```text
description [text=description] [height=hug]
```

Or, if clipping is intentional:

```text
description [text=description] [height=fixed] [overflow=truncate] [lines=3]
```

## Overflow policy

Use explicit overflow tags:

```text
[overflow=visible]
[overflow=hidden]
[overflow=scroll]
[overflow=truncate]
```

If an item overflows visually, place it at the hierarchy level where that overflow is intended.
