import { css } from "lit";
export default css`
  .drawer-header {
    padding: var(--spacing-6) var(--spacing-4);
    background: var(--surface-default-inverse);
    display: flex;
    gap: var(--spacing-4);
    justify-content: space-between;
    align-items: center;
  }

  :host([divide]) .drawer-header {
    box-shadow: 0 var(--border-size-small) 0 0 var(--border-subtle);
  }

  .main-content {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font: var(--title-medium);
    color: var(--text-inverse);
    margin: 0;
  }

  h2 {
    font: var(--body-x-small);
    color: var(--color-cool-50);
    margin: 0;
  }

  .leading {
    display: flex;
    gap: inherit;
    align-items: center;
  }

  .trailing {
    display: flex;
    justify-self: flex-end;
  }
`;
