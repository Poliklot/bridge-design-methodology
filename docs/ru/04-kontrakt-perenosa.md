# Контракт переноса

BRIDGE-ready макет раскрывает достаточно информации, чтобы переносить намерение без догадок.

## Обязательные данные

- Корневые фреймы адаптивов (`[bp=...]`).
- Stable identities: имена слоёв или обязательные BRIDGE-теги.
- Структурные свойства, извлечённые из метаданных Figma: иерархия, Auto Layout, constraints, positioning, clipping.
- Тип элемента: из метаданных Figma и BRIDGE-тегов смысла: text, button, link, image, icon, asset, decor, modal, section, state.
- Геометрия по адаптивам.
- Текстовые метрики по адаптивам.
- Идентичность контента между адаптивами.
- Вложенность элементов и порядок соседей по каждому адаптиву.
- Видимость элементов по каждому адаптиву.
- Interaction intent для clickable элементов: известные `href` / `action` или draft `[link]` / `[control]` TODO markers.
- Существование цель’ов для ссылок, модалок, anchors и states.
- Asset export intent для сложных визуалов.
- Height и overflow policy.

## Пример payload model

```json
{
  "methodology": "BRIDGE",
  "breakpoints": [1200, 320],
  "tree": {
    "1200": { "hero": ["hero-title", "contact-cta"] },
    "320": { "hero": ["hero-title", "contact-cta"] }
  },
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

Конкретный адаптер реализации может создать одну базовую структуру и затем детерминированно применить к ней значения для разных адаптивов.
