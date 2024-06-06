import { css } from "lit";
export default css`
  .file-upload {
    border: var(--border-size-medium) dashed var(--border-default);
    padding: var(--spacing-8);
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: var(--spacing-4);
    user-select: none;

    &[active] {
      border-color: var(--border-flavor-primary);
      background-color: var(--surface-pressed);
    }
  }

  .main-content {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: var(--spacing-2);
  }

  h1 {
    font: var(--title-medium);
    margin: 0;
    pointer-events: none;
  }

  h2 {
    font: var(--body-small);
    color: var(--text-subtle);
    padding: 0 var(--spacing-4);
    margin: 0;
    pointer-events: none;

    &[error] {
      color: var(--text-flavor-negative);
    }
  }

  input {
    display: none;
  }
`;
