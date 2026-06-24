# Адаптивы и breakpoint’ы

## Явные root frames

Создавай соседние frames для каждой responsive-версии:

```text
Landing Hero [section=landing-hero] [bp=1200]
Landing Hero [section=landing-hero] [bp=960]
Landing Hero [section=landing-hero] [bp=640]
Landing Hero [section=landing-hero] [bp=480]
Landing Hero [section=landing-hero] [bp=320]
```

Инструмент может вывести breakpoint из ширины frame, но явный тег безопаснее.

## Одни identities, разный layout

Desktop и mobile могут иметь разную иерархию и layout properties, но важные логические элементы должны сохранять один typed identity.

Пример:

```text
// desktop
button group [container=button-group] [layout=row]
  primary [link=primary-cta] [href=/pricing]
  secondary [control=secondary-cta] [action=modal:contact-modal]

// mobile
button group [container=button-group] [layout=stack]
  primary [link=primary-cta] [href=/pricing]
  secondary [control=secondary-cta] [action=modal:contact-modal]
```

Layout изменился, но identity осталась стабильной.

## Изменение обёрток требует причины

Не добавляй случайные wrapper’ы между breakpoint’ами. Breakpoint-specific wrapper допустим только если он выражает настоящую layout-роль: stack, row, grid, clipping scope, overlay scope, semantic region или target-specific grouping.

Плохо:

```text
// mobile
mystery-wrapper [container=wrapper-7]
  title [text=hero-title]
```

Хорошо:

```text
// mobile
hero copy [container=hero-copy] [layout=stack]
  title [text=hero-title]
```

## Смысл текста должен пережить адаптив

Адаптив может менять размер, переносы, порядок и видимость. Он не должен менять текстовый контент.

## Сначала точные breakpoint’ы, потом fluid

Сначала переносится точное состояние каждого breakpoint’а. Только после этого можно добавлять interpolation, fluid rules или container-query поведение.
