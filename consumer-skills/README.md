# Zeta-Web Consumer Skills

Consumer skills for building React applications with zeta-web components. These skills teach developers how to properly consume and use the component library.

## Skills Available

### 1. `/use-zeta-react` — Main Skill
**Purpose**: Teaches React developers how to use zeta-web components correctly.

**Content** (8.3 KB):
- ✅ Quick reference on what zeta-web is
- ✅ Component imports and rendering in JSX
- ✅ Props, attributes, and slots
- ✅ Event handling with proper typing
- ✅ Refs and imperative operations
- ✅ CSS & styling (tokens, modules, inline)
- ✅ Common patterns (forms, dialogs, TypeScript)
- ✅ Gotchas & solutions table
- ✅ Advanced patterns (form wrappers, async rendering)
- ✅ Guidance for when components don't fit use case
- ✅ Asset imports

**Usage**:
```bash
/use-zeta-react Build a search form with zeta-search and filter chips
/use-zeta-react Create a dialog for user settings with form inputs
```

**Key Principles**:
- **Consumption-only** — No component building/maintenance info
- **Prompt-required** — Always pair with what to build
- **Zeta-first** — Encourages reusing existing components before building custom ones

---

### 2. `/use-zeta-react-discovery` — Discovery Skill
**Purpose**: Programmatically discover all available components and design tokens—always current as the library grows.

**Content** (5.2 KB):
- ✅ How to query component list from `custom-elements.json`
- ✅ How to extract component properties, events, and slots
- ✅ How to find all available design tokens
- ✅ Token categories (colors, spacing, radius, elevation, typography)
- ✅ Commands to inspect specific components
- ✅ CI/build integration examples
- ✅ For AI/LLM usage patterns

**Usage** (called by AI when using `/use-zeta-react`):
```bash
/use-zeta-react-discovery
# Returns queries to discover components and tokens dynamically
```

**Key Principles**:
- **Programmatic** — No manual list updates; reads from installed package
- **Always Current** — Reflects latest components and tokens
- **Machine-Readable** — Uses standard Custom Elements Manifest format
- **CI-Friendly** — Can validate component usage in pipelines

---

## Workflow: Building a Zeta Component

**As a developer**, you would use these skills like this:

```bash
# 1. First, discover what exists
/use-zeta-react-discovery

# 2. Then, build your component with proper patterns
/use-zeta-react Build a form with text input, select dropdown, and submit button
```

**As an LLM**, the skills work together:
1. When you invoke `/use-zeta-react` with a prompt, you get usage patterns
2. The skill tells you to call `/use-zeta-react-discovery` to see all available components
3. You query the metadata to find which components solve the problem
4. You implement using the patterns from the main skill

---

## Why Two Skills?

**Separation of concerns**:
- `use-zeta-react` — **Static patterns** that don't change frequently
- `use-zeta-react-discovery` — **Dynamic metadata** that updates as the library grows

**Benefits**:
- ✅ Main skill stays concise and focused
- ✅ Discovery queries are always current (no manual updates)
- ✅ LLM can programmatically check what exists before building
- ✅ Enforces "zeta-first" philosophy by making discovery easy

---

## Enforcing Zeta-First Usage

Both skills encourage using zeta-web components first:

1. **Discovery skill** makes it easy to see what's available
2. **Main skill** teaches proper usage patterns
3. **"When Components Don't Fit"** section provides fallback (contact FE team, then local adapter)
4. **Every pattern** uses zeta components as the baseline

---

## Future Extensions

These skills can be extended with:
- Integration with design system docs (Figma, Storybook)
- Component examples by use case (auth forms, tables, dashboards)
- Migration guides (upgrading to new zeta versions)
- Common patterns library (search + filter, multi-step forms, etc.)

---

**Version**: 1.0  
**Last Updated**: 2026-09-14  
**Zeta-Web Version**: 1.4.2+
