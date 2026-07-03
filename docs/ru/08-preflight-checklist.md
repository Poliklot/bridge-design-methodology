# Preflight-чеклист

Используй этот чеклист перед передачей макета в перенос.

## Gate levels

Используй чеклист в трёх режимах:

- **Quick** — self-check дизайнера перед обсуждением handoff.
- **Strict** — reviewer approval check перед началом переноса.
- **Adapter** — target-specific проверка против возможностей реализации.

Automation markers:

- **Auto** — должно проверяться валидатором.
- **Heuristic** — валидатор может подсветить подозрительный кейс.
- **Manual** — нужно подтверждение человека.

Immediate blockers:

- missing typed identities у важных элементов;
- duplicate identities внутри breakpoint/view scope;
- clickable elements без actions;
- action targets, которых не существует;
- количество элементов или вложенность меняются между адаптивами без явного исключения;
- text fixed height без overflow policy;
- hidden keyed layers как source of truth.

## Identity

- [ ] Каждый важный элемент имеет typed identity tag (`[type=id]`).
- [ ] Identities написаны на английском в kebab-case.
- [ ] Внутри одного breakpoint/view scope нет duplicate identities.
- [ ] Один и тот же логический элемент использует одну identity на всех адаптивах.
- [ ] Один и тот же логический элемент сохраняет одного родителя на всех адаптивах.

## Layout

- [ ] Каждый слой — flow, absolute или declared target.
- [ ] Связанные элементы не разложены случайными free siblings.
- [ ] Absolute layers имеют явные теги: `[abs]`, `[decor]`, `[asset]`, `[overlay]`.
- [ ] Wrapper’ы имеют явную layout role.

## Адаптивы

- [ ] Каждый корневой frame адаптива имеет `[bp=...]`.
- [ ] Важные ключи присутствуют на нужных адаптивах.
- [ ] Адаптивы сохраняют один набор логических элементов и одинаковую структуру списков/коллекций.
- [ ] Скрытые элементы всё равно сохраняют свои ключи и своих родителей на каждом нужном адаптиве.
- [ ] Элементы, которые поменялись местами, остались внутри того же родителя.
- [ ] Смысл текста не меняется скрыто между breakpoint’ами.
- [ ] Обёртки, которые существуют только на одном адаптиве, помечены как исключения и имеют причину.

## Interactions

- [ ] Каждая кнопка имеет `[action=...]`.
- [ ] Каждая ссылка имеет URL, anchor, state или target.
- [ ] Каждый modal action ведёт на существующий modal frame.
- [ ] Каждый state action ведёт на существующий state target.

## Height и overflow

- [ ] Текст не использует fixed height без declared overflow behavior.
- [ ] Карточки не скрывают контент случайно.
- [ ] Fixed height имеет reason.
- [ ] Overflow behavior явно задан для clipped surfaces.

## Assets

- [ ] Редактируемый текст не экспортируется картинкой без причины.
- [ ] Сложные визуалы, которые надо экспортировать, помечены как `[asset]`.
- [ ] Decorative assets помечены как `[decor]`.
