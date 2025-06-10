import { customElement, property, query } from "lit/decorators.js";
import { html } from "lit";
import type { ZetaDroppable } from "../dropdown/droppable.js";
import "../button/icon-button/icon-button.js";
import "../dropdown/menu-item/dropdown-menu-item.js";
import "../dropdown/droppable.js";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";
import type { ZetaDropdownItem } from "../dropdown/dropdown-menu/dropdown-menu-button.js";
import { ZetaButton } from "../button/button.js";

/** Zeta Action Menu Button places a button that when clicked opens an action menu containing the items passed into it through the items prop.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=22391-10146
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-action-menu--docs
 */
@customElement("zeta-action-menu-button")
export class ZetaActionMenuButton extends ZetaButton {
  /** Controls the state of the dropdown menu. */
  @property({ type: Boolean }) open: boolean = false;

  /** Array of action items */
  @property({ type: Array }) items: Array<ZetaDropdownItem> = [
    {
      label: "Auto Item",
      icon: "star",
      onClick: () => {
        console.log("Auto Item clicked");
      }
    }
  ];

  /** The icon to be displayed on the button */
  @property({ type: String }) icon: ZetaIconName = "more_vertical";

  /** The alignment of the droppable relative to the action menu. Defaults start if left undefined.*/

  @property({ type: String }) alignment?: "start" | "end" | "center";

  /** The direction of the droppable relative to the anchor. Defaults to bottom if left undefined.*/
  @property({ type: String }) direction?: "left" | "right" | "bottom" | "top" = "bottom";

  @query("#anchor") anchor!: HTMLElement;

  @query("zeta-droppable") droppable!: ZetaDroppable;

  protected firstUpdated() {
    this.droppable.anchor = this.anchor;
  }

  private handleClick() {
    this.open = !this.open;
    if (this.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  private handleOutsideClick(e: Event) {
    if (this.open && !this.contains(e.target as Node)) {
      this.open = false;
      document.body.style.overflow = "auto";
    }
  }

  private renderItems() {
    return this.items.map(item => {
      return html`<zeta-dropdown-menu-item @click=${item.onClick} ?rounded=${this.rounded}>
        <zeta-icon slot="icon">${item.icon}</zeta-icon>${item.label}
      </zeta-dropdown-menu-item>`;
    });
  }

  protected render() {
    document.addEventListener("click", this.handleOutsideClick.bind(this));
    return html`
      <zeta-icon-button
        id="anchor"
        @click=${() => {
          this.handleClick();
        }}
        .size=${this.size}
        ?rounded=${this.rounded}
        .flavor=${this.flavor}
        >${this.icon}</zeta-icon-button
      >
      <zeta-droppable ?open=${this.open} ?rounded=${this.rounded} .alignment=${this.alignment} .direction=${this.direction} .anchor=${this.anchor}>
        ${this.renderItems()}
      </zeta-droppable>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-action-menu-button": ZetaActionMenuButton;
  }
}
