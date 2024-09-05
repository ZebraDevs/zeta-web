import { css } from "lit";
export default css`
  .banner {
    display: flex;
    flex-direction: row;
    padding: var(--spacing-medium);
    justify-content: center;
    align-items: center;
    border: var(--border-size-small) solid;
    color: var(--main-default);

    > .leading {
      padding-right: var(--spacing-small);
      padding-top: var(--spacing-0-5);
      align-self: stretch;
      --icon-size: 20px;
    }

    > .trailing {
      flex: 1;
      > .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        zeta-icon#close {
          fill: var(--main-default);
          cursor: pointer;
        }

        > .title {
          font: var(--title-medium);
        }
      }
      > .body {
        margin-top: var(--spacing-minimum);
        margin-right: var(--spacing-3xl);
        font: var(--body-small);
      }

      > .content {
        margin-top: var(--spacing-medium);
        max-width: calc(100% - var(--spacing-3xl));

        > ::slotted(*) {
          max-width: 100%;
          height: auto;
        }
      }

      > .footer {
        display: flex;
        flex-direction: row;
        gap: var(--spacing-small);
        max-width: calc(100% - var(--spacing-3xl));
      }
    }
  }

  :host([rounded]) > .banner {
    border-radius: var(--radius-minimal);
  }

  :host([rounded]) .content ::slotted(*) {
    border-radius: var(--radius-minimal);
  }

  .banner,
  :host([status="default"]) > .banner {
    border-color: var(--border-default);
    background: var(--surface-default);
    fill: var(--main-default);
  }

  :host([status="info"]) > .banner {
    border-color: var(--border-info);
    background: var(--surface-info-subtle);
    zeta-icon {
      --icon-color: var(--main-info);
    }
  }

  :host([status="positive"]) > .banner {
    border-color: var(--border-positive);
    background: var(--surface-positive-subtle);
    zeta-icon {
      --icon-color: var(--main-positive);
    }
  }

  :host([status="warning"]) > .banner {
    border-color: var(--border-warning);
    background: var(--surface-warning-subtle);

    zeta-icon {
      --icon-color: var(--main-warning);
    }
  }

  :host([status="negative"]) > .banner {
    border-color: var(--border-negative);
    background: var(--surface-negative-subtle);
    zeta-icon {
      --icon-color: var(--main-negative);
    }
  }

  ::slotted([slot="action"]) {
    margin-top: var(--spacing-large);
  }

  ::slotted([slot="leadingAction"]:not(zeta-button)),
  ::slotted([slot="trailingAction"]:not(zeta-button)) {
    display: none;
  }
`;
