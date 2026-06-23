# Layer naming and identity

## Stable keys

Every important element should have a stable identity key:

```text
title [text] [key=title]
subtitle [text] [key=subtitle]
button-row flex [key=button-row]
card [key=feature-card-1]
[asset] [decor] wave [key=decor-wave]
```

Keys must match across breakpoints. The visible layer name may change; the key should not.

Desktop:

```text
Hero title [text] [key=hero-title]
```

Mobile:

```text
Title mobile [text] [key=hero-title]
```

The transfer tool treats them as one logical element.

## Naming conventions

Use English kebab-case for keys:

- `section-bg`
- `hero-copy`
- `primary-cta`
- `stats-row`
- `card-main-image`

Avoid semantic collisions. Repeated cards need indexes:

```text
card [key=card-1]
card [key=card-2]
```

## Content identity

The same key across breakpoints means the same logical content.

Allowed:

- different width;
- different font size;
- different line breaks;
- different layout position;
- shorter visible line caused by wrapping.

Not allowed without an explicit content variant:

- different CTA wording;
- different price;
- different legal text;
- different product claim;
- hiding required meaning on mobile.

Bad:

```text
// desktop
title [key=hero-title] = "Launch your store in one day"

// mobile
title [key=hero-title] = "Launch faster"
```

If content intentionally differs, declare it:

```text
title [key=hero-title] [content-variant=mobile-short]
```

## Suggested structural names

```text
section-body flex [key=section-body]
content flex [key=content]
hero flex [key=hero]
hero-copy flex [key=hero-copy]
button-row flex [key=button-row]
stats-row flex [key=stats-row]
visual-col flex [key=visual-col]
```
