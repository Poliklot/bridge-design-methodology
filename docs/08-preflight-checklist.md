# Preflight checklist

Use this checklist before handing a design off for transfer.

## Gate levels

Use the checklist in three modes:

- **Quick** — designer self-check before handoff discussion.
- **Strict** — reviewer approval check before transfer begins.
- **Adapter** — target-specific check against implementation capabilities.

Automation markers:

- **Auto** — should be checked by a validator.
- **Heuristic** — the validator can flag suspicious cases.
- **Manual** — a human must confirm.

Immediate blockers:

- missing stable identities on important elements;
- missing required BRIDGE tags where Figma does not know the intent;
- duplicate identities inside a breakpoint/view scope;
- clickable elements without actions;
- action targets that do not exist;
- item count or nesting changes between breakpoints without an explicit exception;
- fixed-height text without overflow policy;
- dynamic text relies on manual line breaks;
- hidden keyed layers are used as the source of truth.

## Identity

- [ ] Every important element has a stable identity: either an English kebab-case layer name or a required BRIDGE tag.
- [ ] Stable element names use English kebab-case.
- [ ] There are no duplicate identities inside one breakpoint/view scope.
- [ ] The same logical element uses one identity across all breakpoints.
- [ ] The same logical element keeps the same parent across all breakpoints.
- [ ] Text, content image, and icon types come from Figma, not from manual tags.
- [ ] Section roots use `[section=...]` as a reusable section/component contract, not as the human heading.
- [ ] Section human names do not repeat the role with prefixes such as `Section /`.

## Figma structure

- [ ] Related elements are assembled as meaningful frames/groups/components, not as random free siblings.
- [ ] Auto Layout, constraints, clip content, component source, and positioning are set in Figma, not with manual BRIDGE tags.
- [ ] Layer names do not contain manual tags that duplicate Figma technical properties.
- [ ] Wrappers have a real structural reason.
- [ ] Wrappers that exist only on one breakpoint are modeled as exceptions and have a reason.

## Breakpoints

- [ ] Every responsive root frame has `[bp=...]`.
- [ ] Important keys exist on the required breakpoints.
- [ ] Breakpoints preserve one logical element set and the same list/collection structure.
- [ ] Hidden elements still keep their keys and parents on each required breakpoint.
- [ ] Elements that changed order remain inside the same parent.
- [ ] Text meaning does not silently change between breakpoints.

## Interactions

- [ ] Every button has `[action=...]`.
- [ ] Every link has a URL, anchor, state, or target.
- [ ] Every modal action points to an existing modal frame.
- [ ] Every state action points to an existing state target.

## Height and overflow

- [ ] Text does not use fixed height without declared overflow behavior.
- [ ] Dynamic text does not rely on forced line breaks or `<br>` to look correct.
- [ ] Cards do not accidentally hide content.
- [ ] Fixed height has a reason.
- [ ] Overflow behavior is explicit for clipped surfaces.

## Visual intent

- [ ] Content images have stable layer names.
- [ ] Editable text is not exported as an image without a reason.
- [ ] Complex visuals that must be exported whole are marked as `[asset=...]`.
- [ ] Decorative visuals are marked as `[decor=...]`.
