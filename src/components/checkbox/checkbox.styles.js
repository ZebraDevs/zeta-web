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
    border: var(--border-size-medium) solid var(--checkbox-border-color);
    background-color: var(--checkbox-background);
  }

  :host([disabled]) *[part="icon"] {
    color: var(--main-disabled);
  }
  :host([indeterminate]) *[part="icon"],
  :host([checked]) *[part="icon"] {
    --icon-color: var(--checkbox-icon-color);
  }

  :host([indeterminate]:not([disabled])) label,
  :host([checked]:not([disabled])) label {
    .container {
      background-color: var(--checkbox-checked-background);
    }
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host([indeterminate]:not([disabled])) label:hover .container,
    :host([checked]:not([disabled])) label:hover .container {
      background-color: var(--checkbox-hover-background);
    }
  }

  :host([rounded]) .container {
    border-radius: 2px;
  }

  :host([reverse]) label {
    flex-direction: row-reverse;
  }

  label {
    cursor: pointer;
    width: auto !important;
    height: 100%;
    display: flex;
  }

  /* Size Variants */
  :host([size="small"]) label {
    font: var(--label-small);
    gap: var(--spacing-small);
  }
  :host([size="small"]) .container {
    min-width: 15px;
    min-height: 15px;
  }
  :host([size="small"]) .container [part="icon"] {
    --icon-size: var(--spacing-large);
  }

  :host([size="large"]) label {
    font: var(--body-medium);
  }
  :host([size="large"]) .container {
    min-width: 25px;
    min-height: 25px;
  }
  :host([size="large"]) .container [part="icon"] {
    --icon-size: var(--spacing-2xl);
  }
`;
