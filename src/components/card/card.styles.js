import { css } from "lit";
export default css`
  .card {
    --_border-size: var(--border-size-small);
    --_border-color: var(--border-default);
    --border: var(--_border-size) solid var(--_border-color);
    border: var(--border);
  }
`;
