import { css } from "lit";
export default css`
  :host {
    display: inline-block;
    width: fit-content;
    height: fit-content;
  }

  [part="container"] {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-sm);
    border-radius: var(--radius-none);
    padding: var(--stroke-thin) calc(var(--space-sm) - var(--stroke-thin));
    border: var(--stroke-thin) solid;

    > [part="icon-container"] {
      max-height: var(--space-lg);
      --icon-size: var(--space-lg);
      zeta-icon {
        width: var(--space-lg);
        height: var(--space-lg);
      }
    }
    > [part="icon-container"],
    > [part="icon-container"] div {
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
    > [part="text"] {
      color: var(--foreground-primary);
      font: var(--body-medium);
      height: var(--space-xl);
    }
  }
  :host([rounded]) > [part="container"] {
    border-radius: var(--radius-pill);
  }

  [part="container"],
  :host([status="neutral"]) > [part="container"],
  :host([status="neutral"]) > [part="container"] svg {
    border-color: var(--border-default);
    background: var(--border-subtle);
    fill: var(--foreground-secondary);
    --icon-color: var(--foreground-secondary);
  }
  :host([status="info"]) > [part="container"],
  :host([status="info"]) > [part="container"] svg {
    border-color: var(--border-info);
    background: var(--surface-info);
    fill: var(--foreground-info);
    --icon-color: var(--foreground-info);
  }
  :host([status="positive"]) > [part="container"],
  :host([status="positive"]) > [part="container"] svg {
    border-color: var(--border-success);
    background: var(--surface-success);
    fill: var(--foreground-success);
    --icon-color: var(--foreground-success);
  }
  :host([status="warning"]) > [part="container"],
  :host([status="warning"]) > [part="container"] svg {
    border-color: var(--border-warning);
    background: var(--surface-warning);
    fill: var(--foreground-warning);
    --icon-color: var(--foreground-warning);
  }
  :host([status="negative"]) > [part="container"],
  :host([status="negative"]) > [part="container"] svg {
    border-color: var(--border-error);
    background: var(--surface-error);
    fill: var(--foreground-error);
    --icon-color: var(--foreground-error);
  }
`;
