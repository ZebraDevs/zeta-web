import { css } from "lit";
export default css`
  :host([rounded]) .container {
    border-radius: var(--radius-full);
  }

  .container {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: var(--spacing-1-5) var(--spacing-3);
    border: var(--border-size-small) solid var(--border-default);
    color: var(--text-default);
    transition: background-color 0.2s ease-out;
    font: var(--body-small);

    &:hover {
      background-color: var(--surface-hover);
    }

    button {
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0;
      background-color: transparent;
      border: none;
    }
  }
`;
