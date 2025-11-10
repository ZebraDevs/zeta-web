import { css } from "lit";
export default css`
  .tertiary-interactive {
    background-color: var(--surface-default-inverse);
    color: var(--main-inverse);

    &:active {
      background-color: var(--state-inverse-selected) !important;
    }
  }

  //Hover styles
  @media (hover: hover), (hover: none) and (pointer: fine) {
    .tertiary-interactive:hover {
      background-color: var(--state-inverse-hover) !important;
    }
  }
`;
