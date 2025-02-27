import { css } from "lit";
export default css`
  .card {
    --border-size: var(--border-size-small);
    --border-color: var(--border-default);
    --border: var(--border-size) solid var(--border-color);
    border: var(--border);
  }
`;
