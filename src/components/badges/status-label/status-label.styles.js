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
    gap: var(--spacing-small);
    border-radius: var(--radius-none);
    padding: var(--border-size-small) calc(var(--spacing-small) - var(--border-size-small));
    border: var(--border-size-small) solid;

    > [part="icon-container"] {
      max-height: var(--spacing-xl);
      --icon-size: var(--spacing-xl);
      zeta-icon {
        width: var(--spacing-xl);
        height: var(--spacing-xl);
      }
    }
    > [part="icon-container"],
    > [part="icon-container"] div {
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
    > [part="text"] {
      color: var(--main-default);
      font: var(--body-medium);
      height: var(--spacing-2xl);
    }
  }
  :host([rounded]) > [part="container"] {
    border-radius: var(--radius-full);
  }

  [part="container"],
  :host([status="neutral"]) > [part="container"],
  :host([status="neutral"]) > [part="container"] svg {
    border-color: var(--border-default);
    background: var(--main-light);
    fill: var(--main-subtle);
    --icon-color: var(--main-subtle);
  }
  :host([status="info"]) > [part="container"],
  :host([status="info"]) > [part="container"] svg {
    border-color: var(--border-info);
    background: var(--surface-info-subtle);
    fill: var(--main-info);
    --icon-color: var(--main-info);
  }
  :host([status="positive"]) > [part="container"],
  :host([status="positive"]) > [part="container"] svg {
    border-color: var(--border-positive);
    background: var(--surface-positive-subtle);
    fill: var(--main-positive);
    --icon-color: var(--main-positive);
  }
  :host([status="warning"]) > [part="container"],
  :host([status="warning"]) > [part="container"] svg {
    border-color: var(--border-warning);
    background: var(--surface-warning-subtle);
    fill: var(--main-warning);
    --icon-color: var(--main-warning);
  }
  :host([status="negative"]) > [part="container"],
  :host([status="negative"]) > [part="container"] svg {
    border-color: var(--border-negative);
    background: var(--surface-negative-subtle);
    fill: var(--main-negative);
    --icon-color: var(--main-negative);
  }
`;
