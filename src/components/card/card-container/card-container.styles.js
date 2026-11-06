import { css } from "lit";

export default css`
  :host([rounded]) {
    --_card-radius: var(--radius-sm);
  }
  :host([rounded="false"]) {
    --_card-radius: var(--radius-none);
  }
  :host {
    --_card-radius: var(--radius-none);
  }

  .card-header {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: var(--space-lg) var(--space-xl);
    gap: var(--space-sm);
    background-color: var(--interactive-ghost-background-default);
    transition: background 0.1s ease-in-out;
  }

  .card-header zeta-icon {
    width: var(--space-2xl);
    height: var(--space-2xl);
  }

  :host(:not([collapsible])) .card:not(.slot-populated) .card-content-wrapper {
    margin: 0;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host([collapsible]) .card-header:hover {
      background-color: var(--interactive-ghost-background-hover);
    }
  }

  :host(:not([expanded])) .card-header zeta-icon {
    rotate: -90deg;
  }

  .card-header .header-content {
    flex-direction: column;
    display: flex;
    gap: var(--space-2xs);
  }
  .card-header .title-container {
    display: flex;
    gap: var(--space-xs);
  }
  .card-header .title-container .required {
    color: var(--foreground-error);
    font: var(--title-large);
    font-size: var(--title-large-font-size);
    line-height: var(--title-large-line-height);
    letter-spacing: var(--title-large-letter-spacing);
  }

  .card-header .title-container h4 {
    font: var(--title-large);
    font-size: var(--title-large-font-size);
    line-height: var(--title-large-line-height);
    letter-spacing: var(--title-large-letter-spacing);
    margin: 0;
    color: var(--foreground-primary);
  }

  .card-header h5 {
    font: var(--title-medium);
    font-size: var(--title-medium-font-size);
    line-height: var(--title-medium-line-height);
    letter-spacing: var(--title-medium-letter-spacing);
    margin: 0;
    color: var(--foreground-secondary);
  }

  :host([collapsible]) .card-header {
    cursor: pointer;
  }

  .card-content-wrapper {
    position: relative;
    margin-left: var(--space-xl);
    margin-right: var(--space-xl);
    display: grid;
    grid-template-rows: 0fr;
    transition:
      grid-template-rows 0.2s ease-in-out,
      margin-bottom 0.2s ease-in-out;
  }

  .card-content {
    overflow: hidden;
  }

  :host([collapsible][expanded]) .card-content-wrapper,
  :host(:not([collapsible])) .card-content-wrapper {
    grid-template-rows: 1fr;
    margin-bottom: var(--space-xl);
  }

  .card {
    display: flex;
    position: relative;
    box-sizing: border-box;
    background-clip: padding-box;
    border-radius: var(--_card-radius);
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    transition: all 0.2s ease-in-out;
    background-color: var(--surface-card);
    -webkit-tap-highlight-color: transparent;
  }

  .border {
    border-radius: var(--_card-radius);
  }

  :host([ai]) .border {
    padding: var(--stroke-thick);
    background: linear-gradient(129deg, var(--foreground-gradient-start) 0%, var(--foreground-gradient-end) 100%);
  }

  :host([ai]) .card {
    border-radius: calc(var(--_card-radius) - var(--stroke-thick));
  }
`;
