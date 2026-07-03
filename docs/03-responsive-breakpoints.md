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

## Same element tree, different layout

A responsive breakpoint is a layout variation of the same logical element tree, not a second version of the screen.

Breakpoint roots for the same view/section must preserve:

- the same transferable identities;
- the same parent-child relationships between those identities;
- the same collection cardinality, unless collection rules declare dynamic min/max/empty behavior;
- the same actions, targets, and content for the same identities.

Responsive variants may change geometry and layout behavior: size, spacing, wrapping, layout direction, order, visibility, and constraints. They must not silently create elements, remove elements, or move an identity into a different parent.

Order and visibility are breakpoint properties:

- sibling elements may be reordered inside the same parent;
- an element may be hidden on one breakpoint and visible on another;
- hiding does not mean deleting: the same identity still exists in the responsive tree;
- a visible element must not be replaced by a different mobile-only or desktop-only copy.

The forbidden case is not "this element is currently invisible". The forbidden case is "this identity exists in one breakpoint, but is missing from another", or "this identity moved under a different parent".

If element count or nesting must change, model it as a state, component variant, collection rule, target-specific variant, or explicit BRIDGE structural exception. Do not hide it as an ordinary responsive breakpoint.

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

The layout changed, but identity and parent-child topology stayed stable.

## Wrapper changes require a reason

Do not introduce random wrappers between breakpoints. Because the responsive tree is part of the contract, prefer adding the same meaningful wrapper to every breakpoint and changing only its layout properties.

A breakpoint-specific wrapper is a structural exception. It is valid only if it expresses a real layout role such as stack, row, grid, clipping scope, overlay scope, semantic region, or target-specific grouping, and the reason is declared.

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

Responsive variants may change size, wrapping, order, and visibility. They must not change content or logical tree topology.

## Exact first, fluid later

First transfer exact breakpoint values. Only after that should a system add interpolation, fluid rules, or container-query behavior.
