import { css } from "lit";
export default css`
  :host([disabled]) *[part="icon"] {
    color: var(--icon-disabled);
  }

  :host([indeterminate]:not([disabled])) label,
  :host([checked]:not([disabled])) label {
    .container {
      background-color: var(--surface-flavor-primary);
    }

    &:hover .container {
      background-color: var(--border-hover);
    }
  }

  :host([rounded]) > .container {
    border-radius: 2px !important;
  }

  label {
    cursor: pointer;
    width: auto !important;
    height: 100% !important;
  }
`;
