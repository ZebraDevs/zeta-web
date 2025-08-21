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
      background-color: var(--border-subtle);
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
    border-radius: 50%;
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
      align-items: center;
    }

    .steps {
      flex-direction: column;
    }

    .step-container {
      flex-direction: column;
    }

    .step {
      flex-direction: row;
      text-align: left;
      padding: 0;
      gap: var(--spacing-3);
    }

    .bar {
      height: var(--spacing-4xl);
      width: var(--spacing-4xl);
      margin-top: var(--spacing-small);
      margin: var(--spacing-small) 0 var(--spacing-small) 0;
      margin-left: 0;

      &:after {
        content: "";
        width: 3px;
        height: 100%;
      }
    }

    .step-title {
      margin-top: var(--spacing-small);
      font: var(--title-large);
    }

    .step-label {
      display: flex;
      font: var(--body-medium);
    }

    .step-number {
      align-self: baseline;
      --icon-border-width: 0px;
    }

    .step.editing .step-number zeta-icon[name="check_mark"],
    .step.editing .step-number .number {
      position: relative;
      top: 12px;
      --icon-border-width: 0px;
    }

    .step.editing .step-number zeta-icon[name="edit"] {
      position: relative;
      --icon-color: var(--main-subtle);
      left: 15px;
      top: 2px;
      z-index: 2;
      --icon-border-width: 6px;
      --icon-border-color: var(--step-completed-icon-border);
    }
  }
`;
