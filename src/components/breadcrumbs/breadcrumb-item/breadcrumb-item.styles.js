import { css } from "lit";
export default css`
  :host {
    display: flex;
    -webkit-tap-highlight-color: transparent;
  }

  a {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    color: var(--foreground-secondary);
  }

  a:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: var(--stroke-thin);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    a:hover ::slotted([slot="icon"]) {
      --icon-color: var(--foreground-link);
    }
  }

  a:active ::slotted([slot="icon"]) {
    --icon-color: var(--foreground-primary);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    a:hover {
      color: var(--foreground-link);
    }
  }

  a:active {
    color: var(--foreground-primary);
  }

  ::slotted([slot="icon"]) {
    --icon-color: var(--foreground-secondary);
    --icon-size: var(--control-icon-md);
    margin-right: var(--space-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--control-icon-md);
    height: var(--control-icon-md);
  }
`;
