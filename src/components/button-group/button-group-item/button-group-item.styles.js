import { css } from "lit";
export default css`
  :host {
    display: flex;
    height: fit-content;
    width: fit-content;
    --_item-background: var(--interactive-neutral-background-default);
    --_item-background-hover: var(--interactive-neutral-background-hover);
    --_item-background-pressed: var(--interactive-neutral-background-pressed);
    --_item-foreground: var(--interactive-neutral-foreground-default);
    --_item-border-color: var(--interactive-neutral-border-default);
  }
  :host .text {
    font: var(--_item-font, var(--label-medium));
    cursor: pointer;
  }

  :host > button {
    box-sizing: border-box;
    height: 100%;
    color: var(--_item-foreground);
    --icon-color: var(--_item-foreground);
    background-color: var(--_item-background);
    border: var(--stroke-thin) solid var(--_item-border-color);
    border-right: var(--group-item-border-right, var(--stroke-thin) solid var(--_item-border-color));
    display: flex;
    flex-direction: row;
    align-items: center;
    font: var(--_item-font, var(--label-medium));
    padding: var(--item-padding, 0);
    -webkit-tap-highlight-color: transparent;
  }

  :host(:not([disabled])) > button:active {
    background-color: var(--_item-background-pressed);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled])) > button:hover {
      background-color: var(--_item-background-hover);
    }
    :host(:not([disabled])) > button:active {
      background-color: var(--_item-background-pressed);
    }
  }

  :host > button:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thick));
    z-index: 1;
  }

  label {
    display: flex;
  }

  :host button > label.pad,
  button {
    gap: var(--space-2xs);
  }

  :host([rounded]) > button {
    border-top-left-radius: var(--group-item-left-radius, var(--radius-sm));
    border-bottom-left-radius: var(--group-item-left-radius, var(--radius-sm));
    border-top-right-radius: var(--group-item-right-radius, var(--radius-sm));
    border-bottom-right-radius: var(--group-item-right-radius, var(--radius-sm));
  }

  :host([size="small"]) {
    --item-padding: var(--group-item-padding, var(--space-md));
    --_item-font: var(--label-small);
    height: var(--control-sm);
  }

  :host([size="medium"]) {
    --item-padding: var(--group-item-padding, var(--space-md));
    height: var(--control-md);
  }

  :host([size="large"]) {
    --item-padding: var(--group-item-padding, var(--space-lg));
    height: var(--control-lg);
  }

  :host([iconName=""]) > button > .icon,
  :host(:not([iconName])) > button > .icon {
    display: none;
  }

  :host zeta-icon,
  ::slotted(zeta-icon) {
    --icon-size: var(--control-icon-md);
  }

  :host([size="small"]) zeta-icon,
  :host([size="small"]) ::slotted(zeta-icon) {
    --icon-size: var(--control-icon-sm);
  }

  :host([flavor="inverse"]) {
    --_item-background: var(--interactive-inverse-background-default);
    --_item-background-hover: var(--interactive-inverse-background-hover);
    --_item-background-pressed: var(--interactive-inverse-background-pressed);
    --_item-foreground: var(--interactive-inverse-foreground-default);
    --_item-border-color: var(--interactive-inverse-border-default);
  }

  :host([disabled]) {
    --_item-background: var(--interactive-neutral-background-disabled);
    --_item-foreground: var(--interactive-neutral-foreground-disabled);
    --_item-border-color: var(--interactive-neutral-border-disabled);
  }

  :host([flavor="inverse"][disabled]) {
    --_item-background: var(--interactive-inverse-background-disabled);
    --_item-foreground: var(--interactive-inverse-foreground-disabled);
    --_item-border-color: var(--interactive-inverse-border-disabled);
  }

  /* Overrides the generic Interactive disabled colours so inverse keeps its own disabled pairing */
  :host([disabled]) > button,
  :host([disabled]) label,
  :host([disabled]) ::slotted(zeta-icon) {
    color: var(--_item-foreground);
    --icon-color: var(--_item-foreground);
  }
`;
