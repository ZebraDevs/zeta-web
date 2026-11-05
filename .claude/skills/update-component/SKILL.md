---
name: update-component
description: Use when the user wants to update or maintain an existing zeta-web component — adding a prop/variant, fixing a bug, changing styles/behavior, migrating it to the new Zebra Design System tokens, or applying a design change from an updated Figma link — as opposed to building a new component from scratch. Guides making the change consistent with this repo's conventions — keeping the base classes/mixins, TSDoc tags, design-token styling, Storybook story + Docs.mdx, Figma Code Connect mapping, and test structure in sync with the update, without restructuring what doesn't need to change.
---

# Update an existing zeta-web component

`zeta-web` is a Lit web component library. The goal is a minimal, consistent change — match the existing file's style and don't restructure what the update doesn't touch. Check `CONTRIBUTING.md` if anything below is ambiguous.

## The repo is mid-migration

Components are being moved one at a time from the legacy Zeta tokens to the new **Zebra Design System** tokens (work branches off `feat/zebra-design-system`; already migrated: icon, divider, avatar, button/icon-button/tile-button/fab, badges, checkbox/radio/switch, progress, chips). A component still using legacy tokens is *not yet migrated* — don't migrate it as a side effect of an unrelated change, unless asked.

| Legacy (avoid in new/changed CSS) | New (use these) |
|---|---|
| `--main-*`, `--surface-default/hover/selected/disabled` | `--foreground-*`, `--surface-*`, `--interactive-<palette>-<background\|foreground\|border>-<state>` |
| `--state-<flavor>-enabled/hover/selected` | `--interactive-{primary,secondary,positive,destructive,neutral,ghost,inverse,selection}-…-{default,hover,focused,pressed,selected,disabled}` |
| `--border-primary`, `--border-primary-main` | `--border-focus`, `--border-default`, `--border-strong`, `--border-{info,success,warning,error}` |
| `--spacing-*` | `--space-{none,3xs,2xs,xs,sm,md,lg,xl,2xl,3xl,…}` (there is no `--space-xxs`) |
| `--radius-minimal/rounded/full` | `--radius-{none,sm,element-sm,md,pill}` |
| `--border-size-small/medium` | `--stroke-thin` / `--stroke-thick` |
| hardcoded font shorthands | typography tokens, e.g. `--label-medium`, `--indicator-medium` |

Status colors use `--feedback-{info,success,warning,error}-background-{strong,subtle}`. Component-scoped tokens (e.g. `--control-icon-*`, `--switch-track-*`, `--assist-chip-*`, `--chart-series-*`) exist too. Look up real names in `src/generated/tokens/tokens.css` — never guess a token name, never hand-edit `src/generated/`, and never add to `src/css/tokens-compat.css` (it's only a legacy alias layer so consumers' old tokens keep working).

## 0. If a Figma link was given, pull the design context first

Load the `figma-design-to-code` skill and use `get_design_context` (and `get_variable_defs`) on the node to see exactly what changed — new variant, new token, new state — before touching code. New designs live in the **The Zebra Design System** file (`hvRmnZZOZrmTW0wf8hbrt5`). Skip if there's no Figma link.

## 1. Find the component and its related files

For a component `foo-bar`, locate all of:

```
src/components/**/foo-bar/foo-bar.ts               # component class
src/components/**/foo-bar/foo-bar.styles.js        # styles
src/stories/components/<Group>/foo-bar.stories.ts  # story
src/stories/components/<Group>/Docs.mdx            # docs page
src/test/**/foo-bar/foo-bar.test.ts                # tests
src/figma/foo-bar.figma.ts                         # Code Connect mapping (only some components have one)
```

Read the existing `.ts` and `.styles.js` first — match its current patterns (mixins, how properties/parts/CSS custom properties are named) rather than introducing a new approach.

## 2. Make the change

- **IMPORTANT**: Backward compatible only — never remove or rename an existing prop, slot, part, event, or public CSS custom property, never narrow a type union or change a default. Add new props/variants alongside the old ones and deprecate in the doc comment (`@deprecated` + guidance) instead of deleting.
- **New prop/variant**: add an `@property` with its own doc comment listing valid values (and `@defaultValue` where useful), and extend the type union. Don't add a second way of doing something an existing mixin in `src/mixins/` handles (`Flavored`, `Contourable`, `ContourableThree`, `Size`, `Interactive`, `FormField`, …).
- **Flavors**: types live in `src/mixins/flavor.ts`. Per-component flavor subsets are exported from there (`ButtonFlavor`, `FabFlavor`, `TileButtonFlavor`, …) — add/extend one there rather than declaring a local union in the component.
- **Styles**: use new tokens (table above), never a hardcoded hex/px. For variant-driven styling, follow the private-variable pattern used in migrated components: set `--_foo-*` vars on `:host` / `:host([variant=…])`, consume them once in the element rules (see `base-chip.styles.js`, `label.styles.js`). If you add a public customization point, document it with `@cssproperty` and give it a token fallback: `var(--foo-bar-x, var(--token))`.
- **Bug fix/behavior change**: keep it scoped to the affected component/mixin; don't refactor unrelated code.
- **Shared behavior across a family** goes in that family's base class (e.g. `chips/base-chips/draggable-chip.ts` extending `BaseChip`), not copy-pasted into each member.
- **Accessibility**: when a state is visual-only (active, pressed, orientation), expose it to AT too (`aria-pressed`, `role`/`aria-orientation`, `progressbar` aria, etc.).
- **Doc comments**: update the class `@slot`/`@cssproperty`/`@part`/`@event`/`@attr` tags and any `@property` comment whenever the change affects what they describe. Update `@figma` only if the design link changed (migrations usually move it to the new Zebra Design System file).
- If the change touches a shared mixin, base class, or `src/css/styles.css`, every component using it is affected — check their tests/stories too, and grep for other components/stories that render this one.

## 3. Keep everything else in sync

- **Storybook**: update `args`/`argTypes` in `foo-bar.stories.ts` for new or deprecated props. Keep `parameters.design.url` pointing at the current Figma node. Update the matching `Docs.mdx` section if present (`<Description of="zeta-foo-bar" />`, `<Canvas of={…} />`, `<ArgTypes of="zeta-foo-bar" />`).
- **Figma Code Connect** (`src/figma/foo-bar.figma.ts`, if it exists): update the `props` mapping if a variant/enum changed, and the `example` if markup changed.
- **Tests** (`foo-bar.test.ts`):
  - Root `describe` stays `"zeta-foo-bar"`; nested `describe`s must be exactly one of `Accessibility`, `Content`, `Dimensions`, `Styling`, `Interaction`, `Golden`, `Performance` (enforced by `scripts/enforce-testing-structure.js`). Add to the existing block, don't duplicate one.
  - Category: markup/slotted content → `Content`; token/visual variant → `Styling`; size/layout → `Dimensions`; hover/press/keyboard/drag → `Interaction`; aria/roles/contrast → `Accessibility`.
  - Import styles with `import "../../index.css";` (path depth varies) — not the legacy `generated/tokens/primitives.css` / `semantics.css`.
  - Assert against tokens, not literals: `getCssVarColorValue(el, "--interactive-neutral-background-default")` for colors and `getCssVarPxValue(el, "--space-md")` for lengths (both in `src/test/utils.ts`). Call `disableShadowDOMTransitions(subject)` before asserting colors after a state change.
  - Contrast: `contrastTest` (`src/test/accessibility-utils/accessibility-test-runner.js`) runs light/dark × normal/high-contrast via `data-mode`/`data-contrast`. Add a case for any new flavor/background pairing.
  - Bug fix: add a regression test that fails without the fix. Deprecation: keep old tests passing and add one for the replacement.
  - Run the whole test file, not just new tests.
- Don't touch `src/index.ts` by hand — it's auto-generated (`node scripts/make-index.js` / `yarn build`).

## 4. Verify before calling it done

```
yarn analyze            # regenerate custom-elements.json if TSDoc tags/props changed
yarn lint               # eslint, incl. testing-structure and doc-tag rules
yarn lint:lit-analyzer
yarn test               # web-test-runner
```

Or just run `yarn check`, which does all of the above plus `yarn docs`.
