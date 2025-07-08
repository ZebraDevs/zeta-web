import { css } from "lit";

export default css`
  .card-header {
    display: flex;
    padding-left: calc(var(--spacing-2xl) - var(--border-size-medium));
    padding-top: calc(var(--spacing-2xl) - var(--border-size-medium));
    padding-right: calc(var(--spacing-2xl) - var(--border-size-medium));
    padding-bottom: calc(var(--spacing-2xl) - var(--border-size-medium));
    width: calc(100% - var(--spacing-7xl));
    border-radius: var(--spacing-medium);
    transition: background 0.2s ease-in-out;

    zeta-icon {
      width: var(--spacing-2xl);
      height: var(--spacing-2xl);
    }
  }

  .card-header:hover {
    background: var(--surface-hover);
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
  }

  .card-header h5 {
    font: var(--h5);
    margin: var(--spacing-none);
    color: var(--main-subtle);
  }

  :host([collapsible]) .card {
    cursor: pointer;

    .card-content {
      cursor: auto;
    }
  }

  :host([collapsible][expanded]) .card-header {
    padding-bottom: var(--spacing-large);
  }
  :host([collapsible]:not([expanded])) .card-content {
    max-height: var(--spacing-none);
    overflow: hidden;
    margin-top: var(--spacing-none);
    margin-bottom: var(--spacing-none);
  }

  .card-content {
    width: calc(100% - var(--spacing-7xl));
    position: relative;
    transition: all 0.2s ease-in-out;
    margin-left: calc(var(--spacing-2xl) - var(--border-size-medium));
    margin-bottom: calc(var(--spacing-2xl) - var(--border-size-medium));
    margin-right: calc(var(--spacing-2xl) - var(--border-size-medium));
  }

  .card {
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    background: var(--surface-default);
    background-clip: padding-box;
    border: solid var(--border-size-medium) transparent;
    border-radius: var(--spacing-medium);
    flex-direction: column;
    align-items: flex-start;
    transition: all 0.4s ease-in-out;

    &:before {
      content: "";
      position: absolute;
      top: var(--spacing-none);
      right: var(--spacing-none);
      bottom: var(--spacing-none);
      left: var(--spacing-none);
      z-index: -1;
      margin: calc(-1 * var(--border-size-medium));
      border-radius: inherit;
      background: linear-gradient(to right, #1f6aff, #ff40fc 77%);
    }
  }
`;
