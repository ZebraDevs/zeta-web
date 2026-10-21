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
      aspect-ratio: 1 / 1;
      border: var(--stroke-thick) solid var(--surface-page);
      overflow: hidden;
    }
  }

  :host([type="icon"]) .container {
    background-color: var(--interactive-ghost-foreground-default);
  }

  :host([type="notification"]) .container {
    background-color: var(--interactive-destructive-background-default);
    color: var(--interactive-destructive-foreground-default);
    font-size: var(--indicator-medium-font-size);
    line-height: var(--indicator-medium-line-height);
    letter-spacing: var(--indicator-medium-letter-spacing);
    border: var(--stroke-thick) solid var(--border-inverse);
  }

  :host([type="notification"]) .container.large {
    height: calc(var(--space-lg) - var(--stroke-thick));
    width: calc(calc(var(--space-xl) + var(--space-xs)) - var(--stroke-thick));
    border: none;
    box-shadow: 0 0 0 var(--stroke-thin) var(--border-inverse);
    margin: var(--stroke-thin);
    box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 var(--space-xs);
    border-radius: var(--radius-sm);

    span {
      height: calc(var(--space-md) + var(--stroke-thin));
    }
  }

  :host .container.small {
    width: var(--space-sm);
    height: var(--space-sm);

    ::slotted(zeta-icon),
    zeta-icon {
      --icon-size: var(--space-none);
    }
  }

  :host .container.medium {
    width: var(--space-md);
    height: var(--space-md);
    line-height: var(--space-md);

    ::slotted(zeta-icon),
    zeta-icon {
      --icon-size: var(--space-sm);
      width: var(--space-sm);
      height: var(--space-sm);
      justify-content: center;
      align-items: center;
    }
  }

  :host([type="icon"]) .container.large {
    width: var(--space-lg);
    height: var(--space-lg);

    ::slotted(zeta-icon),
    zeta-icon {
      --icon-size: var(--space-md);
      width: var(--space-md);
      height: var(--space-md);
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
