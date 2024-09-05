import { css } from "lit";
export default css`
  .tertiary-interactive {
    background-color: var(--surface-default-inverse);
    color: var(--main-inverse);

    &:hover {
      background-color: var(--state-inverse-hover) !important;
    }

    &:active {
      background-color: var(--state-inverse-selected) !important;
    }
  }
`;
