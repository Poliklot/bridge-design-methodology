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
feature-card [height=fixed] [reason=equal-card-grid]
```

## Text и fixed height

Text layer с fixed height обязан объяснить, что произойдёт при изменении контента.

Плохо:

```text
description [height=fixed]
```

Хорошо:

```text
description [height=hug]
```

Или, если clipping намеренный:

```text
description [height=fixed] [overflow=truncate] [lines=3]
```

## Перенос текста и ручные переносы строк

Ручной перенос строки — это не layout.

Не используй forced line breaks в text layer, `<br>` или разные разбиения текста по breakpoint’ам, чтобы динамический контент “красиво встал”. Если текст приходит из CMS, админки, файла локализации, каталога товаров или любого другого редактируемого источника, он должен переноситься по контейнеру.

Плохо:

```text
hero-title
"Запустите зимний
бизнес быстрее"
```

если перенос нужен только как визуальный костыль.

Хорошо:

```text
hero-title [height=hug]
```

Поведение переноса задаёт ширина текстового блока, а не copy:

- задай осмысленную width/max-width;
- разреши normal wrapping;
- используй hug/min-height, если блок может расти;
- используй `[overflow=truncate] [lines=...]` только когда truncation — продуктово принятое решение;
- учитывай длинные слова, названия, URL и локализацию.

Forced line breaks допустимы только когда они являются частью семантики контента или утверждённого brand lockup: почтовые адреса, стихи, юридический текст с заданным форматированием или campaign headline с обязательным переносом. Помечай это как exception:

```text
campaign-title [bridge-exception=manual-line-break] [reason=brand-lockup]
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
