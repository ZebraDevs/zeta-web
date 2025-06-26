import { css } from "lit";
export default css`
  :host {
    display: inline-block;
    width: fit-content;
    height: fit-content;
  }
  .container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-small);
    border-radius: var(--radius-none);
    padding: var(--border-size-small) calc(var(--spacing-small) - var(--border-size-small));
    border: var(--border-size-small) solid;

    > .icon-container {
      max-height: var(--spacing-xl);
      --icon-size: var(--spacing-xl);
      zeta-icon {
        width: var(--spacing-xl);
        height: var(--spacing-xl);
      }
    }
    > .icon-container,
    > .icon-container div {
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
    > .text {
      color: var(--main-default);
      font: var(--body-medium);
      height: var(--spacing-2xl);
    }
  }
  :host([rounded]) > .container {
    border-radius: var(--radius-full);
  }

  .container,
  :host([status="neutral"]) > .container,
  :host([status="neutral"]) > .container svg {
    border-color: var(--border-default);
    background: var(--main-light);
    fill: var(--main-subtle);
    --icon-color: var(--main-subtle);
  }
  :host([status="info"]) > .container,
  :host([status="info"]) > .container svg {
    border-color: var(--border-info);
    background: var(--surface-info-subtle);
    fill: var(--main-info);
    --icon-color: var(--main-info);
  }
  :host([status="positive"]) > .container,
  :host([status="positive"]) > .container svg {
    border-color: var(--border-positive);
    background: var(--surface-positive-subtle);
    fill: var(--main-positive);
    --icon-color: var(--main-positive);
  }
  :host([status="warning"]) > .container,
  :host([status="warning"]) > .container svg {
    border-color: var(--border-warning);
    background: var(--surface-warning-subtle);
    fill: var(--main-warning);
    --icon-color: var(--main-warning);
  }
  :host([status="negative"]) > .container,
  :host([status="negative"]) > .container svg {
    border-color: var(--border-negative);
    background: var(--surface-negative-subtle);
    fill: var(--main-negative);
    --icon-color: var(--main-negative);
  }
`;
