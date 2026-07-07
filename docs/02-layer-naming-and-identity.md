# Layer naming and identity

BRIDGE identity is the stable key of a logical element. In Figma, identity is provided in two ways:

1. by a stable layer name when the element type is reliably known from Figma;
2. by a BRIDGE tag when product intent must be declared because Figma does not know it.

## Core rule

Do not write a tag if it only repeats Figma metadata.

```text
hero-title
product-photo
close-icon
button-group
hero-copy
```

These names are enough when the layer has a clear Figma type and the name is stable English kebab-case.

## When a tag is required

A tag is required for intent that is not a technical layer property:

```text
Home Page [page=home] [route=/] [bp=1920] [view=default]
Catalog [section=product-slider]
primary-cta [link=primary-cta] [href=/catalog]
menu-button [control=menu-button] [action=state:mobile-menu-open]
email [field=email] [name=email]
snow-bg [decor=snow-bg]
promo-poster [asset=promo-poster]
```

## What is not written as a Figma tag

For Figma designs, designers do not manually describe the technical construction of a layer:

- that a layer is text;
- that a layer is a content image;
- that a layer is an icon;
- that a layer is a frame, group, or structural wrapper;
- how Auto Layout is configured;
- how a layer is positioned;
- which source component owns an instance when Figma already knows it.

## Stable identity across breakpoints

The same logical element must keep the same key across all breakpoints.

Desktop:

```text
hero-title
button-group
  primary-cta [link=primary-cta] [href=/pricing]
  secondary-cta [control=secondary-cta] [action=modal:contact-modal]
```

Mobile:

```text
hero-title
button-group
  primary-cta [link=primary-cta] [href=/pricing]
  secondary-cta [control=secondary-cta] [action=modal:contact-modal]
```

The Figma layout may change, but identity stays the same.

## Naming conventions

Use English kebab-case for stable identities:

- `section-bg`
- `hero-copy`
- `primary-cta`
- `stats-row`
- `card-main-image`

Avoid semantic collisions. Repeated elements need indexes:

```text
product-card-1
product-card-2
review-card-1
review-card-2
```

## Section names

For sections, the human-readable layer name and the `[section=...]` tag have different responsibilities.

```text
Recommended Products [section=product-slider]
Related Products [section=product-slider]
Catalog [section=product-slider]
```

- the layer name before tags is the contextual label for this page;
- `[section=...]` is the reusable section/component contract that tells an agent or adapter which section component should transfer the block;
- content, heading, and data may differ across pages while `[section=...]` stays the same;
- if a section is unique to one page, use a specific section id such as `Hero [section=home-hero]`;
- do not add prefixes such as `Section /` to the human name: the role is already declared by `[section=...]`.

The same `[section=...]` across breakpoints of one page means the same section contract and should keep a comparable structure. The same `[section=...]` across different pages does not require identical content.

## Content identity

The same identity across breakpoints means the same logical content.

Allowed changes:

- width;
- font size;
- line wrapping;
- position inside the same structure;
- parent Auto Layout settings;
- order inside the same parent;
- visibility on a specific breakpoint.

Not allowed across breakpoints:

- changing CTA text;
- changing price;
- changing legal copy;
- changing product claims;
- hiding important meaning on mobile;
- shortening labels only for mobile;
- moving the same element to another parent;
- adding or removing logical elements without an explicit variant, state, collection rule, or exception;
- replacing the same logical element with separate breakpoint-specific copies.

Bad:

```text
// desktop
hero-title = "Launch your store in one day"

// mobile
hero-title = "Launch faster"
```

If text, meaning, or structure differs because of locale, experiment, personalization, product variant, or target-specific limitations, model it outside the ordinary responsive breakpoint contract. A responsive breakpoint is the same element set laid out for another width, not a new content or structure version.

## Recommended structural names

```text
section-body
content
hero
hero-copy
button-group
stats-row
visual-column
cards-list
cards-grid
```

These are layer names, not a request to add technical tags.
