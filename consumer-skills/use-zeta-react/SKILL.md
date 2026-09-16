---
name: use-zeta-react
description: Use when the user wants to build a React component or page that uses zeta-web components. Teaches how to properly import, wrap, and handle events from zeta-web's web components in a React application.
usage: "Requires a prompt describing what to build. Example: /use-zeta-react Build a search form with filters"
---

# Using Zeta-Web Components in React

## Quick Reference

Zeta-web is a LIT-based web component library. Use components as lowercase HTML elements with attributes, refs for instance access, and custom events with proper typing.

### Before You Code: Discover Available Components

**→ Run [`/use-zeta-react-discovery`](../use-zeta-react-discovery/SKILL.md)** to see:
- All 79+ available components with properties, events, and slots
- All design tokens (colors, spacing, radius, elevation, typography)
- Exact metadata from `custom-elements.json`

This keeps your implementation up-to-date as the library grows. **Always check what exists before building custom components.**

## Importing & Basic Usage

### Component Imports
```tsx
// For component usage (element definition)
import "@zebra-fed/zeta-web/components/button/button.js";

// For TypeScript types
import type { ZetaButton } from "@zebra-fed/zeta-web/components/button/button.js";
```

**Rule**: Always import the `.js` file. Import the type separately for TypeScript.

### Element Rendering
```tsx
// Components use lowercase, kebab-case HTML element names
<zeta-button>Click me</zeta-button>
<zeta-text-input placeholder="Enter text" />
<zeta-search type="text" />
```

## Props, Attributes & Slots

### Passing Props
Web component props are HTML attributes (kebab-case). Boolean props omit the value:
```tsx
<zeta-button disabled>Disabled</zeta-button>
<zeta-text-input required value="prefilled" />
<zeta-icon rounded>check_mark</zeta-icon>
```

### Named Slots
Use `slot` attribute to project content into named slots:
```tsx
<zeta-global-header platformName="" name="User">
  <span slot="logo">Logo Here</span>
  <zeta-avatar slot="user-avatar">AB</zeta-avatar>
</zeta-global-header>
```

## Event Handling

### Listening to Events
Use camelCase event handler attributes. Custom events type as `CustomEvent<T>`:
```tsx
const handleInput = (event: CustomEvent<InputEvent>): void => {
  const value = (event.target as ZetaSearch).value;
  setSearchValue(value);
};

<zeta-search oninput={handleInput} />
```

### Common Events
- `oninput` — Fires when user changes input (not committed)
- `onchange` — Fires when value is committed (blur, enter)
- Custom events from components follow the same pattern

**Type Pattern**: Cast `event.target` to the component type to access properties:
```tsx
const inputValue = (event.target as ZetaSearch).value;
```

**Event Value Access**: Some components expose values on `event.detail` instead of `event.target`. Use the safe fallback pattern:
```tsx
const handleChange = (e: any) => {
  const value = e?.target?.value ?? e?.detail?.value;
  setValue(value);
};
```

## Refs & Component Methods

### Accessing Component Instances
Use `useRef` to call methods or access properties on components:
```tsx
const triggerRef = useRef<ZetaGlobalHeader | null>(null);

const handleClick = () => {
  triggerRef.current?.someMethod?.();
};

return <zeta-global-header ref={triggerRef} />;
```

**Note**: Only use refs for imperative operations (e.g., calling `.show()` on dialogs). Prefer attribute-based APIs for declarative control.

## CSS & Styling

### No Extra Setup Needed
Zeta components work out-of-the-box in React. They're pre-styled with design tokens. No CSS imports required unless:
- You need custom styling (use CSS modules, inline styles, or Tailwind as normal)
- You want to override design tokens

### Using Semantic Tokens for Consistency
**Always use semantic tokens** in your consuming application to maintain design system consistency. Semantic tokens map to intent (primary action, success state, warning, error) and automatically adapt to theme changes.

**Semantic tokens (use these):**
```css
/* Intent-based, theme-aware */
--main-primary          /* Primary actions */
--main-positive         /* Success, valid, confirmed */
--main-negative         /* Errors, destructive actions */
--main-warning          /* Warnings, pending states */
--surface-default       /* Default backgrounds */
--surface-light         /* Light/elevated backgrounds */
--border-default        /* Standard borders */
--color-cool-90         /* Text color (dark) */
--color-cool-10         /* Text color (light) */
```

**Primitive tokens (avoid in application code):**
```css
/* Never hardcode these—they don't adapt to themes */
--color-blue-60         /* Use --main-primary instead */
--color-red-60          /* Use --main-negative instead */
--color-green-60        /* Use --main-positive instead */
#0073e6                 /* Never use hex codes in app code */
```

**Example: Consistent styling across app:**
```tsx
// ✅ CORRECT: Uses semantic tokens
const styles = {
  successMessage: `
    background: var(--main-positive);
    color: var(--color-cool-10);
    padding: var(--spacing-4);
    border-radius: var(--radius-m);
  `,
  errorBanner: `
    background: var(--main-negative);
    border: 1px solid var(--main-negative);
    padding: var(--spacing-6);
  `,
  card: `
    background: var(--surface-default);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-l);
    box-shadow: var(--elevation-1);
  `,
};

// ❌ WRONG: Hardcoded colors, won't adapt to themes
const badStyles = {
  successMessage: `
    background: #00864f;  /* Breaks in dark mode */
    color: #1d1e23;
  `,
  errorBanner: `
    background: #d70015;  /* Not theme-aware */
    border: 1px solid red;
  `,
};
```

### Styling Components
```tsx
<zeta-button className={styles.primaryButton}>Button</zeta-button>
<zeta-text-input style={{ width: "100%" }} />
```

### Design Token Categories

| Category | Purpose | Examples |
|----------|---------|----------|
| **Colors** | Intent-based, theme-aware | `--main-primary`, `--main-positive`, `--surface-default`, `--border-default` |
| **Spacing** | Consistent whitespace | `--spacing-2` (8px) through `--spacing-15` (96px) |
| **Radius** | Border radius (shapes) | `--radius-s` (4px), `--radius-m` (8px), `--radius-xl` (24px) |
| **Elevation** | Shadows/depth | `--elevation-1` through `--elevation-6` |
| **Typography** | Font sizes/weights | `--title-large`, `--headline-medium`, `--body-small` |

**Rule**: Use semantic tokens for colors, spacing, and radius. Always use tokens—never hardcode values.

## Common Patterns

### Form Integration
```tsx
const [value, setValue] = useState("");

const handleChange = (event: CustomEvent<InputEvent>): void => {
  setValue((event.target as ZetaTextInput).value);
};

return <zeta-text-input value={value} onchange={handleChange} />;
```

### Conditional Rendering with Refs
```tsx
const dialogRef = useRef<HTMLDialogElement>(null);

useEffect(() => {
  if (isOpen) {
    dialogRef.current?.showModal?.();
  } else {
    dialogRef.current?.close?.();
  }
}, [isOpen]);

return <dialog ref={dialogRef}>Content</dialog>;
```

### TypeScript Types
```tsx
import type { ZetaButton, ZetaTextInput } from "@zebra-fed/zeta-web";

interface MyComponentProps {
  buttonType?: InstanceType<typeof ZetaButton>["flavor"];
}
```

## Gotchas & Solutions

| Problem | Solution |
|---------|----------|
| Event type mismatch | Cast `event.target` to component type: `as ZetaSearch` |
| Properties not updating | Use `onchange` (committed) instead of `oninput` for final values |
| Ref is always null | Ensure ref element actually mounts; check conditional rendering |
| Component not showing | Web component definition is loaded but element not in DOM; check the import path |
| Styling doesn't apply | Inline styles or CSS modules work; check selector specificity if using global CSS |

## Advanced Patterns (Optional)

### Form Abstraction Layer
For large forms, wrap zeta components in custom atoms that integrate with React Hook Form:
```tsx
// Custom form field component
const TextField = ({ name, rules }: FieldProps) => {
  const { control, setValue } = useFormContext();
  const value = useWatch({ control, name });
  
  return (
    <zeta-text-input
      value={value ?? ""}
      oninput={(e: any) => setValue(name, e?.target?.value ?? e?.detail?.value)}
    />
  );
};
```

This pattern is optional—use it for complex multi-step forms. For simple cases, manage state directly.

### Async Rendering with updateComplete
For dropdown positioning or other async needs, wait for Lit's render completion:
```tsx
const dropdownRef = useRef<any>(null);

useEffect(() => {
  dropdownRef.current?.updateComplete?.then(() => {
    // Component is fully rendered, safe to access DOM
  });
}, [isOpen]);
```

## When Components Don't Fit Your Use Case

If a zeta-web component doesn't fully cover your requirements:

### Option 1: Request a Feature (Recommended)
Contact the **Front End Development** team to discuss adding your use case to zeta-web:
- This improves the library for all teams
- Ensures consistency across the design system
- Reduces duplicate components across codebases
- Reach out in #zeta-web Slack channel or via GitHub issues

### Option 2: Create a Local Adapter Component
If you need to ship quickly and can't wait for zeta-web changes, create a wrapper component in your repo:

```tsx
// MyCustomSelect.tsx - Adapts zeta-select for your specific needs
import { ZetaSelectInput } from "@zebra-fed/zeta-web/components/select-input/select-input.js";

export const MyCustomSelect = ({ 
  options, 
  onSelectionChange,
  ...props 
}: MyCustomSelectProps) => {
  const handleChange = (e: any) => {
    const value = e?.target?.value ?? e?.detail?.value;
    onSelectionChange?.(value);
  };

  return (
    <zeta-select-input {...props} onchange={handleChange}>
      {options.map(opt => (
        <zeta-option key={opt.value} value={opt.value}>
          {opt.label}
        </zeta-option>
      ))}
    </zeta-select-input>
  );
};
```

**Important**: This stays in your repo and doesn't become a zeta-web component. Still use zeta-web patterns (imports, events, refs) but adapt the API to your needs.

## Asset Imports

Some components use assets (icons, illustrations). Import them like other static files:
```tsx
import emptyBoxUrl from "@zebra-fed/zeta-web/assets/illustrations/zdna/emptyBox.svg?url";

<img src={emptyBoxUrl} alt="Empty" />
```

## Import Map Reference

**Component paths**: `@zebra-fed/zeta-web/components/<name>/<name>.js`  
**Assets**: `@zebra-fed/zeta-web/assets/*`  
**Types**: `@zebra-fed/zeta-web` (barrel export) or component-specific imports  
**JSX Types**: `@zebra-fed/zeta-web/jsx.d.ts` (auto-included in tsconfig)

---

**When to reach for this skill**: Before building any React component that uses zeta-web elements. Provide your design/requirements in the prompt and it will use these patterns correctly.
