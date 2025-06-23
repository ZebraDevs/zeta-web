import { css } from "lit";
export default css`
  :host([direction="left"]) > .tag .point {
    transform: rotate(180deg);
  }

  :host([direction="left"]) > .tag {
    flex-direction: row-reverse;
  }

  :host([direction="left"][rounded]) > .tag .text {
    border-radius:0px var(--radius-minimal, 4px)  var(--radius-minimal, 4px) 0px;
  }
  
  :host([direction="right"][rounded]) > .tag .text {
    border-radius: var(--radius-minimal, 4px) 0px 0px var(--radius-minimal, 4px);
  }

  .tag {
    display: flex;
    align-items: center;
    width: fit-content;
    height: fit-content;
  }

  .point {
    fill: var(--main-light);
    margin: 0;
    margin-right: -0.01px
  }

  .text {
    background: var(--main-light);
    padding: var(--spacing-minimum) var(--spacing-small);
    font: var(--body-medium);
    height: var(--spacing-2xl);
  }
`;
