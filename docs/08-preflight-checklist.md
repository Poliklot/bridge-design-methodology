# Preflight checklist

Use this checklist before a design is transferred.

## Gate levels

Use the checklist in three modes:

- **Quick** — designer self-check before handoff discussion.
- **Strict** — reviewer approval check before transfer starts.
- **Adapter** — target-specific check against implementation capabilities.

Automation markers:

- **Auto** — should be checked by a validator.
- **Heuristic** — validator can flag suspicious cases.
- **Manual** — human confirmation is required.

Immediate blockers:

- missing typed identities for important elements;
- duplicate identities inside a breakpoint/view scope;
- clickable elements without actions;
- action targets that do not exist;
- element count or parent-child topology changes between breakpoint roots without an explicit structural exception;
- text fixed height without overflow policy;
- hidden keyed layers used as source of truth.

## Identity

- [ ] Every important element has a typed identity tag (`[type=id]`).
- [ ] Identities use English kebab-case.
- [ ] There are no duplicate identities inside one breakpoint/view scope.
- [ ] The same logical element uses the same identity across breakpoints.
- [ ] The same logical element keeps the same parent identity across breakpoints.
- [ ] Section roots use `[section=...]` as the reusable section/component contract, not as the human heading.
- [ ] Human section names do not duplicate the role with prefixes such as `Section /`.

## Layout

- [ ] Every layer is either flow, absolute, or a declared target.
- [ ] Related items are not positioned as accidental free siblings.
- [ ] Absolute layers have explicit tags such as `[abs]`, `[decor]`, `[asset]`, or `[overlay]`.
- [ ] Wrappers have an explicit layout role.

## Responsive

- [ ] Every responsive root has `[bp=...]`.
- [ ] Important keys are present across required breakpoints.
- [ ] Breakpoints preserve the same logical element tree and collection cardinality.
- [ ] Hidden elements still keep their identities and parent positions on every required breakpoint.
- [ ] Reordered elements stay inside the same parent.
- [ ] Text meaning does not silently change between breakpoints.
- [ ] Breakpoint-specific wrappers are declared as structural exceptions with a reason.

## Interactions

- [ ] Every button has `[action=...]`.
- [ ] Every link has a URL, anchor, state, or target.
- [ ] Every modal action points to an existing modal frame.
- [ ] Every state action points to an existing state target.

## Height and overflow

- [ ] Text does not use fixed height unless overflow behavior is declared.
- [ ] Cards do not hide content accidentally.
- [ ] Fixed height has a reason.
- [ ] Overflow behavior is explicit for clipped surfaces.

## Assets

- [ ] Editable text is not exported as an image unless intentionally marked.
- [ ] Complex visuals that must be exported are marked as `[asset]`.
- [ ] Decorative assets are marked as `[decor]`.
