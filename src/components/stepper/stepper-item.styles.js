import { css } from "lit";
export default css`
  :host {
    --step-title-width: 230px;
    --step-edit-icon-left: 7px;
    --step-success-icon-border: rgb(250, 251, 252);
    position: relative;
    display: flex;
    align-items: flex-start;
  }

  .step-number::before {
    content: counter(step);
  }

  /*Step styling*/
  .step {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 var(--spacing-minimum);
    counter-increment: step;
    /*Prevents movement of other elements as text increases*/
    width: var(--spacing-8xl);
    gap: var(--spacing-xl);

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

    &.success {
      .step-number {
        background-color: var(--surface-positive);
        --icon-color: var(--state-default-focus);
      }
      /*Get rid of number on success*/
      .step-number::before {
        content: "";
      }
    }

    &.default {
      color: var(--main-default);
    }
  }

  .step-title {
    font: var(--title-large);
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    /*Clamp text box max width*/
    width: var(--step-title-width);
    word-break: break-all;
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
    flex-shrink: 0;
  }

  /*Edit Icon - Pen & Value Styling*/
  .step.editing .step-number zeta-icon[name="edit"] {
    position: relative;
    --icon-color: var(--main-subtle);
    left: var(--step-edit-icon-left);
    top: var(--spacing-medium);
    --icon-border-width: 6px;
    --icon-border-color: var(--step-success-icon-border);
  }
  .step.editing .step-number zeta-icon[name="check_mark"] + zeta-icon[name="edit"] {
    left: 3px;
  }
  .step.editing .step-number::before,
  .step.editing .step-number zeta-icon[name="check_mark"] {
    position: relative;
    left: var(--spacing-medium);
  }

  /*Vertical orientation - Styling*/
  :host([variant="vertical"]) {
    width: fit-content;
    align-items: center;
  }

  :host([variant="vertical"]) .step {
    flex-direction: row;
    text-align: left;
    padding: 0;
    gap: var(--spacing-4);
    position: relative;
    align-items: center;
    justify-content: center;
    width: fit-content;
  }

  :host([variant="vertical"]) .step-title {
    margin-top: 0;
    -webkit-line-clamp: 1;
  }
`;
