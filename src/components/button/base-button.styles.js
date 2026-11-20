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

    slot {
      padding: 0 var(--space-sm);
    }
  }

  :host([size="large"]) > button {
    padding: var(--space-xs) var(--space-lg);
    min-height: var(--control-lg);
    gap: var(--space-sm);
  }

  :host > button,
  :host([size="medium"]) > button {
    padding: var(--space-xs) var(--space-md);
    min-height: var(--control-md);
    gap: var(--space-sm);
  }

  :host([size="small"]) > button {
    padding: var(--space-xs) var(--space-md);
    font: var(--label-medium);
    min-height: var(--control-sm);
    gap: var(--space-xs);

    slot {
      padding: 0 var(--space-xs);
    }
  }

  :host([flavor="custom"]:not([disabled])) > button {
    --flavor-background-color: var(--button-color);
    --flavor-text-color: var(--button-text-color);
  }

  :host([flavor="custom"][disabled]) > button {
    --flavor-disabled-background-color: var(--button-disabled-color);
    --flavor-disabled-text-color: var(--button-disabled-text-color);
  }

  :host([flavor="custom"][disabled]) > button > zeta-icon,
  :host([flavor="custom"][disabled]) ::slotted(zeta-icon) {
    --icon-color: var(--icon-button-icon-color-disabled, var(--foreground-disabled));
  }

  :host([flavor="custom"]:not([disabled])) > button > zeta-icon,
  :host([flavor="custom"]:not([disabled])) ::slotted(zeta-icon) {
    --icon-color: var(--icon-button-icon-color, var(--foreground-primary));
  }

  :host([flavor="outline"]:not([disabled])) > button > zeta-icon,
  :host([flavor="text"]:not([disabled])) > button > zeta-icon,
  :host([flavor="outline"]:not([disabled])) ::slotted(zeta-icon),
  :host([flavor="text"]:not([disabled])) ::slotted(zeta-icon) {
    --icon-color: var(--interactive-ghost-foreground-default);
  }

  :host([flavor="primary"]:not([disabled])) > button > zeta-icon,
  :host([flavor="positive"]:not([disabled])) > button > zeta-icon,
  :host([flavor="negative"]:not([disabled])) > button > zeta-icon,
  :host([flavor="gradient"]:not([disabled])) > button > zeta-icon,
  :host([flavor="primary"]:not([disabled])) ::slotted(zeta-icon),
  :host([flavor="positive"]:not([disabled])) ::slotted(zeta-icon),
  :host([flavor="negative"]:not([disabled])) ::slotted(zeta-icon),
  :host([flavor="gradient"]:not([disabled])) ::slotted(zeta-icon) {
    --icon-color: var(--interactive-primary-foreground-default);
  }

  :host([flavor="outline-subtle"]:not([disabled])) > button > zeta-icon,
  :host([flavor="outline-subtle"]:not([disabled])) ::slotted(zeta-icon) {
    --icon-color: var(--interactive-neutral-foreground-default);
  }

  :host([flavor="subtle"]:not([disabled])) > button > zeta-icon,
  :host([flavor="subtle"]:not([disabled])) ::slotted(zeta-icon) {
    --icon-color: var(--foreground-primary);
  }
`;
