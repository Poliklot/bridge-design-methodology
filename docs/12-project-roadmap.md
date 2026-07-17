# Status and roadmap

**Updated 17 July 2026.** BRIDGE is already a public methodology, bilingual site, rule catalog, and working Figma plugin. It is also still pre-1.0: the transfer data contract is evolving, and the plugin does not automate the full catalog. This page separates shipped capability from planned work.

## Current releases

| Product | Release | What it represents |
| --- | --- | --- |
| BRIDGE methodology and site | [v0.8.0](https://github.com/Poliklot/bridge-design-methodology/releases/tag/v0.8.0) | Bilingual documentation, examples, checklists, an interactive Figma-like layer demo, and the canonical catalog of 77 rules. |
| BRIDGE Assistant for Figma | [v0.7.0](https://github.com/Poliklot/bridge-figma-assistant/releases/tag/v0.7.0) | Tagging, target connection, file navigation, and local Page Check inside Figma. |
| Published plugin | [Figma plugin BRIDGE](https://www.figma.com/community/plugin/1654485530503673254/bridge) | The installable public build of BRIDGE Assistant. |

The methodology and plugin source are MIT-licensed. Releases before 1.0 may refine the contract, rule wording, and machine-readable formats; changes must be read from the relevant release notes.

## Available now

### A learnable handoff method

- English and Russian documentation with the same core structure.
- A five-step [designer quick start](00-designer-quick-start.md), examples, focused guides, and preflight checklists.
- Explicit rules for identity, responsive variants, interactions, targets, routing, content, wrappers, assets, and intentional exceptions.
- A practical [one-file team pilot](19-team-adoption.md) that measures the handoff before wider adoption.

### An open contract and catalog

- A documented [tag grammar](13-tag-grammar.md) and [transfer contract](04-transfer-contract.md).
- A machine-readable [catalog of 77 rules](../validator/rules.json), each with an identifier, severity, automation level, explanation, and fix.
- Rule browsing on the site plus short and full review paths for designers and reviewers.

### A working Figma product

BRIDGE Assistant 0.7.0 can:

- apply and edit common BRIDGE tags without manually composing syntax;
- connect controls with modal, state, form, reset, route, and anchor targets;
- show a file map and jump directly to the relevant layer;
- run Page Check on a selected or inferable BRIDGE page;
- return findings with rule identifiers and direct layer navigation;
- work without a BRIDGE account, backend, payments, or network requests.

## Known limitations

These limits are part of the current product definition, not hidden future work.

### Page Check covers 24 of 77 rules

Plugin version 0.7.0 implements 24 catalog rule identifiers: 23 automatic checks and one heuristic check. The exact list is published in the [Page Check coverage file](../validator/page-check-coverage.json).

The other catalog rules still guide manual review or future automation. A clean Page Check report therefore means “no finding in the implemented subset,” not “all 77 rules passed.”

### The check is deliberately page-scoped

Page Check inspects the selected or inferable top-level BRIDGE page and its related breakpoint roots. It does not scan every unrelated exploration in the Figma file. Cross-page route and action resolution is currently reported as deferred where the page-local evidence is insufficient.

### The transfer data contract is a draft

The current contract document defines required information and shows an example payload. It is not yet a versioned, compatibility-guaranteed JSON schema. Teams may use it to align implementation, but should not treat the example shape as a stable 1.0 integration API.

### There is no universal adapter yet

BRIDGE makes design intent inspectable; it does not promise one-click production code for every target. Target capability profiles, extraction formats, and automated adapters are still future work.

## Before 1.0

The priority is to make today’s method dependable rather than add disconnected features.

1. **Stabilize and version the data contract.** Publish a formal schema, compatibility policy, fixtures, and migration notes for incompatible changes.
2. **Make automation scope impossible to misunderstand.** Keep the catalog-to-plugin coverage file tested and visible in the site and plugin release process.
3. **Expand high-confidence checks.** Add deterministic rules where Figma exposes enough evidence; keep contextual product decisions manual or heuristic.
4. **Harden real-team adoption.** Run representative pilots, publish before/after handoff cases, and turn recurring questions into focused fixes and examples.
5. **Define adapter capability profiles.** Let a target declare supported actions, layout modes, media, effects, and fallback behavior without changing universal BRIDGE rules.
6. **Establish change governance.** Maintain a changelog, decision records, rule-versioning policy, and synchronized English/Russian releases.

The 1.0 threshold is not “all 77 rules automated.” It is a stable, versioned contract; honest validation coverage; reproducible handoff; and a documented change process.

## After 1.0

- Add extraction and validation interfaces for external tools and command-line workflows.
- Publish reference adapter profiles and conformance fixtures for different implementation targets.
- Broaden automatic and heuristic checks only where results stay explainable and actionable.
- Support contract migrations across compatible methodology versions.
- Grow examples from verified production patterns and community proposals.

Dates for these items will be set only when scope and maintainers are known. Until then, release notes are the source of truth for what actually shipped.

## Follow progress

- [BRIDGE methodology releases](https://github.com/Poliklot/bridge-design-methodology/releases)
- [BRIDGE Assistant releases](https://github.com/Poliklot/bridge-figma-assistant/releases)
- [Methodology source and issues](https://github.com/Poliklot/bridge-design-methodology)
- [Plugin source and issues](https://github.com/Poliklot/bridge-figma-assistant)
