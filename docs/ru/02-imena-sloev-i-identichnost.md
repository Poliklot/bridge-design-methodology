# Имена слоёв и идентичность

## Стабильные ключи

Каждый важный элемент должен иметь стабильный identity key:

```text
title [text] [key=title]
subtitle [text] [key=subtitle]
button-row flex [key=button-row]
card [key=feature-card-1]
[asset] [decor] wave [key=decor-wave]
```

Ключи должны совпадать между breakpoint’ами. Видимое имя слоя может меняться, key — нет.

Desktop:

```text
Hero title [text] [key=hero-title]
```

Mobile:

```text
Title mobile [text] [key=hero-title]
```

Инструмент переноса воспринимает их как один логический элемент.

## Соглашения по именованию

Используй английский kebab-case для keys:

- `section-bg`
- `hero-copy`
- `primary-cta`
- `stats-row`
- `card-main-image`

Не допускай смысловых коллизий. Повторяющиеся карточки должны иметь индексы:

```text
card [key=card-1]
card [key=card-2]
```

## Идентичность контента

Одинаковый key между breakpoint’ами означает один и тот же логический контент.

Можно менять:

- ширину;
- font-size;
- переносы строк;
- позицию в layout;
- видимое количество строк, если это результат wrapping.

Нельзя без явного content variant:

- менять текст CTA;
- менять цену;
- менять юридическую формулировку;
- менять продуктовый claim;
- прятать важный смысл на mobile.

Плохо:

```text
// desktop
title [key=hero-title] = "Launch your store in one day"

// mobile
title [key=hero-title] = "Launch faster"
```

Если контент намеренно отличается, объяви это:

```text
title [key=hero-title] [content-variant=mobile-short]
```

## Рекомендуемые структурные имена

```text
section-body flex [key=section-body]
content flex [key=content]
hero flex [key=hero]
hero-copy flex [key=hero-copy]
button-row flex [key=button-row]
stats-row flex [key=stats-row]
visual-col flex [key=visual-col]
```
