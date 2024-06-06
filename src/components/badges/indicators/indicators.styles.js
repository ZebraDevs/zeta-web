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
  }

  :host([size="large"]) .container {
    width: var(--spacing-4);
    height: var(--spacing-4);

    .count {
      font: var(--label-indicator);
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
`;
