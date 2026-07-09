# Имена слоёв и идентичность

BRIDGE identity — это стабильный ключ логического элемента. В Figma identity задаётся двумя способами:

1. стабильным именем слоя, если тип элемента надёжно известен из Figma;
2. BRIDGE-тегом, если нужно объявить продуктовый смысл, которого Figma сама не знает.

## Главное правило

Не пиши тег, если он только повторяет метаданные Figma.

```text
hero-title
product-photo
close-icon
button-group
hero-copy
```

Эти имена достаточны, когда слой имеет понятный тип в Figma и имя написано стабильным English kebab-case.

## Когда тег нужен

Тег нужен для намерения, которое не является техническим свойством слоя:

```text
Главная страница [page=home] [route=/] [bp=1920] [view=default]
Каталог [section=product-slider]
primary-cta [link=primary-cta] [href=/catalog]
menu-button [control=menu-button] [action=state:mobile-menu-open]
email [field=email] [name=email]
snow-bg [decor]
promo-poster [asset]
sneg [decor] [asset]
```

`[decor]` и `[asset]` — это boolean visual-intent/policy tags, а не обязательные identity-теги. Если слой уже нормально назван, stable responsive identity остаётся именем слоя:

```text
sneg [decor] [asset]
```

Здесь identity — `sneg`; `[decor]` говорит, что слой декоративный, не является контентом и может быть скрыт от accessibility tree, а `[asset]` говорит, что визуал переносится цельно.

Старый формат со значением допустим только как fallback для плохих/default имён слоёв:

```text
Frame 182 [decor=snow-bg]
Group 91 [asset=promo-poster]
```

Если значение в `[decor=...]` или `[asset=...]` всё-таки есть, оно должно быть English kebab-case. Boolean `[decor]` и `[asset]` без значения валидны, и валидатор не должен ругаться на отсутствие значения.

## Что не пишется тегами в Figma

Для Figma-макетов дизайнер не описывает руками техническое устройство слоя:

- что слой является текстом;
- что слой является контентной картинкой;
- что слой является иконкой;
- что слой является фреймом, группой или структурной обёрткой;
- как устроена раскладка внутри Auto Layout;
- как слой позиционируется;
- с каким исходным компонентом связан экземпляр, если это известно Figma.

## Стабильная identity между breakpoint’ами

Один и тот же логический элемент должен иметь один и тот же ключ на всех адаптивах.

Desktop:

```text
hero-title
button-group
  primary-cta [link=primary-cta] [href=/pricing]
  secondary-cta [control=secondary-cta] [action=modal:contact-modal]
```

Mobile:

```text
hero-title
button-group
  primary-cta [link=primary-cta] [href=/pricing]
  secondary-cta [control=secondary-cta] [action=modal:contact-modal]
```

Раскладка в Figma может измениться, но identity остаётся той же.

Visual-intent tags тоже должны оставаться семантически стабильными. Если на desktop есть:

```text
sneg [decor] [asset]
```

то на mobile должны сохраниться та же identity и тот же визуальный intent:

```text
sneg [decor] [asset]
```

Если `sneg` отсутствует на mobile, это responsive identity error. Если на mobile есть `sneg`, но без `[decor] [asset]`, это visual intent drift, а не новая identity.

## Не кодируй breakpoint в identity values

BRIDGE identity values должны описывать логический элемент, а не адаптив. Breakpoint уже задан на page/root frame через `[bp=...]`.

Плохо:

```text
// [bp=768]
Отзывы мобилка [control=button-reviews-box-768]

// [bp=375]
Отзывы мобилка [control=button-reviews-box-375]
```

Хорошо:

```text
// [bp=768]
reviews-box [control=button-reviews-box]

// [bp=375]
reviews-box [control=button-reviews-box]
```

Child ids вроде `[control=...]`, `[link=...]`, `[field=...]`, `[modal=...]`, `[state=...]`, `[section=...]`, collection/item ids и fallback-значения `[decor=...]` / `[asset=...]` должны оставаться breakpoint-neutral. Если identity value заканчивается на suffix текущего breakpoint, например `-768`, `-375`, `-mobile` или `-desktop`, убери suffix и оставь breakpoint только на root.

## Соглашения по именованию

Используй English kebab-case для стабильных identities:

- `section-bg`
- `hero-copy`
- `primary-cta`
- `stats-row`
- `card-main-image`

Не допускай смысловых коллизий. Повторяющиеся элементы должны иметь индексы:

```text
product-card-1
product-card-2
review-card-1
review-card-2
```

## Имена секций

Секцию можно определить двумя способами.

Первый способ — секционный компонент из страницы библиотеки `Page Sections`. В этом случае на странице тег `[section=...]` не нужен:

```text
header
reviews
footer
```

Секционный смысл берётся из исходного компонента:

```text
Page Sections / header -> section=header
Page Sections / reviews -> section=reviews
Page Sections / footer -> section=footer
```

Второй способ — обычная секция, собранная обычным фреймом, или неоднозначный компонент. Тогда нужен явный тег:

```text
Рекомендованные товары [section=product-slider]
Похожие товары [section=product-slider]
Каталог [section=product-slider]
```

Правила:

- имя слоя до тегов — понятное название блока на конкретной странице;
- `[section=...]` — стабильный ключ секционного компонента;
- контент, заголовок и данные могут отличаться на разных страницах при одном `[section=...]`;
- если секция уже является экземпляром компонента из `Page Sections`, не дублируй `[section=...]` на странице;
- если секция сделана обычным фреймом, используй `[section=...]`;
- если компонент слишком общий и из его имени не ясно, какая это секция, используй `[section=...]` как явное уточнение.

Одинаковая секция между адаптивами одной страницы означает тот же секционный блок и должна сохранять структуру, пригодную для сравнения. Одинаковая секция на разных страницах не требует одинакового контента.

## Идентичность контента

Одинаковая identity между breakpoint’ами означает один и тот же логический контент.

Можно менять:

- ширину;
- размер шрифта;
- переносы строк;
- позицию внутри той же структуры;
- настройки Auto Layout у родителя;
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
hero-title = "Launch your store in one day"

// mobile
hero-title = "Launch faster"
```

Если текст, смысл или структура отличаются из-за языка, эксперимента, персонализации, продуктового варианта или ограничений целевой платформы, моделируй это вне обычного адаптива. Адаптив — это тот же набор элементов, разложенный под другую ширину, а не новая версия текста или структуры.

## Рекомендуемые структурные имена

```text
section-body
content
hero
hero-copy
button-group
stats-row
visual-column
cards-list
cards-grid
```

Это имена слоёв, а не просьба добавлять технические теги.
