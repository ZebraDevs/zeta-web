import { css } from "lit";
export default css`
  :host {
    display: block;
    width: fit-content;
    height: fit-content;
    --progress-circle-color: var(--border-info);
  }
  .cancel zeta-icon {
    --icon-size: 20px;
    --icon-color: var(--foreground-primary);
  }

  svg.loading {
    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    animation: rotation 1s linear infinite;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .percentage {
    font: var(--indicator-medium);
    color: var(--foreground-primary);
  }

  /* Hidden but focusable so keyboard users can reach it; shown on hover/focus. */
  .cancel {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    pointer-events: none;
    justify-content: center;
    align-items: center;
    background-color: var(--interactive-ghost-background-hover);
    border: var(--stroke-base) solid var(--interactive-neutral-border-default);
    border-radius: var(--radius-pill);
    cursor: pointer;
  }

  .uploading {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .uploading:focus-within {
    .percentage {
      display: none;
    }

    .cancel {
      opacity: 1;
      pointer-events: auto;
    }
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    .uploading:hover {
      .percentage {
        display: none;
      }

      .cancel {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
`;
