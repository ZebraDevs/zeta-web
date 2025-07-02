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
      color: var(--state-default-enabled);
      aspect-ratio: 1 / 1;
      border: var(--border-size-medium) solid var(--main-inverse);
      overflow: hidden;
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
    height: calc(var(--spacing-large) - var(--border-size-medium));
    width: calc(var(--spacing-3xl) - var(--border-size-medium));
    border: none;
    box-shadow: 0 0 0 var(--border-size-small) var(--border-pure);
    margin: var(--border-size-small);
    box-sizing: border-box;
    box-sizing: border-box;
    padding: var(--spacing-none);
    border-radius: var(--radius-minimal);

    span {
      height: calc(var(--spacing-medium) + var(--border-size-small));
    }
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
    --icon-color: var(--state-default-enabled);
    color: var(--state-default-enabled);
  }

  :host([type="notification"]) .container.medium span {
    padding-bottom: var(--border-size-small);
  }
`;
