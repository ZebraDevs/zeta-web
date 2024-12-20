import { css } from "lit";

export default css`
  :host {
    display: flex;
    flex-direction: column;
    width: min-content;
    gap: var(--spacing-minimum);
  }

  ::slotted(:not(zeta-navigation-rail-item)) {
    display: none;
  }
`;
