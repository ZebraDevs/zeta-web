import { css } from "lit";
export default css`
  :host {
    display: flex;
    align-items: center;
    width: fit-content;
    height: fit-content;
    --icon-size: 20px;
    --icon-color: var(--text-subtle);
    --icon-color: var(--text-subtle);
  }

  :host([disabled]) {
    --icon-color: var(--text-disabled);
    .contourable-target {
      pointer-events: none;
      background-color: var(--surface-disabled);
    }

    input {
      color: var(--text-subtle);
    }
  }

  #search-icon {
    display: var(--search-icon-display, block);
  }

  :host(:not([disabled])) zeta-icon.right {
    --icon-color: var(--icon-default);
  }

  :host([round="full"][rounded]) .contourable-target {
    border-radius: var(--radius-full);
  }

  form {
    display: flex;
    flex: 1;
    align-items: center;
    border-radius: inherit;
    height: fit-content;
    box-shadow: 0 0 0 var(--border-size-small) var(--search-border-color, var(--border-default));

    background-color: var(--surface-default);
    flex-shrink: 0;
    gap: var(--spacing-small);

    &:hover {
      box-shadow: 0 0 0 var(--border-size-small) var(--border-hover);
    }

    &:has(input:focus) {
      box-shadow: 0 0 0 var(--border-size-medium) var(--border-flavor-primary);
    }
  }

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }

  input {
    background-color: inherit;
    border: none;
    outline: none;
    caret-color: var(--text-flavor-primary);
    color: var(--text-subtle);
    flex: 1;
    padding: 0;
    margin: 0;

    &::placeholder {
      font-size: inherit;
      line-height: inherit;
    }
  }

  .divider {
    display: flex;
    width: var(--border-size-small);
    background-color: var(--border-default);
  }

  /* SIZE */
  :host([size="small"]) {
    --icon-size: 16px;

    .contourable-target {
      padding: var(--spacing-1-5);
    }

    .divider {
      height: var(--spacing-large);
    }

    input {
      font: var(--body-small);
    }
  }

  :host([size="medium"]) {
    --icon-size: 20px;

    .contourable-target {
      padding: var(--spacing-2); /*TODO Semantic not yet ready*/
    }

    .divider {
      height: var(--spacing-6); /*TODO Semantic not yet ready*/
    }

    input {
      font: var(--body-medium);
    }
  }

  :host([size="large"]) {
    --icon-size: 24px;

    .contourable-target {
      padding: var(--spacing-small);
    }

    .divider {
      height: var(--spacing-6); /*TODO Semantic not yet ready*/
    }

    input {
      font: var(--body-medium);
    }
  }
`;
