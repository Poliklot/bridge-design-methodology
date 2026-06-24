# Components and UI Kit

BRIDGE treats components as a separate contract. Page designs consume component instances. The UI Kit owns component structure, variants, and states.

## Core rule

> Page design uses component instances. UI Kit defines component states.

A page should not be the place where hover, focus, disabled, loading, error, selected, expanded, or open states are invented for the first time.

## Page instance responsibility

A page instance describes only page-specific identity and behavior:

```text
Contact us [control=contact-cta] [action=modal:contact-modal]
FAQ [link=nav-faq] [href=/contacts#faq]
Email [field=email] [name=email]
```

Do not add `[component=...]` on page instances when Figma already knows the source component.

Bad:

```text
Contact us [control=contact-cta] [component=button] [action=modal:contact-modal]
```

Good:

```text
Contact us [control=contact-cta] [action=modal:contact-modal]
```

The component source is extracted from the Figma instance metadata.

## UI Kit responsibility

The UI Kit must define reusable component behavior and visual states.

Examples of state coverage:

| Component family | Required states |
| --- | --- |
| Button-like controls | default, hover, focus, pressed, disabled, loading |
| Links | default, hover, focus, visited, disabled |
| Text fields | empty, filled, focus, error, disabled, success |
| Select-like fields | closed, open, selected, focus, error, disabled |
| Toggles/switches | off, on, focus, disabled |
| Tabs | default, active, hover, focus, disabled |
| Disclosure/accordion | collapsed, expanded, focus, disabled |
| Modal/dialog | default, close behavior, backdrop behavior, focus trap |

The exact component taxonomy may differ between design systems. BRIDGE should not force every page designer to write detailed roles such as `accordion-trigger` in page layer names.

## Why not role tags on every page control?

There are too many control variations: tabs, accordions, menus, comboboxes, sliders, steppers, pagination, segmented controls, tree items, date pickers, uploaders, and many custom controls.

If BRIDGE requires page designers to name all of them manually, the methodology becomes fragile.

Instead:

- page layer names use `[control=...]`, `[link=...]`, or `[field=...]`;
- UI Kit component metadata provides the exact component type;
- validators check the component source and state coverage.

## Required validator checks

A BRIDGE validator should report:

- page control is not a Figma component instance;
- page instance is detached from the UI Kit component;
- same control identity uses different component sources across breakpoints;
- required UI states are missing in the component set;
- hover/focus/disabled/loading states are drawn manually on a page;
- component instance overrides change structure rather than content;
- form fields do not expose data names;
- icon-only component instances lack accessible labels.

## Component source of truth

Preferred source order:

1. Figma component instance metadata.
2. Figma component set and variant properties.
3. UI Kit documentation.
4. BRIDGE tags only when metadata is unavailable.

BRIDGE tags should not duplicate information that Figma already provides reliably.

## Page state vs component state

Do not confuse page/data state with component UI state.

Page/data state:

```text
Catalog Page [page=catalog] [route=/catalog] [bp=1200] [view=empty]
```

Component UI state in UI Kit:

```text
Button / Primary / Disabled
Input / Error
Accordion / Expanded
```

A page may show a real page state such as empty catalog, but component hover/focus/disabled variants belong in the UI Kit.
