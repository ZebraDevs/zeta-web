import { css } from "lit";
export default css`
  .container {
    display: flex;
    display: inline-flex;
    align-items: center;
    background: var(--surface-flavor-primary-subtle);
    white-space: nowrap;
    line-height: var(--spacing-5);
    font: var(--body-small);

    > .number {
      display: flex;
      width: var(--spacing-7);
      height: var(--spacing-7);
      padding: 0;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: var(--icon-flavor-primary);
      color: var(--text-inverse);
    }

    > .text {
      padding: var(--spacing-1) var(--spacing-2);
    }
  }

  :host([rounded]) > .container,
  :host([rounded]) > .container > .number {
    border-radius: var(--radius-full);
  }
`;
