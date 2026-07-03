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
cards [container=cards] [layout=grid]
  card [card=card-1]
  card [card=card-2]
```

## Invalid wrappers

Invalid wrappers usually have these signs:

- one child and no layout role;
- wrappers that appear, disappear, or reparent children between breakpoints with no reason;
- wrapper name like `Group 271`, `Frame 53`, `copy 2`;
- wrapper that changes coordinates but not meaning;
- wrapper used to hide a broken Auto Layout structure.

Bad:

```text
Frame 53 [container=frame-53]
  Group 271 [container=group-271]
    title [text=hero-title]
```

Good:

```text
hero copy [container=hero-copy] [layout=stack]
  title [text=hero-title]
```

## Responsive wrapper stability

A wrapper's layout properties may change between breakpoints, but its identity and parent-child position should stay stable.

```text
// desktop
button group [container=button-group] [layout=row]

// mobile
button group [container=button-group] [layout=stack]
```

The key remains stable because the logical group is the same.

A wrapper that exists only on one breakpoint changes the responsive tree. Treat it as a structural exception, or add the same meaningful wrapper to every breakpoint and make it layout-neutral where needed.
