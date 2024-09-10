import { css } from "lit";

export default css`
  :host {
    display: flex;
    max-width: 64px;
  }

  :host(:not([disabled])[selected]) > * {
    --icon-color: var(--text-default);
    color: var(--text-subtle);
    background-color: var(--surface-selected);
  }

  :host > * {
    display: flex;
    overflow-x: hidden;
    text-overflow: ellipsis;
    text-align: center;
    flex-direction: column;
    align-items: center;
    padding: var(--spacing-medium) var(--spacing-large);
    color: var(--main-subtle);
    font-weight: 500;
    --icon-color: var(--main-subtle);
    background-color: var(--surface-default);

    &:hover {
      background-color: var(--surface-hover);
      color: var(--main-default);
      --icon-color: var(--main-default);
    }
  }
`;
