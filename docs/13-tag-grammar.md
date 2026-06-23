# BRIDGE tag grammar

BRIDGE tags are small machine-readable annotations placed in layer names. They make design intent explicit enough for checklists, validators, and transfer adapters.

## Syntax

A tag is written in square brackets:

```text
[key=hero-title]
[bp=1200]
[button]
[action=modal:contact-modal]
```

General forms:

```text
[flag]
[name=value]
[name=value:subvalue]
```

Rules:

- tag names use lowercase kebab-case;
- values use lowercase kebab-case unless the value is a URL or external identifier;
- multiple tags are allowed on one layer;
- stable identity must use `[key=...]`;
- free text in the visible layer name is allowed, but tags are the source of truth.

## Required core tags

### `[key=...]`

Stable logical identity.

```text
title [text] [key=hero-title]
primary [button] [key=primary-cta]
```

Rules:

- required for every transferable element;
- must be unique inside one breakpoint scope;
- must remain stable across breakpoints;
- should use English kebab-case.

### `[bp=...]`

Breakpoint root width.

```text
Hero Section [bp=1200] [key=hero-section]
Hero Section [bp=320] [key=hero-section]
```

Rules:

- used on responsive root frames;
- value is numeric width in pixels;
- sibling breakpoint frames for the same section should share the same section key.

## Element type tags

Use one primary type tag when the visual role is not obvious.

```text
[text]
[button]
[link]
[input]
[image]
[icon]
[asset]
[decor]
[shape]
[section]
[modal]
[state]
[collection]
```

Examples:

```text
price [text] [key=plan-price]
terms [link] [key=terms-link] [action=link:/terms]
email [input] [key=email-input]
features [collection] [key=features-list]
```

## Layout tags

### Flow role

Flow is usually represented by layout structure or the word `flex` in the layer name:

```text
hero-copy flex [key=hero-copy]
cards-grid flex [key=cards-grid] [wrapper-role=grid]
```

### `[abs]`

The element is intentionally removed from flow.

```text
glow [abs] [decor] [key=hero-glow]
```

Use `[abs]` with a reason tag or role tag such as `[decor]`, `[asset]`, `[overlay]`, or `[shape]`.

### `[wrapper-role=...]`

Explains why a wrapper exists.

Allowed values:

```text
stack
row
grid
clip
overlay-scope
semantic-region
target-scope
asset-group
```

Example:

```text
button-row flex [key=button-group] [wrapper-role=row]
```

## Interaction tags

### `[action=...]`

Required for clickable elements.

Allowed action forms:

```text
[action=link:/pricing]
[action=link:https://example.com]
[action=scroll:#faq]
[action=modal:contact-modal]
[action=state:mobile-menu-open]
[action=submit:lead-form]
[action=none]
```

Rules:

- `[button]` and `[link]` should have `[action=...]`;
- `modal:` must reference an existing `[modal] [key=...]` target;
- `state:` must reference an existing `[state] [key=...]` target;
- `none` is allowed only for intentionally disabled or visual-only controls.

## Content tags

### `[content-variant=...]`

Declares intentional content difference between breakpoints.

```text
title [text] [key=hero-title] [content-variant=mobile-short]
```

Use only when the content meaning is intentionally different or shortened.

### `[content=strict]`

Marks content that must not drift across breakpoints without review.

```text
price [text] [key=plan-price] [content=strict]
legal [text] [key=terms-note] [content=strict]
```

Recommended for:

- prices;
- legal copy;
- product claims;
- CTA labels;
- plan names;
- compliance-sensitive text.

## Height and overflow tags

### `[height=...]`

Allowed values:

```text
hug
fixed
min
fill
```

Examples:

```text
description [text] [key=description] [height=hug]
card [key=feature-card] [height=fixed] [reason=equal-card-grid]
```

### `[overflow=...]`

Allowed values:

```text
visible
hidden
scroll
truncate
```

Examples:

```text
description [text] [key=description] [height=fixed] [overflow=truncate] [lines=3]
image-mask [image] [key=hero-image] [overflow=hidden]
```

## Asset and media tags

### `[asset]`

Marks an element or group that should be treated as exported visual material.

```text
illustration [asset] [key=hero-illustration]
```

### `[decor]`

Marks visual material that does not carry content meaning.

```text
wave [abs] [decor] [key=decor-wave]
```

### `[focal=...]`

Declares responsive image focal point.

```text
photo [image] [key=team-photo] [focal=center-top]
```

Suggested values:

```text
center
center-top
center-bottom
left-center
right-center
custom
```

## Exception tags

### `[bridge-exception=...]`

Marks an intentional deviation from normal BRIDGE rules.

```text
poster [asset] [key=hero-poster] [bridge-exception=raster-text] [reason=brand-lockup]
```

Rules:

- every exception must include `[reason=...]`;
- exceptions should be rare;
- validators may downgrade some errors to warnings when an exception is valid.

Common exception values:

```text
raster-text
overlap
fixed-height
unsupported-effect
manual-transfer
visual-poster
```

### `[reason=...]`

Explains why an exception exists.

```text
[reason=equal-card-grid]
[reason=brand-lockup]
[reason=decorative-layered-composition]
```

## Complete examples

### Button that opens a modal

```text
contact [button] [key=contact-cta] [action=modal:contact-modal]
Modal Contact [modal] [key=contact-modal]
```

### Responsive section roots

```text
Hero Section [section] [bp=1200] [key=hero-section]
Hero Section [section] [bp=320] [key=hero-section]
```

### Valid decorative absolute layer

```text
glow [abs] [decor] [key=hero-glow]
```

### Fixed-height card with declared reason

```text
feature-card [key=feature-card-1] [height=fixed] [reason=equal-card-grid]
```

## Invalid examples

```text
Button
```

Missing key, type, and action.

```text
Frame 53 [key=frame-53]
  Group 271 [key=group-271]
    title [key=hero-title]
```

Wrapper names do not explain layout intent.

```text
description [text] [key=description] [height=fixed]
```

Fixed text height has no overflow policy or reason.
