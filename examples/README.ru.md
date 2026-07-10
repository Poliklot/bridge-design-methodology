# BRIDGE на примерах

Это каталог коротких рецептов. Каждый начинается с проблемы, показывает плохой и хороший вариант и объясняет только одно правило.

Если BRIDGE пока совсем незнаком, сначала пройдите [быстрый старт для дизайнера](../docs/ru/00-bystryj-start-dlya-dizajnera.md).

| Пример | Когда нужен |
| --- | --- |
| [1. Страница и адаптивы](#1-страница-и-адаптивы) | связываем desktop, tablet и mobile |
| [2. Один элемент на разных ширинах](#2-один-элемент-на-разных-ширинах) | приводим имена слоёв к стабильному виду |
| [3. Секция страницы](#3-секция-страницы) | выбираем между `[section]` и `Page Sections` |
| [4. Ссылка или действие](#4-ссылка-или-действие) | описываем результат клика |
| [5. Кнопка и modal target](#5-кнопка-и-modal-target) | связываем control с существующей целью |
| [6. Осмысленная структура](#6-осмысленная-структура) | убираем случайные wrappers |
| [7. Динамический текст](#7-динамический-текст) | готовим макет к CMS и локализации |
| [8. Контент, decor и asset](#8-контент-decor-и-asset) | задаём способ переноса визуала |

## 1. Страница и адаптивы

**Задача:** показать два адаптива одной главной страницы.

❌ Непонятно:

```text
Desktop final
Mobile new
```

✅ Понятно:

```text
Главная [page=home] [route=/] [bp=1440] [view=default]
Главная [page=home] [route=/] [bp=375] [view=default]
```

`page` и `view` совпадают, потому что продуктовая страница и её состояние те же. `bp` отличается, потому что меняется ширина. `route` добавлен, потому что настоящий маршрут известен.

[Полное правило: адаптивы](../docs/ru/03-adaptivy-i-breakpointy.md)

---

## 2. Один элемент на разных ширинах

**Задача:** связать один заголовок и одну CTA между desktop и mobile.

❌ Копии выглядят как разные элементы:

```text
// desktop
title-desktop
blue-button-1440

// mobile
title-mobile
blue-button-375
```

✅ Имена выражают identity, а не внешний вид:

```text
// desktop и mobile
hero-title
primary-cta
```

Шрифт, цвет, размер и положение уже заданы в Figma. Имя нужно, чтобы узнать тот же элемент в другом адаптиве.

[Полное правило: имена и identity](../docs/ru/02-imena-sloev-i-identichnost.md)

---

## 3. Секция страницы

**Задача:** обозначить hero-секцию.

### Вариант A: обычный frame

```text
Первый экран [section=home-hero]
```

Тег нужен: Figma сама не знает продуктовый секционный ключ этого frame.

### Вариант B: instance из библиотеки `Page Sections`

```text
home-hero
```

Тег на instance не нужен: `section=home-hero` выводится из исходного секционного компонента. Кнопка или карточка из обычного `UI Kit` секцией автоматически не становится.

[Полное правило: Page Sections](../docs/ru/14-komponenty-i-ui-kit.md)

---

## 4. Ссылка или действие

**Задача:** описать результат клика.

```text
email-link [href=mailto:sales@example.com]
menu-button [action=state:mobile-menu-open]
Mobile Menu Open [state=mobile-menu-open]
unknown-button [control]
disabled-button [action=none]
```

- переход на URL или anchor — `[href=...]`;
- изменение интерфейса, modal, submit или reset — `[action=...]`;
- назначение ещё неизвестно — временно `[link]` или `[control]`.

Любая цель из `[action=тип:target-id]` должна существовать в handoff-структуре с тем же id. Draft markers `[link]` и `[control]` допустимы во время работы, но остаются TODO перед финальной передачей.

❌ Не используйте `[href=#]` как заглушку. `#faq` — настоящая цель, а просто `#` — нет.

[Полное правило: интерактивность](../docs/ru/05-interaktivnost-i-celi.md)

---

## 5. Кнопка и modal target

**Задача:** показать, какую модалку открывает CTA.

❌ Action ссылается в пустоту:

```text
contact-button [action=modal:contact-modal]
```

✅ В handoff-структуре существует цель с тем же id:

```text
contact-button [action=modal:contact-modal]

Contact Modal [modal=contact-modal]
  modal-content
  close-button
```

Id после `modal:` обязан совпасть со значением `[modal=...]`. Поведение `close-button`, backdrop и Escape должно быть задано в modal-компоненте. Состояния loading, error или success также нельзя оставлять только в устном описании.

[Полное правило: targets](../docs/ru/05-interaktivnost-i-celi.md#modals-и-states)

---

## 6. Осмысленная структура

**Задача:** сгруппировать заголовок, текст и кнопки hero.

❌ Случайные соседи и обёртки:

```text
hero
  Frame 18
    Frame 19
      hero-title
  hero-subtitle
  primary-cta
```

✅ Родители объясняют отношения:

```text
hero
  hero-copy
    hero-title
    hero-subtitle
  hero-actions
    primary-cta
    secondary-cta
```

`hero-copy` и `hero-actions` имеют понятную функцию. Обёртка не нужна, если она не отвечает за группировку, layout, clipping, общий фон, target или другую реальную задачу.

[Полное правило: wrappers](../docs/ru/06-politika-obertok.md)

---

## 7. Динамический текст

**Задача:** подготовить карточку к реальному контенту.

❌ Макет работает только с одной строкой:

```text
product-card (fixed height 280)
  product-title: "Очень удобное\nкресло"
```

✅ Текст переносится сам, высота следует контенту:

```text
product-card (Auto Layout, hug contents)
  product-title: "Очень удобное кресло"
```

Если fixed height и обрезка являются продуктовым решением, задайте явную overflow policy и причину. Иначе локализация или данные из CMS сломают карточку.

[Полное правило: высота и overflow](../docs/ru/07-vysoty-i-overflow.md)

---

## 8. Контент, decor и asset

**Задача:** понять, как переносить три визуальных слоя.

```text
product-photo
glow [decor]
complex-illustration [decor] [asset]
```

- `product-photo` — контентная картинка со стабильной identity;
- `glow [decor]` — оформление без продуктовой или accessibility-семантики;
- `complex-illustration [decor] [asset]` — декор, который нужно экспортировать целиком.

`[decor]` не означает «можно молча удалить на mobile», а `[asset]` не заменяет стабильное имя слоя.

[Полное правило: image, decor и asset](../docs/ru/01-pravila-dizajna.md)

---

## Как пользоваться каталогом

1. Найдите ситуацию, похожую на вашу.
2. Скопируйте структуру хорошего варианта, но не его конкретные id.
3. Проверьте тот же элемент во всех адаптивах и состояниях.
4. Только для спорного случая откройте полное правило по ссылке.
5. Перед передачей пройдите [чеклист дизайнера](../docs/ru/17-cheklist-dlya-dizaynerov.md).
