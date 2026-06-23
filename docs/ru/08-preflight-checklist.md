# Preflight-чеклист

Используй этот чеклист перед передачей макета в перенос.

## Identity

- [ ] Каждый важный элемент имеет `[key=...]`.
- [ ] Keys написаны на английском в kebab-case.
- [ ] Внутри одного breakpoint’а нет duplicate keys.
- [ ] Один и тот же логический элемент использует один key на всех breakpoint’ах.

## Layout

- [ ] Каждый слой — flow, absolute или declared target.
- [ ] Связанные элементы не разложены случайными free siblings.
- [ ] Absolute layers имеют явные теги: `[abs]`, `[decor]`, `[asset]`, `[overlay]`.
- [ ] Wrapper’ы имеют явную layout role.

## Responsive

- [ ] Каждый responsive root имеет `[bp=...]`.
- [ ] Важные keys присутствуют на нужных breakpoint’ах.
- [ ] Смысл текста не меняется скрыто между breakpoint’ами.
- [ ] Breakpoint-specific wrappers имеют причину.

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
