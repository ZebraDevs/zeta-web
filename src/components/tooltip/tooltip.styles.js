import { css } from "lit";
export default css`
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
    background: var(--main-default);
    padding: var(--spacing-minimum) var(--spacing-small);
    position: relative;

    @media (prefers-color-scheme: light) {
      box-shadow: var(--elevation-3);
    }
  }

  .label {
    font: var(--label-small);
    color: var(--main-inverse);
  }

  .point {
    fill: var(--main-default);
    position: absolute;

    path {
      fill: inherit;
    }
  }

  :host([point="bottom"]) {
    .point {
      bottom: -4px;
    }
  }

  :host([point="right"]) {
    .point {
      transform: rotate(-90deg);
      right: -6px;
    }
  }

  :host([point="left"]) {
    .point {
      transform: rotate(90deg);
      left: -6px;
    }
  }

  :host([point="top"]) {
    .point {
      transform: rotate(180deg);
      top: -4px;
    }
  }
`;
