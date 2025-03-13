import { css } from "lit";
export default css`
  :host {
    display: inline-block;
  }
  
  :host([disabled]) *[part="icon"] {
    color: var(--main-disabled);
  }

  :host([indeterminate]:not([disabled])) label,
  :host([checked]:not([disabled])) label {
    .container {
      background-color: var(--surface-primary);
    }

    &:hover .container {
      background-color: var(--border-hover);
    }
  }
  
  :host([rounded]) > .container {
    border-radius: 2px !important;
  }

  :host([reverse]) label {
    flex-direction: row-reverse;  
  }

  label {
    cursor: pointer;
    width: auto !important;
    height: 100% !important;
    display: flex;
  }
`;
