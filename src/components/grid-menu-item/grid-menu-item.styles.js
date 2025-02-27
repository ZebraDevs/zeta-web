import { css } from "lit";
export default css`
  :host {
    display: flex;
    flex: 1;
    width: min-content;
    justify-content: center;
    cursor: pointer;
    flex-direction: column;
    gap: var(--spacing-small);
    align-items: center;
    padding: var(--spacing-small);
    min-width: 46px;
  }

  :host[label] {
    padding: var(--spacing-small) var(--spacing-2xl);
  }

  .label {
    color: var(--main-subtle);
    font: var(--label-small);
    user-select: none;
  }

  :host([active]) .label {
    color: var(--main-primary);
  }

  .icon-container {
    position: relative;
  }

  zeta-notification-indicator {
    position: absolute;
    top: -2px;
    right: -2px;
    border: var(--border-size-medium) solid var(--surface-default);
    border-radius: var(--radius-full);
  }

  ::slotted(zeta-icon) {
    --icon-color: var(--main-subtle);
  }
  :host([active]) ::slotted(zeta-icon) {
    --icon-color: var(--main-primary);
  }
`;
