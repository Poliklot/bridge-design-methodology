# Layer naming and identity

## Stable keys

Every important element should have a stable identity key:

```text
title [key=title]
subtitle [key=subtitle]
button-row flex [key=button-row]
card [key=feature-card-1]
[asset] [decor] wave [key=decor-wave]
```

Keys must match across breakpoints. The visible layer name may change; the key should not.

Desktop:

```text
Hero title [key=title]
```

Mobile:

```text
Title mobile [key=title]
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
