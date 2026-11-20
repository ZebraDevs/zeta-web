import { css } from "lit";
/* Shared styles for the checkbox and radio button: a box/ring centred in a fixed touch target, followed by the label.
 * Switch renders its own template and only relies on the hidden native input below. */
export default css`
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

  :host label {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    width: auto !important;
    height: 100%;
    gap: var(--space-none);
    font: var(--label-medium);
    color: var(--foreground-primary);
    -webkit-tap-highlight-color: transparent;
  }

  /* Box/ring sits centred in a control-target-min square; the margin supplies the target and the gap to the label. */
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-shrink: 0;
    box-sizing: border-box;
    width: var(--control-xs);
    height: var(--control-xs);
    margin: calc((var(--control-target-min) - var(--control-xs)) / 2);
    border: var(--stroke-thick) solid var(--interactive-selection-border-default);
    background-color: transparent;
  }

  /* Size: large (and legacy medium) is the base above; small is the dense box/ring. Size never changes the label. */
  :host([size="small"]) .container {
    width: var(--control-icon-sm);
    height: var(--control-icon-sm);
    margin: calc((var(--control-target-min) - var(--control-icon-sm)) / 2);
  }

  *[part="icon"] {
    display: none;
  }
  :host([indeterminate]) *[part="icon"],
  :host([checked]) *[part="icon"] {
    display: block;
  }

  :host([indeterminate]:not([disabled])) label .container,
  :host([checked]:not([disabled])) label .container {
    border-color: var(--interactive-selection-border-pressed);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled])) label:hover .container,
    :host([indeterminate]:not([disabled])) label:hover .container,
    :host([checked]:not([disabled])) label:hover .container {
      border-color: var(--interactive-selection-border-hover);
    }
  }

  :host([disabled]) label .container {
    border-color: var(--interactive-selection-border-disabled);
  }
`;
