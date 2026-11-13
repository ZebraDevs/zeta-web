import { customElement, property } from "lit/decorators.js";
import styles from "./dropdown-menu-item.styles.js";
import { html, LitElement, nothing, type PropertyValues } from "lit";
import { Contourable, Interactive, Size } from "../../../mixins/mixins.js";
import "../../icon/icon.js";
import "../../checkbox/checkbox.js";
import "../../radio-button/radio-button.js";

/** Zeta Dropdown Menu Item is a component that represents an item in a dropdown menu.
 *
 * The host carries the `role` (`menuitem`, `menuitemcheckbox` or `menuitemradio` depending on `type`), `aria-checked` and `aria-disabled`,
 * and is the single focusable element. Place items in any `role="menu"` container (e.g. `zeta-droppable`).
 * Arrow Up/Down, Home and End move focus between sibling items; Enter and Space activate.
 *
 * @slot - Content of menu item; typically text.
 * @slot  {zeta-icon} icon - A leading element, usually a `zeta-icon` (or e.g. an avatar). Only shown if `type` is `default`.
 * @slot  {zeta-icon} trailing - A trailing `zeta-icon`, e.g. a submenu arrow.
 *
 * @event {Event} change - Fired when the user toggles a `checkbox` item or selects a `radio` item. Not fired for programmatic changes.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2402-6508
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-dropdown--docs
 */
@customElement("zeta-dropdown-menu-item")
export class ZetaDropdownMenuItem extends Contourable(Size(Interactive(LitElement))) {
  /** The kind of item. `default` shows the `icon` slot; `checkbox` and `radio` lead with a checkbox or radio button showing `checked`.
   * @defaultValue "default"
   */
  @property({ type: String, reflect: true }) type: "default" | "checkbox" | "radio" = "default";

  /** Whether the item is selected. Exposed as `aria-checked` for `checkbox` and `radio` types; use one of those for a choice. */
  @property({ type: Boolean, reflect: true }) checked: boolean = false;

  constructor() {
    super();
    this.addEventListener("click", this.handleClick);
    this.addEventListener("keydown", (e: KeyboardEvent) => this.key(e, "down"));
    this.addEventListener("keyup", (e: KeyboardEvent) => this.key(e, "up"));
    this.addEventListener("focus", this.handleFocus);
  }

  connectedCallback() {
    super.connectedCallback?.();
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
  }

  protected willUpdate(changed: PropertyValues<this>) {
    super.willUpdate(changed);
    // ARIA attributes rather than ElementInternals: axe and other a11y tooling can't see internals ARIA,
    // so a role="menu" container would be reported as having invalid children.
    this.setAttribute("role", this.type === "checkbox" ? "menuitemcheckbox" : this.type === "radio" ? "menuitemradio" : "menuitem");
    if (this.type === "default") this.removeAttribute("aria-checked");
    else this.setAttribute("aria-checked", String(this.checked));
    if (this.disabled) this.setAttribute("aria-disabled", "true");
    else this.removeAttribute("aria-disabled");
  }

  private get siblingItems(): ZetaDropdownMenuItem[] {
    return Array.from(this.parentElement?.children ?? []).filter((el): el is ZetaDropdownMenuItem => el instanceof ZetaDropdownMenuItem);
  }

  /** Roving tabindex: only the last-focused item in a menu is in the tab order. */
  private handleFocus = () => {
    this.siblingItems.forEach(item => item.setAttribute("tabindex", item === this ? "0" : "-1"));
  };

  private handleClick = (e: MouseEvent) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    if (this.type === "default" || (this.type === "radio" && this.checked)) return;
    this.checked = this.type === "checkbox" ? !this.checked : true;
    if (this.type === "radio") {
      this.siblingItems.forEach(item => {
        if (item !== this && item.type === "radio") item.checked = false;
      });
    }
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  };

  key(e: KeyboardEvent, type: "down" | "up") {
    if (type === "up") {
      if (e.key === " ") {
        this.click();
      }
      return;
    }
    const items = this.siblingItems;
    const index = items.indexOf(this);
    let next: ZetaDropdownMenuItem | undefined;
    switch (e.key) {
      case " ":
        e.preventDefault();
        return;
      case "Enter":
        e.preventDefault();
        this.click();
        return;
      case "ArrowDown":
        next = items[(index + 1) % items.length];
        break;
      case "ArrowUp":
        next = items[(index - 1 + items.length) % items.length];
        break;
      case "Home":
        next = items[0];
        break;
      case "End":
        next = items[items.length - 1];
        break;
      default:
        return;
    }
    e.preventDefault();
    next?.focus();
  }

  private renderLeading() {
    if (this.type === "checkbox") {
      return html`<zeta-checkbox inert .checked=${this.checked} ?disabled=${this.disabled} ?rounded=${this.rounded}></zeta-checkbox>`;
    }
    if (this.type === "radio") {
      return html`<zeta-radio-button inert .checked=${this.checked} ?disabled=${this.disabled}></zeta-radio-button>`;
    }
    return nothing;
  }

  protected render() {
    return html`<div class="droppable-item">
      ${this.renderLeading()}
      <slot name="icon"></slot>
      <span class="label"><slot></slot></span>
      <slot name="trailing"></slot>
    </div>`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-dropdown-menu-item": ZetaDropdownMenuItem;
  }
}
