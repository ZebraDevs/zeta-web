import { css } from "lit";
export default css`
  :host([size="small"]) {
    .container {
      width: var(--spacing-small);
      height: var(--spacing-small);
    }

    zeta-icon {
      --icon-size: 0;
    }
  }

  :host([size="medium"]) .container {
    width: var(--spacing-medium);
    height: var(--spacing-medium);

    .icon {
      position: absolute;
      right: 1px;
    }
    zeta-icon {
      --icon-size: 8px;
    }
  }

  :host([size="large"]) .container {
    width: var(--spacing-xl);
    height: var(--spacing-xl);

    zeta-icon {
      --icon-size: 12px;
    }
  }

  :host([inverse]) .container {
    border: var(--border-size-medium) solid var(--main-default);
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
      color: var(--main-inverse);
      aspect-ratio: 1 / 1;
    }
  }

  .container.icon {
    background-color: var(--main-primary);
  }

  .container.notification {
    background-color: var(--main-negative);
  }

  :host zeta-icon {
    --icon-color: var(--main-inverse);
  }
`;
