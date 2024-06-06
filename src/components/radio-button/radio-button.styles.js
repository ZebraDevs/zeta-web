import { css } from "lit";
export default css`
  .radio {
    display: flex;
    width: min-content;
    align-items: center;
    background-color: transparent !important;
    gap: var(--spacing-3);
  }

  input[type="radio"] {
    appearance: none;
    width: 0;
    height: 0;
    position: absolute;
  }

  label {
    font: var(--body-medium);
  }

  .container {
    position: relative;
    border: var(--icon-subtle) var(--border-size-medium) solid;
    background: var(--surface-default);
    height: var(--spacing-4);
    width: var(--spacing-4);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      border-color: var(--border-hover);
    }
  }

  .checkmark {
    display: none;
    position: absolute;
    width: var(--spacing-2-5);
    height: var(--spacing-2-5);
    border-radius: var(--radius-full);
    background-color: var(--icon-flavor-primary);
  }

  :host([checked]) .checkmark {
    display: block;
  }

  :host([checked]:not([disabled])) {
    .container {
      border-color: var(--icon-flavor-primary);

      &:hover {
        border-color: var(--border-hover);

        .checkmark {
          background-color: var(--border-hover);
        }
      }
    }
  }

  :host([disabled]:not([checked])) {
    .container {
      background: var(--surface-disabled);
      border: var(--surface-disabled) var(--border-size-medium) solid;
    }
  }

  :host([disabled]) {
    .container {
      border-color: var(--surface-disabled);
    }

    .checkmark {
      background-color: var(--surface-disabled);
    }
  }
`;
