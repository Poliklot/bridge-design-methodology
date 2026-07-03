# Сложные кейсы и edge cases

BRIDGE становится полезным только тогда, когда покрывает некрасивую реальность, а не только идеальные hero-блоки. Этот документ собирает страшные, странные и сложные ситуации, которые должны формировать чеклист, автопроверки, примеры и будущие адаптеры.

## Модель серьёзности

- **Blocker** — макет не BRIDGE-ready. Для переноса придётся угадывать.
- **Warning** — перенести можно, но результат рискованный или зависит от целевой среды.
- **Manual review** — автоматика видит подозрительный паттерн, но человек должен подтвердить intent.

## 1. Кошмары идентичности

| Ситуация | Почему опасно | Ответ BRIDGE | Автопроверка |
| --- | --- | --- | --- |
| Один логический элемент имеет разные identities на адаптивах | Адаптер создаст дубликаты вместо одного responsive-элемента. | Один стабильный typed identity (`[type=id]`). | Сравнение breakpoint groups. |
| Одна identity указывает на разные типы элементов | Кнопка становится текстом, картинка — карточкой и т.д. | Identity должна сохранять logical type, если это не отдельная entity. | Сравнение type по key. |
| Повторяющиеся карточки используют одну identity | Нельзя отличить instances. | Индексированные keys: `card-1`, `card-2`. | Duplicate identity check. |
| Overrides компонента скрывают изменённый контент | Source component говорит одно, instance override — другое. | Resolved instance content считается источником правды, overrides попадают в отчёт. | Component metadata extraction. |
| Hidden layer является источником правды | Перенос может взять старую копию или неправильное состояние. | Hidden alternatives должны быть states, variants или archive. | Hidden keyed layers. |

## 2. Кошмары адаптивов

| Ситуация | Почему опасно | Ответ BRIDGE | Автопроверка |
| --- | --- | --- | --- |
| Mobile copy меняет продуктовый смысл | Пользователь видит разные обещания на разных устройствах. | Responsive breakpoints должны сохранять точный content; locale/experiment/product variants моделируются отдельно. | Text diff по identity. |
| Количество элементов меняется между breakpoint’ами | Адаптер не понимает: элемент удалён, скрыт, продублирован или стал variant-specific. | Сохранять logical cardinality или моделировать отличие как collection rule, state, variant или structural exception. | Identity cardinality diff. |
| Identity переезжает к другому parent’у на одном breakpoint’е | DOM/component topology, state ownership, ARIA-связи и analytics могут сломаться. | Сохранять parent-child topology; использовать shared wrappers или объявлять structural exception. | Сравнение parent identity по key. |
| Критичный элемент исчезает на mobile | CTA, legal note, price или error state потерян. | Явно помечать intentional exclusions или сохранять key на обязательных breakpoint’ах. | Identity coverage check. |
| Desktop grid превращается в mobile carousel | Поведение, states и controls становятся другими. | `responsive-behavior=carousel` + controls. | Key + role change heuristic. |
| Порядок элементов меняется без причины | DOM/order и accessibility могут сломаться. | Объявить order strategy или сохранить semantic order. | Сравнение sibling order по key. |
| Нет правил между breakpoint’ами | Макет работает только на точных ширинах. | Сначала breakpoint roots, потом min/max/fluid strategy. | Проверка declared breakpoint set. |
| Safe areas и device chrome игнорируются | Mobile UI конфликтует с notch, browser bars, sticky nav. | Объявить safe-area и sticky/fixed behavior. | Manual/adapter check. |

## 3. Кошмары layout и геометрии

| Ситуация | Почему опасно | Ответ BRIDGE | Автопроверка |
| --- | --- | --- | --- |
| Связанные элементы лежат free-floating siblings | Responsive перенос не поймёт grouping. | Flow containers с явными ролями. | Geometry clustering heuristic. |
| Wrapper maze | Дерево глубокое, но бессмысленное. | Каждый wrapper имеет `[wrapper-role=...]`. | One-child/deep wrappers. |
| Fixed height клипает реальный контент | Локализация/CMS ломает layout. | Hug/min-height или explicit overflow policy. | Fixed-height text/card checks. |
| Absolute ведёт себя как layout content | Он не будет reflow. | Перенести в flow или объяснить absolute reason. | Absolute-without-tag. |
| Overlap случайный | Z-order отличается между target environments. | `[overlay]`, `[abs]` или collision reason. | Bounding-box overlap heuristic. |
| Parent случайно clips child | Декор, tooltip, focus ring или текст обрезаются. | Explicit overflow policy. | Clip + child overflow check. |
| Negative spacing или конфликтующие constraints | Intent нельзя воспроизвести детерминированно. | Tokens/gaps или declared exception. | Geometry + layout metadata. |
| Sticky/fixed элемент перекрывает контент | Header, cookie bar, nav или sidebar закрывает секции. | Fixed behavior + reserved space. | Manual/adapter check. |

## 4. Контент и динамические данные

| Ситуация | Почему опасно | Ответ BRIDGE | Автопроверка |
| --- | --- | --- | --- |
| Количество CMS items меняется | Дизайн на 3 карточки ломается на 2 или 7. | Collection rules: min/max/empty/loading. | Collection metadata check. |
| Локализация расширяет текст | Длинный русский/немецкий текст вылезает. | Hug/min-height и text expansion tolerance. | Text box risk heuristic. |
| Price/legal меняются между breakpoint’ами | Ломается compliance и продуктовая правда. | Price/legal keys — strict content. | Strict content diff. |
| Rich text flatten’ится | Ссылки, bold, lists и line breaks исчезают. | Rich-text structure. | Text node metadata check. |
| Нет empty/error/loading states | Реальный продуктовый блок не реализовать. | Required states для dynamic blocks. | State coverage check. |

## 5. Кошмары интерактивности

| Ситуация | Почему опасно | Ответ BRIDGE | Автопроверка |
| --- | --- | --- | --- |
| Button без action | Никто не знает, что происходит по клику. | Каждый clickable element имеет `[action=...]`. | Clickable-without-action. |
| Modal target отсутствует | Нельзя построить flow. | `action=modal:x` требует `[modal=x]`. | Interaction graph check. |
| Modal без close behavior | Пользователь может застрять. | Close control, backdrop behavior, escape behavior. | Modal structure check. |
| Form fields без labels | Accessibility и backend mapping ломаются. | Labels, names, validation, submit target. | Form field checks. |
| Tabs/accordion/carousel имеют одно состояние | Поведение невозможно воспроизвести. | Все states и active/default state. | State group check. |
| External link непонятен | Security/UX решения скрыты. | URL и new-tab policy при необходимости. | Action syntax check. |
| Нет hover/focus/disabled/loading | UI существует только в default state. | Required control states зависят от role. | Component state coverage. |

## 6. Assets и media

| Ситуация | Почему опасно | Ответ BRIDGE | Автопроверка |
| --- | --- | --- | --- |
| Текст растеризован картинкой | Его нельзя перевести, проиндексировать или отредактировать. | Native text или asset reason. | Image-with-text heuristic/manual. |
| У картинки нет focal point | Responsive crop режет лица/продукт. | Focal point или crop strategy. | Asset metadata check. |
| SVG/icon — случайная картинка | Theme/tokens нельзя применить. | Icon role и theming policy. | Asset type check. |
| Video/Lottie без fallback | Целевая среда может не поддержать. | Poster, fallback, autoplay, controls. | Media metadata check. |
| Blend modes/filters не поддерживаются | Визуал меняется при переносе. | BRIDGE Exception или flattened asset. | Adapter capability check. |

## 7. Design system и themes

| Ситуация | Почему опасно | Ответ BRIDGE | Автопроверка |
| --- | --- | --- | --- |
| Цвета и spacing одноразовые | Реализация расходится с системой. | Tokens first; exceptions помечаются. | Token coverage check. |
| Dark mode частичный | Элементы пропадают или конфликтуют. | Theme coverage. | Theme coverage check. |
| Component variants отсутствуют | Button/card states придумываются позже. | Required variants and states. | Component variant check. |
| Touch targets слишком маленькие | Mobile usability ломается. | Minimum touch sizes. | Geometry check. |
| Contrast рискованный | Accessibility fails. | Contrast threshold или manual review для images. | Contrast check. |

## 8. Странные, но реальные кейсы

- Скрытый старый mobile frame случайно называется как финальный.
- Одна modal переиспользуется тремя кнопками, но внутри section-specific copy.
- Sticky header перекрывает anchor target после scroll.
- Cookie banner, chat widget или promo bar меняет viewport height.
- Дизайнер нарисовал validation errors, но не нарисовал default form state.
- У carousel есть arrows, но нет slide definitions.
- Важный контент существует только в animation.
- Layer визуально является кнопкой, но называется `Rectangle 44` и не имеет action.
- Desktop использует карточки, mobile использует скриншоты этих карточек.
- Desktop и mobile используют разные валюты, цены или legal disclaimers.

## Определение крепкого BRIDGE-макета

Крепкий BRIDGE-макет не обязан быть без исключений. Он крепкий потому, что каждое исключение названо, объяснено и проверяемо.
