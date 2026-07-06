# Validation and autochecks

BRIDGE should become comfortable because a designer can run a preflight check before handoff and see concrete, fixable problems. The methodology must therefore define not only advice, but also machine-checkable rules.

## Validation layers

1. **Syntax validation** — tags, keys, action syntax, breakpoint tags.
2. **Identity validation** — identity uniqueness, identity stability, type stability.
3. **Responsive validation** — identity coverage, tree topology/cardinality, parent-child stability, visibility changes, content drift, order changes, breakpoint completeness.
4. **Layout validation** — flow/absolute roles, wrappers, clipping, fixed heights, overlaps.
5. **Interaction graph validation** — actions, targets, modals, states, forms.
6. **Content validation** — text equality, strict legal/price content, rich text, localization risk.
7. **Asset validation** — asset intent, native text misuse, export settings, focal points.
8. **Accessibility validation** — contrast risk, touch targets, labels, focusable states.
9. **Adapter capability validation** — target-specific unsupported features.

## Automation levels

- **Automatic** — can be checked deterministically from extracted design data.
- **Heuristic** — can be detected with confidence, but may need designer confirmation.
- **Manual** — must be checked by a human, but the checklist should make it explicit.

## Report severity

- **error** — blocks BRIDGE-ready status.
- **warning** — requires explanation or fix before serious transfer.
- **info** — useful context for implementers and adapters.

## Minimum validator pipeline

```text
extract design tree
  -> normalize names, tags, keys, roles
  -> group frames by section and breakpoint
  -> build identity map and type map
  -> compare responsive tree cardinality and parent identities
  -> compare visibility and sibling order inside each parent
  -> compare content across breakpoints
  -> classify layout roles and wrappers
  -> build action-target graph
  -> inspect geometry, overflow, and fixed heights
  -> check assets and component states
  -> emit report with rule IDs, severity, location, and fix hints
```

## Rule catalog overview

The machine-readable seed lives in [`../validator/rules.json`](../validator/rules.json).

| Group | Example rule | Severity | Automation |
| --- | --- | --- | --- |
| Identity | `identity.missing-typed-identity` | error | automatic |
| Identity | `identity.same-key-different-type` | error | automatic |
| Responsive | `responsive.identity-missing-in-required-breakpoint` | warning | automatic |
| Responsive | `responsive.tree-cardinality-changed` | error | automatic |
| Responsive | `responsive.parent-changed-across-breakpoints` | error | automatic |
| Content | `content.text-changed-between-breakpoints` | warning | heuristic |
| Content | `content.manual-line-break-in-dynamic-text` | error | heuristic |
| Layout | `layout.one-child-wrapper-without-role` | warning | heuristic |
| Layout | `layout.overlap-without-overlay-role` | warning | heuristic |
| Interaction | `interaction.clickable-without-action` | error | automatic |
| Interaction | `interaction.modal-target-missing` | error | automatic |
| Height | `height.fixed-height-without-reason` | warning | automatic |
| Overflow | `overflow.text-clipping-risk` | error | heuristic |
| Asset | `asset.raster-text-without-reason` | error | heuristic/manual |
| Accessibility | `accessibility.form-field-missing-label` | warning | automatic |

## Suggested report format

```json
{
  "methodology": "BRIDGE",
  "status": "not-ready",
  "summary": {
    "errors": 3,
    "warnings": 8,
    "info": 4
  },
  "issues": [
    {
      "ruleId": "interaction.modal-target-missing",
      "severity": "error",
      "nodeId": "contact-cta",
      "breakpoint": 320,
      "message": "Button references modal `contact-modal`, but no modal target exists.",
      "fix": "Create `[modal=contact-modal]` or change the action."
    }
  ]
}
```

## Checklist modes

### Designer quick check

Use before showing the file to engineering:

- missing identities;
- missing actions;
- obvious fixed-height text;
- missing modal/state targets;
- changed mobile copy.

### Reviewer strict check

Use before approving a handoff:

- full rule catalog;
- edge-case checklist;
- state coverage;
- accessibility warnings;
- adapter capability notes.

### Adapter certification check

Use to prove that a target implementation path supports BRIDGE:

- supported tags;
- supported actions;
- unsupported visual features;
- asset fallback behavior;
- responsive mapping rules.

## What should block handoff immediately

- Missing typed identity (`[type=id]`) on important elements.
- Duplicate identities inside a breakpoint/view scope.
- Same identity used for different logical types.
- Responsive element tree cardinality or parent-child topology changes without a structural exception.
- Clickable element without `[action=...]`.
- Action target missing.
- Modal without close behavior.
- Text fixed height with no overflow policy.
- Dynamic text that relies on manual line breaks.
- Hidden keyed layers used as source of truth.
- Rasterized text without explicit reason.

## False positives are acceptable

A validator should prefer useful friction over silent failure. False positives are acceptable if the report explains how to mark an intentional exception:

```text
[bridge-exception=overlap] [reason=decorative-layered-composition]
```

The goal is not to forbid complex design. The goal is to make complexity explicit.
