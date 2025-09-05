import { css } from "lit";
export default css`
  :host {
    --step-title-width: 230px;
    --step-edit-icon-left: 7px;
    --step-edit-icon-border: rgb(250, 251, 252);
    position: relative;
    display: flex;
    align-items: flex-start;
  }

  .step-number::before {
    content: counter(step);
  }

  :host([flavor="default"]) .step-number {
    color: var(--main-default);
  }

  :host([flavor="active"]) .step-number {
    background-color: var(--surface-primary);
    border: none;
    color: var(--state-default-focus);
  }

  :host([flavor="partial"]) .step-number {
    background-color: var(--surface-positive-subtle);
    border: 3px dashed var(--main-positive);
  }

  :host([flavor="success"]) .step-number {
    background-color: var(--surface-positive);
    border: none;
    --icon-color: var(--state-default-focus);
  }
  /*Get rid of counter step on success flavor*/
  :host([flavor="success"]) .step-number::before {
    content: "";
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
  :host([editing]) .step-number zeta-icon[name="edit"] {
    position: relative;
    --icon-color: var(--main-subtle);
    left: var(--step-edit-icon-left);
    top: var(--spacing-medium);
    --icon-border-width: 6px;
    --icon-border-color: var(--step-success-icon-border);
  }
  :host([editing]) .step-number zeta-icon[name="check_mark"] + zeta-icon[name="edit"] {
    left: 3px;
  }
  :host([editing]) .step-number::before,
  :host([editing]) .step-number zeta-icon[name="check_mark"] {
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
