import { css } from "lit";
export default css`
  :host > button {
    flex-direction: column;
    min-width: var(--spacing-10xl);
    gap: var(--spacing-minimum);
    padding: var(--spacing-large) var(--spacing-small);
  }
`;
