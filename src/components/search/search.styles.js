import { css } from "lit";
export default css`
  :host {
    display: flex;
    align-items: center;
    width: fit-content;
    height: fit-content;
    --icon-size: var(--control-icon-md);
    --icon-color: var(--foreground-primary);
  }

  #search-icon {
    display: var(--search-icon-display, block);
  }

  :host(:not([disabled])) .trailing zeta-icon {
    --icon-color: var(--interactive-neutral-foreground-default);
  }

  :host([round="full"][rounded]) .contourable-target {
    border-radius: var(--radius-pill);
  }

  form {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    align-items: center;
    flex-shrink: 0;
    gap: var(--space-2xs);
    height: var(--control-md);
    padding: 0 var(--space-md);
    border: var(--stroke-thin) solid var(--search-border-color, var(--interactive-neutral-border-default));
    background: var(--interactive-neutral-background-default);
    -webkit-tap-highlight-color: transparent;
  }

  /* FOCUS: drawn inside the border box so the footprint does not change */
  form:has(input:focus) {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thick));
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled]):not([flavor="gradient"])) form:hover {
      border-color: var(--interactive-neutral-border-hover);
    }
  }

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }

  input {
    background-color: transparent;
    border: none;
    outline: none;
    caret-color: var(--foreground-cursor);
    color: var(--foreground-primary);
    flex: 1;
    min-width: 0;
    padding: 0 var(--space-2xs);
    margin: 0;
    font: var(--body-medium);

    &::placeholder {
      color: var(--foreground-disabled);
      font-size: inherit;
      line-height: inherit;
    }
  }

  /* TRAILING: clear + divider + trailing control */
  .trailing {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  /* Each control gets a target ~space-xs wider than its glyph on every side, without moving the layout */
  .trailing button {
    all: unset;
    display: flex;
    padding: var(--space-xs);
    margin: calc(-1 * var(--space-xs));
    border-radius: var(--radius-sm);
    cursor: pointer;

    &:focus-visible {
      outline: var(--stroke-thick) solid var(--border-focus);
      outline-offset: calc(-1 * var(--stroke-thick));
    }
  }

  .divider {
    width: var(--stroke-thin);
    height: var(--control-icon-md);
    background-color: var(--border-default);
  }

  /* SIZE */
  :host([size="small"]) {
    form {
      height: var(--control-sm);
    }

    input {
      font: var(--body-small);
    }
  }

  :host([size="large"]) form {
    height: var(--control-lg);
  }

  /* FLAVOR */
  :host([flavor="gradient"]) form {
    border-color: transparent;
    background:
      linear-gradient(var(--interactive-neutral-background-default) 0 0) padding-box,
      linear-gradient(129deg, var(--foreground-gradient-start) 0%, var(--foreground-gradient-end) 100%) border-box;
  }

  :host([flavor="ghost"]) form {
    background: var(--interactive-ghost-background-default);
    border-color: var(--interactive-ghost-border-default);
    border-width: var(--stroke-base);
  }

  :host([flavor="ghost"][hideFocusOutline]) form:has(input:focus) {
    outline: none;
  }

  /* DISABLED */
  :host([disabled]) {
    --icon-color: var(--interactive-neutral-foreground-disabled);

    form {
      pointer-events: none;
      background: var(--interactive-neutral-background-disabled);
      border-color: var(--interactive-neutral-border-disabled);
    }

    input,
    input::placeholder {
      color: var(--foreground-disabled);
    }
  }

  :host([disabled][flavor="ghost"]) form {
    background: var(--interactive-ghost-background-disabled);
  }
`;
