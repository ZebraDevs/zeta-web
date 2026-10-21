import { css } from "lit";
export default css`
  :host {
    display: inline-block;
    width: fit-content;
    height: fit-content;
  }
  :host([direction="left"]) > .tag .point {
    transform: rotate(180deg);
  }

  :host([direction="left"]) > .tag {
    flex-direction: row-reverse;
  }

  :host([direction="left"][rounded]) > .tag .text {
    border-radius: 0px var(--radius-sm) var(--radius-sm) 0px;
  }

  :host([direction="right"][rounded]) > .tag .text {
    border-radius: var(--radius-sm) 0px 0px var(--radius-sm);
  }

  .tag {
    display: flex;
    align-items: center;
    width: fit-content;
    height: fit-content;
  }

  .point {
    fill: var(--border-subtle);
    margin: 0;
    margin-right: -0.01px;
  }

  .text {
    background: var(--border-subtle);
    padding: var(--space-xs) var(--space-sm);
    font: var(--body-medium);
    height: var(--space-xl);
  }
`;
