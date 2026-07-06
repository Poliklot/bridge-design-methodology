# Имена слоёв и идентичность

BRIDGE использует typed identity tags:

```text
[type=id]
```

Тег описывает и transferable role, и stable identity слоя.

## Примеры

```text
title [text=hero-title]
subtitle [text=hero-subtitle]
button group [container=button-group] [layout=row]
card [card=feature-card-1]
wave [decor=decor-wave] [abs]
```

## Стабильная identity между breakpoint’ами

Identity-часть должна сохраняться между breakpoint’ами.

Desktop:

```text
Hero title [text=hero-title]
Button group [container=button-group] [layout=row]
```

Mobile:

```text
Hero title [text=hero-title]
Button group [container=button-group] [layout=stack]
```

Layout изменился с row на stack, но identity осталась `button-group`.

## Соглашения по именованию

Используй English kebab-case для identities:

- `section-bg`
- `hero-copy`
- `primary-cta`
- `stats-row`
- `card-main-image`

Не допускай смысловых коллизий. Повторяющиеся карточки должны иметь индексы:

```text
card [card=card-1]
card [card=card-2]
```

## Имена секций

Для секций human-readable имя слоя и тег `[section=...]` отвечают за разные вещи.

```text
Рекомендованные товары [section=product-slider]
Похожие товары [section=product-slider]
Каталог [section=product-slider]
```

- имя слоя до тегов — контекстный label для конкретной страницы;
- `[section=...]` — reusable section/component contract, по которому агент или adapter понимает, каким секционным компонентом переносить блок;
- контент, заголовок и данные могут отличаться на разных страницах при одном `[section=...]`;
- если секция уникальна для одной страницы, используй конкретный section id: `Первый экран [section=home-hero]`;
- не добавляй префиксы вроде `Секция /` в human name: роль уже объявлена тегом `[section=...]`.

Одинаковый `[section=...]` между breakpoint’ами одной страницы означает тот же секционный контракт и должен сохранять структуру, пригодную для сравнения. Одинаковый `[section=...]` на разных страницах не требует одинакового контента.

## Идентичность контента

Одинаковый typed identity между breakpoint’ами означает один и тот же логический контент.

Можно менять:

- ширину;
- размер шрифта;
- переносы строк;
- позицию в раскладке;
- настройки раскладки у родителя.
- порядок внутри того же родителя;
- видимость на конкретном адаптиве.

Нельзя между адаптивами:

- менять текст CTA;
- менять цену;
- менять юридическую формулировку;
- менять продуктовый claim;
- прятать важный смысл на mobile;
- сокращать подписи только для mobile;
- переносить один и тот же элемент в другого родителя;
- добавлять или удалять логические элементы без явно описанного варианта, состояния, правила коллекции или исключения;
- заменять один и тот же логический элемент отдельными копиями под разные адаптивы.

Плохо:

```text
// desktop
title [text=hero-title] = "Launch your store in one day"

// mobile
title [text=hero-title] = "Launch faster"
```

Если текст, смысл или структура отличаются из-за языка, эксперимента, персонализации, продуктового варианта или ограничений целевой платформы, моделируй это вне обычного адаптива. Адаптив — это тот же набор элементов, разложенный под другую ширину, а не новая версия текста или структуры.

## Рекомендуемые структурные имена

```text
section-body [container=section-body] [layout=stack]
content [container=content] [layout=stack]
hero [container=hero] [layout=row]
hero-copy [container=hero-copy] [layout=stack]
button group [container=button-group] [layout=row]
stats row [container=stats-row] [layout=row]
visual column [container=visual-col] [layout=stack]
```
