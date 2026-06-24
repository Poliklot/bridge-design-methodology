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

## Content identity

The same typed identity across breakpoints means the same logical content.

Allowed:

- different width;
- different font size;
- different line breaks;
- different layout position;
- different parent layout.

Not allowed across responsive breakpoints:

- different CTA wording;
- different price;
- different legal text;
- different product claim;
- hiding required meaning on mobile;
- shortened mobile-only labels.

Bad:

```text
// desktop
title [text=hero-title] = "Launch your store in one day"

// mobile
title [text=hero-title] = "Launch faster"
```

If content differs because of locale, experiment, personalization, or a product variant, model it outside the responsive breakpoint contract. A responsive breakpoint is a layout variation, not a content variation.

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
