import { css } from "lit";
export default css`
  .container {
    display: flex;
    display: inline-flex;
    align-items: center;
    background: var(--surface-primary-subtle);
    white-space: nowrap;
    line-height: var(--spacing-xl);
    font: var(--body-small);

    > .number {
      display: flex;
      width: var(--spacing-3xl);
      height: var(--spacing-3xl);
      padding: 0;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: var(--main-primary);
      color: var(--main-inverse);
    }

    > .text {
      padding: var(--spacing-minimum) var(--spacing-small);
    }
  }

  :host([rounded]) > .container,
  :host([rounded]) > .container > .number {
    border-radius: var(--radius-full);
  }
`;
