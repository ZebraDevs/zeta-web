import { css } from "lit";
export default css`
  :host {
    width: fit-content;
    display: block;
    overflow: hidden;

    .container {
      border-radius: var(--radius-full);
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      font: var(--label-indicator);
      color: var(--main-inverse);
      aspect-ratio: 1 / 1;
      border: var(--border-size-medium) solid var(--main-inverse);
    }
  }

  :host([type="icon"]) .container {
    background-color: var(--main-primary);
  }

  :host([type="notification"]) .container {
    background-color: var(--main-negative);
    border: var(--border-size-medium) solid var(--border-pure);
  }

  :host([type="notification"]) .container.large {
    padding: var(--spacing-none) calc(var(--spacing-minimum) - var(--border-size-small));
    width: calc(var(--spacing-large) - var(--border-size-small));
    height: calc(var(--spacing-large) - var(--border-size-medium));
    border: var(--border-size-small) solid var(--border-pure);
    border-radius: calc(var(--radius-rounded) - var(--border-size-medium));

    span {
      padding-bottom: var(--spacing-0);
    }
  }

  :host([type="notification"]) .container.larger {
    height: calc(var(--spacing-large) + var(--border-size-small));
    width: var(--spacing-3xl);
    padding: var(--spacing-none);
  }

  :host .container.small {
    width: var(--spacing-small);
    height: var(--spacing-small);

    ::slotted(zeta-icon),
    zeta-icon {
      --icon-size: var(--spacing-none);
    }
  }

  :host .container.medium {
    width: var(--spacing-medium);
    height: var(--spacing-medium);
    line-height: var(--spacing-medium);

    ::slotted(zeta-icon),
    zeta-icon {
      --icon-size: var(--spacing-small);
      width: var(--spacing-small);
      height: var(--spacing-small);
      justify-content: center;
      align-items: center;
    }
  }

  :host([type="icon"]) .container.large {
    width: var(--spacing-xl);
    height: var(--spacing-xl);

    ::slotted(zeta-icon),
    zeta-icon {
      --icon-size: var(--spacing-medium);
      width: var(--spacing-medium);
      height: var(--spacing-medium);
      justify-content: center;
      align-items: center;
    }
  }

  ::slotted(zeta-icon),
  :host zeta-icon {
    --icon-color: var(--main-inverse);
  }

  :host([type="notification"]) .container.medium span,
  :host([type="notification"]) .container.large span {
    line-height: var(--spacing-medium);
    height: var(--spacing-medium);
    padding-bottom: var(--border-size-medium);
  }
  :host([type="notification"]) .container.large span {
    margin-bottom: calc(var(--spacing-none) - var(--border-size-small));
    padding-bottom: var(--spacing-none);
  }
`;
