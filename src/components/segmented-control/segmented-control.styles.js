import { css } from "lit";

export default css`
  .indicator {
    position: absolute;
    transition: all 0.3s ease-in-out;
    z-index: 1;
    background-color: var(--surface-default);
  }

  :host {
    display: flex;
    position: relative;
    width: fit-content;
    z-index: 0;
    user-select: none;
  }

  :host > * {
    display: flex;
    width: fit-content;
    padding: var(--spacing-1);
    background-color: var(--surface-disabled);
  }

  ::slotted(zeta-segmented-item) {
    z-index: 2;
  }

  ::slotted(:not(zeta-segmented-item)) {
    display: none;
  }
`;
