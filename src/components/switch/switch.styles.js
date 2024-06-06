import { css } from "lit";
export default css`
  .container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--spacing-13);
    height: var(--spacing-8);
    padding: 0;
    border: none;
    border-radius: var(--radius-full) !important;
  }

  :host([active]) {
    zeta-icon {
      left: var(--spacing-2);
    }

    .indicator .track {
      fill: var(--icon-flavor-primary);
    }

    .indicator .thumb {
      transform: translateX(var(--spacing-8));
    }
  }
  .indicator .track {
    fill: var(--icon-disabled);
    transition: all 0.2s ease-out;
  }

  .indicator .thumb {
    transition: all 0.2s ease-out;
    fill: var(--icon-inverse);
  }

  .container:disabled {
    .indicator .thumb {
      fill: var(--icon-disabled);
    }

    .indicator .track {
      fill: var(--surface-disabled);
    }
  }

  zeta-icon {
    width: fit-content;
    transition: all 0.2s ease-out;
    position: absolute;
    right: var(--spacing-2);
  }
`;
