import { css } from "lit";
export default css`
  :host > button {
    flex-direction: column;
    min-width: var(--spacing-10-xl, 80px);
    gap: var(--spacing-minimum, 4px);
    padding: var(--spacing-large, 16px) var(--spacing-small, 8px);
  }
`;
