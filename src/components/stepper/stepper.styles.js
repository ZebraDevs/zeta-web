import { css } from "lit";
export default css`
  :host {
    --step-width: 232px;
    --step-height: 92px;
    --step-container-margin: 7px;
    --step-completed-icon-border: #fafbfc;
  }

  .steps {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    width: fit-content;
  }

  li {
    display: flex;
  }

  .step-container:last-of-type {
    margin-bottom: 0px;
    .bar {
      &:after {
        width: 0 !important;
        display: none;
      }
    }
  }

  /*Bar between steps styling*/
  .bar {
    display: flex;
    height: var(--spacing-4xl);
    width: var(--spacing-11xl);
    align-items: center;
    justify-content: center;
    margin-left: var(--spacing-large);

    &:after {
      content: "";
      display: flex;
      width: 100%;
      height: var(--spacing-0-5);
      border-radius: inherit;
      background-color: var(--main-disabled);
    }

    &:not(.show) {
      &::after {
        display: none !important;
      }
    }

    &.active {
      &:after {
        background-color: var(--surface-primary);
      }
    }

    &.completed {
      &:after {
        background-color: var(--surface-positive);
      }
    }
  }

  /*Step styling*/
  .step {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 var(--spacing-large);

    span {
      display: flex;
    }

    &:not(.active):not(.completed) {
      color: var(--main-default);
    }

    &.active {
      .step-number {
        background-color: var(--surface-primary);
        border: 1px solid var(--main-primary);
        color: var(--state-default-focus);
      }
    }

    &.partial {
      .step-number {
        background-color: var(--surface-positive-subtle);
        border: 3px dashed var(--main-positive);
      }
    }

    &.completed {
      .step-number {
        background-color: var(--surface-positive);
        border: 1px solid var(--main-positive);
        --icon-color: var(--state-default-focus);
      }
    }
  }

  .step-content {
    display: flex;
    flex-direction: column;
    align-self: baseline;

    .step-title {
      margin-top: var(--spacing-small);
      font: var(--body-medium);
    }
  }

  .step-number {
    box-sizing: border-box;
    width: var(--spacing-6xl);
    height: var(--spacing-6xl);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--surface-default);
    color: var(--main-default);
    border: 1px solid var(--main-light);
    font: var(--headline-small);
  }

  :host([rounded]) {
    .step-number {
      border-radius: var(--radius-full);
    }

    .bar {
      border-radius: var(--radius-minimal);
    }
  }

  /* Vertical orientation styles */
  :host([variant="vertical"]) {
    span {
      display: flex;
      flex-direction: column;
    }

    .steps {
      flex-direction: column;
    }

    .step-container {
      flex-direction: column;
      margin-bottom: var(--step-container-margin);
    }

    .step {
      text-align: center;
      padding: 0;
      width: var(--step-width);
      height: var(--step-height);
      gap: var(--spacing-3);
      flex-shrink: 0;
    }

    .bar {
      display: none;
    }

    .step-title {
      margin-top: var(--spacing-minimum);
      font: var(--title-large);
    }

    .step-number {
      align-self: baseline;
    }

    .step-content {
      align-self: center;
    }

    .step.completed .step-number zeta-icon[name="edit"] {
      position: relative;
      --icon-color: var(--main-subtle);
      left: 15px;
      top: 2px;
      z-index: 2;
      -webkit-text-stroke: 6px var(--step-completed-icon-border);
      paint-order: stroke fill;
    }

    .step.completed .step-number zeta-icon[name="check_mark"] {
      position: relative;
      top: 12px;
    }
  }
`;
