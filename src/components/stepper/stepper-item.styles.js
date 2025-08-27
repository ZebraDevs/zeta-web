import { css } from "lit";
export default css`
  :host {
    --step-container-margin: 7px;
    --step-success-icon-border: #fafbfc;
    position: relative;
    display: flex;
    align-items: center;
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
    padding: 0 var(--spacing-large);
    counter-increment: step;

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
    margin-top: var(--spacing-xl);
    font: var(--title-large);
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

  /*Edit Icon - Pen & Value Styling*/
  .step.editing .step-number zeta-icon[name="edit"] {
    position: relative;
    --icon-color: var(--main-subtle);
    left: 7px;
    top: 12px;
    z-index: 2;
    --icon-border-width: 6px;
    --icon-border-color: var(--step-success-icon-border);
  }
  .step.editing .step-number zeta-icon[name="check_mark"] + zeta-icon[name="edit"] {
    left: 3px;
  }
  .step.editing .step-number::before,
  .step.editing .step-number zeta-icon[name="check_mark"] {
    position: relative;
    left: 12px;
  }

  /*Vertical orientation - Styling*/
  :host([variant="vertical"]) .step {
    flex-direction: row;
    text-align: left;
    padding: 0;
    gap: var(--spacing-4);
    position: relative;
    align-items: center;
    justify-content: center;
  }

  :host([variant="vertical"]) .step-title {
    margin-top: 0;
  }
`;
