import { css } from "lit";
export default css`
  :host([flavor="gradient"]:not([disabled])) > button {
    background-image: linear-gradient(135deg, var(--surface-gradient-start) 0%, var(--surface-gradient-end) 87%);
  }

  :host([flavor="text-gradient"]:not([disabled])) > button {
    --text-gradient: linear-gradient(129deg, var(--foreground-gradient-start) 0%, var(--foreground-gradient-end) 100%);
    background-image: none;
  }

  :host([flavor="text-gradient"]:not([disabled])) > button > slot {
    display: inline-block;
    background: var(--text-gradient, none);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  :host([flavor="text-gradient"]:not([disabled])) > button > zeta-icon,
  :host([flavor="text-gradient"]:not([disabled])) ::slotted(zeta-icon) {
    --icon-color: var(--foreground-gradient-start);
  }
`;
