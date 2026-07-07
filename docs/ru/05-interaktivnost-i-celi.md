# Интерактивность и цели

BRIDGE использует одну правду на каждое взаимодействие. Навигация описывается через `href`. Ненавигационное поведение — через `action`.

## Ссылки используют `href`

Ссылка — это navigation element. Её destination всегда `href`.

```text
Contacts [link=nav-contacts] [href=/contacts]
FAQ [link=nav-faq] [href=/contacts#faq]
Telegram [link=social-telegram] [href=https://t.me/company]
Email [link=email-sales] [href=mailto:sales@example.com]
Phone [link=phone-main] [href=tel:+12025550123]
```

Правила:

- `[link=...]` задаёт identity конкретной ссылки.
- `[href=...]` — единственная правда, куда ведёт ссылка.
- Internal routes начинаются с `/`.
- Same-page anchors начинаются с `#`.
- External URLs начинаются с `http://` или `https://`.
- `mailto:` и `tel:` — валидные external protocols.
- Не добавляй вторую semantic destination вроде `[to=...]`.

Optional behavior tags могут описывать, как ссылка открывается, но не куда ведёт:

```text
Telegram [link=social-telegram] [href=https://t.me/company] [open=new-tab] [a11y-label=Telegram]
```

## Controls используют `action`

Control — интерактивный элемент, который делает что-то кроме прямой навигации.

```text
Contact us [control=contact-cta] [action=modal:contact-modal]
Menu [control=mobile-menu-button] [action=state:mobile-menu-open]
Reset filters [control=reset-filters] [action=state:catalog-default]
Submit [control=lead-submit] [action=submit:lead-form]
Disabled CTA [control=disabled-cta] [action=none]
```

Правила:

- `[control=...]` задаёт identity конкретного control instance.
- `[action=...]` обязателен для controls.
- Не заставляй page designers писать подробные roles вроде `accordion-trigger` или `menu-button` в имени слоя страницы.
- Точный component/control type должен приходить из UI Kit component instance metadata, когда это возможно.

Допустимые формы action:

```text
[action=modal:contact-modal]
[action=state:mobile-menu-open]
[action=submit:lead-form]
[action=reset:catalog-filters]
[action=none]
```

## Поля используют `field` и `name`

Form fields требуют stable identity и data binding.

```text
Email [field=email] [name=email]
Country [field=country] [name=country]
Message [field=message] [name=message]
```

Используй `[field-type=...]` только если тип нельзя вывести из UI Kit component или native field metadata:

```text
Country [field=country] [name=country] [field-type=select]
```

## Modals и states

Actions должны указывать на существующие цели:

```text
Contact us [control=contact-cta] [action=modal:contact-modal]
Contact Modal [modal=contact-modal]

Menu [control=mobile-menu-button] [action=state:mobile-menu-open]
Mobile Menu [state=mobile-menu-open]
```

Если modal или state цель не существует, дизайн не BRIDGE-ready.

## Что должен проверять валидатор

- У каждого `[link=...]` есть ровно один `[href=...]`.
- Internal href routes резолвятся в declared pages.
- Internal href anchors резолвятся в declared sections/anchors.
- У каждого `[control=...]` есть ровно один `[action=...]`.
- Modal/state/submit/reset action targets существуют.
- Social/icon-only links имеют accessible label.
- Page instances не изобретают component states; states живут в UI Kit.
