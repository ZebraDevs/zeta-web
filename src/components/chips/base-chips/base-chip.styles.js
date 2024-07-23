import { css } from "lit";
export default css`
  :host([rounded]) .container {
    border-radius: var(--radius-full);
  }

  :host([disabled]) .container {
    background-color: var(--surface-disabled);
    color: var(--text-disabled);
    outline-color: var(--border-disabled);
  }

  .container {
    height: var(--spacing-9);
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    padding: var(--spacing-2) var(--spacing-3);
    outline: var(--border-default) solid var(--border-size-small);
    border: none;
    color: var(--text-default);
    transition: background-color 0.2s ease-out;
    background-color: var(--surface-default);

    &:hover,
    &:active {
      background-color: var(--surface-hover);
    }
  }

  zeta-icon {
    --icon-size: 20px;
  }
`;
