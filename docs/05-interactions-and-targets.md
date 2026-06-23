# Interactions and targets

Clickable elements must not be ambiguous. A button or link without a destination is not ready for transfer.

## Action syntax

Recommended action tags:

```text
[action=link:/pricing]
[action=link:https://example.com]
[action=scroll:#faq]
[action=modal:contact-modal]
[action=state:menu-open]
[action=submit:lead-form]
[action=none]
```

Use `[action=none]` only for intentionally disabled or visual-only controls.

## Buttons

Every button must define an action:

```text
primary [button] [key=primary-cta] [action=link:/pricing]
```

Bad:

```text
button [key=primary-cta]
```

## Links

Every link must define a URL or target:

```text
terms [link] [key=terms-link] [action=link:/terms]
faq [link] [key=faq-link] [action=scroll:#faq]
```

## Modals

A modal action must point to an existing modal target:

```text
contact [button] [key=contact-cta] [action=modal:contact-modal]

Modal Contact [modal] [key=contact-modal]
```

If the modal frame does not exist, the design is incomplete.

## States

State-changing controls must name the state:

```text
menu button [button] [key=menu-button] [action=state:mobile-menu-open]
Mobile Menu [state] [key=mobile-menu-open]
```
