import { css } from "lit";
export default css`
  :host {
    display: flex;
    flex: 1;
    width: min-content;
    justify-content: center;
    cursor: pointer;
    flex-direction: column;
    gap: var(--spacing-2);
    align-items: center;
    padding: var(--spacing-2);
    min-width: 46px;
  }

  :host[label] {
    padding: var(--spacing-2) var(--spacing-6);
  }

  .label {
    color: var(--text-subtle);
    font: var(--label-small);
    user-select: none;
  }

  :host([active]) .label {
    color: var(--text-flavor-primary);
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

  :host ::slotted(zeta-icon) {
    --icon-color: var(--icon-subtle);
  }
  :host([active]) ::slotted(zeta-icon) {
    --icon-color: var(--icon-flavor-primary);
  }
`;
