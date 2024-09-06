import { css } from "lit";

export default css`
  :host > * {
    border: none;
    display: flex;
    width: fit-content;
    padding: var(--spacing-minimum) var(--spacing-large);
    font-weight: 500;
    font-size: 14px;
    color: var(--main-disabled);
    --icon-color: var(--main-disabled);
    cursor: pointer;
    transition: color 0.3s ease-in-out;
  }

  :host([active]) > * {
    color: var(--main-default);
    background-color: var(--surface-default);
    --icon-color: var(--main-default);
  }
`;
