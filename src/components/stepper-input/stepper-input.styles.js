import { css } from "lit";
export default css`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  :host > div {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .container {
    display: flex;
    gap: var(--space-sm);
  }

  /* VALUE FIELD: fixed height per size, border stays when disabled so the footprint does not change */
  .input-container {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    /* ponytail: no semantic token for the 72px value field, primitive --scale-15 (48px) + padding used; border drawn inside */
    width: calc(var(--scale-15) + 2 * var(--space-md));
    height: var(--control-md);
    padding: 0 var(--space-md);
    border: var(--stroke-thin) solid var(--interactive-neutral-border-default);
    background-color: var(--interactive-neutral-background-default);

    &:has(input:focus) {
      outline: var(--stroke-thick) solid var(--border-focus);
      outline-offset: calc(-1 * var(--stroke-thick));
    }

    &:has(input:disabled) {
      background-color: var(--interactive-neutral-background-disabled);
      border-color: var(--interactive-neutral-border-disabled);
    }
  }

  :host([size="large"]) .input-container {
    height: var(--control-lg);
  }

  /* SHAPE: mirrors Contourable, but the value field uses radius-sm */
  :host .input-container,
  :host([rounded="false"]) .input-container {
    border-radius: var(--radius-none);
  }

  :host([rounded]:not([rounded="false"])) .input-container {
    border-radius: var(--radius-sm);
  }

  input {
    font: var(--body-medium);
    width: 100%;
    min-width: 0;
    background-color: transparent;
    text-align: center;
    outline: none;
    border: none;
    margin: 0;
    padding: 0;
    caret-color: var(--foreground-cursor);
    color: var(--foreground-primary);

    &:active,
    &:focus,
    &:disabled {
      outline: none;
      border: none;
    }

    &:disabled {
      color: var(--foreground-disabled);
    }
  }

  .hint-text {
    --icon-size: var(--control-icon-sm);
    --icon-color: var(--foreground-primary);
    display: flex;
    align-items: center;
    column-gap: var(--space-2xs);
    font: var(--body-xsmall);
    color: var(--foreground-secondary);
  }

  :host([error]:not([disabled])) .hint-text {
    --icon-color: var(--foreground-error);
    color: var(--foreground-error);
  }
`;
