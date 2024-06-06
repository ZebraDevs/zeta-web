import { css } from "lit";
export default css`
  .container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-2);
    border-radius: var(--radius-minimal);
    padding-top: 1px;
    padding-bottom: 1px;
    border: var(--border-size-small) solid;

    > .icon-container {
      padding-left: calc(var(--spacing-2) - var(--border-size-small));
      max-height: var(--spacing-5);
    }
    > .icon-container,
    > .icon-container div {
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
    > .text {
      color: var(--text-default);
      font: var(--body-small);
      line-height: 1;
      padding-right: calc(var(--spacing-2) - var(--border-size-small));
    }
  }
  :host([rounded]) > .container {
    border-radius: var(--radius-full);
  }

  .container,
  :host([status="neutral"]) > .container,
  :host([status="neutral"]) > .container svg {
    fill: var(--icon-subtle);
    border-color: var(--border-default);
    background: var(--icon-light);
  }
  :host([status="info"]) > .container,
  :host([status="info"]) > .container svg {
    border-color: var(--border-flavor-info);
    background: var(--surface-flavor-info-subtle);
    fill: var(--icon-flavor-info);
  }
  :host([status="positive"]) > .container,
  :host([status="positive"]) > .container svg {
    border-color: var(--border-flavor-positive);
    background: var(--surface-flavor-positive-subtle);
    fill: var(--icon-flavor-positive);
  }
  :host([status="warning"]) > .container,
  :host([status="warning"]) > .container svg {
    border-color: var(--border-flavor-warning);
    background: var(--surface-flavor-warning-subtle);
    fill: var(--icon-flavor-warning);
  }
  :host([status="negative"]) > .container,
  :host([status="negative"]) > .container svg {
    border-color: var(--border-flavor-negative);
    background: var(--surface-flavor-negative-subtle);
    fill: var(--icon-flavor-negative);
  }
`;
