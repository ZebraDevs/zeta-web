import { css } from "lit";
export default css`
  :host {
    display: flex;
    align-items: center;
    width: fit-content;
    height: fit-content;
  }

  :host([disabled]) {
    .search-container {
      pointer-events: none;
      background-color: var(--surface-disabled);
    }

    input {
      color: var(--text-subtle);
    }
  }

  .search-container {
    display: flex;
    align-items: center;
    border-radius: inherit;
    height: fit-content;
    outline: var(--border-size-small) solid var(--border-default);
    background-color: var(--surface-default);

    &:hover {
      outline-color: var(--border-hover);
    }
  }

  :host(:active) .search-container {
    outline: var(--border-size-medium) solid var(--border-flavor-primary);
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
    margin: 0 var(--spacing-2);
  }

  zeta-icon[name="search"] {
    margin-right: var(--spacing-2);
  }

  zeta-icon[name="cancel"] {
    margin-left: var(--spacing-2);
  }

  /* SIZE */
  :host([size="small"]) {
    .search-container {
      padding: var(--spacing-1-5) var(--spacing-3);
    }

    .divider {
      height: var(--spacing-5);
    }

    input {
      font: var(--body-small);
    }
  }

  :host([size="medium"]) {
    .search-container {
      padding: var(--spacing-2) var(--spacing-3);
    }

    .divider {
      height: var(--spacing-6);
    }

    input {
      font: var(--body-medium);
    }
  }

  :host([size="large"]) {
    .search-container {
      padding: var(--spacing-3);
    }

    .divider {
      height: var(--spacing-6);
    }

    input {
      font: var(--body-medium);
    }
  }
`;
