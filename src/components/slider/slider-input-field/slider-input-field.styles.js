import { css } from "lit";
export default css`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
  }

  :host([disabled]) {
    color: var(--text-disabled);
  }

  .slider-input-container {
    display: flex;
    gap: var(--spacing-4);
  }

  label {
    margin-left: var(--spacing-2);
  }

  .slider-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .range-label-container {
    display: flex;
    justify-content: space-between;
    padding-right: var(--spacing-1);
    padding-left: var(--spacing-2);
    padding-bottom: var(--spacing-1);
  }

  /*TODO refactor to shared input styles*/
  input {
    width: 56px;
    height: 48px;
    border: var(--border-default) var(--border-size-small) solid;
    text-align: center;
    font: var(--body-medium);
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
    color: var(--text-disabled);
    border-color: var(--border-disabled);
    background-color: var(--surface-disabled);
  }

  :host([error]:not([disabled])) {
    input {
      background-color: var(--surface-flavor-negative-subtle);
      border: var(--border-size-small) var(--border-flavor-negative) solid;
    }
  }
`;
