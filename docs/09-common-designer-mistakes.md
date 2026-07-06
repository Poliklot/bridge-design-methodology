# Common designer mistakes

## 1. Extra wrappers

Problem: wrappers exist only because the design was drawn manually.

Fix: every wrapper needs a role such as `stack`, `row`, `grid`, `clip`, `overlay-scope`, or `semantic-region`.

## 2. Text changes between breakpoints

Problem: desktop says one thing, mobile says another, but both layers use the same key.

Fix: preserve exact responsive content. Model locale, experiment, or product variants outside breakpoint variants.

## 3. Buttons without destination

Problem: a button is visually designed, but nobody knows what happens on click.

Fix: add `[action=...]`.

## 4. Modal buttons without modal frames

Problem: a button opens a modal, but the modal does not exist in the design.

Fix: create a modal target with a matching key.

## 5. Fixed heights everywhere

Problem: cards and text blocks clip real content when transferred.

Fix: prefer hug/content-driven sizing or declare fixed-height reasons and overflow behavior.

## 6. Absolute positioning instead of layout

Problem: related elements are free-floating and impossible to adapt reliably.

Fix: use flow containers for real structure.

## 7. Images instead of editable text

Problem: text is exported as an asset, so it cannot be translated, indexed, edited, or adapted.

Fix: keep text native unless the visual effect truly requires an asset.

## 8. Unstable naming

Problem: the same element is called differently across breakpoints and has different keys.

Fix: keep stable typed identity (`[type=id]`) for logical identity.

## 9. Hidden layers as source of truth

Problem: hidden layers contain alternative states, old copy, or unclear versions.

Fix: move alternatives into declared states, variants, or targets.

## 10. Manual line breaks instead of containers

Problem: headings and copy look correct only because the designer inserted forced line breaks. When the CMS/admin text arrives without those breaks, the layout breaks.

Fix: let text wrap by the container. Use hug/min-height, max-width, and explicit overflow/truncation rules. Use `[bridge-exception=manual-line-break] [reason=...]` only for semantic or approved brand-lockup breaks.
