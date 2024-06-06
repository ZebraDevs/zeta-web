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
  }

  :host([size="large"]) > button {
    padding: var(--spacing-3) var(--spacing-6);
  }

  :host > button,
  :host([size="medium"]) > button {
    padding: var(--spacing-2) var(--spacing-3-5);
  }

  :host([size="small"]) > button {
    padding: var(--spacing-1) var(--spacing-2);
    font: var(--label-small);
  }
`;
