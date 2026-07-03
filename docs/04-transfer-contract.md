# Transfer contract

A BRIDGE-ready design exposes enough information to transfer intent without guessing.

## Required data

- Breakpoint roots (`[bp=...]`).
- Typed identities (`[type=id]`).
- Layout role: flow, absolute, or target.
- Element type intent: text, button, link, shape, image, asset, decor, modal, section, state.
- Geometry per breakpoint.
- Text metrics per breakpoint.
- Content identity across breakpoints.
- Parent-child topology and sibling order per breakpoint.
- Visibility per breakpoint.
- Interaction/action intent for clickable elements.
- Target existence for links, modals, anchors, and states.
- Asset export intent for complex visuals.
- Height and overflow policy.

## Example payload model

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

The implementation adapter can then create one base tree/layout and patch responsive fields deterministically for its target environment.
