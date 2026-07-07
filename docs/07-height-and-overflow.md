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
feature-card [height=fixed] [reason=equal-card-grid]
```

## Text and fixed height

A text layer with fixed height must define what happens when content changes.

Bad:

```text
description [height=fixed]
```

Good:

```text
description [height=hug]
```

Or, if clipping is intentional:

```text
description [height=fixed] [overflow=truncate] [lines=3]
```

## Text wrapping and manual line breaks

Manual line breaks are not layout.

Do not use forced line breaks in a text layer, `<br>`, or breakpoint-specific copy splits to make dynamic content look correct. If the text comes from a CMS, admin panel, localization file, product catalog, or any other editable source, it must wrap by the container.

Bad:

```text
hero-title
"Launch your winter
business faster"
```

when the break is only a visual workaround.

Good:

```text
hero-title [height=hug]
```

The text area width, not the copy, defines the wrapping behavior:

- set an intentional width/max-width;
- allow normal wrapping;
- use hug/min-height when the block can grow;
- use `[overflow=truncate] [lines=...]` only when truncation is a product decision;
- tolerate long words, names, URLs, and localized text.

Forced line breaks are valid only when they are part of the content semantics or an approved brand lockup: postal addresses, poems, legal copy with prescribed formatting, or a campaign headline that must break in a specific place. Mark that as an exception:

```text
campaign-title [bridge-exception=manual-line-break] [reason=brand-lockup]
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
