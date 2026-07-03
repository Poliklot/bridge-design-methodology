# BRIDGE

## Breakpoints · Roles · Identity · Dependencies · Geometry · Exceptions

**Дизайн, который можно перенести без угадывания.**

BRIDGE — независимая от платформ методология подготовки интерфейсных макетов к переносу: из Figma или любого другого design source в код, дизайн-системы, no-code инструменты, внутренние редакторы или AI-assisted implementation pipelines.

Языки: [English](README.md) · [Русский](README.ru.md)

> **BRIDGE — это не инструмент и не адаптер под конкретную платформу.**  
> BRIDGE — это контракт, который делает дизайн понятным до того, как кто-то начнёт его реализовывать.

## Название

**BRIDGE** — это мост между намерением дизайнера и реализацией. Макет перестаёт быть отдельной картинкой и становится переносимой системой.

Аббревиатура и есть методология:

| Буква | Принцип | Правило |
| --- | --- | --- |
| **B** | **Breakpoints / Адаптивы** | Адаптивы заданы явно и сравниваются как один и тот же набор элементов. |
| **R** | **Roles / Роли** | У каждого слоя есть понятная роль: flow, absolute или target. |
| **I** | **Identity / Идентичность** | Логические элементы сохраняют одни и те же ключи и одного родителя между адаптивами. |
| **D** | **Dependencies / Зависимости** | Ссылки, модалки, состояния, anchors и actions объявлены явно. |
| **G** | **Geometry / Геометрия** | Позиция, размер, spacing и текстовые метрики воспроизводимы. |
| **E** | **Exceptions / Исключения** | Assets, fixed heights, overflow и absolute-элементы имеют причину. |

## Словарь бренда

Название должно использоваться одинаково:

- **BRIDGE-ready design** — макет, который можно переносить без догадок.
- **BRIDGE Contract** — структурированный контракт, который должен раскрывать дизайн.
- **BRIDGE Preflight** — чеклист перед передачей макета.
- **BRIDGE Adapter** — слой переноса в конкретную целевую среду.
- **BRIDGE Linter** — будущий валидатор ошибок в макете.
- **BRIDGE Exception** — осознанное исключение с явно указанной причиной.

Короткая формула:

```text
BRIDGE-ready = явные адаптивы + неизменная структура элементов + явно описанный смысл
```

## Зачем это нужно

Макет, который должен быть перенесён разработчиком, AI-агентом или детерминированным инструментом, не может быть просто красивой картинкой. Он должен быть системой.

BRIDGE не привязан к конкретному визуальному редактору, frontend-фреймворку, CMS, runtime, мобильной разработке или любому другому инструменту. Методология живёт отдельно. Конкретные адаптеры могут переносить один и тот же контракт в разные среды.

## Главная идея

Каждый слой в макете должен иметь явную роль:

1. **Flow item** — элемент участвует в потоке layout: Auto Layout, stack, row, grid.
2. **Absolute item** — элемент намеренно вынесен из потока: фон, декор, overlay, визуальное исключение.
3. **Declared target** — цель интерактивности: модалка, секция, состояние, внешний URL.

Никаких случайных free-floating слоёв. Никаких кнопок “потом поймём куда ведёт”. Никаких адаптивов, где незаметно изменился смысл текста или перестроилось дерево элементов.

## Документация на русском

- [Правила дизайна](docs/ru/01-pravila-dizajna.md)
- [Имена слоёв и идентичность](docs/ru/02-imena-sloev-i-identichnost.md)
- [Адаптивы и breakpoint’ы](docs/ru/03-adaptivy-i-breakpointy.md)
- [Контракт переноса](docs/ru/04-kontrakt-perenosa.md)
- [Интерактивность и цели](docs/ru/05-interaktivnost-i-celi.md)
- [Политика обёрток](docs/ru/06-politika-obertok.md)
- [Высоты и overflow](docs/ru/07-vysoty-i-overflow.md)
- [Preflight-чеклист](docs/ru/08-preflight-checklist.md)
- [Типичные ошибки дизайнеров](docs/ru/09-tipichnye-oshibki-dizajnerov.md)
- [Сложные кейсы и edge cases](docs/ru/10-slozhnye-kejsy-i-edge-cases.md)
- [Валидация и автопроверки](docs/ru/11-validaciya-i-avtoproverki.md)
- [Roadmap проекта](docs/ru/12-roadmap-proekta.md)
- [Грамматика тегов](docs/ru/13-grammatika-tegov.md)
- [Компоненты и UI Kit](docs/ru/14-komponenty-i-ui-kit.md)
- [Маршруты страниц и состояния](docs/ru/15-marshruty-stranic-i-sostoyaniya.md)
- [Оси вариативности](docs/ru/16-osi-variativnosti.md)
- [Validator rule catalog](validator/rules.json)

## Инструменты

BRIDGE Assistant, Figma-плагин поверх этой методологии, ведётся в отдельной private/local репе:

```text
bridge-figma-assistant
```

## Минимальный пример

```text
Hero Section [section=hero-section] [bp=1200]
  background [decor=hero-bg] [abs]

  content [container=content] [layout=stack]
    hero-copy [container=hero-copy] [layout=stack]
      title [text=hero-title]
      subtitle [text=hero-subtitle]

    button-row [container=button-group] [layout=row]
      primary [link=primary-cta] [href=/pricing]
      secondary [control=contact-cta] [action=modal:contact-modal]

Modal Contact [modal=contact-modal]
  modal-content [container=contact-modal-content] [layout=stack]
```

## Лицензия

MIT.
