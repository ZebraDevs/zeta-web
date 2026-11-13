import { css } from "lit";

/**
 * Shared behaviour for the table's compact popover menus: row actions, column filter and column settings.
 * Each menu is a `role="menu"` popover holding `zeta-dropdown-menu-item`s, which bring their own arrow-key movement.
 */

const items = (menu: HTMLElement) =>
  [...menu.querySelectorAll("zeta-dropdown-menu-item"), ...[...menu.querySelectorAll("slot")].flatMap(s => s.assignedElements())].filter(
    (el): el is HTMLElement => el.localName === "zeta-dropdown-menu-item" && !el.hasAttribute("disabled")
  );

/** Opens `menu` below `trigger`, flipping above or inward when it would leave the viewport, and focuses the first item. */
export function showMenu(menu: HTMLElement, trigger: HTMLElement, align: "start" | "end" = "start") {
  menu.showPopover();
  const t = trigger.getBoundingClientRect();
  const m = menu.getBoundingClientRect();
  const gap = parseFloat(getComputedStyle(menu).getPropertyValue("--space-2xs")) || 0;
  const left = align === "end" ? t.right - m.width : t.left;
  const top = t.bottom + gap + m.height > window.innerHeight ? t.top - gap - m.height : t.bottom + gap;
  menu.style.left = `${Math.max(0, Math.min(left, window.innerWidth - m.width))}px`;
  menu.style.top = `${Math.max(0, top)}px`;
  items(menu)[0]?.focus();
}

/**
 * Event handlers for a menu: Escape and Tab close it and return focus to `getTrigger()`, and choosing a plain action item closes it.
 * Checkbox and radio items keep it open so several can be toggled. Bind them with `@keydown` and `@click` on the menu.
 */
export function menuHandlers(getTrigger: () => HTMLElement | null | undefined) {
  const close = (menu: HTMLElement) => {
    menu.hidePopover();
    getTrigger()?.focus();
  };
  return {
    keydown: (e: KeyboardEvent) => {
      if (e.key !== "Escape" && e.key !== "Tab") return;
      e.preventDefault();
      close(e.currentTarget as HTMLElement);
    },
    click: (e: MouseEvent) => {
      const item = e.composedPath().find(el => (el as Element).localName === "zeta-dropdown-menu-item") as HTMLElement | undefined;
      if (item && !item.hasAttribute("disabled") && (item.getAttribute("type") ?? "default") === "default") close(e.currentTarget as HTMLElement);
    }
  };
}

export const menuStyles = css`
  /* Names for controls that show no text, read by screen readers only. */
  .visually-hidden {
    position: absolute;
    /* The one-pixel box screen readers need; stroke-thin is the token for one pixel. */
    width: var(--stroke-thin);
    height: var(--stroke-thin);
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .menu {
    inset: auto;
    margin: 0;
    padding: var(--space-xs);
    border: none;
    border-radius: var(--_table-menu-radius, var(--radius-element-md));
    background-color: var(--surface-menu);
    box-shadow:
      var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft),
      var(--shadow-small-x) var(--shadow-small-y) var(--shadow-small-blur) var(--shadow-soft);
    color: var(--foreground-primary);
    overflow: auto;
  }
  .menu:popover-open {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
  }
  .menu [role="separator"] {
    margin: 0;
    border: none;
    border-top: var(--stroke-thin) solid var(--border-subtle);
  }
  .icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    box-sizing: border-box;
    width: var(--control-sm);
    height: var(--control-sm);
    padding: var(--space-2xs);
    border: none;
    border-radius: var(--_table-control-radius, var(--radius-none));
    background-color: var(--interactive-ghost-background-default);
    color: var(--foreground-primary);
    --icon-size: var(--control-icon-md);
    cursor: pointer;
  }
  .icon-button:hover {
    background-color: var(--interactive-ghost-background-hover);
  }
  .icon-button:active {
    background-color: var(--interactive-ghost-background-pressed);
  }
  .icon-button:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thick));
  }
  .icon-button:disabled {
    background-color: var(--interactive-ghost-background-disabled);
    color: var(--foreground-disabled);
    cursor: default;
  }
`;
