import { css } from "lit";
export default css`
  :host([size="small"]) {
    .container {
      width: var(--spacing-2);
      height: var(--spacing-2);
    }

    zeta-icon {
      --icon-size: 0;
    }
  }

  :host([size="medium"]) .container.expand {
    width: var(--spacing-3);
    height: var(--spacing-3);
  }

  :host([size="medium"]) .container {
    width: var(--spacing-2);
    height: var(--spacing-2);

    .icon {
      position: absolute;
      right: 1px;
    }
    zeta-icon {
      --icon-size: 8px;
    }
  }

  :host([size="large"]) .container {
    min-width: var(--spacing-3);
    min-height: var(--spacing-3);
    max-width: var(--spacing-4);
    max-height: var(--spacing-4);

    zeta-icon {
      --icon-size: 12px;
    }
  }

  :host([inverse]) .container {
    border: var(--border-size-medium) solid var(--icon-default);
  }

  :host {
    width: auto;
    display: block;

    .container {
      border-radius: var(--radius-full);
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      font: var(--label-indicator);
      color: var(--text-inverse);
      aspect-ratio: 1 / 1;
    }
  }

  .container.icon {
    background-color: var(--icon-flavor-primary);
  }

  .container.notification {
    background-color: var(--icon-flavor-negative);
  }

  :host zeta-icon {
    --icon-color: var(--icon-inverse);
  }
`;
