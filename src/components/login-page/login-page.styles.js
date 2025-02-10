import { css } from "lit";
export default css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-xxl);
    background: var(--surface-cool);
    padding: 0;
    height: 100vh;
    max-width: 100vw;
  }
  :host > main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-5xl);
    max-width: 100vw;
    min-width: 250px;
    align-items: center;
    background: var(--surface-cool);
    padding: var(--spacing-large);
    > zeta-button {
      width: 100%;
    }
  }
  .logo {
    box-sizing: border-box;
    background-image: url(/assets/zebra-logo-head.svg);
    background-size: auto 78px;
    background-repeat: no-repeat;

    min-height: 78px;
    position: relative;
    padding: var(--spacing-xl) 0 0 94px;
    > * {
      font-size: 1.25rem;
      line-height: 1.25;
    }
    > .zebra {
      font-weight: 500;
    }
    > .product {
      font-weight: 700;
    }
  }
`;
