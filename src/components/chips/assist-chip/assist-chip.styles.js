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
    box-shadow: 0 0 0 var(--border-size-small) var(--border-default);
    outline-width: var(--border-size);
    color: var(--text-default);
    transition: background-color 0.2s ease-out;

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
    span {
      font: var(--body-small);
      line-height: var(--spacing-5);
    }
  }
`;
