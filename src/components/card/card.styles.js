import { css } from "lit";
export default css`
  :host([rounded]) .card {
    --_card-radius: var(--radius-sm);
  }
  :host([rounded="false"]) .card {
    --_card-radius: var(--radius-none);
  }
  .card {
    --_card-radius: var(--radius-none);
    --_card-border-line-width: var(--card-border-line-width, var(--stroke-thin));
    --_card-border-line-style: var(--card-border-line-style, solid);
    --_card-border-color: var(--card-border-color, var(--border-default));
    border: var(--_card-border-line-width) var(--_card-border-line-style) var(--_card-border-color);
    background-color: var(--surface-card);
    border-radius: var(--_card-radius);
    overflow: hidden;
  }
`;
