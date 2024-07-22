import { css } from "lit";
export default css`
  :host label {
    display: flex;
    width: fit-content;
    gap: var(--spacing-3);
    align-items: center;
    position: relative;
  }

  input {
    position: absolute;
    appearance: none;
    height: 0;
    width: 0;
    visibility: hidden;
    margin: 0;
    top: 50%;
    left: 50%;
  }

  label {
    font: var(--body-medium);
  }

  *[part="icon"] {
    display: none;
    --icon-size: 20px;
  }

  .container {
    display: flex;
    align-items: center;
    background: var(--surface-default);
    position: relative;
    border: var(--border-size-medium) solid var(--icon-subtle);
    height: var(--spacing-4);
    width: var(--spacing-4);
    justify-content: center;
  }

  :host label:hover .container {
    border-color: var(--border-hover);
  }

  :host([indeterminate]:not([disabled])) label,
  :host([checked]:not([disabled])) label {
    .container {
      border-color: var(--surface-flavor-primary);
    }
    &:hover .container {
      border-color: var(--border-hover);
    }
  }

  :host([indeterminate]) *[part="icon"],
  :host([checked]) *[part="icon"] {
    /* TODO add animation */
    --icon-color: var(--icon-inverse);
    display: block;
  }

  :host([disabled]) {
    .container {
      background-color: var(--surface-disabled);
      border-color: var(--surface-disabled);
    }
  }
`;
