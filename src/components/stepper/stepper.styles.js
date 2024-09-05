import { css } from "lit";
export default css`
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
      color: var(--main-disabled);
    }

    &.active {
      .step-label {
        color: var(--surface-primary);
      }

      .step-number {
        background-color: var(--surface-primary);
      }
    }

    &.completed {
      .step-label {
        color: var(--surface-positive);
      }

      .step-number {
        background-color: var(--surface-positive);
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

    .step-label {
      display: none;
    }
  }

  .step-number {
    width: var(--spacing-4xl);
    height: var(--spacing-4xl);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-disabled);
    color: var(--surface-default);
    font: var(--label-large);
  }

  :host([rounded]) {
    .step-number {
      border-radius: var(--radius-full);
    }

    .bar {
      border-radius: var(--radius-minimal);
    }
  }

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
      margin-bottom: var(--spacing-xl);
    }

    .step {
      flex-direction: row;
      text-align: left;
      padding: 0;
    }

    .bar {
      height: var(--spacing-4xl);
      width: var(--spacing-4xl);
      margin-top: var(--spacing-minimum);
      margin-left: 0;

      &:after {
        content: "";
        width: var(--spacing-minimum);
        height: 100%;
      }
    }

    .step-title {
      margin-top: var(--spacing-minimum);
      font: var(--title-large);
    }

    .step-label {
      display: flex;
      font: var(--body-medium);
    }

    .step-number {
      width: var(--spacing-4xl);
      height: var(--spacing-4xl);
      font: var(--label-medium);
      margin-right: var(--spacing-2xl);
      align-self: baseline;
    }
  }
`;
