import { css } from "lit";
export default css`
  :host {
    --banner-background-color: var(--surface-default);
    --banner-border-color: var(--border-default);
    --banner-foreground-color: var(--main-default);
    --banner-icon-color: var(--main-default);

    display: flex;
    flex-direction: column;
    padding: var(--spacing-medium);
    justify-content: center;
    align-items: center;
    border: var(--border-size-small) solid var(--banner-border-color);
    color: var(--banner-foreground-color);
    background-color: var(--banner-background-color);

    > .container {
      display: flex;
      flex-direction: row;
      width: 100%;

      > .center {
        display: flex;
        flex-direction: column;
        flex: 1;

        > .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          > .title {
            font: var(--label-large);
          }
        }
        > .body {
          margin-top: var(--spacing-minimum);
          margin-right: var(--spacing-3xl);
          font: var(--body-small);
        }

        > .content {
          max-width: calc(100% - var(--spacing-3xl));
          margin-top: var(--spacing-0-5);

          > ::slotted(*) {
            max-width: 100%;
            height: auto;
          }
        }
      }

      > .leading {
        padding-right: var(--spacing-small);
        padding-top: var(--spacing-0-5);
        align-self: stretch;
        --icon-size: 20px;

        zeta-icon {
          --icon-color: var(--banner-icon-color);
        }
      }

      > .trailing {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-minimum);

        zeta-icon-button {
          margin-top: -4px;
          margin-right: -4px;
          --icon-button-color: transparent;
          --icon-button-icon-color: var(--main-default);
          cursor: pointer;
        }
      }
    }
    > .footer {
      display: flex;
      flex-direction: row;
      gap: var(--spacing-small);
      max-width: calc(100% - var(--spacing-3xl));
      align-items: flex-start;
      width: 100%;
    }
  }

  :host([rounded]),
  :host([rounded]) .content ::slotted(*) {
    border-radius: var(--radius-minimal);
  }

  :host([status="default"]) {
    --banner-border-color: var(--border-default);
    --banner-background-color: var(--surface-default);
    --banner-icon-color: var(--main-default);
  }

  :host([status="info"]) {
    --banner-border-color: var(--border-info);
    --banner-background-color: var(--surface-info-subtle);
    --banner-icon-color: var(--main-info);
  }

  :host([status="positive"]) {
    --banner-border-color: var(--border-positive);
    --banner-background-color: var(--surface-positive-subtle);
    --banner-icon-color: var(--main-positive);
  }

  :host([status="warning"]) {
    --banner-border-color: var(--border-warning);
    --banner-background-color: var(--surface-warning-subtle);
    --banner-icon-color: var(--main-warning);
  }

  :host([status="negative"]) {
    --banner-border-color: var(--border-negative);
    --banner-background-color: var(--surface-negative-subtle);
    --banner-icon-color: var(--main-negative);
  }

  ::slotted([slot="action"])zeta-button[flavor="outline-subtle"] {
    --button-background-color: transparent;
  }
  ::slotted([slot="action"]) {
    margin-top: var(--spacing-large);
  }
`;
