import { css } from "lit";
export default css`
  :host {
    display: inline-block;
    --checkbox-checked-background: var(--surface-primary);
    --checkbox-hover-background: var(--border-hover);
    --checkbox-border-color: var(--main-subtle);
    --checkbox-background: var(--surface-default);
    --checkbox-icon-color: var(--main-inverse);
  }

  .container {
    min-width: 20px;
    min-height: 20px;
    border: var(--border-size-medium) solid var(--checkbox-border-color) !important;
    background-color: var(--checkbox-background) !important;
  }

  :host([disabled]) *[part="icon"] {
    color: var(--main-disabled);
  }
  :host([indeterminate]) *[part="icon"],
  :host([checked]) *[part="icon"] {
    --icon-color: var(--checkbox-icon-color) !important;
  }

  :host([indeterminate]:not([disabled])) label,
  :host([checked]:not([disabled])) label {
    .container {
      background-color: var(--checkbox-checked-background) !important;
    }

    &:hover .container {
      background-color: var(--checkbox-hover-background) !important;
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
