# Interactions and targets

BRIDGE uses one source of truth per interaction. Navigation uses `href`. Non-navigation behavior uses `action`.

The simple designer path does not require machine ids for ordinary links and buttons.

```text
Contacts [href=/contacts]
Contact us [action=modal:marketplaces-modal]
```

## Links use `href`

A known navigation destination is written directly as `[href=...]`. This tag is enough to classify the layer as a link.

```text
Contacts [href=/contacts]
FAQ [href=/contacts#faq]
Same page FAQ [href=#faq]
Telegram [href=https://t.me/company]
Email [href=mailto:sales@example.com]
Phone [href=tel:+12025550123]
```

Rules:

- `[href=...]` is both the link marker and the only destination truth.
- Do not add `[link=...]` just to say that the layer is a link.
- Internal routes start with `/`.
- Same-page anchors start with `#` and must name a real anchor, for example `#faq`.
- `[href=#]` is not an unknown placeholder and is invalid.
- External URLs start with `http://` or `https://`.
- `mailto:` and `tel:` are valid external protocols.
- Do not add a second semantic destination such as `[to=...]`.

If the destination is not known yet, use the boolean draft marker `[link]` instead of a fake href:

```text
Contacts [link]
```

`[link]` means “this layer will be a link, but the href is not known yet”. It is valid as draft markup, but it is a TODO before final handoff.

Optional behavior tags may describe how the link opens, not where it points:

```text
Telegram [href=https://t.me/company] [open=new-tab] [a11y-label=Telegram]
```

### Optional advanced link id

`[link=...]` is allowed only as an advanced override when an implementation, analytics, or automation pipeline needs an explicit stable machine id that is different from the layer name.

```text
Contacts CTA [link=nav-contacts-primary] [href=/contacts]
```

The value must be English kebab-case and must not contain breakpoint suffixes such as `-768`, `-375`, `-mobile`, or `-desktop`.

## Controls use `action`

A control is an interactive element that does something other than direct navigation. A known non-navigation behavior is written directly as `[action=...]`. This tag is enough to classify the layer as a control/button.

```text
Contact us [action=modal:marketplaces-modal]
Menu [action=state:mobile-menu-open]
Reset filters [action=state:catalog-default]
Submit [action=submit:lead-form]
Disabled CTA [action=none]
```

Rules:

- `[action=...]` is both the control marker and the only action truth.
- Do not add `[control=...]` just to say that the layer is a button/control.
- Do not force page designers to write detailed roles such as `accordion-trigger` or `menu-button` in the page layer name.
- The exact component/control type should come from the UI Kit component instance metadata whenever possible.

If the action is not known yet, use the boolean draft marker `[control]`:

```text
Contact us [control]
```

`[control]` means “this layer will be a control/button, but the action is not known yet”. It is valid as draft markup, but it is a TODO before final handoff.

Allowed action forms:

```text
[action=modal:contact-modal]
[action=state:mobile-menu-open]
[action=submit:lead-form]
[action=reset:catalog-filters]
[action=none]
```

### Optional advanced control id

`[control=...]` is allowed only as an advanced override when an implementation, analytics, or automation pipeline needs an explicit stable machine id that is different from the layer name.

```text
Contact us [control=contact-cta-primary] [action=modal:marketplaces-modal]
```

The value must be English kebab-case and must not contain breakpoint suffixes such as `-768`, `-375`, `-mobile`, or `-desktop`.

Bad:

```text
Отзывы мобилка [control=button-reviews-box-768] [action=modal:marketplaces-modal]
```

Good:

```text
Отзывы мобилка [action=modal:marketplaces-modal]
```

## Fields use `field` and `name`

Form fields need stable identity and data binding.

```text
Email [field=email] [name=email]
Country [field=country] [name=country]
Message [field=message] [name=message]
```

Use `[field-type=...]` only when the type cannot be inferred from the UI Kit component or native field metadata:

```text
Country [field=country] [name=country] [field-type=select]
```

## Modals and states

Known actions must point to existing targets:

```text
Contact us [action=modal:contact-modal]
Contact Modal [modal=contact-modal]

Menu [action=state:mobile-menu-open]
Mobile Menu [state=mobile-menu-open]
```

If a modal or state target does not exist, the design is not BRIDGE-ready.

## What validators should check

- `[href=...]` without `[link=...]` is a valid link.
- `[action=...]` without `[control=...]` is a valid control.
- `[link]` and `[control]` are valid draft markers and should be reported as TODOs, not syntax errors.
- `[link=...]` and `[control=...]` are optional advanced ids; validate kebab-case and breakpoint suffixes only when a value is present.
- `[href=#]` is invalid; use `[link]` when the destination is unknown.
- Internal href routes resolve to declared routes when those routes are known.
- Internal href anchors resolve to declared sections/anchors.
- Modal/state/submit/reset action targets exist.
- Social/icon-only links have an accessible label.
- Page instances do not invent component states; states belong in the UI Kit.
