import { css } from "lit";
export default css`
  :host {
    display: block;
    width: fit-content;
    height: fit-content;
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
    font: var(--label-small);
    color: var(--color-cool-90);
  }

  .cancel {
    display: none;
    justify-content: center;
    align-items: center;
    width: var(--spacing-8);
    height: var(--spacing-8);
    background-color: var(--color-cool-20);
    border-radius: var(--radius-full);
    cursor: pointer;
  }

  .uploading {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      .percentage {
        display: none;
      }

      .cancel {
        display: flex;
      }
    }
  }
`;
