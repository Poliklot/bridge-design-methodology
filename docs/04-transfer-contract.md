# BRIDGE data contract (draft)

> **Status: pre-1.0 draft.** This page describes an illustrative payload, not a production API. BRIDGE does not yet publish a stable JSON Schema or promise payload compatibility. Fields may change before 1.0.

A BRIDGE-ready design exposes enough information to transfer intent without guessing. The tags and rule catalog are usable today; this document shows how a future adapter could package the same evidence.

Current references: [project status and roadmap](12-project-roadmap.md) · [raw rule catalog](../validator/rules.json)

## Required information

- Breakpoint roots (`[bp=...]`).
- Stable BRIDGE identities: meaningful layer names and required tags.
- Source identity and location: the Figma node ID, file/page context, and layer path.
- Structural properties from Figma: hierarchy, Auto Layout, constraints, positioning, and clipping.
- Element intent: text, button, link, shape, image, asset, decor, modal, section, or state.
- Geometry, text metrics, sibling order, and visibility at each breakpoint.
- Content identity across breakpoints.
- Interaction intent: known `href` / `action`, or draft `[link]` / `[control]` markers.
- Existing targets for links, modals, anchors, and states.
- Asset export intent, height policy, overflow policy, and explicit exceptions.

## Illustrative payload

The version values identify the example; they do not establish a compatibility contract.

```json
{
  "contractVersion": "0.1-draft",
  "methodologyVersion": "0.8.0",
  "rulesVersion": "0.2.1",
  "source": {
    "tool": "figma",
    "fileKey": "example-file-key",
    "pageName": "Home"
  },
  "breakpoints": [1200, 320],
  "tree": {
    "1200": { "hero": ["hero-title", "contact-cta"] },
    "320": { "hero": ["hero-title", "contact-cta"] }
  },
  "elements": [
    {
      "bridgeIdentity": "hero-title",
      "sourceLocation": {
        "figmaNodeId": "401:72",
        "layerPath": ["Home / 1200", "Hero", "hero-title"]
      },
      "type": "text",
      "content": {
        "text": "Launch your store in one day",
        "sameAcrossBreakpoints": true
      },
      "layout": { "mode": "flow" },
      "fields": {
        "1200": { "left": 72, "top": 128, "width": 612, "fontSize": 58 },
        "320": { "left": 20, "top": 88, "width": 280, "fontSize": 34 }
      }
    },
    {
      "bridgeIdentity": "contact-cta",
      "sourceLocation": {
        "figmaNodeId": "401:94",
        "layerPath": ["Home / 1200", "Hero", "contact-cta"]
      },
      "type": "button",
      "content": { "text": "Contact us" },
      "interaction": {
        "type": "modal",
        "targetBridgeIdentity": "contact-modal"
      }
    }
  ],
  "targets": [
    {
      "bridgeIdentity": "contact-modal",
      "sourceLocation": {
        "figmaNodeId": "408:11",
        "layerPath": ["Home", "Modals", "contact-modal"]
      },
      "type": "modal"
    }
  ]
}
```

## Where the fields come from

| Field | Expected source |
| --- | --- |
| `contractVersion` | The adapter that emits the experimental payload |
| `methodologyVersion` | The BRIDGE release used to prepare the file |
| `rulesVersion` | The version declared by the [rule catalog](../validator/rules.json) |
| `bridgeIdentity` | Meaningful layer names and BRIDGE tags |
| `sourceLocation` | Figma node metadata plus file, page, and layer context |
| Structure and responsive fields | Figma hierarchy, layout metadata, and breakpoint frames |
| Content, interaction, and targets | Layer content, prototype data, and explicit BRIDGE intent |

## Status and compatibility

| Layer | Status | Compatibility today |
| --- | --- | --- |
| BRIDGE tags and rule catalog | Usable now | Pin the methodology and rules versions; pre-1.0 changes remain possible |
| Payload model on this page | Experimental | Illustrative only; fields may change without a migration path |
| Stable JSON Schema and compatibility policy | Planned before 1.0 | Not available yet |

An implementation adapter may eventually use a payload like this to create one base tree and apply responsive differences deterministically. Until a schema is published, integrations should read the current catalog directly and treat any serialized payload as adapter-specific.
