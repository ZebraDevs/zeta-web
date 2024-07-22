import { css } from "lit";
export default css`
  :host([size="small"]) {
    .container {
      min-width: var(--spacing-2);
      min-height: var(--spacing-2);
    }

    .count {
      display: none;
    }

    zeta-icon {
      --icon-size: 0;
    }
  }

  :host([size="medium"]) .container {
    width: var(--spacing-3);
    height: var(--spacing-3);

    .count {
      font: var(--label-indicator);
    }

    .icon {
      position: absolute;
      right: 1px;
    }
    zeta-icon {
      --icon-size: 8px;
    }
  }

  :host([size="large"]) .container {
    width: var(--spacing-4);
    height: var(--spacing-4);

    .count {
      font: var(--label-indicator);
    }
    zeta-icon {
      --icon-size: 12px;
    }
  }

  :host([inverse]) .container {
    border: var(--border-size-medium) solid var(--icon-default);
  }

  :host {
    width: fit-content;
    display: block;

    .container {
      border-radius: var(--radius-full);
      width: fit-content;
      height: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
  }

  .container.icon {
    background-color: var(--icon-flavor-primary);
  }

  .container.notification {
    background-color: var(--icon-flavor-negative);
  }

  :host .container {
    .count {
      position: absolute;
      color: var(--text-inverse);
    }
  }
  :host zeta-icon {
    --icon-color: var(--icon-inverse);
  }
`;
