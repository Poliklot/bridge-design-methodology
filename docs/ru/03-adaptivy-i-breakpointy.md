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

## Одно дерево элементов, разный layout

Адаптив — это layout-вариация одного и того же логического дерева элементов, а не вторая версия экрана.

Breakpoint roots одной view/section должны сохранять:

- одинаковый набор transferable identities;
- одинаковые parent-child связи между этими identities;
- одинаковую cardinality коллекций, если collection rules явно не описывают dynamic min/max/empty behavior;
- одинаковые actions, targets и content для одних и тех же identities.

Responsive-варианты могут менять geometry и layout behavior: размер, spacing, переносы, direction, порядок, visibility и constraints. Они не должны незаметно создавать элементы, удалять элементы или переносить identity в другого parent’а.

Если количество элементов или вложенность должны измениться, моделируй это как state, component variant, collection rule, target-specific variant или явное BRIDGE structural exception. Не прячь это внутри обычного responsive breakpoint’а.

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

Layout изменился, но identity и parent-child topology остались стабильными.

## Изменение обёрток требует причины

Не добавляй случайные wrapper’ы между breakpoint’ами. Responsive tree — часть контракта, поэтому лучше добавить один и тот же meaningful wrapper на все breakpoint’ы и менять только его layout properties.

Breakpoint-specific wrapper — это structural exception. Он допустим только если выражает настоящую layout-роль: stack, row, grid, clipping scope, overlay scope, semantic region или target-specific grouping, и причина явно объявлена.

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

Адаптив может менять размер, переносы, порядок и видимость. Он не должен менять текстовый контент или logical tree topology.

## Сначала точные breakpoint’ы, потом fluid

Сначала переносится точное состояние каждого breakpoint’а. Только после этого можно добавлять interpolation, fluid rules или container-query поведение.
