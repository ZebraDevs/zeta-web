import { css } from "lit";
export default css`
  :host {
    width: fit-content;
    display: block;
    overflow: hidden;

    .container {
      border-radius: var(--radius-pill);
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      font: var(--label-indicator);
      color: var(--foreground-primary);
      border: var(--stroke-base) solid var(--border-inverse);
      box-sizing: border-box;
      overflow: hidden;
    }
  }

  :host([type="icon"]) .container {
    background-color: var(--foreground-secondary);
    color: var(--foreground-inverse);
  }

  :host([type="notification"]) .container {
    background-color: var(--interactive-destructive-background-default);
    color: var(--foreground-on-strong);
    font-size: var(--indicator-medium-font-size);
    line-height: var(--indicator-medium-line-height);
    letter-spacing: var(--indicator-medium-letter-spacing);
  }

  :host([type="notification"]) .container.large {
    height: var(--control-icon-md);
    min-width: var(--control-icon-lg);
    padding: 0 var(--space-xxs);
  }

  :host .container.small {
    width: var(--control-icon-xxs);
    height: var(--control-icon-xxs);
  }

  :host .container.medium {
    width: var(--control-icon-sm);
    height: var(--control-icon-sm);
    line-height: var(--space-md);
  }

  :host([type="icon"]) .container.small {
    width: var(--control-icon-sm);
    height: var(--control-icon-sm);

    ::slotted(zeta-icon),
    zeta-icon {
      --icon-size: var(--control-icon-xs);
      width: var(--control-icon-xs);
      height: var(--control-icon-xs);
      justify-content: center;
      align-items: center;
    }
  }

  :host([type="icon"]) .container.medium {
    width: var(--control-icon-md);
    height: var(--control-icon-md);

    ::slotted(zeta-icon),
    zeta-icon {
      --icon-size: var(--control-icon-sm);
      width: var(--control-icon-sm);
      height: var(--control-icon-sm);
      justify-content: center;
      align-items: center;
    }
  }

  :host([type="icon"]) .container.large {
    width: var(--control-icon-lg);
    height: var(--control-icon-lg);

    ::slotted(zeta-icon),
    zeta-icon {
      --icon-size: var(--space-xl);
      width: var(--space-xl);
      height: var(--space-xl);
      justify-content: center;
      align-items: center;
    }
  }

  ::slotted(zeta-icon),
  :host zeta-icon {
    --icon-color: var(--foreground-inverse);
    color: var(--foreground-inverse);
  }

  :host([type="notification"]) .container.medium span {
    padding-bottom: var(--stroke-thin);
  }
`;
