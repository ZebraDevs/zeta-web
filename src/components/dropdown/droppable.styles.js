import { css } from "lit";
export default css`
  :host {
    display: none;
    position: absolute;
  }

  :host([open]) {
    display: flex;
    flex-direction: column;
    background-color: var(--surface-default);
    gap: var(--spacing-minimum);
    padding: var(--spacing-medium);
    box-shadow: var(--elevation-3);
    z-index: 5;
    overflow-x: auto;
  }

  :host([rounded]) {
    border-radius: var(--radius-minimal);
  }
`;
