# Высоты и overflow

Fixed height — один из самых частых источников багов при переносе. В BRIDGE намерение высоты должно быть явным.

## Предпочтение по умолчанию

Лучше использовать content-driven sizing:

- text layers hug content;
- cards растут вместе с контентом;
- sections задают padding и min-height, а не клипают контент;
- повторяющиеся карточки выравниваются grid rules, а не скрытым overflow.

## Когда fixed height допустим

Fixed height валиден для:

- root breakpoint canvases;
- buttons и controls с design-system size;
- icons и images с fixed aspect ratio;
- bounded cards, если equal height намеренный;
- masks, posters и exported visual assets;
- scrollable areas с явной overflow strategy.

Укажи причину:

```text
card [key=feature-card] [height=fixed] [reason=equal-card-grid]
```

## Text и fixed height

Text layer с fixed height обязан объяснить, что произойдёт при изменении контента.

Плохо:

```text
description [text] [key=description] [height=fixed]
```

Хорошо:

```text
description [text] [key=description] [height=hug]
```

Или, если clipping намеренный:

```text
description [text] [key=description] [height=fixed] [overflow=truncate] [lines=3]
```

## Overflow policy

Используй явные overflow tags:

```text
[overflow=visible]
[overflow=hidden]
[overflow=scroll]
[overflow=truncate]
```

Если элемент визуально выходит наружу, положи его на тот уровень иерархии, где этот overflow действительно задуман.
