import { css } from "lit";
export default css`
  :host([rounded]) .container {
    border-radius: var(--radius-full);
  }

  :host([disabled]) .container {
    background-color: var(--surface-disabled);
    color: var(--main-disabled);
    outline-color: var(--border-disabled);
  }

  .container {
    height: var(--spacing-5xl);
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-small);
    padding: var(--spacing-small) var(--spacing-medium);
    outline: var(--border-default) solid var(--border-size-small);
    border: none;
    color: var(--main-default);
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
