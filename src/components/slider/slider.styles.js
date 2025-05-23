import { css } from "lit";
export default css`
  :host {
    --handle-size: var(--spacing-large);
    --track-height: var(--spacing-minimum);
  }

  .slider {
    height: var(--handle-size);
    margin: 0 calc(var(--handle-size) / 2);
    display: flex;
    align-items: center;
    position: relative;
  }

  .track {
    background-color: var(--surface-disabled);
    height: var(--spacing-minimum);
    width: 100%;
  }

  .handle {
    background-color: var(--main-default);
    width: var(--handle-size);
    height: var(--handle-size);
    cursor: pointer;
    position: absolute;
    z-index: 5;
    transition: scale 0.1s linear;
  }

  :host(:not([disabled])) .handle {
    &:hover:not(:active) {
      scale: 1.25;
    }
  }

  :host([disabled]) {
    .handle {
      background-color: var(--main-disabled);
      cursor: not-allowed;
    }

    .selected-area {
      display: none;
    }
  }

  :host([rounded]) .handle {
    border-radius: var(--radius-full);
  }

  .selected-area {
    background-color: var(--main-default);
    height: var(--track-height);
    position: absolute;
    z-index: 1;
    left: 0;
  }

  .step-container {
    left: 0;
    right: 0;
    height: var(--track-height);
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 5;
    margin-left: var(--spacing-0-5);
    margin-right: var(--spacing-minimum);
  }

  .step {
    width: var(--spacing-0-5);
    height: var(--spacing-0-5);
    background-color: var(--surface-default);
    border-radius: var(--radius-full);
    position: absolute;
  }
`;
