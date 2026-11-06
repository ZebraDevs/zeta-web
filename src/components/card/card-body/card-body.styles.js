import { css } from "lit";
export default css`
  :host {
    display: block;
    background-color: var(--surface-card);
    overflow: hidden;
  }

  .card-body {
    padding: var(--space-lg);
    color: var(--foreground-secondary);
    font: var(--body-small);
    font-size: var(--body-small-font-size);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
  }
`;
