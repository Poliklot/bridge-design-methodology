# Project roadmap

This roadmap turns BRIDGE from documentation into a solid methodology with checklists, examples, schemas, and automated validation.

## Definition of solid

BRIDGE is solid when:

- designers can understand what to fix without reading every document;
- reviewers can approve or reject a handoff consistently;
- adapters can consume one explicit contract;
- a validator can catch the majority of structural mistakes;
- complex cases are handled by named exceptions, not tribal knowledge.

## Phase 1 — Vocabulary and strict contract

Goal: make all core concepts unambiguous.

Tasks:

- [ ] Define canonical tag grammar: typed identity tags (`[type=id]`), `[bp=...]`, `[href=...]`, `[action=...]`, `[layout=...]`, `[height=...]`, `[overflow=...]`, `[bridge-exception=...]`.
- [ ] Define allowed element types: text, button, link, input, image, icon, asset, decor, modal, state, section, collection.
- [ ] Define strict vs flexible content classes: legal, price, CTA, marketing copy, decorative text.
- [ ] Define exception grammar and required `reason` field.
- [ ] Add a formal JSON schema for the BRIDGE Contract.

Deliverables:

- `docs/13-tag-grammar.md`
- `schema/bridge-contract.schema.json`
- examples for valid/invalid tags

## Phase 2 — Checklist hardening

Goal: make preflight practical for designers and reviewers.

Tasks:

- [ ] Split checklist into quick, strict, and adapter-certification modes.
- [ ] Add severity labels to checklist items.
- [ ] Add “how to fix” hints for every blocker.
- [ ] Add a printable one-page checklist.
- [ ] Add a score model: BRIDGE-ready / needs review / blocked.

Deliverables:

- improved `docs/08-preflight-checklist.md`
- improved `docs/ru/08-preflight-checklist.md`
- `checklists/bridge-preflight.md`

## Phase 3 — Examples and anti-examples

Goal: teach by contrast.

Tasks:

- [ ] Add bad/good examples for wrappers, actions, modals, fixed heights, responsive copy, collections, forms, and states.
- [ ] Add before/after layer trees.
- [ ] Add expected validator report for each bad example.
- [ ] Add minimal “BRIDGE-ready component” examples.

Deliverables:

- `examples/good/`
- `examples/bad/`
- `examples/reports/`

## Phase 4 — Validator MVP

Goal: make the methodology checkable.

Tasks:

- [ ] Expand `validator/rules.json` into a stable rule catalog.
- [ ] Define input format for extracted design trees.
- [ ] Build a CLI that validates JSON exports.
- [ ] Generate human-readable Markdown reports.
- [ ] Make rule severity configurable.

Deliverables:

- `validator/rules.json`
- `validator/input.schema.json`
- `validator/report.schema.json`
- CLI prototype

## Phase 5 — Figma extraction path

Goal: validate real Figma files.

Tasks:

- [ ] Define what data must be extracted from Figma nodes.
- [ ] Map Figma Auto Layout, constraints, variables, components, variants, and hidden layers into BRIDGE concepts.
- [ ] Detect component overrides.
- [ ] Detect hidden source-of-truth layers.
- [ ] Produce BRIDGE Contract JSON from a selected page/frame.

Deliverables:

- `extractors/figma/README.md`
- extraction data model
- Figma plugin or script prototype

## Phase 6 — Adapter capability profiles

Goal: prevent target-specific surprises without tying BRIDGE to one target.

Tasks:

- [ ] Define adapter capability profile format.
- [ ] Let adapters declare supported actions, layout modes, media, effects, and fallback behavior.
- [ ] Validate designs against a selected adapter profile.
- [ ] Report unsupported effects before implementation starts.

Deliverables:

- `adapters/profile.schema.json`
- sample generic HTML/CSS profile
- sample strict no-code profile

## Phase 7 — Contribution and governance

Goal: make the methodology maintainable.

Tasks:

- [ ] Add contribution rules for new checks and docs.
- [ ] Add naming/versioning policy for rules.
- [ ] Add changelog.
- [ ] Add decision records for controversial rules.

Deliverables:

- `CONTRIBUTING.md`
- `CHANGELOG.md`
- `decisions/`

## Suggested next commit after this roadmap

Implement Phase 1 foundations:

```text
docs: define BRIDGE tag grammar and contract schema
```
