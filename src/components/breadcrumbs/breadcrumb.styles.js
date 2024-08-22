import { css } from "lit";
export default css`
  :host([rounded]) ::slotted(zeta-breadcrumb-item:not(:first-child)):before,
  :host([rounded]) zeta-breadcrumb-item:not(:first-child):before,
  :host([rounded]) .more-menu:before {
    font-family: "zeta-icons-round";
  }

  :host ::slotted(zeta-breadcrumb-item:not(:first-child)):before,
  :host zeta-breadcrumb-item:not(:first-child):before,
  .more-menu:before {
    font-family: "zeta-icons-sharp";
  }

  ::slotted(zeta-breadcrumb-item:not(:first-child)):before,
  .container zeta-breadcrumb-item:not(:first-child):before,
  .more-menu:before {
    content: "chevron_right";
    font-size: var(--spacing-large);
    color: var(--icon-subtle);
    margin-right: var(--spacing-2);
  }

  :host,
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
  }

  .more-menu {
    display: flex;
    align-items: center;
  }

  button {
    padding: var(--spacing-minimum) var(--spacing-2);
    border: var(--border-size-small) solid var(--border-default);
    background-color: var(--surface-warm);
    cursor: pointer;

    zeta-icon {
      --icon-size: var(--spacing-medium);
    }
  }

  button:hover {
    background: var(--surface-hover);
    border: var(--border-size-small) solid transparent;
  }

  button:active {
    background: var(--surface-pressed);
  }
`;
