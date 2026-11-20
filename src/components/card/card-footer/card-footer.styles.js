import { css } from "lit";
export default css`
  :host {
    display: block;
    background-color: var(--surface-card);
    overflow: hidden;
  }

  .card-footer {
    padding: var(--space-lg);
    gap: var(--space-sm);
    display: flex;
  }

  ::slotted(zeta-button:not([flavor="text"])) {
    width: max-content;
    flex: 1;
  }
`;
