# Roadmap проекта

Этот roadmap превращает BRIDGE из набора документов в твёрдую методологию с чеклистами, примерами, схемами и автопроверками.

## Определение твёрдой методологии

BRIDGE становится твёрдым, когда:

- дизайнер понимает, что исправить, не читая всю документацию;
- reviewer может стабильно approve/reject handoff;
- adapters получают один явный contract;
- validator ловит большинство структурных ошибок;
- сложные кейсы решаются named exceptions, а не устными договорённостями.

## Phase 1 — Vocabulary and strict contract

Цель: сделать core concepts однозначными.

Задачи:

- [ ] Описать canonical tag grammar: `[key=...]`, `[bp=...]`, `[action=...]`, `[wrapper-role=...]`, `[height=...]`, `[overflow=...]`, `[bridge-exception=...]`.
- [ ] Описать allowed element types: text, button, link, input, image, icon, asset, decor, modal, state, section, collection.
- [ ] Разделить strict и flexible content classes: legal, price, CTA, marketing copy, decorative text.
- [ ] Описать exception grammar и обязательный `reason`.
- [ ] Добавить formal JSON schema для BRIDGE Contract.

Deliverables:

- `docs/13-tag-grammar.md`
- `schema/bridge-contract.schema.json`
- examples for valid/invalid tags

## Phase 2 — Усиление чеклистов

Цель: сделать preflight практичным для дизайнеров и reviewers.

Задачи:

- [ ] Разделить checklist на quick, strict и adapter-certification modes.
- [ ] Добавить severity labels к пунктам чеклиста.
- [ ] Добавить “how to fix” hints для каждого blocker.
- [ ] Добавить printable one-page checklist.
- [ ] Добавить score model: BRIDGE-ready / needs review / blocked.

Deliverables:

- improved `docs/08-preflight-checklist.md`
- improved `docs/ru/08-preflight-checklist.md`
- `checklists/bridge-preflight.md`

## Phase 3 — Examples and anti-examples

Цель: учить через контраст.

Задачи:

- [ ] Добавить bad/good examples для wrappers, actions, modals, fixed heights, responsive copy, collections, forms и states.
- [ ] Добавить before/after layer trees.
- [ ] Добавить expected validator report для каждого bad example.
- [ ] Добавить минимальные “BRIDGE-ready component” examples.

Deliverables:

- `examples/good/`
- `examples/bad/`
- `examples/reports/`

## Phase 4 — Validator MVP

Цель: сделать методологию проверяемой.

Задачи:

- [ ] Расширить `validator/rules.json` до stable rule catalog.
- [ ] Описать input format для extracted design trees.
- [ ] Собрать CLI, который валидирует JSON exports.
- [ ] Генерировать human-readable Markdown reports.
- [ ] Сделать rule severity configurable.

Deliverables:

- `validator/rules.json`
- `validator/input.schema.json`
- `validator/report.schema.json`
- CLI prototype

## Phase 5 — Figma extraction path

Цель: валидировать реальные Figma files.

Задачи:

- [ ] Описать, какие данные надо извлекать из Figma nodes.
- [ ] Смэппить Figma Auto Layout, constraints, variables, components, variants и hidden layers в BRIDGE concepts.
- [ ] Детектить component overrides.
- [ ] Детектить hidden source-of-truth layers.
- [ ] Генерировать BRIDGE Contract JSON из выбранной page/frame.

Deliverables:

- `extractors/figma/README.md`
- extraction data model
- Figma plugin or script prototype

## Phase 6 — Adapter capability profiles

Цель: предотвратить target-specific surprises, не привязывая BRIDGE к одному target.

Задачи:

- [ ] Описать adapter capability profile format.
- [ ] Дать adapters возможность объявлять supported actions, layout modes, media, effects и fallback behavior.
- [ ] Валидировать design против выбранного adapter profile.
- [ ] Показывать unsupported effects до начала implementation.

Deliverables:

- `adapters/profile.schema.json`
- sample generic HTML/CSS profile
- sample strict no-code profile

## Phase 7 — Contribution and governance

Цель: сделать методологию maintainable.

Задачи:

- [ ] Добавить contribution rules для новых checks и docs.
- [ ] Добавить naming/versioning policy для rules.
- [ ] Добавить changelog.
- [ ] Добавить decision records для спорных правил.

Deliverables:

- `CONTRIBUTING.md`
- `CHANGELOG.md`
- `decisions/`

## Следующий логичный commit после этого roadmap

Реализовать Phase 1 foundations:

```text
docs: define BRIDGE tag grammar and contract schema
```
