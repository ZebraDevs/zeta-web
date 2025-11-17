import { css } from "lit";
export default css`
  .option {
    display: flex;
    gap: var(--spacing-minimum);
    cursor: pointer;
    background-color: var(--surface-default);
    box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
    transition: background-color 0.2s;
    color: var(--main-subtle);
    -webkit-tap-highlight-color: transparent;
  }

  zeta-icon {
    --icon-color: var(--main-subtle);
  }

  :host([size="small"]) .option {
    margin: var(--spacing-0-5);
    padding: var(--spacing-small);
    font: var(--body-x-small);
  }

  :host([size="medium"]) .option {
    margin: var(--spacing-medium);
    padding: var(--spacing-small);
    font: var(--body-medium);
  }

  :host([size="large"]) .option {
    margin: var(--spacing-large);
    padding: var(--spacing-medium);
    font: var(--body-medium);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    .option:hover {
      background-color: rgb(0, 115, 230, 0.1);
    }
  }

  :host([selected]) .option {
    color: var(--main-default);
    outline: 1px solid var(--border-primary);
  }
`;
