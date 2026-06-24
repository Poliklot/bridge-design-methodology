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

## Идентичность контента

Одинаковый typed identity между breakpoint’ами означает один и тот же логический контент.

Можно менять:

- ширину;
- font-size;
- переносы строк;
- позицию в layout;
- parent layout.

Нельзя между responsive breakpoint’ами:

- менять текст CTA;
- менять цену;
- менять юридическую формулировку;
- менять продуктовый claim;
- прятать важный смысл на mobile;
- сокращать mobile labels.

Плохо:

```text
// desktop
title [text=hero-title] = "Launch your store in one day"

// mobile
title [text=hero-title] = "Launch faster"
```

Если контент отличается из-за locale, experiment, personalization или product variant, моделируй это вне responsive breakpoint contract. Адаптив — это layout variation, а не content variation.

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
