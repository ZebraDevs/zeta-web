---
name: update-component
description: Use when the user wants to update or maintain an existing zeta-web component — adding a prop/variant, fixing a bug, changing styles/behavior, or applying a design change from an updated Figma link — as opposed to building a new component from scratch. Guides making the change consistent with this repo's conventions — keeping the base classes/mixins, TSDoc tags, design-token styling, Storybook story + Docs.mdx, Figma Code Connect mapping, and test structure in sync with the update, without restructuring what doesn't need to change.
---

# Update an existing zeta-web component

`zeta-web` is a Lit web component library (`@zebra-fed/zeta-web`). The goal here is a minimal, consistent change — match the existing file's style and don't restructure what the update doesn't touch. Check `CONTRIBUTING.md` if anything below is ambiguous.

## 0. If a Figma link was given, pull the design context first

Load the `figma-design-to-code` skill and use `get_design_context` (and `get_variable_defs`) on the given node to see exactly what changed — new variant, new token, new state — before touching code. Skip this step if there's no Figma link.

## 1. Find the component and its related files

For a component `foo-bar`, locate all of:

```
src/components/**/foo-bar/foo-bar.ts            # component class
src/components/**/foo-bar/foo-bar.styles.js      # styles
src/stories/components/<Group>/foo-bar.stories.ts  # story
src/stories/components/<Group>/Docs.mdx          # docs page
src/test/**/foo-bar/foo-bar.test.ts              # tests
src/figma/foo-bar.figma.ts                       # Code Connect mapping
```

Read the existing `.ts` and `.styles.js` first — match its current patterns (mixins used, how properties/parts/CSS custom properties are named) rather than introducing a new approach.

## 2. Make the change

- **IMPORTANT**: All changes must be backward compatible - never remove or rename an existing prop, slot, part, event, or CSS custom property, and never narrow an existing type union or change a default value. Add new props/variants alongside the old ones and deprecate in the doc comment (`@deprecated` + guidance) instead of deleting.
- New prop/variant: add an `@property`, give it its own doc comment describing valid values, and extend the type union — don't add a second way of doing something an existing mixin (`Flavored`, `Contourable`, `Size`, etc., in `src/mixins/`) already handles.
- Style/token change: use design tokens (`--color-*`, `--radius-*`, `--spacing-*`), never hardcode a hex/px value. If a new CSS custom property is added for customization, document it with `@cssproperty` and give it a token fallback: `var(--public-name, var(--token-fallback))`.
- Bug fix/behavior change: keep it scoped to the affected component/mixin; don't refactor unrelated code in the same file.
- Doc comments: update the class doc comment's `@slot`/`@cssproperty`/`@part`/`@event` tags (and any individual `@property` doc comment) whenever the change adds to or changes what they describe — stale docs are worse than none. Only touch the `@figma` tag if the Figma link itself changed.
- If the change touches a shared mixin in `src/mixins/`, other components composing that mixin are affected too — check whether their tests/stories still need updating, not just this component's. Also grep for other places in the repo that already use this component (other components' templates, stories) to make sure the change doesn't visually or behaviorally break them.

## 3. Keep everything else in sync

- **Storybook**: update `argTypes`/`args` in `foo-bar.stories.ts` for any new or deprecated prop. Update the matching `Docs.mdx` `<ArgTypes>`/`<Description>` section if present.
- **Figma Code Connect** (`foo-bar.figma.ts`): update the `props` mapping if a variant/enum changed, and the `example` template if the rendered markup changed.
- **Tests** (`foo-bar.test.ts`): root `describe` stays `"zeta-foo-bar"`; nested `describe`s must be one of exactly `Accessibility`, `Content`, `Dimensions`, `Styling`, `Interaction`, `Golden`, `Performance` (enforced by `scripts/enforce-testing-structure.js`) — don't invent a new category, and add tests to the existing nested `describe` for that category rather than creating a duplicate. Pick the category by what changed: new/changed markup or slotted content → `Content`; new CSS custom property, token, or visual variant → `Styling`; new size/layout behavior → `Dimensions`; new interactive/keyboard/hover/press state → `Interaction`. If the change affects rendered contrast (new flavor/background pairing), add/update a `contrastTest` case in `Accessibility`.
  - Bug fix: add a regression test that fails without the fix, alongside updating whatever test previously asserted the buggy behavior.
  - Deprecating a prop: keep its existing tests passing and add a test for the new replacement prop/variant.
  - Run the full existing test file (not just new tests) to catch regressions the change may have introduced elsewhere in the component.
- Don't touch `src/index.ts` by hand — it's auto-generated (`node scripts/make-index.js` / `yarn build`).

## 4. Verify before calling it done

```
yarn analyze           # regenerate custom-elements.json if TSDoc tags/props changed
yarn lint               # eslint, incl. testing-structure and doc-tag rules
yarn lint:lit-analyzer
yarn test               # web-test-runner
```

Or just run `yarn check`, which does all of the above plus `yarn docs`.
