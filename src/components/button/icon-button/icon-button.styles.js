import { css } from "lit";
export default css`
  :host {
    height: fit-content;
    width: fit-content;
  }

  :host > button {
    border: none;
    padding: var(--space-xs);
  }

  :host([size="large"]) > button {
    width: var(--control-lg);
    height: var(--control-lg);
  }

  :host([size="large"]) > button > zeta-icon {
    --icon-size: var(--control-icon-md);
  }

  :host > button,
  :host([size="medium"]) > button {
    width: var(--control-md);
    height: var(--control-md);
  }

  :host([size="small"]) > button {
    width: var(--control-sm);
    height: var(--control-sm);
  }

  :host([flavor="custom"]:not([disabled])) > button {
    --flavor-background-color: var(--button-color, var(--icon-button-color));
  }
`;
