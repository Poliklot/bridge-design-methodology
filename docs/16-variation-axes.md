# Variation axes

BRIDGE separates different reasons for variation. This prevents designers from hiding content changes inside responsive breakpoints.

## Core rule

> A breakpoint is a layout variation of the same logical tree, not a content or structure variation.

If content or logical tree topology changes, the reason must be represented by a different axis: view, locale, theme, experiment, role, data scenario, collection rule, component variant, or structural exception.

## Canonical axes

| Axis | Tag | Can content change? | Purpose |
| --- | --- | --- | --- |
| Page | `[page=...]` | No by itself | Logical page identity |
| Route | `[route=...]` | No | Production URL path |
| Breakpoint | `[bp=...]` | No | Responsive layout |
| View | `[view=...]` | Yes, if state-specific | Data/page state such as empty/loading/error |
| Locale | `[locale=...]` | Yes | Translation and locale-specific formatting |
| Theme | `[theme=...]` | No | Visual theme such as light/dark |
| Experiment | `[experiment=...]` | Yes, controlled | A/B or product experiment |
| Role | `[role-view=...]` | Yes, controlled | User role or permission view |
| Data scenario | `[data=...]` | Sample content only | Stress cases such as long names or max items |

## Breakpoint axis

Breakpoint changes layout only:

```text
Hero [section=hero] [bp=1200]
Hero [section=hero] [bp=320]
```

Allowed changes:

- layout direction;
- spacing;
- typography size;
- wrapping;
- sibling order inside the same parent;
- visibility when intentional.

Not allowed:

- extra or missing logical elements;
- different parent-child topology;
- replacing one identity with a breakpoint-only copy;
- different heading text;
- shorter mobile CTA;
- different legal copy;
- different price;
- different product claim.

## View axis

Views describe state-specific page/data content:

```text
Catalog [page=catalog] [route=/catalog] [bp=1200] [view=default]
Catalog Empty [page=catalog] [route=/catalog] [bp=1200] [view=empty]
Catalog Error [page=catalog] [route=/catalog] [bp=1200] [view=error]
```

`view=empty` may have different content from `view=default`, because the page state is different.

## Locale axis

Locale changes text and formatting intentionally:

```text
Contacts [page=contacts] [route=/contacts] [bp=1200] [locale=en-US]
Contacts [page=contacts] [route=/contacts] [bp=1200] [locale=ru-RU]
```

Rules:

- locale variants should not be mixed with breakpoint variants;
- layout should be tested against longer localized text;
- locale is not a workaround for mobile copy drift.

## Theme axis

Theme changes visual tokens, not content:

```text
Dashboard [page=dashboard] [route=/dashboard] [bp=1200] [theme=light]
Dashboard [page=dashboard] [route=/dashboard] [bp=1200] [theme=dark]
```

Text content should stay the same between themes.

## Experiment axis

Experiment variants may change content, but only when explicitly declared:

```text
Pricing [page=pricing] [route=/pricing] [bp=1200] [experiment=cta-a]
Pricing [page=pricing] [route=/pricing] [bp=1200] [experiment=cta-b]
```

Rules:

- experiments must not be disguised as responsive breakpoints;
- experiment names should be product-approved;
- analytics and implementation must know the experiment axis.

## Role axis

Role or permission views may change content and available actions:

```text
Dashboard [page=dashboard] [route=/dashboard] [bp=1200] [role-view=guest]
Dashboard [page=dashboard] [route=/dashboard] [bp=1200] [role-view=admin]
```

Use this for authenticated/unauthenticated, admin/user, owner/viewer, or permission-specific UI.

## Data scenario axis

Data scenarios are design QA fixtures, not production content variants:

```text
Product Card [card=product-card] [data=short]
Product Card [card=product-card] [data=long]
Product Grid [collection=products] [data=max-items]
```

Use data scenarios to test overflow, long names, empty images, max item count, and localization stress.

## Axis composition

A complete context may combine axes:

```text
Catalog [page=catalog] [route=/catalog] [bp=320] [view=empty] [locale=ru-RU] [theme=dark]
```

But every axis must have one reason. Do not use one axis to smuggle another kind of variation.

## Invalid examples

Mobile copy drift:

```text
// desktop
Title [text=hero-title] = "Launch your store in one day"

// mobile
Title [text=hero-title] = "Launch faster"
```

Fake locale as responsive workaround:

```text
Hero [section=hero] [bp=320] [locale=mobile-short]
```

Theme changing content:

```text
Dashboard [theme=light] = "Welcome back"
Dashboard [theme=dark] = "Good evening"
```

## Validator rules

A BRIDGE validator should report:

- text content changes across breakpoints of the same context;
- text content changes across themes;
- locale changes mixed into breakpoint-only frames;
- experiment variants without explicit experiment axis;
- view-specific content modeled as separate pages/routes;
- data stress examples used as production content variants.
