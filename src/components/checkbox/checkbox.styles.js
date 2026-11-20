import { css } from "lit";
/* Box, target, size, label and border states come from base-toggle-form-element.styles.js */
export default css`
  :host {
    display: inline-block;
    --checkbox-checked-background: var(--interactive-selection-background-pressed);
    --checkbox-hover-background: var(--interactive-selection-background-hover);
    --checkbox-border-color: var(--interactive-selection-border-default);
    --checkbox-background: transparent;
    --checkbox-icon-color: var(--foreground-inverse);
  }

  .container {
    border-color: var(--checkbox-border-color);
    background-color: var(--checkbox-background);
    /* Focus ring (from Interactive) drawn over the border, at the box's own size */
    outline-offset: calc(-1 * var(--stroke-thick));
  }

  :host([indeterminate]) *[part="icon"],
  :host([checked]) *[part="icon"] {
    --icon-color: var(--checkbox-icon-color);
  }

  :host([indeterminate]:not([disabled])) label .container,
  :host([checked]:not([disabled])) label .container {
    background-color: var(--checkbox-checked-background);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host([indeterminate]:not([disabled])) label:hover .container,
    :host([checked]:not([disabled])) label:hover .container {
      background-color: var(--checkbox-hover-background);
    }
  }

  :host([disabled][indeterminate]) label .container,
  :host([disabled][checked]) label .container {
    background-color: var(--interactive-selection-background-disabled);
  }

  :host([rounded]) .container {
    border-radius: var(--radius-element-sm);
  }
  :host([size="small"][rounded]) .container {
    border-radius: var(--radius-xs);
  }

  :host([reverse]) label {
    flex-direction: row-reverse;
  }

  *[part="icon"] {
    --icon-size: var(--control-icon-md);
  }
  :host([size="small"]) *[part="icon"] {
    --icon-size: var(--control-icon-xs);
  }
`;
