import { css } from "lit";
export default css`
  .avatar {
    border-radius: var(--radius-full);
    width: min-content;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: var(--border-size-medium);
  }

  :host([showStatus]) .avatar {
    box-shadow: 0 0 0 var(--border-size-medium) var(--color-green-60);
  }

  .inidicator {
    position: absolute;
    top: 0;
    right: 0;
  }

  .status-badge {
    border-radius: inherit;
    position: absolute;
    bottom: 0;
    right: 0;
    border: var(--border-size-medium) solid var(--surface-default);
  }

  .initials {
    background-color: var(--color-cool-20);
    width: 100%;
    height: 100%;
    border-radius: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    color: var(--text-subtle);
    overflow: hidden;
  }

  :host([size="xl"]) > .avatar > .initials {
    font: var(--title-large);
  }
  :host([size="lg"]) > .avatar > .initials {
    font: var(--label-large);
  }
  :host([size="md"]) > .avatar > .initials {
    font: var(--label-medium);
  }
  :host([size="sm"]) > .avatar > .initials,
  :host([size="xs"]) > .avatar > .initials {
    font: var(--label-small);
  }

  .icon-container {
    border-radius: inherit;
    overflow: hidden;
    position: relative;
  }

  img {
    object-fit: cover;
    object-position: center;
    border-radius: inherit;
  }
`;
