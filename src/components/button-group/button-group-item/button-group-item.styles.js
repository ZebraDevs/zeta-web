import { css } from "lit";
export default css`
  :host {
    display: flex;
    height: fit-content;
    width: fit-content;
    background-color: var(--surface-default);
  }
  :host .text {
    font: var(--label-medium);
    cursor: pointer;
  }

  :host > button {
    color: var(--text-default);
    background-color: var(--surface-default);
    border: var(--border-size-small) solid var(--border-subtle);
    border-right: var(--group-item-border-right, var(--border-size-small) solid var(--border-subtle));
    display: flex;
    flex-direction: row;
    align-items: center;
    font: var(--label-medium);
    padding: var(--item-padding, 0);
  }

  label {
    display: flex;
  }

  :host button > label.pad,
  button {
    gap: var(--spacing-minimum);
  }

  :host([rounded]) > button {
    border-top-left-radius: var(--group-item-left-radius, var(--radius-minimal));
    border-bottom-left-radius: var(--group-item-left-radius, var(--radius-minimal));
    border-top-right-radius: var(--group-item-right-radius, var(--radius-minimal));
    border-bottom-right-radius: var(--group-item-right-radius, var(--radius-minimal));
  }

  :host([size="medium"]) {
    --item-padding: var(--group-item-padding, var(--spacing-3));
    height: var(--spacing-11);
  }

  :host([size="large"]) {
    --item-padding: var(--group-item-padding, var(--spacing-4));
    height: 52px; /*TODO: 52px is not tokenized?*/
  }

  :host([iconName=""]) > button > .icon,
  :host(:not([iconName])) > button > .icon {
    display: none;
  }
  :host([disabled]) label {
    color: var(--text-disabled);
  }
  :host zeta-icon {
    --icon-size: 20px;
  }
`;
