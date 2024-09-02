import { customElement } from "lit/decorators.js";
import styles from "./dropdown-menu-item.styles.js";
import { html, LitElement } from "lit";
import { Contourable, Interactive } from "../../../mixins/mixins.js";
import "../../icon/icon.js";

/** Zeta Dropdown Menu Item is a component that represents an item in a dropdown menu.
 *
 * @slot - Content of menu item; typically text.
 * @slot  {zeta-icon} icon - A `zeta-icon` element shown on leading side of item. Only shown if `type` is `default`.
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=22391-10146
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/dropdown--docs
 */
@customElement("zeta-dropdown-menu-item")
export class ZetaDropdownMenuItem extends Contourable(Interactive(LitElement)) {

  key(e: KeyboardEvent, type: "down" | "up") {
    if (type === "up") {
      if (e.key === " ") {
        this.click();
      }
    }
  }

  protected render() {
    return html`<div
      class="droppable-item"
      tabindex=${0}
      @keydown=${(e: KeyboardEvent) => this.key(e, "down")}
      @keyup=${(e: KeyboardEvent) => this.key(e, "up")}
    >
      <div class="leading"><slot name="icon"></slot></div>
      <div class="header">
        <slot></slot>
      </div>
    </div>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-dropdown-menu-item": ZetaDropdownMenuItem;
  }
}
