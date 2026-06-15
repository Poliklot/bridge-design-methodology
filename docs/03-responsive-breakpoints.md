# Responsive breakpoints

## Explicit breakpoint frames

Create sibling frames for each responsive version:

```text
Landing Hero [bp=1200]
Landing Hero [bp=960]
Landing Hero [bp=640]
Landing Hero [bp=480]
Landing Hero [bp=320]
```

A tool may infer breakpoints from frame width, but explicit tags are safer.

## Same keys, different layout

Desktop and mobile may have different hierarchy and positions, but important logical elements must keep the same `[key=...]`.

Example:

```text
// desktop
button-row flex [key=button-row]
  primary button [key=primary-cta]
  secondary button [key=secondary-cta]

// mobile
button-column flex [key=button-row]
  primary button [key=primary-cta]
  secondary button [key=secondary-cta]
```

The wrapper presentation changed, but the identity stayed stable.

## Exact first, fluid later

First transfer exact breakpoint values. Only after that should a system add interpolation / fluid rules.
