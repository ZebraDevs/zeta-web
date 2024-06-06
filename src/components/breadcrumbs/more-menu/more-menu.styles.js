import { css } from "lit";
export default css`
  .container {
    width: fit-content;
    padding: var(--spacing-0-5) var(--spacing-2);
    background-color: var(--surface-warm);

    border: 0.5px solid var(--border-default);

    transition: background-color 0.2s ease-out;

    .icon {
      display: block;
    }

    &:hover {
      border-color: transparent;
      background: var(--surface-hover);
    }

    &:active {
      border-color: transparent;
      background: var(--surface-pressed);
    }
  }

  :host([rounded]) {
    border-radius: var(--radius-minimal);
  }
`;
