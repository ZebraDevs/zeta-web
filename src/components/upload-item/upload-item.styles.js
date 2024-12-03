import { css } from "lit";

export default css`
  :host {
    display: flex;
    min-height: 64px;
  }

  :host > div {
    flex: 1;
    min-width: fit-content;
    display: flex;
    gap: var(--spacing-3);
    padding: var(--spacing-2) var(--spacing-3);
    user-select: none;
    background-color: var(--surface-default);

    &:hover {
      background-color: var(--surface-hover);
    }
  }

  .body {
    display: flex;
    flex: 1;
    gap: var(--spacing-1);
    flex-direction: column;
    justify-content: center;
  }

  .trailing {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
  }

  #cancel {
    display: none;
    --icon-color: var(--text-default);
    cursor: pointer;
  }
  .title,
  .subtitle {
    font-weight: 500;
  }

  .title {
    color: var(--text-default);
    font-size: 14px;
  }

  .subtitle {
    color: var(--text-subtle);
    font-size: 12px;
  }

  slot[name="leading"] {
    display: flex;
    align-items: center;
  }

  :host([flavor="completed"]),
  :host([flavor="error"]) {
    #cancel {
      display: flex;
    }
    .trailing {
      margin-right: var(--spacing-3);
    }
    zeta-progress-circle {
      display: none;
    }
  }

  :host([flavor="completed"]) {
    > div,
    > div:hover {
      background-color: var(--surface-flavor-positive-subtle);
    }
    .subtitle {
      color: var(--text-flavor-positive);
    }

    .trailing {
      --icon-color: var(--text-flavor-positive);
    }
  }
  :host([flavor="error"]) {
    > div,
    > div:hover {
      background-color: var(--surface-flavor-negative-subtle);
    }
    .subtitle {
      color: var(--text-flavor-negative);
    }
    .trailing {
      --icon-color: var(--text-flavor-negative);
    }
  }
`;
