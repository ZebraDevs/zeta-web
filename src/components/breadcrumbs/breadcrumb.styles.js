import { css } from "lit";
export default css`
  :host([rounded]) ::slotted(zeta-breadcrumb-item:not(:first-child))::before,
  :host([rounded]) zeta-breadcrumb-item:not(:first-child)::before,
  :host([rounded]) .more-menu::before {
    font-family: "zeta-icons-round";
  }

  :host ::slotted(zeta-breadcrumb-item:not(:first-child))::before,
  :host zeta-breadcrumb-item:not(:first-child)::before,
  .more-menu::before {
    font-family: "zeta-icons-sharp";
  }

  ::slotted(zeta-breadcrumb-item:not(:first-child))::before,
  .container zeta-breadcrumb-item:not(:first-child)::before,
  .more-menu::before {
    content: "chevron_right";
    font-size: var(--spacing-large);
    color: var(--main-subtle);
    margin: 0 var(--spacing-small) 0 var(--spacing-small);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host,
  .container {
    display: flex;
    flex-wrap: wrap;
  }

  .more-menu {
    display: flex;
    align-items: center;
  }

  button {
    padding: var(--spacing-minimum) var(--spacing-small);
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
    background: var(--surface-selected);
  }
`;
