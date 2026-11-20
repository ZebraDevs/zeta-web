import { css } from "lit";
export default css`
  :host([rounded]) ::slotted(zeta-breadcrumb-item:not(:first-child))::before,
  :host([rounded]) .more-menu::before {
    font-family: "zeta-icons-round";
  }

  :host ::slotted(zeta-breadcrumb-item:not(:first-child))::before,
  .more-menu::before {
    font-family: "zeta-icons-sharp";
  }

  ::slotted(zeta-breadcrumb-item:not(:first-child))::before,
  .more-menu::before {
    content: "chevron_right";
    font-size: var(--control-icon-sm);
    color: var(--foreground-secondary);
    margin: 0 var(--space-sm);
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
    display: flex;
    align-items: center;
    padding: var(--space-2xs) var(--space-sm);
    border: var(--stroke-thin) solid var(--interactive-neutral-border-default);
    background-color: var(--interactive-neutral-background-default);
    cursor: pointer;

    zeta-icon {
      --icon-size: var(--control-icon-xs);
      --icon-color: var(--interactive-neutral-foreground-default);
    }
  }

  button:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: var(--stroke-thin);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    button:hover {
      background: var(--interactive-neutral-background-hover);
      border-color: transparent;
    }
  }

  button:active {
    background: var(--interactive-neutral-background-pressed);
  }
`;
