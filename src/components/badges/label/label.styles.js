import { css } from "lit";
export default css`
  :host {
    width: fit-content;
    display: inline-block;
  }
  :host([status="info"]) .container {
    background: var(--foreground-info);
  }

  :host([status="positive"]) .container {
    background: var(--foreground-success);
  }

  :host([status="warning"]) .container {
    background: var(--foreground-warning);
  }

  :host([status="negative"]) .container {
    background: var(--foreground-error);
  }

  .container,
  :host([status="neutral"]) .container {
    background: var(--border-subtle);
    .text {
      color: var(--foreground-primary);
    }
  }

  :host(:not([status="neutral"])) .container .text {
    color: var(--foreground-primary);
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    width: fit-content;

    min-width: var(--space-sm);
    min-height: var(--space-lg);
    .text {
      padding: var(--space-none) var(--space-xs);
      font: var(--label-small);
    }
  }
`;
