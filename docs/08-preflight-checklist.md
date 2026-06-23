# Preflight checklist

Use this checklist before a design is transferred.

## Identity

- [ ] Every important element has `[key=...]`.
- [ ] Keys use English kebab-case.
- [ ] There are no duplicate keys inside one breakpoint.
- [ ] The same logical element uses the same key across breakpoints.

## Layout

- [ ] Every layer is either flow, absolute, or a declared target.
- [ ] Related items are not positioned as accidental free siblings.
- [ ] Absolute layers have explicit tags such as `[abs]`, `[decor]`, `[asset]`, or `[overlay]`.
- [ ] Wrappers have an explicit layout role.

## Responsive

- [ ] Every responsive root has `[bp=...]`.
- [ ] Important keys are present across required breakpoints.
- [ ] Text meaning does not silently change between breakpoints.
- [ ] Breakpoint-specific wrappers have a reason.

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
