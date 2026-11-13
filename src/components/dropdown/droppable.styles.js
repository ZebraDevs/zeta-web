import { css } from "lit";
export default css`
  :host {
    display: none;
    position: absolute;
  }

  :host([open]) {
    display: flex;
    flex-direction: column;
    background-color: var(--surface-menu);
    gap: var(--space-2xs);
    padding: var(--space-card);
    /* Shadow/medium: two stacked drop shadows */
    box-shadow:
      var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft),
      var(--shadow-small-x) var(--shadow-small-y) var(--shadow-small-blur) var(--shadow-soft);
    z-index: 5;
    overflow-x: auto;
    border-radius: var(--radius-none);
  }

  :host([open][compact]) {
    padding: var(--space-xs);
  }

  :host([open][rounded]) {
    border-radius: var(--radius-element-md);
  }
`;
