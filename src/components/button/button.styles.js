import { css } from "lit";
export default css`
  :host {
    display: flex;
    height: fit-content;
    width: fit-content;
  }
  :host > button {
    display: flex;
    align-items: center;
    border: none;
    justify-content: center;
    overflow-x: ellipsis;
    width: 100%;
    font: var(--label-large);
    gap: var(--spacing-2);
  }

  :host([size="large"]) > button {
    padding: var(--spacing-3) var(--spacing-6);
    --icon-size: 24px;
  }

  :host > button,
  :host([size="medium"]) > button {
    padding: var(--spacing-2) var(--spacing-3-5);
    --icon-size: 24px;
  }

  :host([size="small"]) > button {
    padding: var(--spacing-1) var(--spacing-2);
    font: var(--label-small);
    --icon-size: 20px;
  }

  :host([disabled]) > button > zeta-icon,
  :host([disabled]) ::slotted(zeta-icon) {
    --icon-color: var(--icon-button-icon-color-disabled, var(--icon-disabled));
  }

  :host([flavor]:not([disabled])) > button > zeta-icon,
  :host([flavor]:not([disabled])) ::slotted(zeta-icon) {
    --icon-color: var(--icon-button-icon-color, var(--icon-inverse));
  }

  :host([flavor="outline"]:not([disabled])) > button > zeta-icon,
  :host([flavor="text"]:not([disabled])) > button > zeta-icon,
  :host([flavor="outline"]:not([disabled])) ::slotted(zeta-icon),
  :host([flavor="text"]:not([disabled])) ::slotted(zeta-icon) {
    --icon-color: var(--icon-button-icon-color, var(--icon-flavor-primary));
  }

  :host([flavor="outline-subtle"]:not([disabled])) > button > zeta-icon,
  :host([flavor="outline-subtle"]:not([disabled])) ::slotted(zeta-icon) {
    --icon-color: var(--icon-button-icon-color, var(--icon-default));
  }
`;
