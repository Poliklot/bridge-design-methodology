# Оси вариативности

BRIDGE разделяет разные причины вариативности. Это не даёт дизайнерам прятать изменения контента внутри responsive breakpoints.

## Core rule

> Адаптив — это тот же набор элементов, разложенный под другую ширину. Это не вариант текста и не новая структура.

Если меняется текст, смысл или структура элементов, причина должна быть выражена другой осью: view, locale, theme, experiment, role, data scenario, правило коллекции, вариант компонента или явное исключение.

## Каноничные оси

| Axis | Tag | Может ли меняться content? | Purpose |
| --- | --- | --- | --- |
| Page | `[page=...]` | Нет сама по себе | Logical page identity |
| Route | `[route=...]` | Нет | Production URL path |
| Breakpoint | `[bp=...]` | Нет | Responsive layout |
| View | `[view=...]` | Да, если state-specific | Data/page state: empty/loading/error |
| Locale | `[locale=...]` | Да | Translation и locale-specific formatting |
| Theme | `[theme=...]` | Нет | Visual theme: light/dark |
| Experiment | `[experiment=...]` | Да, controlled | A/B или product experiment |
| Role | `[role-view=...]` | Да, controlled | User role или permission view |
| Data scenario | `[data=...]` | Только sample content | Stress cases: long names, max items |

## Ось адаптива

Адаптив меняет только раскладку:

```text
Hero [section=hero] [bp=1200]
Hero [section=hero] [bp=320]
```

Можно менять:

- направление раскладки;
- отступы;
- размер шрифта;
- переносы;
- порядок элементов внутри одного родителя;
- видимость, если это намеренно.

Нельзя менять:

- добавлять или удалять логические элементы;
- менять вложенность элементов;
- заменять один ключ отдельной копией только для mobile или desktop;
- заголовок;
- сокращённый CTA только для mobile;
- юридический текст;
- цену;
- продуктовый claim.

## View axis

Views описывают state-specific page/data content:

```text
Catalog [page=catalog] [route=/catalog] [bp=1200] [view=default]
Catalog Empty [page=catalog] [route=/catalog] [bp=1200] [view=empty]
Catalog Error [page=catalog] [route=/catalog] [bp=1200] [view=error]
```

`view=empty` может иметь другой content относительно `view=default`, потому что состояние страницы другое.

## Locale axis

Locale намеренно меняет текст и formatting:

```text
Contacts [page=contacts] [route=/contacts] [bp=1200] [locale=en-US]
Contacts [page=contacts] [route=/contacts] [bp=1200] [locale=ru-RU]
```

Правила:

- locale variants не должны смешиваться с breakpoint variants;
- layout нужно проверять на длинном localized text;
- locale не является обходом для mobile copy drift.

## Theme axis

Theme меняет visual tokens, а не content:

```text
Dashboard [page=dashboard] [route=/dashboard] [bp=1200] [theme=light]
Dashboard [page=dashboard] [route=/dashboard] [bp=1200] [theme=dark]
```

Text content должен оставаться одинаковым между themes.

## Experiment axis

Experiment variants могут менять content, но только если явно объявлены:

```text
Pricing [page=pricing] [route=/pricing] [bp=1200] [experiment=cta-a]
Pricing [page=pricing] [route=/pricing] [bp=1200] [experiment=cta-b]
```

Правила:

- experiments не должны маскироваться под responsive breakpoints;
- experiment names должны быть product-approved;
- analytics и implementation должны знать experiment axis.

## Role axis

Role или permission views могут менять content и доступные actions:

```text
Dashboard [page=dashboard] [route=/dashboard] [bp=1200] [role-view=guest]
Dashboard [page=dashboard] [route=/dashboard] [bp=1200] [role-view=admin]
```

Используй это для authenticated/unauthenticated, admin/user, owner/viewer или permission-specific UI.

## Data scenario axis

Data scenarios — это design QA fixtures, а не production content variants:

```text
Product Card [card=product-card] [data=short]
Product Card [card=product-card] [data=long]
Product Grid [collection=products] [data=max-items]
```

Используй data scenarios, чтобы тестировать overflow, long names, empty images, max item count и localization stress.

## Axis composition

Полный context может сочетать оси:

```text
Catalog [page=catalog] [route=/catalog] [bp=320] [view=empty] [locale=ru-RU] [theme=dark]
```

Но у каждой оси должна быть одна причина. Нельзя использовать одну ось, чтобы спрятать другой вид вариативности.

## Невалидные примеры

Mobile copy drift:

```text
// desktop
Title [text=hero-title] = "Launch your store in one day"

// mobile
Title [text=hero-title] = "Launch faster"
```

Fake locale как responsive workaround:

```text
Hero [section=hero] [bp=320] [locale=mobile-short]
```

Theme меняет content:

```text
Dashboard [theme=light] = "Welcome back"
Dashboard [theme=dark] = "Good evening"
```

## Validator rules

BRIDGE validator должен репортить:

- text content changes across breakpoints of the same context;
- text content changes across themes;
- locale changes mixed into breakpoint-only frames;
- experiment variants without explicit experiment axis;
- view-specific content modeled as separate pages/routes;
- data stress examples used as production content variants.
