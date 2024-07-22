import { css } from "lit";
export default css`
  .banner {
    display: flex;
    flex-direction: row;
    padding: var(--spacing-3);
    justify-content: center;
    align-items: center;
    border: var(--border-size-small) solid;
    color: var(--text-default);

    > .leading {
      padding-right: var(--spacing-2);
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
          fill: var(--icon-default);
          cursor: pointer;
        }

        > .title {
          font: var(--title-medium);
        }
      }
      > .body {
        margin-top: var(--spacing-1);
        font: var(--body-small);
      }

      > .footer {
        display: flex;
        flex-direction: row;
        gap: var(--spacing-2);
      }
    }
  }

  :host([rounded]) > .banner {
    border-radius: var(--radius-minimal);
  }

  .banner,
  :host([status="default"]) > .banner {
    border-color: var(--border-default);
    background: var(--surface-default);
    fill: var(--icon-default);
  }

  :host([status="info"]) > .banner {
    border-color: var(--border-flavor-info);
    background: var(--surface-flavor-info-subtle);
    zeta-icon {
      --icon-color: var(--icon-flavor-info);
    }
  }

  :host([status="positive"]) > .banner {
    border-color: var(--border-flavor-positive);
    background: var(--surface-flavor-positive-subtle);
    zeta-icon {
      --icon-color: var(--icon-flavor-positive);
    }
  }

  :host([status="warning"]) > .banner {
    border-color: var(--border-flavor-warning);
    background: var(--surface-flavor-warning-subtle);

    zeta-icon {
      --icon-color: var(--icon-flavor-warning);
    }
  }

  :host([status="negative"]) > .banner {
    border-color: var(--border-flavor-negative);
    background: var(--surface-flavor-negative-subtle);
    zeta-icon {
      --icon-color: var(--icon-flavor-negative);
    }
  }

  ::slotted([slot="leading-action"]),
  ::slotted([slot="trailing-action"]) {
    margin-top: var(--spacing-4);
  }
`;
