# Грамматика тегов BRIDGE

BRIDGE tags — это короткие machine-readable annotations в названиях слоёв. Они делают design intent явным для чеклистов, валидаторов и transfer adapters.

## Синтаксис

Тег пишется в квадратных скобках:

```text
[key=hero-title]
[bp=1200]
[button]
[action=modal:contact-modal]
```

Общие формы:

```text
[flag]
[name=value]
[name=value:subvalue]
```

Правила:

- имена тегов пишутся lowercase kebab-case;
- значения пишутся lowercase kebab-case, кроме URL и внешних identifiers;
- на одном слое может быть несколько тегов;
- stable identity задаётся через `[key=...]`;
- свободный текст в имени слоя допустим, но source of truth — это tags.

## Обязательные core tags

### `[key=...]`

Стабильная логическая идентичность.

```text
title [text] [key=hero-title]
primary [button] [key=primary-cta]
```

Правила:

- нужен каждому transferable element;
- должен быть уникален внутри одного breakpoint scope;
- должен сохраняться между breakpoint’ами;
- лучше использовать English kebab-case.

### `[bp=...]`

Ширина breakpoint root.

```text
Hero Section [bp=1200] [key=hero-section]
Hero Section [bp=320] [key=hero-section]
```

Правила:

- используется на responsive root frames;
- значение — numeric width in pixels;
- sibling breakpoint frames одной секции должны иметь один section key.

## Element type tags

Используй один primary type tag, если visual role не очевидна.

```text
[text]
[button]
[link]
[input]
[image]
[icon]
[asset]
[decor]
[shape]
[section]
[modal]
[state]
[collection]
```

Примеры:

```text
price [text] [key=plan-price]
terms [link] [key=terms-link] [action=link:/terms]
email [input] [key=email-input]
features [collection] [key=features-list]
```

## Layout tags

### Flow role

Flow обычно выражается структурой layout или словом `flex` в названии слоя:

```text
hero-copy flex [key=hero-copy]
cards-grid flex [key=cards-grid] [wrapper-role=grid]
```

### `[abs]`

Элемент намеренно вынесен из потока.

```text
glow [abs] [decor] [key=hero-glow]
```

Используй `[abs]` вместе с reason tag или role tag: `[decor]`, `[asset]`, `[overlay]`, `[shape]`.

### `[wrapper-role=...]`

Объясняет, зачем существует wrapper.

Допустимые значения:

```text
stack
row
grid
clip
overlay-scope
semantic-region
target-scope
asset-group
```

Пример:

```text
button-row flex [key=button-group] [wrapper-role=row]
```

## Interaction tags

### `[action=...]`

Обязателен для clickable elements.

Допустимые формы action:

```text
[action=link:/pricing]
[action=link:https://example.com]
[action=scroll:#faq]
[action=modal:contact-modal]
[action=state:mobile-menu-open]
[action=submit:lead-form]
[action=none]
```

Правила:

- `[button]` и `[link]` должны иметь `[action=...]`;
- `modal:` должен ссылаться на существующий `[modal] [key=...]` target;
- `state:` должен ссылаться на существующий `[state] [key=...]` target;
- `none` допустим только для intentionally disabled или visual-only controls.

## Content tags

### `[content-variant=...]`

Объявляет намеренное отличие content между breakpoint’ами.

```text
title [text] [key=hero-title] [content-variant=mobile-short]
```

Используй только если смысл контента намеренно отличается или сокращён.

### `[content=strict]`

Помечает контент, который не должен расходиться между breakpoint’ами без review.

```text
price [text] [key=plan-price] [content=strict]
legal [text] [key=terms-note] [content=strict]
```

Рекомендуется для:

- цен;
- legal copy;
- product claims;
- CTA labels;
- plan names;
- compliance-sensitive text.

## Height и overflow tags

### `[height=...]`

Допустимые значения:

```text
hug
fixed
min
fill
```

Примеры:

```text
description [text] [key=description] [height=hug]
card [key=feature-card] [height=fixed] [reason=equal-card-grid]
```

### `[overflow=...]`

Допустимые значения:

```text
visible
hidden
scroll
truncate
```

Примеры:

```text
description [text] [key=description] [height=fixed] [overflow=truncate] [lines=3]
image-mask [image] [key=hero-image] [overflow=hidden]
```

## Asset и media tags

### `[asset]`

Помечает элемент или группу, которые должны обрабатываться как exported visual material.

```text
illustration [asset] [key=hero-illustration]
```

### `[decor]`

Помечает визуальный материал, который не несёт content meaning.

```text
wave [abs] [decor] [key=decor-wave]
```

### `[focal=...]`

Объявляет responsive image focal point.

```text
photo [image] [key=team-photo] [focal=center-top]
```

Рекомендуемые значения:

```text
center
center-top
center-bottom
left-center
right-center
custom
```

## Exception tags

### `[bridge-exception=...]`

Помечает намеренное отклонение от обычных BRIDGE rules.

```text
poster [asset] [key=hero-poster] [bridge-exception=raster-text] [reason=brand-lockup]
```

Правила:

- каждое exception должно иметь `[reason=...]`;
- exceptions должны быть редкими;
- валидаторы могут понижать некоторые errors до warnings, если exception валидно.

Common exception values:

```text
raster-text
overlap
fixed-height
unsupported-effect
manual-transfer
visual-poster
```

### `[reason=...]`

Объясняет, почему существует exception.

```text
[reason=equal-card-grid]
[reason=brand-lockup]
[reason=decorative-layered-composition]
```

## Полные примеры

### Кнопка открывает modal

```text
contact [button] [key=contact-cta] [action=modal:contact-modal]
Modal Contact [modal] [key=contact-modal]
```

### Responsive section roots

```text
Hero Section [section] [bp=1200] [key=hero-section]
Hero Section [section] [bp=320] [key=hero-section]
```

### Валидный decorative absolute layer

```text
glow [abs] [decor] [key=hero-glow]
```

### Fixed-height card с declared reason

```text
feature-card [key=feature-card-1] [height=fixed] [reason=equal-card-grid]
```

## Невалидные примеры

```text
Button
```

Нет key, type и action.

```text
Frame 53 [key=frame-53]
  Group 271 [key=group-271]
    title [key=hero-title]
```

Wrapper names не объясняют layout intent.

```text
description [text] [key=description] [height=fixed]
```

Fixed text height не имеет overflow policy или reason.
