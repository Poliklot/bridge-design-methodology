# Layer naming and identity

BRIDGE uses typed identity tags:

```text
[type=id]
```

The tag describes both the transferable role and the stable identity of the layer.

## Examples

```text
title [text=hero-title]
subtitle [text=hero-subtitle]
button group [container=button-group] [layout=row]
card [card=feature-card-1]
wave [decor=decor-wave] [abs]
```

## Stable identity across breakpoints

The identity part must stay stable across breakpoints.

Desktop:

```text
Hero title [text=hero-title]
Button group [container=button-group] [layout=row]
```

Mobile:

```text
Hero title [text=hero-title]
Button group [container=button-group] [layout=stack]
```

The layout changed from row to stack, but the identity remained `button-group`.

## Naming conventions

Use English kebab-case for identities:

- `section-bg`
- `hero-copy`
- `primary-cta`
- `stats-row`
- `card-main-image`

Avoid semantic collisions. Repeated cards need indexes:

```text
card [card=card-1]
card [card=card-2]
```

## Section names

For sections, the human-readable layer name and the `[section=...]` tag mean different things.

```text
Recommended products [section=product-slider]
Related products [section=product-slider]
Catalog [section=product-slider]
```

- the layer name before tags is the contextual label for this page;
- `[section=...]` is the reusable section/component contract that tells an agent or adapter which section component should implement the block;
- content, heading, and data may differ across pages while `[section=...]` stays the same;
- if a section is unique to one page, use a specific section id: `First screen [section=home-hero]`;
- do not add prefixes such as `Section /` to the human name: the role is already declared by `[section=...]`.

The same `[section=...]` across breakpoints of one page means the same section contract and should preserve a comparable structure. The same `[section=...]` across different pages does not require identical content.

## Content identity

The same typed identity across breakpoints means the same logical content.

Allowed:

- different width;
- different font size;
- different line breaks;
- different layout position;
- different parent layout properties.
- different sibling order inside the same parent;
- different visibility per breakpoint.

Not allowed across responsive breakpoints:

- different CTA wording;
- different price;
- different legal text;
- different product claim;
- hiding required meaning on mobile;
- shortened mobile-only labels;
- moving the same identity under a different parent;
- adding or removing logical elements without a declared variant, state, collection rule, or structural exception;
- replacing the same logical element with separate breakpoint-only copies.

Bad:

```text
// desktop
title [text=hero-title] = "Launch your store in one day"

// mobile
title [text=hero-title] = "Launch faster"
```

If content or tree topology differs because of locale, experiment, personalization, a product variant, or target-specific behavior, model it outside the ordinary responsive breakpoint contract. A responsive breakpoint is a layout variation of the same logical tree, not a content or structure variation.

## Suggested structural names

```text
section-body [container=section-body] [layout=stack]
content [container=content] [layout=stack]
hero [container=hero] [layout=row]
hero-copy [container=hero-copy] [layout=stack]
button group [container=button-group] [layout=row]
stats row [container=stats-row] [layout=row]
visual column [container=visual-col] [layout=stack]
```
