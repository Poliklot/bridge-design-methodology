# Политика обёрток

Обёртки допустимы только когда они передают layout intent. Wrapper, который существует просто потому, что так было удобно рисовать, — это шум.

## Валидные роли wrapper’ов

Wrapper валиден, если у него есть одна из ролей:

- `stack` — вертикальная или горизонтальная группировка;
- `row` — горизонтальное распределение;
- `grid` — повторяющийся layout pattern;
- `clip` — ограниченная поверхность или mask scope;
- `overlay-scope` — родитель для absolute overlay children;
- `semantic-region` — смысловая область интерфейса;
- `target-scope` — modal, state, tab, accordion или похожий target;
- `asset-group` — атомарная иллюстрация, которая экспортируется или обрабатывается целиком.

Пример:

```text
cards [container=cards] [layout=grid]
  card [card=card-1]
  card [card=card-2]
```

## Невалидные wrapper’ы

Обычно плохой wrapper выглядит так:

- один child и нет layout role;
- разные wrapper’ы между breakpoint’ами без причины;
- имя вроде `Group 271`, `Frame 53`, `copy 2`;
- wrapper меняет координаты, но не смысл;
- wrapper используется, чтобы спрятать сломанный Auto Layout.

Плохо:

```text
Frame 53 [container=frame-53]
  Group 271 [container=group-271]
    title [text=hero-title]
```

Хорошо:

```text
hero copy [container=hero-copy] [layout=stack]
  title [text=hero-title]
```

## Breakpoint-specific wrappers

Wrapper может меняться между breakpoint’ами только если его роль остаётся объяснимой.

```text
// desktop
button group [container=button-group] [layout=row]

// mobile
button group [container=button-group] [layout=stack]
```

Key остаётся стабильным, потому что логическая группа та же.
