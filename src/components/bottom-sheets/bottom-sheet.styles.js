import { css } from "lit";
export default css`
  :host {
    display: block;
    position: relative;
    overflow-y: hidden;
  }

  :host > .container {
    transition: transform 250ms ease;
  }

  :host(:not([isExpanded])) > .container {
    transform: translateY(100%);
  }

  :host([isExpanded]) > .container {
    transform: translateY(0);
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    padding: var(--spacing-small) var(--spacing-small) var(--spacing-5xl) var(--spacing-small);
    border-top-right-radius: var(--radius-large);
    border-top-left-radius: var(--radius-large);
    max-height: var(--bottom-sheet-max-height, 90vh);
  }

  .handle {
    display: inherit;
    background-color: var(--surface-disabled);
    width: var(--spacing-4xl);
    height: var(--spacing-minimum);
    border-radius: var(--radius-full);
    align-self: center;
  }

  :host([headerAlignment="start"]) .header {
    justify-content: flex-start;
  }

  :host([headerAlignment="center"]) .header {
    justify-content: center;
  }

  .header {
    display: inherit;
    width: calc(100% - var(--spacing-xl) * 2);
    justify-content: flex-start;
    color: var(--main-default);
    padding: var(--spacing-xl);
    font: var(--title-large);
  }

  .content {
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
  }

  .isGenericContent {
    display: block;
  }

  .isGrid {
    display: grid;
    justify-content: space-around;
    grid-template-columns: auto auto auto;
    gap: var(--spacing-5xl);
  }
`;
