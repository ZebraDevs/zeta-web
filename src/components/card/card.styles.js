import { css } from "lit";
export default css`
  .card {
    --_card-border-size: var(--card-border-size, var(--border-size-small));
    --_card-border-color: var(--card-border-color, var(--border-default));
    --_card-border: var(--_card-border-size) solid var(--_card-border-color);
    border: var(--_card-border);
  }
`;
