# Грамматика тегов BRIDGE

BRIDGE tags — это короткие machine-readable annotations в названиях слоёв. Грамматика должна избегать двойных истин и быть достаточно простой для дизайнеров.

## Core rule

Используй один identity tag на каждый важный transferable layer:

```text
[type=id]
```

Для дополнительных фактов используй property tags:

```text
[property=value]
```

Примеры:

```text
Contacts Page [page=contacts] [route=/contacts] [bp=1200]
Hero Title [text=hero-title]
FAQ [link=nav-faq] [href=/contacts#faq]
Contact us [control=contact-cta] [action=modal:contact-modal]
```

## Правила одной правды

- Navigation destination всегда `[href=...]`.
- Non-navigation behavior всегда `[action=...]`.
- Responsive breakpoints не должны менять текстовый контент.
- Page instances не должны вручную описывать component internals, которыми уже владеет Figma/UI Kit.
- Не используй `[to=...]`.
- Не используй responsive content variants вроде `mobile-short`.

## Identity tags

### Page and target entities

```text
[page=contacts]
[section=contacts-faq]
[modal=contact-modal]
[state=mobile-menu-open]
```

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

Используй `[control=...]` для интерактивных элементов, которые не являются прямыми navigation links. Не заставляй дизайнеров выбирать из огромного списка control subtypes в layer names страницы. Точный component/control type должен приходить из UI Kit component instance metadata, когда это возможно.

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

Примеры:

```text
Catalog Page [page=catalog] [route=/catalog] [bp=1200] [view=default]
Catalog Empty [page=catalog] [route=/catalog] [bp=1200] [view=empty]
FAQ Section [section=contacts-faq] [anchor=faq]
```

Правила:

- все breakpoints/views одной страницы имеют один `[page=...]` и `[route=...]`;
- `[view=...]` описывает page/data state, а не component state;
- `[anchor=...]` создаёт addressable section anchor.

## Links and href

Links используют `href` как единственную destination truth.

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

Валидаторы классифицируют href values:

- `/path` — internal route;
- `#anchor` — same-page anchor;
- `/path#anchor` — cross-page anchor;
- `https://...` — external URL;
- `mailto:` / `tel:` — external protocol.

## Controls and actions

Controls используют `action`.

```text
Contact us [control=contact-cta] [action=modal:contact-modal]
Menu [control=mobile-menu-button] [action=state:mobile-menu-open]
Submit [control=lead-submit] [action=submit:lead-form]
Reset filters [control=reset-filters] [action=reset:catalog-filters]
Disabled CTA [control=disabled-cta] [action=none]
```

Допустимые формы action:

```text
[action=modal:target-id]
[action=state:target-id]
[action=submit:form-id]
[action=reset:target-id]
[action=none]
```

## Fields

Fields требуют stable identity и data binding name.

```text
Email [field=email] [name=email]
Country [field=country] [name=country]
Message [field=message] [name=message]
```

Используй `[field-type=...]` только если тип нельзя вывести из UI Kit/native metadata:

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

Примеры:

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
[bridge-exception=unsupported-effect]
[bridge-exception=manual-transfer]
[reason=brand-lockup]
```

Правила:

- каждое exception требует `[reason=...]`;
- `[abs]` должен сочетаться с meaningful entity type: `[decor=...]`, `[asset=...]`, `[shape=...]` или `[modal=...]`;
- exceptions не делают дизайн лучше, они только делают сложность явной.

## Component ownership

Не помечай page instances тегом `[component=...]`, если Figma уже знает source component. Component source, variants и UI states принадлежат UI Kit и должны извлекаться из Figma component metadata.

Page instance:

```text
Contact us [control=contact-cta] [action=modal:contact-modal]
```

UI Kit component source определяет states: default, hover, focus, disabled, loading, error и т.д.

См. [Компоненты и UI Kit](14-komponenty-i-ui-kit.md).

## Невалидные примеры

```text
FAQ [link=nav-faq] [to=anchor:contacts-faq] [href=/contacts#faq]
```

Невалидно: две destinations. Используй только `[href=/contacts#faq]`.

```text
Contact us [control=contact-cta]
```

Невалидно: control без action.

```text
// desktop
Contact us [control=contact-cta]

// mobile
Contact [control=contact-cta]
```

Невалидно: один identity имеет разный текст между breakpoint’ами.

```text
Contact us [control=contact-cta] [component=button]
```

Невалидно для page instances: component source должен приходить из Figma/UI Kit metadata, а не дублироваться тегом.
