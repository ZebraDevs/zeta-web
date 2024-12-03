import { css } from "lit";
export default css`
  .file-upload {
    border: var(--border-size-medium) dashed var(--border-default);
    padding: var(--spacing-4xl);
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: var(--spacing-large);
    user-select: none;
  }

  :host([active]) .file-upload {
    border-color: var(--border-primary);
    background-color: var(--surface-selected);
  }

  .main-content {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: var(--spacing-small);
  }

  h1 {
    font: var(--title-medium);
    margin: 0;
    pointer-events: none;
  }

  h2 {
    font: var(--body-small);
    color: var(--main-subtle);
    padding: 0 var(--spacing-large);
    margin: 0;
    pointer-events: none;
  }

  :host([error]) h2.caption {
    color: var(--main-negative);
  }

  input {
    display: none;
  }
`;
