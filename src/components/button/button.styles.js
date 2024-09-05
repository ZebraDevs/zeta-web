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
    gap: var(--spacing-small);
  }

  :host([size="large"]) > button {
    padding: var(--spacing-medium) var(--spacing-2xl);
    --icon-size: 24px;
  }

  :host > button,
  :host([size="medium"]) > button {
    padding: var(--spacing-small) var(--spacing-medium);
    --icon-size: 24px;
  }

  :host([size="small"]) > button {
    padding: var(--spacing-minimum) var(--spacing-small);
    font: var(--label-small);
    --icon-size: 20px;
  }

  :host([disabled]) > button > zeta-icon,
  :host([disabled]) ::slotted(zeta-icon) {
    --icon-color: var(--icon-button-icon-color-disabled, var(--main-disabled));
  }

  :host([flavor]:not([disabled])) > button > zeta-icon,
  :host([flavor]:not([disabled])) ::slotted(zeta-icon) {
    --icon-color: var(--icon-button-icon-color, var(--main-inverse));
  }

  :host([flavor="outline"]:not([disabled])) > button > zeta-icon,
  :host([flavor="text"]:not([disabled])) > button > zeta-icon,
  :host([flavor="outline"]:not([disabled])) ::slotted(zeta-icon),
  :host([flavor="text"]:not([disabled])) ::slotted(zeta-icon) {
    --icon-color: var(--icon-button-icon-color, var(--main-primary));
  }

  :host([flavor="outline-subtle"]:not([disabled])) > button > zeta-icon,
  :host([flavor="outline-subtle"]:not([disabled])) ::slotted(zeta-icon) {
    --icon-color: var(--icon-button-icon-color, var(--main-default));
  }
`;
