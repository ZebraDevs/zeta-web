# AGENTS.md — zeta-web

`@zebra-fed/zeta-web` is the Zebra Design System as Lit web components. Many teams across the company use it, so it must run on **anything that can render HTML**. React 18, React 19 and plain/server-rendered HTML are first-class consumers. Everything else should work because we follow the web platform.

**Guiding principle: the component should behave like a native HTML element.** If a consumer already knows how `<input>`, `<button>` or `<dialog>` behaves, they should be able to predict how ours behaves.

These standards apply to **new and changed code**. Existing APIs that break them stay as they are unless a ticket asks for the change (see [Compatibility](#compatibility)).

## Read these instead of re-deriving them

| Topic | Source of truth |
|---|---|
| Building a new component from Figma (file layout, mixins, tokens, story, Code Connect, tests) | `.claude/skills/new-component/SKILL.md` |
| Changing an existing component, plus the legacy → new token mapping | `.claude/skills/update-component/SKILL.md` |
| Contribution process, commits, PRs, TSDoc tags | `CONTRIBUTING.md` |
| Component creation steps | `documentation/COMPONENT_README.md` |
| Required test structure | `documentation/TESTING_README.md` (enforced by `scripts/enforce-testing-structure.js`) |
| Consumer usage, CLI, React setup | `README.md`, `consumer-skills/use-zeta-react/SKILL.md` |

Do not hand-edit generated files: `src/index.ts` (made by `scripts/make-index.js`), `src/generated/**`, `custom-elements.json`, `dist/jsx.d.ts`. Don't use `yarn create` (`scripts/makeWebComponentTemplate.js`) either; it is stale.

## Commands

```sh
yarn check          # cem analyze + eslint + lit-analyzer + tests + typedoc. Run before calling work done.
yarn test:file src/test/<name>/<name>.test.ts
yarn storybook      # localhost:6006
yarn prettier       # not part of `yarn check`; run it
```

## Standards

### 1. Use the platform: native is mandatory
- If a native element or API does the job, **wrap or use it**. Examples: `<button>`, `<input>`, `<dialog>`, `<a href>`, `<input type="range">`, the Popover API, `ElementInternals`, `:focus-visible`. A custom reimplementation needs a written justification in the PR.
- The browser target is **evergreen, Baseline "newly available"**. Popover, `:state()`, `light-dark()` and CSS nesting are allowed. Anything newer than that needs a fallback.
- Mirror native API names and semantics: `disabled`, `name`, `value`, `required`, `open`, `href`, `type`, `show()`/`close()`. Don't invent `hide()` where native has `close()`. Don't shadow global attributes such as `title` or `id` with different meanings.

### 2. Forms
- Form controls are form-associated: `static formAssociated = true` plus `ElementInternals` through the `FormField` mixin (`src/mixins/form-field.ts`).
- A form control must:
  - submit its value with `setFormValue`;
  - report validity with `internals.setValidity` (if `required` or `error` are exposed, they must affect validity);
  - reset;
  - honour a disabled ancestor `<fieldset>` (`formDisabledCallback`).
- Submit buttons call `form.requestSubmit(this)`, never dispatch a synthetic `SubmitEvent`.
- Remember that a `name` on an `<input>` inside shadow DOM submits nothing. Only `internals.setFormValue` does.

### 3. Events
- **Where a native event fits, use its name and semantics:** `input` (fires continuously, user-initiated), `change` (fires on commit, user-initiated), `toggle`/`beforetoggle`, `close`, `cancel`.
  - Re-dispatched events must match the native flags. For example, a re-dispatched `change` must have `bubbles: true` (and `composed: true` so it crosses shadow roots).
  - **Never fire `input` or `change` for programmatic value changes.** Native elements don't.
- **New custom events use lowercase, native-style names with no hyphens or camelCase**, e.g. `pagechange`, `itemselect`.
  - Always use `bubbles: true, composed: true`.
  - Use `cancelable: true` when the default action can be prevented.
  - Use the factories in `src/events.ts`. Their defaults are `false`, so pass the options explicitly.
- Make sure documented events actually reach the host. An event dispatched on an inner element only escapes the shadow root if it is `composed`.
- Document every event with `@event name - description` in the class TSDoc. Use `@event` rather than `@fires`, to match the rest of the repo. That doc tag is how the event reaches `custom-elements.json` and `jsx.d.ts`.

### 4. Public API must work from markup
React 18 sets only attributes, and server-rendered HTML has nothing else. So:
- Every public option must be settable as an **attribute with a primitive value** (string, number or boolean).
- Use Lit's default **lowercase attribute names** (`leadingIcon` → `leadingicon`), as native `readonly`/`tabindex` do. Don't add `attribute:` overrides for new properties.
- Use `reflect: true` for state that consumers style or query: variants, `disabled`, `open`, `selected`.
- Pass **collections as slotted child elements** (like `<select>`/`<option>`), never as array or object properties. Pass element references as an id-ref attribute (like `for`/`popovertarget`), not as an `HTMLElement` property.
- Use string-literal unions for enums, and add shared flavor subsets in `src/mixins/flavor.ts`.
- Imperative methods are fine as an *addition*, like `showModal()`, but never as the only way to reach a feature.

### 5. Accessibility: WCAG 2.2 AA and WAI-ARIA APG patterns
- Follow the [APG](https://www.w3.org/WAI/ARIA/apg/patterns/) pattern for the widget, including its keyboard model, roles and states.
- Prefer, in order:
  1. native semantics inside shadow DOM;
  2. `ElementInternals` ARIA (`internals.role`, `internals.ariaChecked`);
  3. ARIA attributes.
- There must be **exactly one** focusable, announced element per control. Never put a role on the host *and* also render a native control with the same semantics.
- Use only valid ARIA roles (for example, there is no `role="input"`).
- Use `delegatesFocus: true` for focusable components.
- Every interactive affordance must be a real `<button>` or be keyboard-operable: clear, password toggle, close icons, etc.
- Wire up the error/hint text with `aria-describedby` and `aria-invalid`. Give dialogs an accessible name.
- Put user-facing strings in `msg()` from `@lit/localize`.

### 6. Styling
- **New tokens only.** Tokens live in `src/generated/tokens/tokens.css`; the mapping is in the update-component skill.
  - No hex, rgb or raw px values.
  - Don't add anything to `src/css/tokens-compat.css`.
  - Don't guess token names.
- Theming comes from ancestor attributes (`data-mode`, `data-contrast`, `data-size`, …). Never use `@media (prefers-color-scheme)` in a component.
- Expose a styling API through documented `@cssproperty` hooks (`var(--public, var(--token))`) and `@part` names in kebab-case. Keep private variables as `--_name`.
- Style state with `:host([attr])`. New internal-only states may use `internals.states` / `:host(:state(x))`.
- Write `static styles = [super.styles ?? [], styles]` (parent first). Styles go in a sibling `<name>.styles.js` file as `css```.

### 7. Structure and docs
- Each element lives in its own file, `src/components/<name>/<name>.ts`.
  - Register it with `@customElement("zeta-<name>")`.
  - Name the class `Zeta<Name>`.
  - Add a `declare global { interface HTMLElementTagNameMap }` entry.
- Reuse the mixins in `src/mixins/` (`Interactive`, `FormField`, `Popup`, `Size`, `Flavored`, `Contourable(Three)`). Add a new mixin only when more than one component shares the behaviour.
- Runtime dependencies are `lit`, `@lit/localize`, `@zebra-fed/zeta-icons` and `@fontsource/ibm-plex-sans`. Don't add more.
- The class TSDoc must include `@slot`, `@part`, `@cssproperty`, `@event`, `@figma` and `@storybook`, plus a doc comment on every public property. The manifest, the JSX types and Storybook are all generated from these.
- Mark internals that shouldn't be public API as `private` or `@internal`.

### 8. Tests
- Put tests in `src/test/<name>/<name>.test.ts`.
  - The root `describe("zeta-<name>")` contains only the categories Accessibility, Content, Dimensions, Styling, Interaction.
  - Lint fails on anything else.
- Every component has an Accessibility block that includes the axe checks `await expect(el).to.be.accessible()` and `contrastTest()` (`src/test/accessibility-utils/`).
- Interaction tests cover keyboard, form submit/reset and event flags (`bubbles`/`composed`). Every bug fix adds a regression test.
- Reuse the helpers in `src/test/utils.ts`.

## Compatibility
- This is a public package (release-please, semver). Never remove or rename a public property, attribute, slot, part, CSS property or event, never narrow a union, and never change a default except in a planned major.
- To fix a non-standard API, add the standard one and keep the old one working, marked `@deprecated` with guidance.
- Consumers who use no framework load the prebuilt IIFE bundle (`scripts/export-bundle-and-docs.js`), which includes the fonts and icons. Source code may assume a bundler, so keep anything that bundle needs working.

## Legacy patterns: don't copy
Existing code contains these. Don't spread them, and don't fix them in passing unless asked:
- Legacy tokens: `--main-*`, `--state-*`, `--spacing-*`, `--radius-rounded`. Which components are migrated depends on the branch, so check a component's styles before copying from it.
- `new Event("change")` without `bubbles`, and `change` fired from `updated()` for programmatic changes.
- CamelCase, kebab-case or `zeta-`-prefixed event names (`pageChange`, `item-selected`, `zeta-option-click`).
- Array or object properties (`items`, `initialValues`) and `HTMLElement` properties (`anchor`).
- `role="input"`, roles on the host plus duplicated native controls, and clickable `<zeta-icon>`/`<div>` controls.
- Hard-coded ids on the host, and `id` redeclared and copied into the shadow root.
- JS-positioned dropdowns and `document.body.style.overflow` changes. Use popover or `<dialog>`.
- `@media (prefers-color-scheme)` in components (tooltip, shimmer).
- `[styles, super.styles]` ordering, and `static get styles()`.
- `removeEventListener` with an unbound method reference, which never removes the listener. Use arrow-function fields.

## Git
Use Conventional Commits with a component scope: `feat(button-group): …`, `fix(slider): …`. Squash-merge, and rebase rather than merge. See `CONTRIBUTING.md`.
