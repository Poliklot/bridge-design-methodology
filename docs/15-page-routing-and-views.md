# Page routing and views

BRIDGE treats pages, routes, anchors, and page/data states as first-class parts of the transfer contract. A design is not only a set of sections; it is a navigable product surface.

## Page identity

A page root uses `[page=...]` and `[route=...]`:

```text
Contacts Page [page=contacts] [route=/contacts] [bp=1200]
Contacts Page [page=contacts] [route=/contacts] [bp=320]
```

Rules:

- `[page=...]` is the stable page identity.
- `[route=...]` is the production URL path.
- all breakpoints of one page share the same page identity and route.
- route is unique across the site unless the page is an intentional route template.

## Route syntax

Recommended route forms:

```text
[route=/]
[route=/contacts]
[route=/catalog]
[route=/catalog/product]
[route-pattern=/catalog/:slug]
```

Rules:

- use `[route=...]` for concrete pages;
- use `[route-pattern=...]` for templates such as product detail pages;
- avoid trailing slashes except for root `/` unless the product explicitly requires them;
- route values are case-sensitive in the contract, but lowercase kebab-case paths are recommended.

## Page views

`[view=...]` describes a page/data state, not a component UI state.

```text
Catalog Page [page=catalog] [route=/catalog] [bp=1200] [view=default]
Catalog Empty [page=catalog] [route=/catalog] [bp=1200] [view=empty]
Catalog Loading [page=catalog] [route=/catalog] [bp=1200] [view=loading]
Catalog Error [page=catalog] [route=/catalog] [bp=1200] [view=error]
```

Common page views:

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

Rules:

- every page should have `view=default`;
- dynamic pages and collection pages should define empty, loading, and error views when applicable;
- all views of the same page share `[page=...]` and `[route=...]`;
- views may have state-specific content, but responsive breakpoints of the same view must not change content.

## Bad page-state modeling

Do not model page states as fake pages:

```text
Catalog Page [page=catalog] [route=/catalog] [view=default]
Catalog Empty Page [page=catalog-empty] [route=/catalog-empty]
```

Correct:

```text
Catalog Page [page=catalog] [route=/catalog] [view=default]
Catalog Empty [page=catalog] [route=/catalog] [view=empty]
```

## Sections and anchors

Addressable sections use `[section=...]` and `[anchor=...]`:

```text
Contacts FAQ [section=contacts-faq] [anchor=faq]
```

`[section=...]` is the reusable section/component contract. The human layer name may be page-specific:

```text
Catalog [section=product-slider]
Related products [section=product-slider]
Recommended products [section=product-slider]
First screen [section=home-hero]
```

In the first three examples, content/data differs, but an adapter can implement the block with one section component. `home-hero` is an example of a page-unique section.

Rules:

- do not write `Section /` in the layer name when `[section=...]` is present;
- `[section=...]` should stay stable across breakpoints of one page;
- the same `[section=...]` on different pages may have different headings, data, and content;
- anchors are unique inside one page route;
- the same section identity should keep the same anchor across breakpoints;
- anchors are part of navigation and should not be invented by implementation later.

## Links and href resolution

Links use `href` as the only destination truth:

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
href=https://...    -> external URL, no internal route required
```

## View and breakpoint scope

Uniqueness scope for top-level page roots:

```text
page + route + bp + view
```

Example:

```text
Catalog [page=catalog] [route=/catalog] [bp=1200] [view=default]
Catalog [page=catalog] [route=/catalog] [bp=320] [view=default]
Catalog Empty [page=catalog] [route=/catalog] [bp=1200] [view=empty]
Catalog Empty [page=catalog] [route=/catalog] [bp=320] [view=empty]
```

## Validator rules

A BRIDGE validator should report:

- page root has no route;
- duplicate concrete routes;
- same page identity uses different routes across breakpoints;
- same page view is missing on required breakpoint;
- dynamic collection page has no empty/loading/error view;
- internal href route does not exist;
- internal href anchor does not exist;
- same-page anchor href has no matching section in current page;
- anchor is duplicated inside one page route;
- page state is modeled as a separate fake route.
