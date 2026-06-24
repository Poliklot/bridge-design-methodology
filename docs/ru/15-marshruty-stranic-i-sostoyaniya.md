# Маршруты страниц и состояния

BRIDGE считает страницы, routes, anchors и page/data states полноценной частью transfer contract. Дизайн — это не только набор секций, а navigable product surface.

## Идентичность страницы

Page root использует `[page=...]` и `[route=...]`:

```text
Contacts Page [page=contacts] [route=/contacts] [bp=1200]
Contacts Page [page=contacts] [route=/contacts] [bp=320]
```

Правила:

- `[page=...]` — stable page identity.
- `[route=...]` — production URL path.
- все breakpoint’ы одной страницы имеют одну page identity и route.
- route уникален внутри сайта, если это не intentional route template.

## Синтаксис route

Рекомендуемые формы route:

```text
[route=/]
[route=/contacts]
[route=/catalog]
[route=/catalog/product]
[route-pattern=/catalog/:slug]
```

Правила:

- используй `[route=...]` для конкретных страниц;
- используй `[route-pattern=...]` для templates, например product detail pages;
- избегай trailing slash, кроме root `/`, если продукт явно не требует другое;
- route values case-sensitive в контракте, но рекомендуется lowercase kebab-case.

## Page views

`[view=...]` описывает page/data state, а не component UI state.

```text
Catalog Page [page=catalog] [route=/catalog] [bp=1200] [view=default]
Catalog Empty [page=catalog] [route=/catalog] [bp=1200] [view=empty]
Catalog Loading [page=catalog] [route=/catalog] [bp=1200] [view=loading]
Catalog Error [page=catalog] [route=/catalog] [bp=1200] [view=error]
```

Типовые page views:

```text
default
empty
loading
error
filtered
not-found
unauthorized
success
```

Правила:

- каждая page должна иметь `view=default`;
- dynamic pages и collection pages должны иметь empty, loading и error views, если применимо;
- все views одной страницы имеют один `[page=...]` и `[route=...]`;
- views могут иметь state-specific content, но responsive breakpoints одного view не должны менять content.

## Плохое моделирование page states

Не моделируй page states как fake pages:

```text
Catalog Page [page=catalog] [route=/catalog] [view=default]
Catalog Empty Page [page=catalog-empty] [route=/catalog-empty]
```

Правильно:

```text
Catalog Page [page=catalog] [route=/catalog] [view=default]
Catalog Empty [page=catalog] [route=/catalog] [view=empty]
```

## Sections and anchors

Addressable sections используют `[section=...]` и `[anchor=...]`:

```text
Contacts FAQ [section=contacts-faq] [anchor=faq]
```

Правила:

- anchors уникальны внутри одного page route;
- одна section identity должна сохранять один anchor между breakpoint’ами;
- anchors являются частью navigation и не должны изобретаться на этапе implementation.

## Links and href resolution

Links используют `href` как единственную destination truth:

```text
Contacts [link=nav-contacts] [href=/contacts]
FAQ [link=nav-faq] [href=/contacts#faq]
Same page FAQ [link=faq-link] [href=#faq]
Telegram [link=social-telegram] [href=https://t.me/company]
```

Validator resolution:

```text
href=/contacts      -> page with [route=/contacts]
href=/contacts#faq  -> page [route=/contacts] + section [anchor=faq]
href=#faq           -> current page + section [anchor=faq]
href=https://...    -> external URL, internal route не нужен
```

## Scope view и breakpoint

Uniqueness scope для top-level page roots:

```text
page + route + bp + view
```

Пример:

```text
Catalog [page=catalog] [route=/catalog] [bp=1200] [view=default]
Catalog [page=catalog] [route=/catalog] [bp=320] [view=default]
Catalog Empty [page=catalog] [route=/catalog] [bp=1200] [view=empty]
Catalog Empty [page=catalog] [route=/catalog] [bp=320] [view=empty]
```

## Validator rules

BRIDGE validator должен репортить:

- page root без route;
- duplicate concrete routes;
- одна page identity использует разные routes между breakpoint’ами;
- один page view отсутствует на required breakpoint;
- dynamic collection page не имеет empty/loading/error view;
- internal href route не существует;
- internal href anchor не существует;
- same-page anchor href не имеет matching section в current page;
- anchor дублируется внутри одного page route;
- page state смоделирован как отдельный fake route.
