import { css } from "lit";
export default css`
  /* Horizontal orientation - Styling */
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
  }

  /* Bar pseudo-element */
  ::slotted(:not(zeta-stepper-item:last-child))::after {
    content: "";
    display: flex;
    width: var(--spacing-11xl);
    height: var(--spacing-0-5);
    border-radius: inherit;
    background-color: var(--border-subtle);
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-4xl);
  }

  /* Vertical orientation styles */
  :host([variant="vertical"]) {
    ::slotted(zeta-stepper-item) {
      flex-direction: column;
    }

    .stepper-container {
      flex-direction: column;
    }

    /* Bar pseudo-element */
    ::slotted(:not(zeta-stepper-item:last-child))::after {
      height: var(--spacing-4xl);
      width: 2px;
      margin-top: var(--spacing-small);
      margin: var(--spacing-small) 0 var(--spacing-small) 0;
      margin-right: 66px;
    }
  }
`;
