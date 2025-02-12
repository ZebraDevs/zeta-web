import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../mixins/contour.js";
import { Interactive } from "../../mixins/interactive.js";
import { Size } from "../../mixins/size.js";
import styles from "./option.styles.js";
import { ZetaOptionClickEvent } from "../../events.js";

/** ZetaOption web component.
 *
 * @slot - The default slot
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-39&m=dev
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/story/select-input--select-input
 */
@customElement("zeta-option")
export class ZetaOption extends Contourable(Interactive(Size(LitElement))) {
  @property({ type: String }) value: string = "";

  @property({ type: Boolean, reflect: true }) selected: boolean = false;

  @property({ type: Boolean }) disabled: boolean = false;

  private _handleClick = () => {
    if (!this.disabled) {
      // uncomment this to enable deselection
      // this.selected = !this.selected;
      this.dispatchEvent(new ZetaOptionClickEvent({ value: this.value }).toEvent());
    }
  };

  key(e: KeyboardEvent, type: "down" | "up") {
    if (type === "down") {
      if (e.key === " " || e.key === "Enter") {
        this._handleClick();
      }
    }
  }

  protected override render() {
    this.addEventListener("keydown", (e: KeyboardEvent) => this.key(e, "down"));
    this.addEventListener("keyup", (e: KeyboardEvent) => this.key(e, "up"));
    return html`
      <div tabindex="0" class="option" @click=${this._handleClick}>
        <slot></slot>
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-option": ZetaOption;
  }
}
