# Wrapper policy

Wrappers are allowed only when they communicate layout intent. A wrapper that exists only because it was convenient while drawing is noise.

## Valid wrapper roles

A wrapper is valid when it has one of these roles:

- `stack` — vertical or horizontal grouping;
- `row` — horizontal distribution;
- `grid` — repeated layout pattern;
- `clip` — bounded surface or mask scope;
- `overlay-scope` — parent for absolute overlay children;
- `semantic-region` — meaningful section of the interface;
- `target-scope` — modal, state, tab, accordion, or similar target;
- `asset-group` — atomic illustration exported or handled as one unit.

Example:

```text
cards-grid flex [key=cards-grid] [wrapper-role=grid]
  card [key=card-1]
  card [key=card-2]
```

## Invalid wrappers

Invalid wrappers usually have these signs:

- one child and no layout role;
- different wrappers between breakpoints with no reason;
- wrapper name like `Group 271`, `Frame 53`, `copy 2`;
- wrapper that changes coordinates but not meaning;
- wrapper used to hide a broken Auto Layout structure.

Bad:

```text
Frame 53 [key=frame-53]
  Group 271 [key=group-271]
    title [key=hero-title]
```

Good:

```text
hero-copy flex [key=hero-copy] [wrapper-role=stack]
  title [key=hero-title]
```

## Breakpoint-specific wrappers

A wrapper may change between breakpoints only if the role stays explainable.

```text
// desktop
button-row flex [key=button-group] [wrapper-role=row]

// mobile
button-column flex [key=button-group] [wrapper-role=stack]
```

The key remains stable because the logical group is the same.
