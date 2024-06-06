import { css } from "lit";
export default css`
  :host([status="info"]) .container {
    background: var(--surface-flavor-info);
  }

  :host([status="positive"]) .container {
    background: var(--surface-flavor-positive);
  }

  :host([status="warning"]) .container {
    background: var(--surface-flavor-warning);
  }

  :host([status="negative"]) .container {
    background: var(--surface-flavor-negative);
  }

  .container,
  :host([status="neutral"]) .container {
    background: var(--icon-light);
    .text {
      color: var(--text-default);
    }
  }

  :host(:not([status="neutral"])) .container .text {
    color: var(--text-inverse);
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    width: fit-content;

    .text {
      padding: 2px var(--spacing-1);
      font: var(--label-small);
    }
  }
`;
