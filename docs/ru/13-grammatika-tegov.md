# Грамматика тегов BRIDGE

BRIDGE-теги — это короткие машиночитаемые пометки в названиях слоёв. В Figma они используются только для смысла переноса, которого нет в метаданных Figma.

## Главный принцип

Не пиши тег, если он повторяет то, что уже сделано в Figma.

Figma является источником правды для технических свойств слоя:

- тип слоя: text, image/vector, экземпляр компонента;
- Auto Layout: ограничения, размеры, gap, padding, alignment, wrap;
- иерархия: frames, groups, components;
- позиционирование, clipping, masks;
- fills, strokes, effects;
- исходный компонент, варианты, свойства компонента.

BRIDGE-тег нужен только для продуктового смысла или смысла переноса.

## Синтаксис

Для фактов, которые должен прочитать агент или адаптер, используй теги свойств:

```text
[property=value]
```

Стабильная identity внутри Figma может быть просто именем слоя:

```text
hero-title
product-photo
close-icon
button-group
```

Имя должно быть стабильным English kebab-case.

## Теги, которые дизайнер пишет

### Страница и маршрут

```text
[page=home]
[route=/]
[bp=1920]
[view=default]
[anchor=faq]
```

```text
Главная страница [page=home] [route=/] [bp=1920] [view=default]
FAQ [anchor=faq]
```

### Секционный контракт

```text
[section=product-slider]
[section=home-hero]
```

`[section=...]` описывает стабильный ключ секционного компонента, а не заголовок конкретного блока.

Если блок является экземпляром компонента из страницы библиотеки `Page Sections`, тег на странице не нужен:

```text
header
reviews
footer
```

В этом случае секционный ключ берётся из исходного компонента:

```text
Page Sections / header -> section=header
Page Sections / reviews -> section=reviews
Page Sections / footer -> section=footer
```

Если блок сделан обычным фреймом или компонент слишком общий, тег нужен явно:

```text
Каталог [section=product-slider]
Похожие товары [section=product-slider]
Рекомендованные товары [section=product-slider]
Первый экран [section=home-hero]
```

Не используй префиксы вроде `Секция /`: роль уже понятна из тега или из исходного компонента в `Page Sections`.

### Цели

```text
[modal=contact-modal]
[state=mobile-menu-open]
```

```text
Contact Modal [modal=contact-modal]
Mobile Menu Open [state=mobile-menu-open]
```

### Ссылки

Ссылки используют `href` как единственный источник правды о назначении.

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

Дополнительное поведение ссылки:

```text
[open=new-tab]
[a11y-label=Telegram]
```

Валидаторы классифицируют значения `href`:

- `/path` — внутренний маршрут;
- `#anchor` — anchor на этой же странице;
- `/path#anchor` — anchor на другой странице;
- `https://...` — внешний URL;
- `mailto:` / `tel:` — внешний протокол.

### Контролы и действия

Контролы используют `action`.

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

Допустимые формы `action`:

```text
[action=modal:цель-id]
[action=state:цель-id]
[action=submit:form-id]
[action=reset:цель-id]
[action=none]
```

### Поля

Поля требуют stable identity и data binding name.

```text
email [field=email] [name=email]
country [field=country] [name=country]
message [field=message] [name=message]
```

Используй `[field-type=...]` только если тип нельзя вывести из метаданных UI Kit или native-элемента:

```text
country [field=country] [name=country] [field-type=select]
```

### Коллекции и повторяющиеся элементы

Используй collection/item tags только когда нужно явно описать динамический список или повторяющиеся данные.

```text
products [collection=products]
product-card-1 [item=product]
product-card-2 [item=product]
```

Если карточка является экземпляр компонента и повторение очевидно из структуры Figma, дополнительный тег не нужен.

### Визуальный смысл

Контентная картинка получает стабильное имя слоя без ручного `[image=...]`.

```text
product-photo
article-cover
author-avatar
```

Декоративный визуал помечается `[decor=...]`.

```text
snow-bg [decor=snow-bg]
hero-glow [decor=hero-glow]
```

Экспортируемый цельный визуал помечается `[asset=...]`.

```text
promo-poster [asset=promo-poster]
lab-illustration [asset=lab-illustration]
```

### Высота и overflow

Используй эти теги только когда поведение нельзя безопасно понять из Figma или когда нужна явная policy для динамического контента.

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

### Исключения

```text
[bridge-exception=raster-text]
[bridge-exception=overlap]
[bridge-exception=fixed-height]
[bridge-exception=manual-line-break]
[bridge-exception=unsupported-effect]
[bridge-exception=manual-transfer]
[reason=brand-lockup]
```

Правила:

- каждое исключение требует `[reason=...]`;
- `[bridge-exception=manual-line-break]` допустим только когда перенос строки семантический или является утверждённым brand lockup, а не костылём для динамического текста;
- исключения не делают дизайн лучше, они только делают сложность явной.

## Теги, которые не пишутся в Figma

Для Figma-макетов не используются:

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

Правила:

- текстовый слой получает identity из имени слоя;
- контентная картинка получает identity из имени слоя;
- иконка получает identity из имени слоя и/или метаданных компонента;
- структура задаётся фреймами, группами, компонентами и Auto Layout в Figma;
- позиционирование задаётся в Figma;
- исходный компонент, варианты и состояния приходят из UI Kit метаданных компонента;
- назначение ссылки всегда задаётся через `[href=...]`, не через `[to=...]`.

## Владение компонентами

Не помечай экземпляры на странице тегом `[component=...]`, если Figma уже знает исходный компонент. Исходный компонент, варианты и состояния UI принадлежат UI Kit и должны извлекаться из Figma метаданных компонента.

Instance на странице:

```text
contact-cta [control=contact-cta] [action=modal:contact-modal]
```

Исходный компонент из UI Kit определяет состояния: default, hover, focus, disabled, loading, error и т.д.

См. [Компоненты и UI Kit](14-komponenty-i-ui-kit.md).

## Невалидные примеры

```text
hero-title [text=hero-title]
```

Невалидно для текстового слоя Figma: используй имя слоя `hero-title`.

```text
content [container=content] [layout=stack]
```

Невалидно для структуры Figma: используй frame `content` и Auto Layout в Figma.

```text
snow-bg [decor=snow-bg] [abs]
```

Невалидно: `decor` — это смысл, позиционирование берётся из Figma. Используй `snow-bg [decor=snow-bg]`.

```text
FAQ [link=nav-faq] [to=anchor:contacts-faq] [href=/contacts#faq]
```

Невалидно: два назначения. Используй только `[href=/contacts#faq]`.

```text
contact-cta [control=contact-cta]
```

Невалидно: контрол без action.

```text
// desktop
contact-cta [control=contact-cta]

// mobile
contact-button [control=contact-cta]
```

Невалидно: один identity имеет разные layer names между breakpoint’ами без причины.
