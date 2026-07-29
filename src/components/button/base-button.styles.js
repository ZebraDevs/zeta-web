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
    padding: var(--spacing-medium) var(--spacing-large);
    --icon-size: var(--spacing-xl);
    zeta-icon {
      width: var(--spacing-xl);
      height: var(--spacing-xl);
    }
  }

  :host > button,
  :host([size="medium"]) > button {
    padding: var(--spacing-small) var(--spacing-medium);
    --icon-size: var(--spacing-xl);
    zeta-icon {
      width: var(--spacing-xl);
      height: var(--spacing-xl);
    }
  }

  :host([size="small"]) > button {
    padding: var(--spacing-small);
    font: var(--label-small);
    --icon-size: var(--spacing-large);
    gap: var(--spacing-minimum);
    zeta-icon {
      width: var(--spacing-large);
      height: var(--spacing-large);
    }
  }

  :host([flavor]:not([disabled]):not(:hover):not(:active)) > button {
    --flavor-background-color: var(--button-color);
    --flavor-text-color: var(--button-text-color);
  }
      
  :host([disabled]) > button > zeta-icon,
  :host([disabled]) ::slotted(zeta-icon) {
    --icon-color: var(--icon-button-icon-color-disabled, var(--main-disabled));
  }

  :host([flavor]:not([disabled])) > button > zeta-icon,
  :host([flavor]:not([disabled])) ::slotted(zeta-icon) {
    --icon-color: var(--icon-button-icon-color, var(--state-default-enabled));
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

  :host([flavor="subtle"]:not([disabled])) > button > zeta-icon,
  :host([flavor="subtle"]:not([disabled])) ::slotted(zeta-icon) {
    --icon-color: var(--icon-button-icon-color, var(--main-subtle));
  }
`;
