# Маршруты страниц и состояния

BRIDGE считает страницы, production routes, anchors и page/data states полноценной частью transfer contract. Дизайн — это не только набор секций, а navigable product surface.

## Идентичность страницы и optional route

Page root всегда требует stable `[page=...]`. Route добавляется только когда известен настоящий production URL или route pattern.

Route известен:

```text
Contacts Page [page=contacts] [route=/contacts] [bp=1200]
Contacts Page [page=contacts] [route=/contacts] [bp=320]
```

Draft, route неизвестен:

```text
Contacts Page [page=contacts] [bp=1200] [view=default]
Contacts Page [page=contacts] [bp=320] [view=default]
```

Правила:

- `[page=...]` — stable page identity.
- `[route=...]` — production URL path, а не догадка и не placeholder.
- `[route-pattern=...]` — реальный production route template.
- если route пока неизвестен, не добавляй его; missing route — Draft TODO, а не hard error.
- все breakpoints/views одной routed page используют один route, когда route известен.
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

- используй `[route=...]` только для конкретных production pages;
- используй `[route-pattern=...]` только для реальных templates, например product detail pages;
- не выдумывай fake routes ради чеклиста;
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
- все views одной страницы имеют один `[page=...]` и один `[route=...]`, когда route известен;
- views могут иметь state-specific content, но responsive breakpoints одного view не должны менять content.

## Плохое моделирование page states

Не моделируй page states как fake pages или fake routes:

```text
Catalog Page [page=catalog] [route=/catalog] [view=default]
Catalog Empty Page [page=catalog-empty] [route=/catalog-empty]
```

Правильно:

```text
Catalog Page [page=catalog] [route=/catalog] [view=default]
Catalog Empty [page=catalog] [route=/catalog] [view=empty]
```

Если production route неизвестен, сохрани одну page identity и не добавляй route:

```text
Catalog Page [page=catalog] [view=default]
Catalog Empty [page=catalog] [view=empty]
```

## Sections and anchors

Addressable sections используют `[section=...]` и `[anchor=...]`:

```text
Contacts FAQ [section=contacts-faq] [anchor=faq]
```

`[section=...]` — это переиспользуемый контракт секционного компонента. Human name слоя может зависеть от страницы:

```text
Каталог [section=product-slider]
Похожие товары [section=product-slider]
Рекомендованные товары [section=product-slider]
Первый экран [section=home-hero]
```

В первых трёх примерах content/data разные, но adapter может переносить блок одним секционным компонентом. `home-hero` — пример уникальной секции страницы.

Правила:

- не пиши `Секция /` в имени слоя, если есть `[section=...]`;
- `[section=...]` должен быть стабильным между breakpoint’ами одной страницы;
- одинаковый `[section=...]` на разных страницах допускает разные заголовки, данные и content;
- anchors уникальны внутри одного page route или page identity;
- одна section identity должна сохранять один anchor между breakpoint’ами;
- anchors являются частью navigation и не должны изобретаться на этапе implementation.

## Ссылки и разрешение href

Известные ссылки используют `href` как единственный источник правды и не требуют `[link=...]`:

```text
Contacts [href=/contacts]
FAQ [href=/contacts#faq]
Same page FAQ [href=#faq]
Telegram [href=https://t.me/company]
```

Если destination неизвестен, используй `[link]`:

```text
Contacts [link]
```

Не используй `[href=#]` как unknown placeholder. `#faq` — реальный same-page anchor; один `#` невалиден.

Validator resolution:

```text
href=/contacts      -> page with [route=/contacts]
href=/contacts#faq  -> page [route=/contacts] + section [anchor=faq]
href=#faq           -> current page + section [anchor=faq]
href=https://...    -> external URL, internal route не нужен
```

Если у target page пока нет route, потому что дизайн в draft, route resolution может остаться TODO. Когда `[route=...]` указан, это должен быть production URL.

## Scope view и breakpoint

Uniqueness scope для top-level page roots с известным route:

```text
page + route + bp + view
```

Если route неизвестен в draft, используй:

```text
page + bp + view
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

- page root без route как Draft TODO, а не hard error;
- route value не является production URL/path, когда route указан;
- duplicate concrete routes;
- одна page identity использует разные known routes между breakpoint’ами;
- один page view отсутствует на required breakpoint;
- dynamic collection page не имеет empty/loading/error view;
- `[href=#]` используется как unknown placeholder;
- internal href route не существует, когда route data известно;
- internal href anchor не существует;
- same-page anchor href не имеет matching section в current page;
- anchor дублируется внутри одного page route/page identity;
- page state смоделирован как отдельный fake route.
