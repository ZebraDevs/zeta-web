import { css } from "lit";
export default css`
  :host([status="info"]) .container {
    background: var(--surface-info);
  }

  :host([status="positive"]) .container {
    background: var(--surface-positive);
  }

  :host([status="warning"]) .container {
    background: var(--surface-warning);
  }

  :host([status="negative"]) .container {
    background: var(--surface-negative);
  }

  .container,
  :host([status="neutral"]) .container {
    background: var(--main-light);
    .text {
      color: var(--main-default);
    }
  }

  :host(:not([status="neutral"])) .container .text {
    color: var(--main-inverse);
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    width: fit-content;

    .text {
      padding: 2px var(--spacing-minimum);
      font: var(--label-small);
    }
  }
`;
