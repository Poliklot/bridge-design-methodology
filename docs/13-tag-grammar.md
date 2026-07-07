# BRIDGE tag grammar

BRIDGE tags are short machine-readable annotations in layer names. In Figma, they are used only for transfer intent that is not present in Figma metadata.

## Core principle

Do not write a tag if it repeats what is already authored in Figma.

Figma is the source of truth for technical layer properties:

- node type: text, image/vector, component instance;
- Auto Layout, constraints, dimensions, gap, padding, alignment, wrap;
- hierarchy: frames, groups, components;
- positioning, clipping, masks;
- fills, strokes, effects;
- source component, variants, component properties.

A BRIDGE tag is only for product or transfer meaning.

## Syntax

Use property tags for facts an agent or adapter must read:

```text
[property=value]
```

Stable identity inside Figma can be just the layer name:

```text
hero-title
product-photo
close-icon
button-group
```

The name must be stable English kebab-case.

## Tags designers write

### Page and route

```text
[page=home]
[route=/]
[bp=1920]
[view=default]
[anchor=faq]
```

```text
Home Page [page=home] [route=/] [bp=1920] [view=default]
FAQ [anchor=faq]
```

### Section contract

```text
[section=product-slider]
[section=home-hero]
```

`[section=...]` describes the reusable section/component contract, not the heading of a specific block.

```text
Catalog [section=product-slider]
Related Products [section=product-slider]
Recommended Products [section=product-slider]
Hero [section=home-hero]
```

Do not use prefixes such as `Section /`: the tag already declares that it is a section.

### Targets

```text
[modal=contact-modal]
[state=mobile-menu-open]
```

```text
Contact Modal [modal=contact-modal]
Mobile Menu Open [state=mobile-menu-open]
```

### Links

Links use `href` as the only destination truth.

```text
[link=nav-contacts]
[href=/contacts]
[href=/contacts#faq]
[href=https://t.me/company]
[href=mailto:sales@example.com]
[href=tel:+12025550123]
```

```text
contacts-link [link=nav-contacts] [href=/contacts]
faq-link [link=nav-faq] [href=/contacts#faq]
telegram-link [link=social-telegram] [href=https://t.me/company]
email-link [link=email-sales] [href=mailto:sales@example.com]
phone-link [link=phone-main] [href=tel:+12025550123]
```

Optional link behavior:

```text
[open=new-tab]
[a11y-label=Telegram]
```

Validators classify href values:

- `/path` — internal route;
- `#anchor` — same-page anchor;
- `/path#anchor` — cross-page anchor;
- `https://...` — external URL;
- `mailto:` / `tel:` — external protocol.

### Controls and actions

Controls use `action`.

```text
[control=contact-cta]
[action=modal:contact-modal]
[action=state:mobile-menu-open]
[action=submit:lead-form]
[action=reset:catalog-filters]
[action=none]
```

```text
contact-cta [control=contact-cta] [action=modal:contact-modal]
menu-button [control=mobile-menu-button] [action=state:mobile-menu-open]
lead-submit [control=lead-submit] [action=submit:lead-form]
reset-filters [control=reset-filters] [action=reset:catalog-filters]
disabled-cta [control=disabled-cta] [action=none]
```

Allowed action forms:

```text
[action=modal:target-id]
[action=state:target-id]
[action=submit:form-id]
[action=reset:target-id]
[action=none]
```

### Fields

Fields require stable identity and a data binding name.

```text
email [field=email] [name=email]
country [field=country] [name=country]
message [field=message] [name=message]
```

Use `[field-type=...]` only when the type cannot be inferred from UI Kit/native metadata:

```text
country [field=country] [name=country] [field-type=select]
```

### Collections and repeated items

Use collection/item tags only when a dynamic list or repeated data must be explicit.

```text
products [collection=products]
product-card-1 [item=product]
product-card-2 [item=product]
```

If the card is a component instance and repetition is obvious from the Figma structure, the extra tag is not required.

### Visual intent

A content image gets a stable layer name without a manual `[image=...]` tag.

```text
product-photo
article-cover
author-avatar
```

A decorative visual is marked with `[decor=...]`.

```text
snow-bg [decor=snow-bg]
hero-glow [decor=hero-glow]
```

A whole exported visual is marked with `[asset=...]`.

```text
promo-poster [asset=promo-poster]
lab-illustration [asset=lab-illustration]
```

### Height and overflow

Use these tags only when behavior cannot be safely inferred from Figma or when dynamic content needs an explicit policy.

```text
[height=hug]
[height=fixed]
[height=min]
[height=fill]
[overflow=visible]
[overflow=hidden]
[overflow=scroll]
[overflow=truncate]
[lines=3]
```

```text
description [height=hug]
description [height=fixed] [overflow=truncate] [lines=3]
```

### Exceptions

```text
[bridge-exception=raster-text]
[bridge-exception=overlap]
[bridge-exception=fixed-height]
[bridge-exception=manual-line-break]
[bridge-exception=unsupported-effect]
[bridge-exception=manual-transfer]
[reason=brand-lockup]
```

Rules:

- every exception requires `[reason=...]`;
- `[bridge-exception=manual-line-break]` is allowed only when the line break is semantic or an approved brand lockup, not a workaround for dynamic text;
- exceptions do not make a design better, they only make complexity explicit.

## Tags not written in Figma

For Figma designs, do not use:

```text
[text=...]
[image=...]
[icon=...]
[container=...]
[layout=...]
[abs]
[component=...]
[to=...]
```

Rules:

- a TEXT node gets identity from the layer name;
- a content image gets identity from the layer name;
- an icon gets identity from the layer name and/or component metadata;
- structure is authored with frames, groups, components, and Auto Layout in Figma;
- positioning is authored in Figma;
- component source, variants, and states come from UI Kit component metadata;
- navigation destination is always `[href=...]`, not `[to=...]`.

## Component ownership

Do not mark page instances with `[component=...]` when Figma already knows the source component. Component source, variants, and UI states belong to the UI Kit and should be extracted from Figma component metadata.

Page instance:

```text
contact-cta [control=contact-cta] [action=modal:contact-modal]
```

The UI Kit component source defines states: default, hover, focus, disabled, loading, error, and so on.

See [Components and UI Kit](14-components-and-ui-kit.md).

## Invalid examples

```text
hero-title [text=hero-title]
```

Invalid for a Figma TEXT node: use the layer name `hero-title`.

```text
content [container=content] [layout=stack]
```

Invalid for Figma structure: use a `content` frame and Auto Layout in Figma.

```text
snow-bg [decor=snow-bg] [abs]
```

Invalid: `decor` is intent; positioning comes from Figma. Use `snow-bg [decor=snow-bg]`.

```text
FAQ [link=nav-faq] [to=anchor:contacts-faq] [href=/contacts#faq]
```

Invalid: two destinations. Use only `[href=/contacts#faq]`.

```text
contact-cta [control=contact-cta]
```

Invalid: control without action.

```text
// desktop
contact-cta [control=contact-cta]

// mobile
contact-button [control=contact-cta]
```

Invalid: one identity has different layer names across breakpoints without a reason.
