# BRIDGE tag grammar

BRIDGE tags are small machine-readable annotations placed in layer names. The grammar must avoid duplicate truths and must be simple enough for designers to use.

## Core rule

Use one identity tag per important transferable layer:

```text
[type=id]
```

Use property tags for additional facts:

```text
[property=value]
```

Examples:

```text
Contacts Page [page=contacts] [route=/contacts] [bp=1200]
Hero Title [text=hero-title]
FAQ [link=nav-faq] [href=/contacts#faq]
Contact us [control=contact-cta] [action=modal:contact-modal]
```

## One truth rules

- Navigation destination is always `[href=...]`.
- Non-navigation behavior is always `[action=...]`.
- Responsive breakpoints must not change text content.
- Page instances must not manually describe component internals that Figma/UI Kit already owns.
- Do not use `[to=...]`.
- Do not use responsive content variants such as `mobile-short`.

## Identity tags

### Page and target entities

```text
[page=contacts]
[section=contacts-faq]
[modal=contact-modal]
[state=mobile-menu-open]
```

`[section=...]` describes the reusable section/component contract, not the heading of a specific block. The heading and human layer name may differ:

```text
Catalog [section=product-slider]
Related products [section=product-slider]
Recommended products [section=product-slider]
First screen [section=home-hero]
```

Do not use prefixes such as `Section /`: the tag already says that this is a section.

### Layout entities

```text
[container=content]
[container=hero-copy]
[collection=products]
[card=product-card-1]
[form=lead-form]
```

### Content and visual entities

```text
[text=hero-title]
[image=hero-photo]
[icon=close-icon]
[asset=hero-illustration]
[decor=hero-glow]
[shape=background-shape]
```

### Interaction entities

```text
[link=nav-contacts]
[control=contact-cta]
[field=email]
```

Use `[layout=stack]`, `[layout=row]`, `[layout=grid]`, or similar layout properties on containers when direction/arrangement matters. Use `[control=...]` for interactive elements that are not direct navigation links. Do not make designers choose from a long list of control subtypes in page layer names. The exact component/control type should come from the UI Kit component instance metadata whenever possible.

## Page and route properties

```text
[route=/contacts]
[bp=1200]
[view=default]
[view=empty]
[view=loading]
[view=error]
[anchor=faq]
```

Examples:

```text
Catalog Page [page=catalog] [route=/catalog] [bp=1200] [view=default]
Catalog Empty [page=catalog] [route=/catalog] [bp=1200] [view=empty]
FAQ Section [section=contacts-faq] [anchor=faq]
Related Products [section=product-slider]
```

Rules:

- all breakpoints/views of one page share the same `[page=...]` and `[route=...]`;
- one `[section=...]` may be used on different pages with different content/data when it is the same section component;
- `[view=...]` describes page/data state, not component state;
- `[anchor=...]` creates an addressable section anchor.

## Links and href

Links use `href` as the only destination truth.

```text
Contacts [link=nav-contacts] [href=/contacts]
FAQ [link=nav-faq] [href=/contacts#faq]
Telegram [link=social-telegram] [href=https://t.me/company]
Email [link=email-sales] [href=mailto:sales@example.com]
Phone [link=phone-main] [href=tel:+12025550123]
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

## Controls and actions

Controls use `action`.

```text
Contact us [control=contact-cta] [action=modal:contact-modal]
Menu [control=mobile-menu-button] [action=state:mobile-menu-open]
Submit [control=lead-submit] [action=submit:lead-form]
Reset filters [control=reset-filters] [action=reset:catalog-filters]
Disabled CTA [control=disabled-cta] [action=none]
```

Allowed action forms:

```text
[action=modal:target-id]
[action=state:target-id]
[action=submit:form-id]
[action=reset:target-id]
[action=none]
```

## Fields

Fields require stable identity and data binding name.

```text
Email [field=email] [name=email]
Country [field=country] [name=country]
Message [field=message] [name=message]
```

Use `[field-type=...]` only when type cannot be inferred from UI Kit/native metadata:

```text
Country [field=country] [name=country] [field-type=select]
```

## Height and overflow

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

Examples:

```text
Description [text=description] [height=hug]
Description [text=description] [height=fixed] [overflow=truncate] [lines=3]
```

## Absolute and exceptions

```text
[abs]
[bridge-exception=raster-text]
[bridge-exception=overlap]
[bridge-exception=fixed-height]
[bridge-exception=manual-line-break]
[bridge-exception=unsupported-effect]
[bridge-exception=manual-transfer]
[reason=brand-lockup]
```

Rules:

- every exception needs `[reason=...]`;
- `[abs]` should be paired with a meaningful entity type such as `[decor=...]`, `[asset=...]`, `[shape=...]`, or `[modal=...]`;
- `[bridge-exception=manual-line-break]` is allowed only when the line break is semantic or an approved brand lockup, not as a layout workaround for dynamic text;
- exceptions do not make a design better, they only make complexity explicit.

## Component ownership

Do not tag page instances with `[component=...]` if Figma already knows the source component. Component source, variants, and UI states belong to the UI Kit and should be extracted from Figma component metadata.

Page instance:

```text
Contact us [control=contact-cta] [action=modal:contact-modal]
```

UI Kit component source defines states such as default, hover, focus, disabled, loading, error, etc.

See [Components and UI Kit](14-components-and-ui-kit.md).

## Invalid examples

```text
FAQ [link=nav-faq] [to=anchor:contacts-faq] [href=/contacts#faq]
```

Invalid: two destinations. Use only `[href=/contacts#faq]`.

```text
Contact us [control=contact-cta]
```

Invalid: control has no action.

```text
// desktop
Contact us [control=contact-cta]

// mobile
Contact [control=contact-cta]
```

Invalid: same identity has different text across breakpoints.

```text
Contact us [control=contact-cta] [component=button]
```

Invalid for page instances: component source should come from Figma/UI Kit metadata, not a duplicated tag.
