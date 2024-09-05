import { css } from "lit";
export default css`
  .container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-small);
    border-radius: var(--radius-minimal);
    padding-top: 1px;
    padding-bottom: 1px;
    border: var(--border-size-small) solid;

    > .icon-container {
      padding-left: calc(var(--spacing-small) - var(--border-size-small));
      max-height: var(--spacing-xl);
      --icon-size: 20px;
    }
    > .icon-container,
    > .icon-container div {
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
    > .text {
      color: var(--main-default);
      font: var(--body-small);
      line-height: 1;
      padding-right: calc(var(--spacing-small) - var(--border-size-small));
    }
  }
  :host([rounded]) > .container {
    border-radius: var(--radius-full);
  }

  .container,
  :host([status="neutral"]) > .container,
  :host([status="neutral"]) > .container svg {
    fill: var(--main-subtle);
    border-color: var(--border-default);
    background: var(--main-light);
  }
  :host([status="info"]) > .container,
  :host([status="info"]) > .container svg {
    border-color: var(--border-info);
    background: var(--surface-info-subtle);
    fill: var(--main-info);
  }
  :host([status="positive"]) > .container,
  :host([status="positive"]) > .container svg {
    border-color: var(--border-positive);
    background: var(--surface-positive-subtle);
    fill: var(--main-positive);
  }
  :host([status="warning"]) > .container,
  :host([status="warning"]) > .container svg {
    border-color: var(--border-warning);
    background: var(--surface-warning-subtle);
    fill: var(--main-warning);
  }
  :host([status="negative"]) > .container,
  :host([status="negative"]) > .container svg {
    border-color: var(--border-negative);
    background: var(--surface-negative-subtle);
    fill: var(--main-negative);
  }
`;
