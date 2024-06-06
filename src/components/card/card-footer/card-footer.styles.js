import { css } from "lit";
export default css`
  .card-footer {
    padding: var(--spacing-4);
    gap: var(--spacing-3);
    display: flex;
  }

  ::slotted(zeta-button:not([flavor="text"])) {
    width: max-content;
    flex: 1;
  }
`;
