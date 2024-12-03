import { css } from "lit";
export default css`
  :host([active]:not([disabled])) .container {
    background: var(--surface-default-inverse) !important;
    color: var(--main-inverse);
  }
  zeta-icon {
    --icon-size: 20px;
  }
  :host([type="selected"]) zeta-icon {
    --icon-color: var(--main-inverse);
  }

  .container {
    transition: background-color 0.2s ease-out;
  }
`;
