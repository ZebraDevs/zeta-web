import { css } from "lit";
export default css`
:host{
  width: fit-content;
}
  :host([status="info"]) .container {
    background: var(--main-info);
  }

  :host([status="positive"]) .container {
    background: var(--main-positive);
  }

  :host([status="warning"]) .container {
    background: var(--main-warning);
  }

  :host([status="negative"]) .container {
    background: var(--main-negative);
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

  min-width: var(--spacing-small);
  min-height: var(--spacing-large);
    .text {
      padding: var(--spacing-none) var(--spacing-minimum);
      font: var(--label-small);
    }
  }
`;
