import { css } from "lit";
export default css`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
  }

  :host([disabled]) {
    color: var(--foreground-disabled);
  }

  .slider-input-container {
    display: flex;
    gap: var(--space-gutter);
  }

  .slider-input-container.center {
    align-items: center;
  }

  label {
    margin-left: var(--space-sm);
    font: var(--label-medium);
    color: var(--foreground-primary);
  }

  label.range-selector-label {
    margin-left: 0;
    margin-bottom: var(--space-2xs);
  }

  :host([disabled]) label {
    color: var(--foreground-disabled);
  }

  .slider-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    padding-top: var(--space-sm);
  }

  /* Range selector centres the slider between its inputs, so drop the top offset used to align with the range labels. */
  .slider-input-container.center .slider-container {
    padding-top: 0;
  }

  .range-label-container {
    display: flex;
    justify-content: space-between;
    padding-right: var(--space-2xs);
    padding-left: var(--space-sm);
  }

  .range-label-container > p {
    margin: 0;
    font: var(--indicator-medium);
    color: var(--foreground-secondary);
  }

  :host([disabled]) .range-label-container > p {
    color: var(--foreground-disabled);
  }

  /*TODO refactor to shared input styles*/
  input {
    box-sizing: border-box;
    /* 56px content area, plus padding and border */
    width: calc(56px + 2 * var(--space-md) + 2 * var(--stroke-thin));
    height: var(--control-md);
    padding: 0 var(--space-md);
    border: var(--stroke-thin) solid var(--interactive-neutral-border-default);
    background-color: var(--interactive-neutral-background-default);
    text-align: center;
    font: var(--body-medium);
    color: var(--foreground-primary);
  }

  input:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thick));
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  :host([disabled]) input {
    color: var(--foreground-disabled);
    border-color: var(--interactive-neutral-border-disabled);
    background-color: var(--interactive-neutral-background-disabled);
  }

  :host([error]:not([disabled])) input {
    border-color: var(--border-error);
  }
`;
