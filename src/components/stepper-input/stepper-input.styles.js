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
      padding: var(--spacing-3);
    }
  }

  .container {
    display: flex;
    gap: var(--spacing-2);
  }

  .input-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-2) var(--spacing-3);
    box-shadow: 0 0 0 var(--border-size-small) var(--border-default);
    border-radius: inherit;

    &:has(input:disabled) {
      background-color: var(--surface-disabled);
      border: var(--border-size-small) solid transparent;
    }
  }

  input {
    font: var(--body-medium);
    width: var(--spacing-12);
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
      color: var(--text-disabled);
    }
    color: var(--text-default);
  }
`;
