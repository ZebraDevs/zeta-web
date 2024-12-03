import { css } from "lit";
export default css`
  .system-banner {
    height: var(--spacing-2xl);
    line-height: var(--spacing-2xl);
    white-space: nowrap;
    padding: var(--spacing-small) var(--spacing-large);
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
      padding-inline-end: var(--spacing-small);
    }

    .trailing,
    ::slotted([slot="trailing icon"]) {
      padding-inline-start: var(--spacing-small);
      justify-self: end;
    }
  }

  .system-banner,
  :host([status="default"]) > .system-banner {
    background: var(--surface-primary);
    color: var(--main-inverse);
    --icon-color: var(--main-inverse);
  }
  :host([status="positive"]) > .system-banner {
    background: var(--surface-positive);
    color: var(--main-inverse);
    --icon-color: var(--main-inverse);
  }
  :host([status="warning"]) > .system-banner {
    background: var(--surface-warning);
    color: var(--main-default);
    --icon-color: var(--main-default);
  }
  :host([status="negative"]) > .system-banner {
    background: var(--surface-negative);
    color: var(--main-inverse);
    --icon-color: var(--main-inverse);
  }

  :host([rounded]) > .system-banner {
    border-radius: var(--radius-none) !important;
  }

  .none {
    display: none;
  }
`;
