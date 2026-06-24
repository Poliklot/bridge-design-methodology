# Контракт переноса

BRIDGE-ready макет раскрывает достаточно информации, чтобы переносить намерение без догадок.

## Обязательные данные

- Root frames breakpoint’ов (`[bp=...]`).
- Typed identities (`[type=id]`).
- Layout role: flow, absolute или target.
- Тип элемента: text, button, link, shape, image, asset, decor, modal, section, state.
- Геометрия по breakpoint’ам.
- Текстовые метрики по breakpoint’ам.
- Идентичность контента между breakpoint’ами.
- Interaction/action intent для clickable элементов.
- Существование target’ов для ссылок, модалок, anchors и states.
- Asset export intent для сложных визуалов.
- Height и overflow policy.

## Пример payload model

```json
{
  "methodology": "BRIDGE",
  "breakpoints": [1200, 320],
  "elements": [
    {
      "id": "hero-title",
      "type": "text",
      "content": {
        "text": "Launch your store in one day",
        "sameAcrossBreakpoints": true
      },
      "layout": {
        "mode": "flow"
      },
      "fields": {
        "1200": { "left": 72, "top": 128, "width": 612, "fontSize": 58 },
        "320": { "left": 20, "top": 88, "width": 280, "fontSize": 34 }
      }
    },
    {
      "id": "contact-cta",
      "type": "button",
      "content": {
        "text": "Contact us"
      },
      "interaction": {
        "type": "modal",
        "targetKey": "contact-modal"
      }
    }
  ],
  "targets": [
    {
      "id": "contact-modal",
      "type": "modal"
    }
  ]
}
```

Конкретный adapter реализации может создать базовый layout и затем детерминированно применить responsive fields для своей целевой среды.
