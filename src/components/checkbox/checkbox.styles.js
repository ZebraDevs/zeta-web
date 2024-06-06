import { css } from "lit";
export default css`
  .checkbox {
    display: flex;
    width: min-content;
    align-items: center;
    gap: var(--spacing-3);
    background-color: var(--surface-basic) !important;
  }

  input[type="checkbox"] {
    appearance: none;
    width: 0;
    height: 0;
    position: absolute;
  }

  .container {
    position: relative;
    outline: var(--color-cool-50) var(--border-size-medium) solid;
    background: var(--surface-default);
    height: var(--spacing-5);
    width: var(--spacing-5);
  }

  .container:hover {
    outline-color: var(--color-cool-90);
  }

  .checkmark {
    display: none;
  }

  :host([checked]) .checkmark {
    display: block;
  }

  :host([disabled]) {
    .container {
      background: var(--color-cool-20);
      outline: var(--surface-basic) var(--border-size-medium) solid;
    }
  }

  :host([checked]:not([disabled])) {
    .container {
      background: var(--surface-flavor-primary);
      outline: var(--surface-basic) var(--border-size-medium) solid;
    }

    .container:hover {
      background: var(--icon-flavor-primary);
    }
  }
  :host([rounded]) > .checkbox > .container {
    border-radius: 2px !important;
  }
`;
