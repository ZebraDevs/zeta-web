import { css } from "lit";
export default css`
  .card-footer {
    padding: var(--spacing-large);
    gap: var(--spacing-medium);
    display: flex;
  }

  ::slotted(zeta-button:not([flavor="text"])) {
    width: max-content;
    flex: 1;
  }
`;
