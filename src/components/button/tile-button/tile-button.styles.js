import { css } from "lit";
export default css`
  :host > button {
    flex-direction: column;
    width: var(--spacing-10xl);
    height: var(--spacing-10xl);
    gap: var(--spacing-minimum);
    padding: var(--spacing-large) var(--spacing-small);
  }
  .button-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    display: block;
  }
`;
