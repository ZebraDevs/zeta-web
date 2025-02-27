import { css } from "lit";
export default css`
  .card {
    --_card-border-line-width: var(--card-border-line-width, var(--border-size-small));
    --_card-border-line-style: var(--card-border-line-style, solid);
    --_card-border-color: var(--card-border-color, var(--border-default));
    border: var(--_card-border-line-width) var(--_card-border-line-style) var(--_card-border-color);
  }
`;
