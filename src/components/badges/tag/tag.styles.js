import { css } from "lit";
export default css`
  :host([point="left"]) > .tag .point {
    transform: rotate(180deg);
  }

  :host([point="left"]) > .tag {
    flex-direction: row-reverse;
  }

  :host([point="left"][rounded]) > .tag .text {
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  :host([point="right"][rounded]) > .tag .text {
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  .tag {
    display: flex;
    align-items: center;
    width: fit-content;
    height: fit-content;
  }

  .point {
    fill: var(--icon-light);
  }

  .text {
    background: var(--icon-light);
    padding: var(--spacing-1) var(--spacing-2);
    font: var(--body-small);
  }
`;
