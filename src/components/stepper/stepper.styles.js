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
    height: var(--spacing-8);
    width: var(--spacing-15);
    align-items: center;
    justify-content: center;
    margin-left: var(--spacing-4);

    &:after {
      content: "";
      display: flex;
      width: 100%;
      height: var(--spacing-0-5);
      border-radius: inherit;
      background-color: var(--text-disabled);
    }

    &:not(.show) {
      &::after {
        display: none !important;
      }
    }

    &.active {
      &:after {
        background-color: var(--surface-flavor-primary);
      }
    }

    &.completed {
      &:after {
        background-color: var(--surface-flavor-positive);
      }
    }
  }

  .step {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 var(--spacing-4);

    span {
      display: flex;
    }

    &:not(.active):not(.completed) {
      color: var(--text-disabled);
    }

    &.active {
      .step-label {
        color: var(--surface-flavor-primary);
      }

      .step-number {
        background-color: var(--surface-flavor-primary);
      }
    }

    &.completed {
      .step-label {
        color: var(--surface-flavor-positive);
      }

      .step-number {
        background-color: var(--surface-flavor-positive);
      }
    }
  }

  .step-content {
    display: flex;
    flex-direction: column;
    align-self: baseline;

    .step-title {
      margin-top: var(--spacing-2);
      font: var(--body-medium);
    }

    .step-label {
      display: none;
    }
  }

  .step-number {
    width: var(--spacing-8);
    height: var(--spacing-8);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--text-disabled);
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
      margin-bottom: var(--spacing-5);
    }

    .step {
      flex-direction: row;
      text-align: left;
      padding: 0;
    }

    .bar {
      height: var(--spacing-8);
      width: var(--spacing-8);
      margin-top: var(--spacing-1);
      margin-left: 0;

      &:after {
        content: "";
        width: var(--spacing-1);
        height: 100%;
      }
    }

    .step-title {
      margin-top: var(--spacing-1);
      font: var(--title-large);
    }

    .step-label {
      display: flex;
      font: var(--body-medium);
    }

    .step-number {
      width: var(--spacing-8);
      height: var(--spacing-8);
      font: var(--label-medium);
      margin-right: var(--spacing-6);
      align-self: baseline;
    }
  }
`;
