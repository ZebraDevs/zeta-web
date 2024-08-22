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

  :host([size="medium"]) .container {
    width: var(--spacing-3);
    height: var(--spacing-3);

    .icon {
      position: absolute;
      right: 1px;
    }
    zeta-icon {
      --icon-size: 8px;
    }
  }

  :host([size="large"]) .container {
    width: var(--spacing-5);
    height: var(--spacing-5);

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
