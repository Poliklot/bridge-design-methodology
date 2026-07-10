# BRIDGE by example

This is a catalog of short recipes. Each starts with a problem, contrasts a bad and good version, and explains one rule only.

If BRIDGE is new to you, begin with the [designer quick start](../docs/00-designer-quick-start.md).

| Example | Use it when |
| --- | --- |
| [1. Page and breakpoints](#1-page-and-breakpoints) | connecting desktop, tablet, and mobile |
| [2. One element at different widths](#2-one-element-at-different-widths) | making layer names stable |
| [3. Page section](#3-page-section) | choosing between `[section]` and `Page Sections` |
| [4. Link or action](#4-link-or-action) | declaring the result of a click |
| [5. Control and modal target](#5-control-and-modal-target) | connecting a control to an existing target |
| [6. Meaningful structure](#6-meaningful-structure) | removing accidental wrappers |
| [7. Dynamic text](#7-dynamic-text) | preparing for CMS content and localization |
| [8. Content, decor, and asset](#8-content-decor-and-asset) | declaring how a visual should transfer |

## 1. Page and breakpoints

**Goal:** show two breakpoints of the same home page.

❌ Ambiguous:

```text
Desktop final
Mobile new
```

✅ Explicit:

```text
Home [page=home] [route=/] [bp=1440] [view=default]
Home [page=home] [route=/] [bp=375] [view=default]
```

`page` and `view` stay the same because the product page and state are the same. `bp` changes with width. `route` is present because the production route is known.

[Full rule: responsive breakpoints](../docs/03-responsive-breakpoints.md)

---

## 2. One element at different widths

**Goal:** connect one heading and CTA across desktop and mobile.

❌ Copies look like unrelated elements:

```text
// desktop
title-desktop
blue-button-1440

// mobile
title-mobile
blue-button-375
```

✅ Names express identity rather than appearance:

```text
// desktop and mobile
hero-title
primary-cta
```

Font, color, size, and position already live in Figma. The name identifies the same element at another breakpoint.

[Full rule: naming and identity](../docs/02-layer-naming-and-identity.md)

---

## 3. Page section

**Goal:** identify a hero section.

### Option A: ordinary frame

```text
Hero [section=home-hero]
```

The tag is needed because Figma does not know the frame's product section key.

### Option B: instance from `Page Sections`

```text
home-hero
```

No tag is needed on the instance: `section=home-hero` is inferred from the source section component. A button or card from the ordinary `UI Kit` does not automatically become a section.

[Full rule: Page Sections](../docs/14-components-and-ui-kit.md)

---

## 4. Link or action

**Goal:** declare the result of a click.

```text
email-link [href=mailto:sales@example.com]
menu-button [action=state:mobile-menu-open]
Mobile Menu Open [state=mobile-menu-open]
unknown-button [control]
disabled-button [action=none]
```

- navigation to a URL or anchor uses `[href=...]`;
- UI changes, modals, submit, and reset use `[action=...]`;
- an unknown destination or behavior temporarily uses `[link]` or `[control]`.

Every `[action=type:target-id]` target must exist in the handoff structure with the same id. Draft markers `[link]` and `[control]` are valid while work is in progress but remain TODOs before final handoff.

❌ Do not use `[href=#]` as a placeholder. `#faq` is a real target; `#` alone is not.

[Full rule: interactions](../docs/05-interactions-and-targets.md)

---

## 5. Control and modal target

**Goal:** show which modal a CTA opens.

❌ The action points nowhere:

```text
contact-button [action=modal:contact-modal]
```

✅ A matching target exists in the handoff structure:

```text
contact-button [action=modal:contact-modal]

Contact Modal [modal=contact-modal]
  modal-content
  close-button
```

The id after `modal:` must match `[modal=...]`. The modal component must define `close-button`, backdrop, and Escape behavior. Loading, error, and success states must not exist only in verbal instructions either.

[Full rule: targets](../docs/05-interactions-and-targets.md#modals-and-states)

---

## 6. Meaningful structure

**Goal:** group a hero heading, text, and controls.

❌ Accidental siblings and wrappers:

```text
hero
  Frame 18
    Frame 19
      hero-title
  hero-subtitle
  primary-cta
```

✅ Parents explain relationships:

```text
hero
  hero-copy
    hero-title
    hero-subtitle
  hero-actions
    primary-cta
    secondary-cta
```

`hero-copy` and `hero-actions` have clear jobs. A wrapper is unnecessary when it does not provide grouping, layout, clipping, a shared background, a target, or another real responsibility.

[Full rule: wrappers](../docs/06-wrapper-policy.md)

---

## 7. Dynamic text

**Goal:** prepare a card for real content.

❌ The design only works for one string:

```text
product-card (fixed height 280)
  product-title: "A very comfortable\nchair"
```

✅ Text wraps naturally and height follows content:

```text
product-card (Auto Layout, hug contents)
  product-title: "A very comfortable chair"
```

If fixed height and clipping are product decisions, declare the overflow policy and reason. Otherwise localization or CMS data will break the card.

[Full rule: height and overflow](../docs/07-height-and-overflow.md)

---

## 8. Content, decor, and asset

**Goal:** decide how three visual layers transfer.

```text
product-photo
glow [decor]
complex-illustration [decor] [asset]
```

- `product-photo` is a content image with stable identity;
- `glow [decor]` has no product or accessibility semantics;
- `complex-illustration [decor] [asset]` is decoration exported as one asset.

`[decor]` does not mean the layer may silently disappear on mobile, and `[asset]` does not replace a stable layer name.

[Full rule: image, decor, and asset](../docs/01-design-rules.md#4-image-decor-and-asset-mean-different-things)

---

## How to use this catalog

1. Find the situation closest to yours.
2. Copy the good structure, not its specific ids.
3. Check the same element in every breakpoint and state.
4. Open the full rule only for a disputed case.
5. Run the [preflight checklist](../docs/08-preflight-checklist.md) before handoff.
