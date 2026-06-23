# Интерактивность и цели

Clickable elements не должны быть загадкой. Кнопка или ссылка без назначения не готова к переносу.

## Синтаксис action

Рекомендуемые action tags:

```text
[action=link:/pricing]
[action=link:https://example.com]
[action=scroll:#faq]
[action=modal:contact-modal]
[action=state:menu-open]
[action=submit:lead-form]
[action=none]
```

Используй `[action=none]` только для намеренно disabled или purely visual controls.

## Кнопки

Каждая кнопка должна иметь action:

```text
primary [button] [key=primary-cta] [action=link:/pricing]
```

Плохо:

```text
button [key=primary-cta]
```

## Ссылки

Каждая ссылка должна иметь URL или target:

```text
terms [link] [key=terms-link] [action=link:/terms]
faq [link] [key=faq-link] [action=scroll:#faq]
```

## Модалки

Modal action должен указывать на существующий modal target:

```text
contact [button] [key=contact-cta] [action=modal:contact-modal]

Modal Contact [modal] [key=contact-modal]
```

Если modal frame не существует, дизайн не завершён.

## Состояния

Controls, которые меняют состояние, должны называть это состояние:

```text
menu button [button] [key=menu-button] [action=state:mobile-menu-open]
Mobile Menu [state] [key=mobile-menu-open]
```
