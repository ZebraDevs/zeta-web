import { css } from "lit";
export default css`
  .system-banner {
    height: var(--spacing-6);
    line-height: var(--spacing-6);
    white-space: nowrap;
    padding: var(--spacing-2) var(--spacing-4);
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    > div {
      display: flex;
    }
    > .text,
    > .icon {
      text-align: "center";
      font: var(--title-medium);
    }
    .leading,
    ::slotted([slot="leading icon"]) {
      padding-inline-end: var(--spacing-2);
    }

    .trailing,
    ::slotted([slot="trailing icon"]) {
      padding-inline-start: var(--spacing-2);
      justify-self: end;
    }
  }

  .system-banner,
  :host([status="default"]) > .system-banner {
    background: var(--surface-flavor-primary);
    color: var(--text-inverse);
    --icon-color: var(--text-inverse);
  }
  :host([status="positive"]) > .system-banner {
    background: var(--surface-flavor-positive);
    color: var(--text-inverse);
    --icon-color: var(--text-inverse);
  }
  :host([status="warning"]) > .system-banner {
    background: var(--surface-flavor-warning);
    color: var(--text-default);
    --icon-color: var(--text-default);
  }
  :host([status="negative"]) > .system-banner {
    background: var(--surface-flavor-negative);
    color: var(--text-inverse);
    --icon-color: var(--text-inverse);
  }

  :host([rounded]) > .system-banner {
    border-radius: var(--radius-none) !important;
  }

  .none {
    display: none;
  }
`;
