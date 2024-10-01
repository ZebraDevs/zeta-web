import { css } from "lit";
export default css`
  :host {
    display: flex;
    height: fit-content;
    width: fit-content;
  }
  :host > button {
    display: flex;
    align-items: center;
    border: none;
    justify-content: center;
    overflow-x: ellipsis;
    width: 100%;
    font: var(--label-large);
    gap: var(--spacing-small);
  }

  :host([size="large"]) > button {
    padding: var(--spacing-medium) var(--spacing-2xl);
    --icon-size: 24px;
  }

  :host > button,
  :host([size="medium"]) > button {
    padding: var(--spacing-small) var(--spacing-medium);
    --icon-size: 24px;
  }

  :host([size="small"]) > button {
    padding: var(--spacing-minimum) var(--spacing-small);
    font: var(--label-small);
    --icon-size: 20px;
  }
`;
