# Валидация и автопроверки

BRIDGE должен стать удобным потому, что дизайнер может запустить preflight перед передачей и увидеть конкретные исправимые проблемы. Поэтому методология должна описывать не только советы, но и правила, которые можно проверить машинно.

## Слои валидации

1. **Syntax validation** — tags, keys, action syntax, breakpoint tags.
2. **Identity validation** — уникальность identities, стабильность identities, стабильность типов.
3. **Responsive validation** — coverage по breakpoint’ам, content drift, order changes, полнота адаптивов.
4. **Layout validation** — flow/absolute roles, wrappers, clipping, fixed heights, overlaps.
5. **Interaction graph validation** — actions, targets, modals, states, forms.
6. **Content validation** — text equality, strict legal/price content, rich text, localization risk.
7. **Asset validation** — asset intent, native text misuse, export settings, focal points.
8. **Accessibility validation** — contrast risk, touch targets, labels, focusable states.
9. **Adapter capability validation** — unsupported features конкретной целевой среды.

## Уровни автоматизации

- **Automatic** — проверяется детерминированно по extracted design data.
- **Heuristic** — определяется с высокой вероятностью, но может требовать подтверждения дизайнера.
- **Manual** — проверяет человек, но чеклист должен явно подсветить вопрос.

## Severity отчёта

- **error** — блокирует BRIDGE-ready статус.
- **warning** — требует объяснения или исправления перед серьёзным переносом.
- **info** — полезный контекст для implementers и adapters.

## Минимальный pipeline валидатора

```text
extract design tree
  -> normalize names, tags, keys, roles
  -> group frames by section and breakpoint
  -> build identity map and type map
  -> compare content across breakpoints
  -> classify layout roles and wrappers
  -> build action-target graph
  -> inspect geometry, overflow, and fixed heights
  -> check assets and component states
  -> emit report with rule IDs, severity, location, and fix hints
```

## Обзор rule catalog

Machine-readable seed лежит в [`../../validator/rules.json`](../../validator/rules.json).

| Group | Example rule | Severity | Automation |
| --- | --- | --- | --- |
| Identity | `identity.missing-typed-identity` | error | automatic |
| Identity | `identity.same-key-different-type` | error | automatic |
| Responsive | `responsive.identity-missing-in-required-breakpoint` | warning | automatic |
| Content | `content.text-changed-between-breakpoints` | warning | heuristic |
| Layout | `layout.one-child-wrapper-without-role` | warning | heuristic |
| Layout | `layout.overlap-without-overlay-role` | warning | heuristic |
| Interaction | `interaction.clickable-without-action` | error | automatic |
| Interaction | `interaction.modal-target-missing` | error | automatic |
| Height | `height.fixed-height-without-reason` | warning | automatic |
| Overflow | `overflow.text-clipping-risk` | error | heuristic |
| Asset | `asset.raster-text-without-reason` | error | heuristic/manual |
| Accessibility | `accessibility.form-field-missing-label` | warning | automatic |

## Предлагаемый формат отчёта

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

## Режимы чеклиста

### Designer quick check

Перед тем как показывать файл разработке:

- missing identities;
- missing actions;
- очевидный fixed-height text;
- missing modal/state targets;
- changed mobile copy.

### Reviewer strict check

Перед approve handoff:

- полный rule catalog;
- edge-case checklist;
- state coverage;
- accessibility warnings;
- adapter capability notes.

### Adapter certification check

Чтобы доказать, что конкретный путь реализации поддерживает BRIDGE:

- supported tags;
- supported actions;
- unsupported visual features;
- asset fallback behavior;
- responsive mapping rules.

## Что должно сразу блокировать handoff

- Нет typed identity (`[type=id]`) у важного элемента.
- Duplicate identities внутри breakpoint/view scope.
- Одна identity используется для разных logical types.
- Clickable element без `[action=...]`.
- Action target отсутствует.
- Modal без close behavior.
- Text fixed height без overflow policy.
- Hidden keyed layers используются как source of truth.
- Rasterized text без explicit reason.

## False positives допустимы

Валидатор должен предпочитать полезное трение молчаливой поломке. False positives допустимы, если report объясняет, как пометить намеренное исключение:

```text
[bridge-exception=overlap] [reason=decorative-layered-composition]
```

Цель не запретить сложный дизайн. Цель — сделать сложность явной.
