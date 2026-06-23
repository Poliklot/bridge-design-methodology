# Transfer contract

A BRIDGE-ready design exposes enough information to transfer intent without guessing.

## Required data

- Breakpoint roots (`[bp=...]`).
- Stable keys (`[key=...]`).
- Layout role: flow, absolute, or target.
- Element type intent: text, button, link, shape, image, asset, decor, modal, section, state.
- Geometry per breakpoint.
- Text metrics per breakpoint.
- Content identity across breakpoints.
- Interaction/action intent for clickable elements.
- Target existence for links, modals, anchors, and states.
- Asset export intent for complex visuals.
- Height and overflow policy.

## Example payload model

```json
{
  "methodology": "BRIDGE",
  "breakpoints": [1200, 320],
  "elements": [
    {
      "key": "hero-title",
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
      "key": "contact-cta",
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
      "key": "contact-modal",
      "type": "modal"
    }
  ]
}
```

The implementation adapter can then create a base layout and patch responsive fields deterministically for its target environment.
