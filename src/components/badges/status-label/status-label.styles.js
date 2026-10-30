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
    box-sizing: border-box;
    height: var(--scale-10);
    border-radius: var(--radius-none);
    padding: var(--space-2xs) var(--space-xxs);
    border: var(--stroke-thin) solid;

    > [part="icon-container"] {
      width: var(--control-icon-sm);
      height: var(--control-icon-sm);
      --icon-size: var(--control-icon-sm);
      zeta-icon {
        width: var(--control-icon-sm);
        height: var(--control-icon-sm);
      }
      svg {
        width: var(--control-icon-xxs);
        height: var(--control-icon-xxs);
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
      font: var(--body-small);
      padding: 0 var(--space-xxs);
    }
  }
  :host([rounded]) > [part="container"] {
    border-radius: var(--radius-pill);
  }

  [part="container"],
  :host([status="neutral"]) > [part="container"],
  :host([status="neutral"]) > [part="container"] svg {
    border-color: var(--border-default);
    background: var(--feedback-neutral-background-subtle);
    fill: var(--foreground-primary);
    --icon-color: var(--foreground-primary);
  }
  :host([status="info"]) > [part="container"],
  :host([status="info"]) > [part="container"] svg {
    border-color: var(--border-info);
    background: var(--feedback-info-background-subtle);
    fill: var(--foreground-info);
    --icon-color: var(--foreground-info);
  }
  :host([status="positive"]) > [part="container"],
  :host([status="positive"]) > [part="container"] svg {
    border-color: var(--border-success);
    background: var(--feedback-success-background-subtle);
    fill: var(--foreground-success);
    --icon-color: var(--foreground-success);
  }
  :host([status="warning"]) > [part="container"],
  :host([status="warning"]) > [part="container"] svg {
    border-color: var(--border-warning);
    background: var(--feedback-warning-background-subtle);
    fill: var(--foreground-warning);
    --icon-color: var(--foreground-warning);
  }
  :host([status="negative"]) > [part="container"],
  :host([status="negative"]) > [part="container"] svg {
    border-color: var(--border-error);
    background: var(--feedback-error-background-subtle);
    fill: var(--foreground-error);
    --icon-color: var(--foreground-error);
  }
`;
