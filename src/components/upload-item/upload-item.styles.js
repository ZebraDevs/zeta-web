import { css } from "lit";

export default css`
  :host {
    display: flex;
    min-height: 64px;
    -webkit-tap-highlight-color: transparent;
  }

  :host > div {
    flex: 1;
    min-width: fit-content;
    display: flex;
    gap: var(--spacing-3);
    padding: var(--spacing-2) var(--spacing-3);
    user-select: none;
    background-color: var(--surface-default);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host > div:hover {
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

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host([flavor="completed"]) > div,
    :host([flavor="completed"]) > div:hover {
      background-color: var(--surface-flavor-positive-subtle);
    }
  }

  :host([flavor="completed"]) {
    .subtitle {
      color: var(--text-flavor-positive);
    }

    .trailing {
      --icon-color: var(--text-flavor-positive);
    }
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host([flavor="error"]) > div,
    :host([flavor="error"]) > div:hover {
      background-color: var(--surface-flavor-negative-subtle);
    }
  }

  :host([flavor="error"]) {
    .subtitle {
      color: var(--text-flavor-negative);
    }
    .trailing {
      --icon-color: var(--text-flavor-negative);
    }
  }
`;
