import { css } from "lit";
export default css`
  :host {
    display: block;
    width: fit-content;
    height: fit-content;
    --progress-circle-color: var(--main-primary);
  }
  .cancel zeta-icon {
    --icon-size: 20px;
    --icon-color: var(--main-default);
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
    color: var(--main-default);
  }

  .cancel {
    display: none;
    justify-content: center;
    align-items: center;
    background-color: var(--surface-hover);
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
