import { css } from "lit";
export default css`
  :host([rounded]) .container {
    border-radius: var(--radius-full);
  }

  :host([type="selected"]) .container {
    background: var(--surface-pressed);
  }
  zeta-icon {
    --icon-size: 20px;
  }
  :host([type="selected"]) zeta-icon {
    --icon-color: var(--icon-inverse);
  }

  .container {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: var(--spacing-1-5) var(--spacing-3);
    box-shadow: 0 0 0 var(--border-size-medium) var(--border-default);
    color: var(--text-default);
    transition: background-color 0.2s ease-out;

    span {
      font: var(--body-small);
    }

    .icon {
      display: flex;
    }

    &:hover {
      background-color: var(--surface-hover);
    }

    &:disabled {
      background-color: var(--surface-disabled);
      color: var(--text-disabled);
    }
  }
`;
