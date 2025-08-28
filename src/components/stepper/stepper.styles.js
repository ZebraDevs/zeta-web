import { css } from "lit";
export default css`
  /* Horizontal orientation - Styling */
  :host {
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
    height: 116px;
  }

  /* Bar pseudo-element */
  ::slotted(:not(zeta-stepper-item:last-child))::after {
    content: "";
    display: flex;
    width: 200px;
    height: 3px;
    border-radius: inherit;
    background-color: var(--border-subtle);
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-7xl);
  }

  /* Stepper progress bar */
  zeta-progress-bar {
    display: flex;
    width: 100%;
    height: 8px;
    background-color: var(--border-subtle);
    border-radius: var(--radius-minimal);
    margin-top: 16px;
  }
  zeta-button::part(button) {
    box-shadow: 0 0 0 2px var(--border-subtle);
  }

  /* Stepper item overflow button */
  .stepper-item-overflow-button {
    display: flex;
    justify-content: right;
    height: 100%;
    width: 57px;
    margin-left: 60px;
  }

  /* Vertical orientation styles */
  :host([variant="vertical"]) {
    ::slotted(zeta-stepper-item) {
      flex-direction: column;
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
      width: 3px;
      margin-top: var(--spacing-small);
      margin: var(--spacing-small) 0 var(--spacing-small) 0;
      margin-right: 66px;
    }
  }
`;
