# Responsive breakpoints

## Explicit breakpoint frames

Create sibling frames for each responsive version:

```text
Landing Hero [section=landing-hero] [bp=1200]
Landing Hero [section=landing-hero] [bp=960]
Landing Hero [section=landing-hero] [bp=640]
Landing Hero [section=landing-hero] [bp=480]
Landing Hero [section=landing-hero] [bp=320]
```

A tool may infer breakpoints from frame width, but explicit tags are safer.

## Same identities, different layout

Desktop and mobile may have different hierarchy and layout properties, but important logical elements must keep the same typed identity.

Example:

```text
// desktop
button group [container=button-group] [layout=row]
  primary [link=primary-cta] [href=/pricing]
  secondary [control=secondary-cta] [action=modal:contact-modal]

// mobile
button group [container=button-group] [layout=stack]
  primary [link=primary-cta] [href=/pricing]
  secondary [control=secondary-cta] [action=modal:contact-modal]
```

The layout changed, but identity stayed stable.

## Wrapper changes require a reason

Do not introduce random wrappers between breakpoints. A breakpoint-specific wrapper is valid only if it expresses a real layout role: stack, row, grid, clipping scope, overlay scope, semantic region, or target-specific grouping.

Bad:

```text
// mobile
mystery-wrapper [container=wrapper-7]
  title [text=hero-title]
```

Good:

```text
// mobile
hero copy [container=hero-copy] [layout=stack]
  title [text=hero-title]
```

## Text meaning must survive responsive changes

Responsive variants may change size, wrapping, order, and visibility. They must not change content.

## Exact first, fluid later

First transfer exact breakpoint values. Only after that should a system add interpolation, fluid rules, or container-query behavior.
