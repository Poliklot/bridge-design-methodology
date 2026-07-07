# Компоненты и UI Kit

BRIDGE рассматривает компоненты как отдельный контракт. Page designs используют component instances. UI Kit владеет структурой компонентов, variants и states.

## Главное правило

> Страница использует component instances. UI Kit определяет component states.

Страница не должна быть местом, где впервые изобретаются hover, focus, disabled, loading, error, selected, expanded или open states.

## Ответственность page instance

Page instance описывает только page-specific identity и behavior:

```text
Contact us [control=contact-cta] [action=modal:contact-modal]
FAQ [link=nav-faq] [href=/contacts#faq]
Email [field=email] [name=email]
```

Не добавляй `[component=...]` на page instances, если Figma уже знает исходный компонент.

Плохо:

```text
Contact us [control=contact-cta] [component=button] [action=modal:contact-modal]
```

Хорошо:

```text
Contact us [control=contact-cta] [action=modal:contact-modal]
```

Исходный компонент извлекается из Figma instance metadata.

## Ответственность UI Kit

UI Kit должен определять reusable component behavior и visual states.

Примеры state coverage:

| Component family | Required states |
| --- | --- |
| Button-like controls | default, hover, focus, pressed, disabled, loading |
| Ссылки | default, hover, focus, visited, disabled |
| Text fields | empty, filled, focus, error, disabled, success |
| Select-like fields | closed, open, selected, focus, error, disabled |
| Toggles/switches | off, on, focus, disabled |
| Tabs | default, active, hover, focus, disabled |
| Disclosure/accordion | collapsed, expanded, focus, disabled |
| Modal/dialog | default, close behavior, backdrop behavior, focus trap |

Точная component taxonomy может отличаться между design systems. BRIDGE не должен заставлять каждого page designer писать подробные roles вроде `accordion-trigger` в layer names страницы.

## Почему не role tags на каждом page control?

Вариантов controls слишком много: tabs, accordions, menus, comboboxes, sliders, steppers, pagination, segmented controls, tree items, date pickers, uploaders и много custom controls.

Если BRIDGE требует вручную называть их все на страницах, методология становится хрупкой.

Вместо этого:

- page layer names используют `[control=...]`, `[link=...]` или `[field=...]`;
- UI Kit component metadata даёт точный component type;
- validators проверяют исходный компонент и покрытие состояний.

## Обязательные проверки валидатора

BRIDGE validator должен репортить:

- page control не является Figma component instance;
- page instance detached от UI Kit component;
- один control identity использует разные исходные компоненты между breakpoint’ами;
- required UI states отсутствуют в component set;
- hover/focus/disabled/loading states нарисованы вручную на странице;
- component instance overrides меняют структуру, а не content;
- form fields не раскрывают data names;
- icon-only component instances не имеют accessible labels.

## Источник правды о компоненте

Предпочтительный порядок источников:

1. Figma component instance metadata.
2. Figma component set and variant properties.
3. UI Kit documentation.
4. BRIDGE-теги нужны только если метаданные недоступны.

BRIDGE-теги не должны дублировать информацию, которую Figma уже надёжно предоставляет.

## Page state vs component state

Не путай page/data state и component UI state.

Page/data state:

```text
Catalog Page [page=catalog] [route=/catalog] [bp=1200] [view=empty]
```

Component UI state в UI Kit:

```text
Button / Primary / Disabled
Input / Error
Accordion / Expanded
```

Страница может показывать реальный page state, например empty catalog, но component hover/focus/disabled variants должны жить в UI Kit.
