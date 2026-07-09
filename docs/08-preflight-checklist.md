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
- breakpoint-specific optional identity values such as `[control=button-reviews-box-375]`;
- final clickable elements without known `[href=...]` or `[action=...]`;
- action targets that do not exist;
- item count or nesting changes between breakpoints without an explicit exception;
- stable decorative/asset identities missing on a required breakpoint;
- fixed-height text without overflow policy;
- dynamic text relies on manual line breaks;
- hidden keyed layers are used as the source of truth.

## Identity

- [ ] Every important element has a stable identity: either an English kebab-case layer name or a required BRIDGE tag.
- [ ] Stable element names use English kebab-case.
- [ ] Optional BRIDGE identity values do not contain breakpoint names or widths; remove suffixes such as `-768`, `-375`, `-mobile`, or `-desktop`.
- [ ] There are no duplicate identities inside one breakpoint/view scope.
- [ ] The same logical element uses one identity across all breakpoints.
- [ ] The same logical element keeps the same parent across all breakpoints.
- [ ] `[decor]` and `[asset]` are treated as visual-intent/policy flags, not as extra identities.
- [ ] Text, content image, and icon types come from Figma, not from manual tags.
- [ ] Section components live on the `Page Sections` library page, and ordinary interface components live in `UI Kit`.
- [ ] Instances of components from `Page Sections` do not duplicate `[section=...]` on the page.
- [ ] Regular frame sections and ambiguous components use explicit `[section=...]`.
- [ ] Section human names do not repeat the role with prefixes such as `Section /`.

## Figma structure

- [ ] Related elements are assembled as meaningful frames/groups/components, not as random free siblings.
- [ ] Auto Layout, constraints, clip content, component source, and positioning are set in Figma, not with manual BRIDGE tags.
- [ ] Layer names do not contain manual tags that duplicate Figma technical properties.
- [ ] Wrappers have a real structural reason.
- [ ] Wrappers that exist only on one breakpoint are modeled as exceptions and have a reason.

## Breakpoints

- [ ] Every responsive root frame has `[bp=...]`.
- [ ] Breakpoint width/name is declared only on the root, not repeated in child ids.
- [ ] Important keys exist on the required breakpoints.
- [ ] Breakpoints preserve one logical element set and the same list/collection structure.
- [ ] Hidden elements still keep their keys and parents on each required breakpoint.
- [ ] Elements that changed order remain inside the same parent.
- [ ] Text meaning does not silently change between breakpoints.
- [ ] Decorative/asset root identities do not disappear between breakpoints.
- [ ] Visual-intent flags do not drift: `sneg [decor] [asset]` does not become plain `sneg` on another breakpoint.

## Interactions

- [ ] Known navigation links use `[href=...]` without requiring `[link=...]`.
- [ ] Unknown draft links use `[link]`, not `[href=#]`.
- [ ] Known buttons/controls use `[action=...]` without requiring `[control=...]`.
- [ ] Unknown draft controls use `[control]`.
- [ ] Optional `[link=...]` / `[control=...]` ids are used only when a stable machine id is actually needed, and their values are kebab-case without breakpoint suffixes.
- [ ] Final handoff has no unresolved `[link]` or `[control]` TODOs unless the project explicitly accepts draft status.
- [ ] Every modal action points to an existing modal frame.
- [ ] Every state action points to an existing state target.

## Routing

- [ ] Page roots have stable `[page=...]`, `[bp=...]`, and `[view=...]`.
- [ ] `[route=...]` / `[route-pattern=...]` are present only when the real production route is known.
- [ ] Page roots without route are tracked as Draft TODOs, not fixed with fake production paths.
- [ ] When route is present, it is a production URL/path and stays stable across breakpoints/views of the same page.

## Height and overflow

- [ ] Text does not use fixed height without declared overflow behavior.
- [ ] Dynamic text does not rely on forced line breaks or `<br>` to look correct.
- [ ] Cards do not accidentally hide content.
- [ ] Fixed height has a reason.
- [ ] Overflow behavior is explicit for clipped surfaces.

## Visual intent

- [ ] Content images have stable layer names.
- [ ] Editable text is not exported as an image without a reason.
- [ ] Complex visuals that must be exported whole are marked as `[asset]`.
- [ ] Decorative visuals are marked as `[decor]`.
- [ ] `[decor]` layers are excluded from accessibility/content semantics and may be `aria-hidden`.
- [ ] Text inside `[decor]` or root `[asset]` visuals is not checked as product content drift, while the root identity is still checked responsively.
- [ ] Value forms such as `[decor=snow-bg]` or `[asset=promo-poster]` are used only as fallback for poor/default layer names, and the value is English kebab-case.
