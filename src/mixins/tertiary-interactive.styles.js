import { css } from "lit";
export default css`
  .tertiary-interactive {
    background-color: var(--surface-default-inverse);
    color: var(--text-inverse);

    &:hover {
      background-color: var(--color-cool-80) !important;
    }

    &:active {
      background-color: var(--color-cool-90) !important;
    }
  }
`;
