import { css } from "lit";
export default css`
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
