# BRIDGE

## Breakpoints · Roles · Identity · Dependencies · Geometry · Исключения

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
| **R** | **Roles / Роли** | Роль слоя понятна из структуры Figma, метаданных UI Kit или обязательного BRIDGE-тега смысла. |
| **I** | **Identity / Идентичность** | Логические элементы сохраняют одни и те же ключи и одного родителя между адаптивами. |
| **D** | **Dependencies / Зависимости** | Ссылки, модалки, состояния, anchors и actions объявлены явно. |
| **G** | **Geometry / Геометрия** | Позиция, размер, spacing и текстовые метрики воспроизводимы. |
| **E** | **Exceptions / Исключения** | Assets, fixed heights, overflow, decor и нестандартное поведение имеют причину. |

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

BRIDGE разделяет две вещи:

1. **Метаданные Figma** — техническая правда макета: тип слоя, Auto Layout, иерархия, ограничения, позиционирование, исходный компонент, варианты.
2. **BRIDGE-теги смысла** — продуктовый смысл, которого Figma сама не знает: страница, маршрут, секция, ссылка, действие, поле, модалка, состояние, decor, asset, exception.

Дизайнер не дублирует технические свойства руками. Он собирает нормальную структуру в Figma и тегами объявляет только переносимый смысл.

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
- [BRIDGE-ready чеклист для дизайнеров](docs/ru/17-cheklist-dlya-dizaynerov.md)
- [Validator rule catalog](validator/rules.json)

## Инструменты

BRIDGE Assistant, Figma-плагин поверх этой методологии, ведётся в отдельной private/local репе:

```text
bridge-figma-assistant
```

## Минимальный пример

```text
Главная страница [page=home] [route=/] [bp=1200] [view=default]
  Первый экран [section=home-hero]
    hero-bg [decor=hero-bg]

    hero-copy
      hero-title
      hero-subtitle

    button-group
      primary-cta [link=primary-cta] [href=/pricing]
      contact-cta [control=contact-cta] [action=modal:contact-modal]

Contact Modal [modal=contact-modal]
  contact-modal-content
```

## Лицензия

MIT.
