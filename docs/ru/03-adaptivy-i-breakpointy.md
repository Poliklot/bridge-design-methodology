# Адаптивы и breakpoint’ы

## Явные root frames

Создавай соседние frames для каждой responsive-версии:

```text
Landing Hero [bp=1200]
Landing Hero [bp=960]
Landing Hero [bp=640]
Landing Hero [bp=480]
Landing Hero [bp=320]
```

Инструмент может попробовать вывести breakpoint из ширины frame, но явный тег безопаснее.

## Одни keys, разный layout

Desktop и mobile могут иметь разную иерархию и позиции, но важные логические элементы должны сохранять один `[key=...]`.

Пример:

```text
// desktop
button-row flex [key=button-row]
  primary button [key=primary-cta]
  secondary button [key=secondary-cta]

// mobile
button-column flex [key=button-row]
  primary button [key=primary-cta]
  secondary button [key=secondary-cta]
```

Визуальное представление wrapper’а изменилось, но идентичность группы осталась стабильной.

## Изменение обёрток требует причины

Не добавляй случайные wrapper’ы между breakpoint’ами. Breakpoint-specific wrapper допустим только если он выражает настоящую layout-роль: stack, row, grid, clipping scope, overlay scope, semantic region или target-specific grouping.

Плохо:

```text
// mobile
mystery-wrapper [key=wrapper-7]
  title [key=hero-title]
```

Хорошо:

```text
// mobile
hero-copy-stack flex [key=hero-copy] [wrapper-role=stack]
  title [key=hero-title]
```

## Смысл текста должен пережить адаптив

Адаптив может менять размер, переносы, порядок и видимость. Но он не должен незаметно менять смысл.

Если mobile намеренно использует сокращённый текст, пометь это как content variant и объясни причину.

## Сначала точные breakpoint’ы, потом fluid

Сначала переносится точное состояние каждого breakpoint’а. Только после этого можно добавлять interpolation, fluid rules или container-query поведение.
