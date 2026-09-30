---
name: use-zeta-react
description: Use before building any React component or page. Check whether it is, or can be composed from, zeta-web components, and teaches how to import, render, and handle events from zeta-web's web components in React.
usage: "Requires a prompt describing what to build. Example: /use-zeta-react Build a search form with filters"
---

# Using Zeta-Web Components in React

Zeta-web is a Lit-based web component library. Its components act like regular HTML elements: use them the way you would use `<input>`, `<button>` or `<select>`.

## Before You Code

Before building any React component, check whether it could be a zeta component, or be composed from several. Only build custom UI when zeta has nothing suitable.

Discover components with the CLI. It reads the installed package, so it is always current:

```bash
npx zeta-web components          # list every component
npx zeta-web components button   # import path, attributes, events, slots, CSS parts, form-associated?
```

Run the second command before using a component. It prints the exact import path and the component's API; don't guess attribute or event names.

## Importing & Rendering

```tsx
// Element definition
import "@zebra-fed/zeta-web/components/button/button.js";

// TypeScript type (separate import)
import type { ZetaButton } from "@zebra-fed/zeta-web/components/button/button.js";

<zeta-button>Click me</zeta-button>
<zeta-text-input placeholder="Enter text" required />
```

Always import the `.js` file. Elements use kebab-case tag names. Props are HTML attributes, and boolean props omit the value.

## Slots

Use the `slot` attribute for named slots. Content without a `slot` attribute goes to the default (unnamed) slot:
```tsx
<zeta-global-header name="User">
  <span slot="logo">Logo Here</span>
  <zeta-avatar slot="user-avatar">AB</zeta-avatar>
  <span>Default slot content</span>
</zeta-global-header>
```

The default slot is not identical to React `children`. Check the component's `slots` in the manifest and test the rendered result.

## Events

Built-in events such as `input` and `change` can be handled two ways:
```tsx
<zeta-search oninput={(e) => setValue((e.target as ZetaSearch).value)} />  // native/Lit event
<zeta-search onInput={(e) => setValue((e.target as ZetaSearch).value)} />  // React event, React-friendly types
```
Both work. Prefer `onInput` where it works, since it gives types React is happy with. This is confirmed for form fields; test it on other components.

Cast `event.target` to the component type to read its properties. Some components expose values on `event.detail` instead; check the component's `events` in the manifest.

## Refs

Use refs only for imperative operations (e.g. `showModal()`, `updateComplete`). Prefer attributes for declarative control.
```tsx
const dialogRef = useRef<HTMLDialogElement>(null);

useEffect(() => {
  if (isOpen) dialogRef.current?.showModal();
  else dialogRef.current?.close();
}, [isOpen]);

<dialog ref={dialogRef}>Content</dialog>
```

To wait for a Lit render (e.g. dropdown positioning): `ref.current?.updateComplete.then(() => { ... })`.

## Styling

Zeta components are pre-styled with design tokens; no CSS imports are needed. Style your own markup with whatever your app already uses.

Use semantic tokens (intent-based, theme-aware) for colors, spacing, radius, elevation and typography. Don't use primitive tokens (e.g. `--color-blue-60`, `--spacing-4`) or hex codes. Look up exact names and values instead of guessing:

```bash
npx zeta-web tokens            # every semantic token with its value (colors show light/dark)
npx zeta-web tokens spacing    # filter by substring, e.g. spacing, radius, surface, elevation, title
```

To tweak a single component, `npx zeta-web components <name>` also lists its CSS parts (`::part(...)`) and CSS custom properties.

## Icons

Icon props (`leadingIcon`, `trailingIcon`, `<zeta-icon>`) only accept known names. Search instead of guessing:

```bash
npx zeta-web icons settings    # filter by substring; omit the filter to list all
```

## Forms

Zeta form fields are designed as drop-in replacements for native HTML form fields. Use them as such: `name`, `value`, `required`, `disabled`, a wrapping `<form>`, `onSubmit` and `FormData` all work as they would with native fields.

```tsx
const [value, setValue] = useState("");

<zeta-text-input
  name="email"
  value={value}
  onInput={(e) => setValue((e.target as ZetaTextInput).value)}
/>
```

### Larger forms
For complex or multi-step forms, use React Hook Form with zod for validation, and wrap zeta fields in small field components:
```tsx
const schema = z.object({ email: z.string().email() });

const TextField = ({ name }: { name: string }) => {
  const { control, setValue } = useFormContext();
  const value = useWatch({ control, name });

  return (
    <zeta-text-input
      name={name}
      value={value ?? ""}
      onInput={(e) => setValue(name, (e.target as ZetaTextInput).value)}
    />
  );
};
```
For simple forms, manage state directly.

## Gotchas

| Problem | Solution |
|---------|----------|
| Event type mismatch | Cast `event.target` to the component type: `as ZetaSearch` |
| Value is stale or partial | `input` fires on every change, `change` on commit (blur/enter). Pick the one you need |
| Ref is always null | Ensure the element mounts; check conditional rendering |
| Component not showing | Check the import path: the `.js` definition must be imported |
| Styling doesn't apply | Check selector specificity if using global CSS |

## When Components Don't Fit

1. **Request a feature (recommended):** contact the Front End Development team or open a GitHub issue. This improves the library for every team and avoids duplicate components.
2. **Local adapter:** if you can't wait, wrap the zeta component in your own repo. It stays local, but keep zeta's import, event and ref patterns.

```tsx
export const MyCustomSelect = ({ options, onSelectionChange, ...props }: MyCustomSelectProps) => (
  <zeta-select-input {...props} onInput={(e) => onSelectionChange?.((e.target as ZetaSelectInput).value)}>
    {options.map((opt) => (
      <zeta-option key={opt.value} value={opt.value}>{opt.label}</zeta-option>
    ))}
  </zeta-select-input>
);
```

## Assets & Import Paths

```tsx
import emptyBoxUrl from "@zebra-fed/zeta-web/assets/illustrations/zdna/emptyBox.svg?url";
```

- **Components**: `@zebra-fed/zeta-web/components/<name>/<name>.js`
- **Assets**: `@zebra-fed/zeta-web/assets/*`
- **Types**: `@zebra-fed/zeta-web` (barrel) or component-specific imports
- **JSX types**: `@zebra-fed/zeta-web/jsx.d.ts` (auto-included in tsconfig)
