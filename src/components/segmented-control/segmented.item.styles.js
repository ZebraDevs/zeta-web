import { css } from "lit";

export default css`
  :host > * {
    border: none;
    display: flex;
    width: fit-content;
    padding: var(--spacing-1) var(--spacing-4);
    font-weight: 500;
    font-size: 14px;
    color: var(--text-disabled);
    --icon-color: var(--text-disabled);
    cursor: pointer;
  }

  :host([active]) > * {
    color: var(--text-default);
    background-color: var(--surface-default);
    --icon-color: var(--icon-default);
  }
`;
