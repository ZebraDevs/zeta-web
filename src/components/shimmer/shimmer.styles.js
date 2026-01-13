import { css } from "lit";
export default css`
  :host {
    display: block;
    --shimmer-height: 20px;
    --shimmer-width: 100%;
    --shimmer-animation-duration: 1.5s;
    --shimmer-border-radius: 0px;
  }

  .shimmer {
    height: var(--shimmer-height);
    width: var(--shimmer-width);
    flex: 1;
    background: linear-gradient(
      135deg,
      var(--color-cool-30) 0%,
      var(--color-cool-30) 33%,
      var(--color-cool-20) 44%,
      var(--color-cool-10) 55%,
      var(--color-cool-30) 66%,
      var(--color-cool-30)
    );
    background-size: 300% 100%;
    animation: shimmer var(--shimmer-animation-duration) infinite;
    border-radius: var(--shimmer-border-radius);
  }

  @media (prefers-color-scheme: dark) {
    .shimmer {
      background: linear-gradient(
        135deg,
        var(--color-cool-30) 0%,
        var(--color-cool-30) 33%,
        var(--color-cool-40) 44%,
        var(--color-cool-50) 55%,
        var(--color-cool-30) 66%,
        var(--color-cool-30)
      );
      background-size: 300% 100%;
      animation: shimmer var(--shimmer-animation-duration) infinite;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: 100% 0%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
`;
