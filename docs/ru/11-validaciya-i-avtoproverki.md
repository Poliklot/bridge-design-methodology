# Валидация и автопроверки

BRIDGE должен стать удобным потому, что дизайнер может запустить preflight перед передачей и увидеть конкретные исправимые проблемы. Поэтому методология должна описывать не только советы, но и правила, которые можно проверить машинно.

## Слои валидации

1. **Синтаксис validation** — tags, keys, action syntax, breakpoint tags.
2. **Identity validation** — уникальность identities, стабильность identities, стабильность типов.
3. **Проверка адаптивов** — покрытие по breakpoint’ам, одинаковое количество элементов, стабильная вложенность, изменения видимости, изменения текста, изменения порядка, полнота адаптивов.
4. **Structure validation** — структура Figma, wrappers, clipping, positioning intent, fixed heights, overlaps.
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
  -> normalize names, tags, keys, and метаданные Figma
  -> group frames by section and breakpoint
  -> build identity map and type map
  -> compare element counts and parent identities across breakpoints
  -> compare visibility and sibling order inside each parent
  -> compare content across breakpoints
  -> classify structure, wrappers, and positioning intent
  -> build action-цель graph
  -> inspect geometry, overflow, and fixed heights
  -> check assets and component states
  -> emit report with rule IDs, severity, location, and fix hints
```

## Обзор rule catalog

Machine-readable seed лежит в [`../../validator/rules.json`](../../validator/rules.json).

| Group | Example rule | Severity | Automation |
| --- | --- | --- | --- |
| Identity | `identity.missing-stable-identity` | error | automatic |
| Identity | `identity.same-identity-different-type` | error | automatic |
| Section | `section.component-source-unclassified` | warning | heuristic |
| Section | `section.redundant-instance-section-tag` | warning | heuristic |
| Component | `component.ui-kit-used-as-section` | warning | heuristic |
| Responsive | `responsive.identity-missing-in-required-breakpoint` | warning | automatic |
| Responsive | `responsive.tree-cardinality-changed` | error | automatic |
| Responsive | `responsive.parent-changed-across-breakpoints` | error | automatic |
| Content | `content.text-changed-between-breakpoints` | warning | heuristic |
| Content | `content.manual-line-break-in-dynamic-text` | error | heuristic |
| Structure | `layout.one-child-wrapper-without-role` | warning | heuristic |
| Structure | `layout.overlap-without-overlay-role` | warning | heuristic |
| Interaction | `interaction.clickable-without-action` | error | automatic |
| Interaction | `interaction.modal-цель-missing` | error | automatic |
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
      "ruleId": "interaction.modal-цель-missing",
      "severity": "error",
      "nodeId": "contact-cta",
      "breakpoint": 320,
      "message": "Button references modal `contact-modal`, but no modal цель exists.",
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

- Нет stable identity у важного элемента.
- Duplicate identities внутри breakpoint/view scope.
- Одна identity используется для разных logical types.
- В адаптивах меняется количество элементов или их вложенность без явного исключения.
- Clickable element без `[action=...]`.
- Action цель отсутствует.
- Modal без close behavior.
- Text fixed height без overflow policy.
- Динамический текст зависит от ручных переносов строк.
- Hidden keyed layers используются как источник правды.
- Rasterized text без explicit reason.

## False positives допустимы

Валидатор должен предпочитать полезное трение молчаливой поломке. False positives допустимы, если report объясняет, как пометить намеренное исключение:

```text
[bridge-exception=overlap] [reason=decorative-layered-composition]
```

Цель не запретить сложный дизайн. Цель — сделать сложность явной.
