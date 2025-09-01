import { css } from "lit";
export default css`
  /* Horizontal orientation - Styling */
  :host {
    --stepper-container-height: 92px;
    --stepper-bar-width: 200px;
    --stepper-bar-height: 3px;
    --stepper-bar-vertical-width: 3px;
    --stepper-overflow-button-width: 50px;
    --stepper-overflow-button-margin: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Stepper Alignment */
  ::slotted(zeta-stepper-item) {
    flex-direction: row;
  }

  /* Counter Logic */
  .stepper-container {
    counter-reset: step;
  }

  .stepper-container {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    width: fit-content;
    height: var(--stepper-container-height);
  }

  /* Bar pseudo-element */
  ::slotted(:not(zeta-stepper-item:last-child))::after {
    content: "";
    display: flex;
    width: var(--stepper-bar-width);
    height: var(--stepper-bar-height);
    border-radius: inherit;
    background-color: var(--border-subtle);
    align-items: center;
    justify-content: center;
    margin-top: var(--spacing-large);
  }

  /* Stepper progress bar */
  zeta-progress-bar {
    display: flex;
    width: 100%;
    height: var(--spacing-small);
    background-color: var(--border-subtle);
    border-radius: var(--radius-minimal);
    margin-top: var(--spacing-large);
  }
  zeta-button::part(button) {
    box-shadow: 0 0 0 2px var(--border-subtle);
  }

  /* Stepper item overflow button */
  .stepper-item-overflow-button {
    display: flex;
    justify-content: right;
    height: 100%;
    width: var(--stepper-overflow-button-width);
    margin-left: var(--stepper-overflow-button-margin);
  }

  /* Vertical orientation styles */
  :host([variant="vertical"]) {
    width: fit-content;
    height: fit-content;

    ::slotted(zeta-stepper-item) {
      flex-direction: column;
      display: block;
    }

    zeta-progress-bar,
    .stepper-item-overflow-button {
      display: none;
    }

    .stepper-container {
      flex-direction: column;
    }

    /* Bar pseudo-element */
    ::slotted(:not(zeta-stepper-item:last-child))::after {
      height: var(--spacing-4xl);
      width: var(--stepper-bar-vertical-width);
      margin: var(--spacing-small) 0 var(--spacing-small) 18px;
    }
  }
`;
