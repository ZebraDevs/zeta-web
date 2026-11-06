import { css } from "lit";
export default css`
  :host > button {
    flex-direction: column;
    width: calc((var(--space-2xl) * 2) + var(--space-lg));
    height: calc((var(--space-2xl) * 2) + var(--space-lg));
    gap: var(--space-xs);
    padding: var(--space-lg) var(--space-sm);
  }
  .button-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    display: block;
  }
`;
