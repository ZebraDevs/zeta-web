import { css } from "lit";
export default css`
  .drawer-footer-profile {
    padding: var(--spacing-4);
    background: var(--surface-default-inverse);
    display: flex;
    gap: var(--spacing-4);
    justify-content: space-between;
    align-items: center;

    .main-content {
      display: flex;
      flex-direction: column;
    }

    h1 {
      font: var(--body-small);
      color: var(--text-inverse);
      margin: 0;
    }

    h2 {
      font: var(--body-x-small);
      color: var(--color-cool-50);
      margin: 0;
    }

    .leading {
      display: flex;
      gap: inherit;
      align-items: center;
    }

    .trailing {
      display: flex;
      justify-self: flex-end;
    }
  }

  :host([hideDefaultLogo]) .logo {
    display: none;
  }

  .drawer-footer-logo {
    padding: var(--spacing-3) var(--spacing-4);
    background: var(--surface);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .logo {
      width: var(--spacing-20);
      height: var(--spacing-8);
    }

    h3 {
      font: var(--body-x-small);
      color: var(--text-subtle);
      text-align: center;
      font-weight: 400;
    }
  }

  :host([divide]) footer {
    box-shadow: 0 -1px 0 0 var(--border-subtle);
  }
`;
