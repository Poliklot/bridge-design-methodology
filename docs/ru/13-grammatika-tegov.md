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

Для boolean visual-intent/policy flags и draft markers, которым не нужно значение, используй boolean-теги:

```text
[decor]
[asset]
[link]
[control]
```

Стабильная identity внутри Figma может быть просто именем слоя:

```text
hero-title
product-photo
close-icon
button-group
```

Имя должно быть стабильным English kebab-case.

Если property tag содержит identity-like значение, оно должно быть English kebab-case, кроме тегов с отдельным синтаксисом значения: например `[route=/path]`, `[href=https://...]` или `[action=modal:target-id]`.

Optional identity values не должны содержать названия или ширину breakpoint. Breakpoint уже задан на page/root frame через `[bp=...]`; child ids описывают логические элементы, а не адаптивные варианты.

Плохо:

```text
Отзывы мобилка [control=button-reviews-box-768] [action=modal:marketplaces-modal]
```

Хорошо:

```text
Отзывы мобилка [action=modal:marketplaces-modal]
```

Для optional identity-bearing values вроде `[link=...]`, `[control=...]`, `[field=...]`, `[modal=...]`, `[state=...]`, `[section=...]`, collection/item ids и fallback-значений `[decor=...]` / `[asset=...]` suffix текущего breakpoint, например `-768`, `-375`, `-mobile` или `-desktop`, невалиден.

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

`[page=...]`, `[bp=...]` и `[view=...]` задают draftable page root. Добавляй `[route=...]` или `[route-pattern=...]` только когда известен реальный production URL:

```text
Contacts [page=contacts] [bp=1440] [view=default]
Contacts [page=contacts] [route=/contacts] [bp=1440] [view=default]
Product Detail [page=product-detail] [route-pattern=/catalog/:slug] [bp=1440] [view=default]
```

Не выдумывай fake production routes ради чеклиста.

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

Известное navigation destination записывается как `[href=...]`. Этого тега достаточно, чтобы считать слой ссылкой; обычные дизайнерские примеры не требуют `[link=...]`.

```text
[href=/contacts]
[href=/contacts#faq]
[href=#faq]
[href=https://t.me/company]
[href=mailto:sales@example.com]
[href=tel:+12025550123]
```

```text
contacts-link [href=/contacts]
faq-link [href=/contacts#faq]
same-page-faq [href=#faq]
telegram-link [href=https://t.me/company]
email-link [href=mailto:sales@example.com]
phone-link [href=tel:+12025550123]
```

Если destination неизвестен, используй boolean draft marker `[link]`:

```text
contacts-link [link]
```

`[href=#]` невалиден. `#faq` — реальный same-page anchor; `#` не является unknown href placeholder.

Дополнительное поведение ссылки:

```text
[open=new-tab]
[a11y-label=Telegram]
```

Только advanced override: используй `[link=...]`, когда нужен явный stable machine id в дополнение к имени слоя. Не используй его в обычных дизайнерских примерах.

```text
contacts-cta [link=nav-contacts-primary] [href=/contacts]
```

Валидаторы классифицируют значения `href`:

- `/path` — внутренний маршрут;
- `#anchor` — anchor на этой же странице;
- `/path#anchor` — anchor на другой странице;
- `https://...` — внешний URL;
- `mailto:` / `tel:` — внешний протокол.

### Контролы и действия

Известный non-navigation action записывается как `[action=...]`. Этого тега достаточно, чтобы считать слой control/button; обычные дизайнерские примеры не требуют `[control=...]`.

```text
[action=modal:contact-modal]
[action=state:mobile-menu-open]
[action=submit:lead-form]
[action=reset:catalog-filters]
[action=none]
```

```text
contact-cta [action=modal:contact-modal]
menu-button [action=state:mobile-menu-open]
lead-submit [action=submit:lead-form]
reset-filters [action=reset:catalog-filters]
disabled-cta [action=none]
```

Если action неизвестен, используй boolean draft marker `[control]`:

```text
contact-cta [control]
```

Только advanced override: используй `[control=...]`, когда нужен явный stable machine id в дополнение к имени слоя. Не используй его в обычных дизайнерских примерах.

```text
contact-cta [control=contact-cta-primary] [action=modal:contact-modal]
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

`[decor]` и `[asset]` — boolean visual-intent/policy tags, а не обязательные identity-теги. Они могут стоять вместе и не должны считаться “multiple identity tags”.

Декоративный визуал помечается `[decor]`.

`[decor]` означает:

- слой декоративный;
- он не является продуктовым контентом;
- он не должен попадать в accessibility tree и может быть `aria-hidden`;
- ему не нужны alt/content semantics;
- он всё равно сохраняет stable responsive identity и не имеет права исчезать между адаптивами.

```text
sneg [decor]
snow-bg [decor]
hero-glow [decor]
```

Экспортируемый цельный визуал помечается `[asset]`.

`[asset]` означает:

- визуал нужно экспортировать или использовать цельно;
- его нельзя пересобирать из внутренних слоёв;
- root asset всё равно сохраняет stable responsive identity между адаптивами.

```text
promo-poster [asset]
lab-illustration [asset]
snow-bg [decor] [asset]
```

Если у слоя уже есть stable name, предпочитай boolean-форму:

```text
sneg [decor] [asset]
```

Identity здесь — `sneg`. `[decor]` и `[asset]` только добавляют visual intent и transfer policy.

Старый формат со значением остаётся валидным только как fallback для плохих/default layer names:

```text
Frame 182 [decor=snow-bg]
Group 91 [asset=promo-poster]
```

Если значение в `[decor=...]` или `[asset=...]` есть, валидируй его как English kebab-case. Boolean `[decor]` и `[asset]` без значения валидны.

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
contact-cta [action=modal:contact-modal]
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
snow-bg [decor] [abs]
```

Невалидно: `decor` — это смысл, позиционирование берётся из Figma. Используй `snow-bg [decor]`.

```text
FAQ [to=anchor:contacts-faq] [href=/contacts#faq]
```

Невалидно: два назначения. Используй только `[href=/contacts#faq]`.

```text
unknown-link [href=#]
```

Невалидно: `#` не является unknown href placeholder. Используй `unknown-link [link]`.

```text
Отзывы мобилка [control=button-reviews-box-768] [action=modal:marketplaces-modal]
```

Невалидно: optional ids не должны содержать breakpoint suffixes. Используй `Отзывы мобилка [action=modal:marketplaces-modal]`.
