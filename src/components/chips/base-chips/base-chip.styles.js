import { css } from "lit";
export default css`
  :host {
    --_chip-background: var(--interactive-neutral-background-default);
    --_chip-background-hover: var(--interactive-neutral-background-hover);
    --_chip-background-focused: var(--interactive-neutral-background-focused);
    --_chip-background-pressed: var(--interactive-neutral-background-pressed);
    --_chip-border: var(--interactive-neutral-border-default);
    --_chip-foreground: var(--interactive-neutral-foreground-default);
  }

  :host([rounded]) .container {
    border-radius: var(--radius-pill);
  }

  .container {
    box-sizing: border-box;
    height: var(--space-2xl);
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xxs);
    padding: var(--space-sm) var(--space-md);
    border: none;
    /* 1px border drawn inside so the focus outline can replace it without reflow */
    box-shadow: inset 0 0 0 var(--stroke-thin) var(--_chip-border);
    font: var(--indicator-medium);
    color: var(--_chip-foreground);
    transition: background-color 0.2s ease-out;
    background-color: var(--_chip-background);
    -webkit-tap-highlight-color: transparent;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    .container:hover,
    .container:active {
      background-color: var(--_chip-background-hover);
    }
  }

  /* Focus outline itself comes from the Interactive mixin (2px --border-focus, drawn outside) */
  :host(:focus-visible) .container,
  .container:focus-visible {
    background-color: var(--_chip-background-focused);
    box-shadow: none;
  }

  :host([disabled]) .container {
    background-color: var(--interactive-neutral-background-disabled);
    color: var(--interactive-neutral-foreground-disabled);
    box-shadow: none;
  }

  zeta-icon {
    --icon-size: var(--control-icon-sm);
  }
`;
