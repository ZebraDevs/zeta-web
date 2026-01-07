import { css } from "lit";

export default css`
  :host {
    --chart-card-border-color: var(--border-default);
    --chart-card-border-width: var(--border-size-small);
    --chart-card-background: var(--surface-default);
    --chart-card-min-height: 180px;
    display: block;
  }

  .card {
    background: var(--chart-card-background);
    border-radius: var(--spacing-medium);
    border: var(--chart-card-border-width) solid var(--chart-card-border-color);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.2s ease;
    min-height: var(--chart-card-min-height);
    box-sizing: border-box;
  }

  /* Interactive state */
  :host([clickable]) .card {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host([clickable]) .card:hover {
      transform: translateY(-2px);
      box-shadow: var(--elevation-2);
    }
  }

  :host([clickable]) .card:focus-visible {
    outline: 2px solid var(--main-primary);
    outline-offset: 2px;
  }

  :host([clickable]) .card:active {
    transform: translateY(0);
  }

  /* Header */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: var(--spacing-large) var(--spacing-2xl);
    gap: var(--spacing-large);
  }

  .header-left {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xs);
  }

  .title {
    font: var(--h4);
    color: var(--main-default);
    margin: 0;
    line-height: 1.2;
    font-weight: var(--medium);
  }

  .title ::slotted(*) {
    margin: 0;
    font: var(--h4);
    color: var(--main-default);
    font-weight: var(--medium);
  }

  .subtitle {
    font: var(--body-small);
    color: var(--main-subtle);
    margin: 0;
    line-height: 1.4;
    font-weight: var(--regular);
  }

  .subtitle ::slotted(*) {
    margin: 0;
    font: var(--body-small);
    color: var(--main-subtle);
    font-weight: var(--regular);
  }

  /* Content */
  .content {
    flex: 1;
    padding: var(--spacing-large) var(--spacing-2xl);
    padding-bottom: var(--spacing-large);
    overflow: visible;
    display: block;
    min-height: var(--chart-card-min-height);
    flex-grow: 1;
  }

  .error {
    color: var(--main-negative);
    padding: var(--spacing-large);
    background: var(--surface-negative-subtle);
    border-radius: var(--spacing-small);
    font: var(--body-medium);
    display: flex;
    align-items: center;
    gap: var(--spacing-small);
  }

  .error::before {
    content: '⚠️';
  }

  /* Footer */
  .footer {
    padding: var(--spacing-medium) var(--spacing-2xl);
    border-top: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--spacing-small);
    background-color: var(--chart-card-background);
    border-bottom-left-radius: var(--spacing-medium);
    border-bottom-right-radius: var(--spacing-medium);
    overflow: hidden;
    position: relative;
  }

  /* Footer divider line */
  .footer::before {
    content: "";
    position: absolute;
    top: 0;
    left: var(--spacing-2xl);
    right: var(--spacing-2xl);
    height: var(--border-size-small);
    background-color: var(--border-subtle);
  }

  /* Loading skeleton */
  .skeleton {
    pointer-events: none;
  }

  .skeleton-header {
    height: 24px;
    width: 60%;
    background: linear-gradient(
      90deg,
      var(--surface-subtle) 25%,
      var(--surface-hover) 50%,
      var(--surface-subtle) 75%
    );
    background-size: 200% 100%;
    animation: shimmerAnimation 1.5s infinite;
    border-radius: var(--spacing-small);
    margin: var(--spacing-2xl) var(--spacing-3xl);
  }

  .skeleton-content {
    flex: 1;
    margin: var(--spacing-3xl);
    background: linear-gradient(
      90deg,
      var(--surface-subtle) 25%,
      var(--surface-hover) 50%,
      var(--surface-subtle) 75%
    );
    background-size: 200% 100%;
    animation: shimmerAnimation 1.5s infinite;
    border-radius: var(--spacing-small);
    min-height: 150px;
  }

  .skeleton-footer {
    height: 32px;
    width: 120px;
    background: linear-gradient(
      90deg,
      var(--surface-subtle) 25%,
      var(--surface-hover) 50%,
      var(--surface-subtle) 75%
    );
    background-size: 200% 100%;
    animation: shimmerAnimation 1.5s infinite;
    border-radius: var(--spacing-small);
    margin: 0 var(--spacing-3xl) var(--spacing-2xl) var(--spacing-3xl);
  }

  @keyframes shimmerAnimation {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

