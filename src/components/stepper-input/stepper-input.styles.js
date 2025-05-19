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

  :host([size="large"]) {
    .input-container {
      padding: var(--spacing-medium);
    }
  }

  :host([error]:not([disabled])) .hint-text zeta-icon {
    --icon-color: var(--main-negative);
  }

  :host([error]:not([disabled])) .hint-text {
    color: var(--main-negative);
  }

  .container {
    display: flex;
    gap: var(--spacing-small);
    margin-bottom: var(--spacing-minimum);
  }

  .hint-text {
    --icon-size: 16px;
  }

  .input-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-small) var(--spacing-medium);
    box-shadow: 0 0 0 var(--border-size-small) var(--border-default);
    border-radius: inherit;

    &:has(input:disabled) {
      background-color: var(--surface-disabled);
      border: var(--border-size-small) solid transparent;
    }
  }

  input {
    font: var(--body-medium);
    width: var(--spacing-8xl);
    background-color: transparent;
    text-align: center;
    outline: none;
    border: none;
    margin: 0;
    padding: 0;

    &:active,
    &:focus,
    &:disabled {
      outline: none;
      border: none;
    }

    &:disabled {
      color: var(--main-disabled);
    }
    color: var(--main-default);
  }

  .hint-text {
    display: flex;
    align-items: center;
    column-gap: var(--spacing-minimum);
  }

  .hint-text {
    font: var(--body-x-small);
    color: var(--main-subtle);
  }
`;
