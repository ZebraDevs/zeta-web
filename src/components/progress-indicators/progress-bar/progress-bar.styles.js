import { css } from "lit";
export default css`
  :host {
    display: flex;
    --thin-size: var(--spacing-small);
    --medium-size: var(--spacing-large);
    --progress-bar-color: var(--main-primary);
  }

  .progress-bar {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-large);
    width: 100%;
  }

  .wrapper {
    display: flex;
    gap: var(--spacing-large);
    width: 100%;
  }

  label {
    font: var(--title-medium);
  }

  :host([size="thin"]) .wrapper {
    height: var(--thin-size);
  }

  :host([size="medium"]) .wrapper {
    height: var(--medium-size);
  }

  :host([rounded]) .wrapper {
    border-radius: var(--radius-large);
  }

  .track {
    background-color: var(--surface);
    display: flex;
    position: relative;
    border-radius: inherit;
    flex: 1;
  }

  :host([buffering]) .track,
  .buffering-dot {
    background-color: var(--surface-disabled);
  }

  .buffering-dot {
    border-radius: var(--radius-xxl);
    height: 100%;
    display: flex;
  }

  :host([size="thin"]) .buffering-dot {
    width: var(--thin-size);
  }

  :host([size="medium"]) .buffering-dot {
    width: var(--medium-size);
  }

  .bar {
    background-color: var(--progress-bar-color);
    height: 100%;
    border-radius: inherit;
  }

  :host(:not([indeterminate])) .bar {
    transition: width 0.5s;
  }

  :host([indeterminate]) .bar {
    width: 30%;
    position: absolute;
    animation: loading 2s linear infinite;
  }

  :host([indeterminate][buffering]) .bar {
    animation-play-state: paused;
  }

  @keyframes loading {
    0% {
      left: 0%;
      right: 100%;
      width: 0%;
    }
    10% {
      left: 0%;
      right: 75%;
      width: 30%;
    }
    90% {
      left: 75%;
      right: 0%;
      width: 30%;
    }
    100% {
      left: 100%;
      right: 0%;
      width: 0%;
    }
  }
`;
