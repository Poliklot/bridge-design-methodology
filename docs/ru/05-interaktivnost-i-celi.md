# Интерактивность и цели

BRIDGE использует одну правду на каждое взаимодействие. Навигация описывается через `href`. Ненавигационное поведение — через `action`.

Простой дизайнерский путь не требует machine ids для обычных ссылок и кнопок.

```text
Contacts [href=/contacts]
Contact us [action=modal:marketplaces-modal]
```

## Ссылки используют `href`

Известное navigation destination записывается прямо как `[href=...]`. Этого тега достаточно, чтобы считать слой ссылкой.

```text
Contacts [href=/contacts]
FAQ [href=/contacts#faq]
Same page FAQ [href=#faq]
Telegram [href=https://t.me/company]
Email [href=mailto:sales@example.com]
Phone [href=tel:+12025550123]
```

Правила:

- `[href=...]` — одновременно marker ссылки и единственная правда, куда она ведёт.
- Не добавляй `[link=...]` только ради того, чтобы сказать, что слой является ссылкой.
- Internal routes начинаются с `/`.
- Same-page anchors начинаются с `#` и должны называть настоящий anchor, например `#faq`.
- `[href=#]` не является placeholder для неизвестной ссылки и невалиден.
- External URLs начинаются с `http://` или `https://`.
- `mailto:` и `tel:` — валидные external protocols.
- Не добавляй вторую semantic destination вроде `[to=...]`.

Если destination пока неизвестен, используй boolean draft marker `[link]`, а не fake href:

```text
Contacts [link]
```

`[link]` означает: “тут будет ссылка, но href пока неизвестен”. Это валидная draft-разметка, но TODO перед финальным handoff.

Optional behavior tags могут описывать, как ссылка открывается, но не куда ведёт:

```text
Telegram [href=https://t.me/company] [open=new-tab] [a11y-label=Telegram]
```

### Optional advanced link id

`[link=...]` разрешён только как advanced override, если реализации, аналитике или automation pipeline нужен явный stable machine id, отличный от имени слоя.

```text
Contacts CTA [link=nav-contacts-primary] [href=/contacts]
```

Значение должно быть English kebab-case и не должно содержать breakpoint suffixes вроде `-768`, `-375`, `-mobile` или `-desktop`.

## Controls используют `action`

Control — интерактивный элемент, который делает что-то кроме прямой навигации. Известное non-navigation поведение записывается прямо как `[action=...]`. Этого тега достаточно, чтобы считать слой control/button.

```text
Contact us [action=modal:marketplaces-modal]
Menu [action=state:mobile-menu-open]
Reset filters [action=state:catalog-default]
Submit [action=submit:lead-form]
Disabled CTA [action=none]
```

Правила:

- `[action=...]` — одновременно marker control и единственная правда о действии.
- Не добавляй `[control=...]` только ради того, чтобы сказать, что слой является кнопкой/control.
- Не заставляй page designers писать подробные роли вроде `accordion-trigger` или `menu-button` в имени слоя страницы.
- Точный component/control type должен приходить из UI Kit component instance metadata, когда это возможно.

Если action пока неизвестен, используй boolean draft marker `[control]`:

```text
Contact us [control]
```

`[control]` означает: “тут будет control/button, но action пока неизвестен”. Это валидная draft-разметка, но TODO перед финальным handoff.

Допустимые формы action:

```text
[action=modal:contact-modal]
[action=state:mobile-menu-open]
[action=submit:lead-form]
[action=reset:catalog-filters]
[action=none]
```

### Optional advanced control id

`[control=...]` разрешён только как advanced override, если реализации, аналитике или automation pipeline нужен явный stable machine id, отличный от имени слоя.

```text
Contact us [control=contact-cta-primary] [action=modal:marketplaces-modal]
```

Значение должно быть English kebab-case и не должно содержать breakpoint suffixes вроде `-768`, `-375`, `-mobile` или `-desktop`.

Плохо:

```text
Отзывы мобилка [control=button-reviews-box-768] [action=modal:marketplaces-modal]
```

Хорошо:

```text
Отзывы мобилка [action=modal:marketplaces-modal]
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

Известные actions должны указывать на существующие цели:

```text
Contact us [action=modal:contact-modal]
Contact Modal [modal=contact-modal]

Menu [action=state:mobile-menu-open]
Mobile Menu [state=mobile-menu-open]
```

Если modal или state цель не существует, дизайн не BRIDGE-ready.

## Что должен проверять валидатор

- `[href=...]` без `[link=...]` — валидная ссылка.
- `[action=...]` без `[control=...]` — валидный control.
- `[link]` и `[control]` — валидные draft markers; их нужно репортить как TODO, а не syntax errors.
- `[link=...]` и `[control=...]` — optional advanced ids; kebab-case и breakpoint suffixes проверяются только если value задан.
- `[href=#]` невалиден; если destination неизвестен, используй `[link]`.
- Internal href routes резолвятся в declared routes, когда routes известны.
- Internal href anchors резолвятся в declared sections/anchors.
- Modal/state/submit/reset action targets существуют.
- Social/icon-only links имеют accessible label.
- Page instances не изобретают component states; states живут в UI Kit.
