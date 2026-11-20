import { css } from "lit";
export default css`
  :host {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: var(--avatar-status-indicator-size, 12px);
    height: var(--avatar-status-indicator-size, 12px);
    border-radius: var(--radius-pill);
    border: calc(var(--avatar-status-indicator-size, 12px) * 0.06) solid var(--foreground-inverse);
    --icon-color: var(--foreground-inverse);
  }

  :host([status="available"]) {
    --status-color: var(--chart-positive);
  }

  :host([status="away"]) {
    --status-color: var(--chart-series-8);
  }

  :host([status="busy"]) {
    --status-color: var(--chart-negative);
  }

  :host([status="dnd"]) {
    --status-color: var(--chart-series-4);
  }

  :host([status="on-shift"]) {
    --status-color: var(--chart-series-1);
  }

  :host([status="offline"]) {
    --status-color: var(--foreground-inverse);
    --icon-color: var(--foreground-secondary);
  }

  :host([status="close"]) {
    --status-color: var(--chart-series-12);
  }

  :host([status="icon"]) {
    --status-color: var(--chart-series-1);
  }

  .indicator {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-pill);
    background-color: var(--status-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
