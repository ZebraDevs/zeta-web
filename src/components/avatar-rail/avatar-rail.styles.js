import { css } from "lit";

export default css`
  :host {
    display: flex;
    width: fit-content;
    max-width: 100%;
    overflow-x: auto;
    height: min-content;
    gap: var(--space-sm);
  }

  :host([show-close]) {
    --show-close: "block";
  }

  ::slotted(:not(zeta-avatar)) {
    display: none;
  }
`;
