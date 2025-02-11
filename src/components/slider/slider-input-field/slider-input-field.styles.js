import { css } from "lit";
export default css`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-minimum);
  }

  :host([disabled]) {
    color: var(--main-disabled);
  }

  .slider-input-container {
    display: flex;
    gap: var(--spacing-large);
  }

  .slider-input-container.center {
    align-items: center;
  }

  label {
    margin-left: var(--spacing-small);
  }

  label.range-selector-label {
    margin-left: 0;
    margin-bottom: var(--spacing-minimum);
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
    padding-right: var(--spacing-minimum);
    padding-left: var(--spacing-small);
    padding-bottom: var(--spacing-minimum);
  }

  .range-label-container > p {
    margin: var(--spacing-small) 0;
    line-height: var(--spacing-2xl);
  }

  /*TODO refactor to shared input styles*/
  input {
    width: 56px;
    height: 48px;
    border: var(--border-default) var(--border-size-small) solid;
    text-align: center;
    font: var(--body-medium);
    color: var(--main-subtle);
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
    color: var(--main-disabled);
    border-color: var(--border-disabled);
    background-color: var(--surface-disabled);
  }

  :host([error]:not([disabled])) {
    input {
      background-color: var(--surface-negative-subtle);
      border: var(--border-size-small) var(--border-negative) solid;
    }
  }
`;
