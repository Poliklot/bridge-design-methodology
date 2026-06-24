# Interactions and targets

BRIDGE uses one source of truth per interaction. Navigation uses `href`. Non-navigation behavior uses `action`.

## Links use `href`

A link is a navigation element. Its destination is always `href`.

```text
Contacts [link=nav-contacts] [href=/contacts]
FAQ [link=nav-faq] [href=/contacts#faq]
Telegram [link=social-telegram] [href=https://t.me/company]
Email [link=email-sales] [href=mailto:sales@example.com]
Phone [link=phone-main] [href=tel:+12025550123]
```

Rules:

- `[link=...]` gives the link instance identity.
- `[href=...]` is the only destination truth.
- Internal routes start with `/`.
- Same-page anchors start with `#`.
- External URLs start with `http://` or `https://`.
- `mailto:` and `tel:` are valid external protocols.
- Do not add a second semantic destination such as `[to=...]`.

Optional behavior tags may describe how the link opens, not where it points:

```text
Telegram [link=social-telegram] [href=https://t.me/company] [open=new-tab] [a11y-label=Telegram]
```

## Controls use `action`

A control is an interactive element that does something other than direct navigation.

```text
Contact us [control=contact-cta] [action=modal:contact-modal]
Menu [control=mobile-menu-button] [action=state:mobile-menu-open]
Reset filters [control=reset-filters] [action=state:catalog-default]
Submit [control=lead-submit] [action=submit:lead-form]
Disabled CTA [control=disabled-cta] [action=none]
```

Rules:

- `[control=...]` gives the control instance identity.
- `[action=...]` is required for controls.
- Do not force page designers to write detailed roles such as `accordion-trigger` or `menu-button` in the page layer name.
- The exact component/control type should come from the UI Kit component instance metadata whenever possible.

Allowed action forms:

```text
[action=modal:contact-modal]
[action=state:mobile-menu-open]
[action=submit:lead-form]
[action=reset:catalog-filters]
[action=none]
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

Actions must point to existing targets:

```text
Contact us [control=contact-cta] [action=modal:contact-modal]
Contact Modal [modal=contact-modal]

Menu [control=mobile-menu-button] [action=state:mobile-menu-open]
Mobile Menu [state=mobile-menu-open]
```

If a modal or state target does not exist, the design is not BRIDGE-ready.

## What validators should check

- Every `[link=...]` has exactly one `[href=...]`.
- Internal href routes resolve to declared pages.
- Internal href anchors resolve to declared sections/anchors.
- Every `[control=...]` has exactly one `[action=...]`.
- Modal/state/submit/reset action targets exist.
- Social/icon-only links have an accessible label.
- Page instances do not invent component states; states belong in the UI Kit.
