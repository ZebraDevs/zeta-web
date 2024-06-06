import { css } from "lit";
export default css`
  :host {
    display: flex;
    height: fit-content;
    width: fit-content;
  }

  :host > button {
    border: none;
  }

  :host([size="large"]) > button {
    padding: var(--spacing-3);
  }

  :host > button,
  :host([size="medium"]) > button {
    padding: var(--spacing-2);
  }

  :host([size="small"]) > button {
    padding: var(--spacing-1-5);
  }

  :host([disabled]) > button > zeta-icon {
    --icon-color: var(--icon-disabled);
  }

  :host([flavor="outline"]:not([disabled])) > button > zeta-icon,
  :host([flavor="text"]:not([disabled])) > button > zeta-icon {
    --icon-color: var(--icon-flavor-primary);
  }

  :host([flavor="outline-subtle"]:not([disabled])) > button > zeta-icon {
    --icon-color: var(--icon-default);
  }
  :host([flavor="primary"]:not([disabled])) > button > zeta-icon,
  :host([flavor="secondary"]:not([disabled])) > button > zeta-icon,
  :host([flavor="positive"]:not([disabled])) > button > zeta-icon,
  :host([flavor="negative"]:not([disabled])) > button > zeta-icon {
    --icon-color: var(--icon-inverse);
  }
`;
