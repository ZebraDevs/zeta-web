import { css } from "lit";
export default css`
  :host([alignment="start"]) .container {
    justify-content: flex-start;
  }

  :host([alignment="center"]) .container {
    justify-content: center;
  }

  :host([alignment="end"]) .container {
    justify-content: flex-end;
  }

  .container {
    display: flex;
    align-items: center;
    color: var(--text-default);
    padding: var(--spacing-3) var(--spacing-4);
    font: var(--title-medium);
  }
`;
