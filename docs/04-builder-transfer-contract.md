# Builder transfer contract

A design prepared for AI/builder transfer should expose this contract:

## Required data

- Breakpoint roots (`[bp=...]`).
- Stable keys (`[key=...]`).
- Layout intent: flex or absolute.
- Element type intent: text, button, shape, image, asset, decor.
- Geometry per breakpoint.
- Text metrics per breakpoint.
- Asset export intent for complex visuals.

## Example payload model

```json
{
  "breakpoints": [1200, 320],
  "elements": [
    {
      "key": "title",
      "fields": {
        "1200": { "left": 72, "top": 128, "width": 612, "fontsize": 58 },
        "320": { "left": 20, "top": 88, "width": 280, "fontsize": 34 }
      }
    }
  ]
}
```

The builder adapter can then create the desktop/base layout and patch responsive fields deterministically.
