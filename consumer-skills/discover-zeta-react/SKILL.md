---
name: discover-zeta-react
description: Dynamically discover available zeta-web components, design tokens, and their properties. Programmatically generated from component metadata—always current as the library grows.
---

# Zeta-Web Component & Token Discovery

This skill provides programmatic discovery of all available zeta-web components and design tokens. **Use this before implementing features to ensure you're using the latest components from the library.**

## How to Discover Components

### Quick Discovery
Run this command to list all available components:

```bash
jq '.modules | map(select(.declarations[0].tagName != null) | .declarations[0].tagName) | sort' \
  node_modules/@zebra-fed/zeta-web/custom-elements.json
```

This returns an alphabetically sorted list of all 79+ components (e.g., `zeta-button`, `zeta-text-input`, `zeta-dialog`, etc.).

### Detailed Component Metadata
Get full properties, events, and slots for a specific component:

```bash
jq '.modules[] | 
  select(.declarations[0].tagName == "zeta-button") | 
  {
    tag: .declarations[0].tagName,
    properties: .declarations[0].members | map(select(.kind == "field")),
    events: .declarations[0].events,
    slots: .declarations[0].slots
  }' \
  node_modules/@zebra-fed/zeta-web/custom-elements.json
```

**What you get**:
- `properties` — All HTML attributes you can set
- `events` — All events the component fires
- `slots` — Named slots for content projection
- `cssProperties` — CSS custom properties (shadows, parts) you can style

## How to Discover Design Tokens

### Token Files Location
Tokens are defined in CSS files and always match the latest design system:

```
node_modules/@zebra-fed/zeta-web/src/generated/tokens/
├── primitives.css           # Base tokens (colors, spacing, radius, elevation)
├── primitives-dark.css      # Dark theme overrides
├── semantics.css            # Semantic tokens (primary, positive, negative, warning)
└── semantics-high-contrast.css  # Accessibility tokens
```

### Extract All Available Tokens
```bash
# Get all token names
grep -h 'var(--' node_modules/@zebra-fed/zeta-web/src/generated/tokens/primitives.css \
  | grep -oP 'var\(--[a-z0-9\-]+\)' | sort -u
```

**Token Categories**:

| Category | Examples | Usage |
|----------|----------|-------|
| **Colors** | `--color-blue-60`, `--color-green-20`, `--main-primary`, `--main-positive` | `background: var(--main-primary)` |
| **Spacing** | `--spacing-0` through `--spacing-15` (0–96px) | `padding: var(--spacing-6)` |
| **Radius** | `--radius-s`, `--radius-m`, `--radius-l`, `--radius-xl` (4–360px) | `border-radius: var(--radius-m)` |
| **Elevation** | `--elevation-1` through `--elevation-6` | `box-shadow: var(--elevation-2)` |
| **Typography** | `--title-large`, `--headline-medium`, `--body-small` | `font: var(--title-large)` |
| **Surfaces** | `--surface-default`, `--surface-light`, `--border-default` | `background: var(--surface-default)` |

## Staying Current

### Why This Matters
- ✅ **Always discovers latest components** — No manual list updates needed
- ✅ **Catches new tokens** — Auto-reads generated CSS files from latest build
- ✅ **Machine-readable** — Uses standardized Custom Elements Manifest (CEM) format
- ✅ **Type-safe** — Extract property types directly from metadata

### CI/Build Integration
Add this to your CI pipeline to validate component usage:

```bash
#!/bin/bash
# scripts/validate-zeta-usage.sh
echo "Validating zeta-web components are current..."

COMPONENT_COUNT=$(jq '.modules | map(select(.declarations[0].tagName != null)) | length' \
  node_modules/@zebra-fed/zeta-web/custom-elements.json)
echo "Found $COMPONENT_COUNT zeta-web components"

# Fail if fewer than expected (library may be misconfigured)
if [ "$COMPONENT_COUNT" -lt 75 ]; then
  echo "ERROR: Expected at least 75 components, found $COMPONENT_COUNT"
  exit 1
fi

echo "✓ Zeta-web components are available and current"
```

## For AI/LLM Usage

When you see `/use-zeta-react` as the main skill and want to implement a feature:

1. **Check what components exist**:
   ```bash
   # Does a component for my use case already exist?
   jq '.modules | map(select(.declarations[0].tagName | contains("button"))) | .[].declarations[0].tagName' \
     node_modules/@zebra-fed/zeta-web/custom-elements.json
   ```

2. **Look up component API**:
   ```bash
   # What properties and events does zeta-button support?
   jq '.modules[] | select(.declarations[0].tagName == "zeta-button")' \
     node_modules/@zebra-fed/zeta-web/custom-elements.json
   ```

3. **Check available tokens** before hardcoding colors/spacing:
   ```bash
   # What color tokens exist?
   grep -oP '--main-[a-z]+|--color-[a-z\-]+' \
     node_modules/@zebra-fed/zeta-web/src/generated/tokens/semantics.css | sort -u
   ```

4. **Enforce zeta-first policy**: If a standard component exists, use it. Only create custom components when genuinely necessary (and contact FE team first).

---

**Note**: This skill reads from your installed `@zebra-fed/zeta-web` package. Keep the package updated with `npm update @zebra-fed/zeta-web` to access the latest components and tokens.
