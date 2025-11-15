import { css } from "lit";

export default css`
  .card-header {
    display: flex;
    padding-left: calc(var(--spacing-2xl) - var(--border-size-medium));
    padding-top: calc(var(--spacing-2xl) - var(--border-size-medium));
    padding-right: calc(var(--spacing-2xl) - var(--border-size-medium));
    padding-bottom: calc(var(--spacing-2xl) - var(--border-size-medium));
    width: calc(100% - var(--spacing-7xl));
    border-radius: calc(var(--spacing-medium) - var(--border-size-small));
    transition: background 0.1s ease-in-out;
  }

  .card-header zeta-icon {
    width: var(--spacing-2xl);
    height: var(--spacing-2xl);
  }

  :host(:not([collapsible])) .card.slot-populated .card-header {
    padding-bottom: var(--spacing-large);
  }

  :host(:not([collapsible])) .card:not(.slot-populated) .card-content-wrapper {
    margin: 0;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host([collapsible]) .card-header:hover {
      background-color: var(--surface-hover);
    }
  }

  :host(:not([expanded])) .card-header zeta-icon {
    rotate: -90deg;
  }

  .card-header .header-content {
    flex-direction: column;
    display: flex;
    gap: var(--border-size-small);
  }
  .card-header .title-container {
    display: flex;
  }
  .card-header .title-container .required {
    color: var(--main-negative);
    font: var(--h4);
  }

  .card-header .title-container h4 {
    font: var(--h4);
    margin: var(--spacing-none);
    color: var(--main-default);
  }

  .card-header h5 {
    font: var(--h5);
    margin: var(--spacing-none);
    color: var(--main-subtle);
  }

  :host([collapsible]) .card-header {
    cursor: pointer;
  }

  :host([collapsible][expanded]) .card-header {
    padding-bottom: var(--spacing-large);
  }

  .card-content-wrapper {
    width: calc(100% - var(--spacing-7xl));
    position: relative;
    margin-left: calc(var(--spacing-2xl) - var(--border-size-medium));
    margin-right: calc(var(--spacing-2xl) - var(--border-size-medium));
    display: grid;
    grid-template-rows: 0fr;
    transition:
      grid-template-rows 0.3s ease-in-out,
      margin-bottom 0.3s ease-in-out;
  }

  .card-content {
    overflow: hidden;
  }

  :host([collapsible][expanded]) .card-content-wrapper,
  :host(:not([collapsible])) .card-content-wrapper {
    grid-template-rows: 1fr;
    margin-bottom: calc(var(--spacing-2xl) - var(--border-size-medium));
  }

  .card {
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    background-clip: padding-box;
    border-radius: calc(var(--spacing-medium) - var(--border-size-small));
    flex-direction: column;
    align-items: flex-start;
    transition: all 0.4s ease-in-out;
    background-color: var(--surface-default);
    -webkit-tap-highlight-color: transparent;
  }

  .border {
    border-radius: var(--spacing-medium);
    padding: var(--border-size-medium);
  }

  :host([ai]) .border {
    background: linear-gradient(to right, #1f6aff, #ff40fc 77%);
  }
`;
