import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./filter-chip.styles.js";
import "../../icon/icon.js";
import { BaseChip } from "../base-chips/base-chip.js";

/** Zeta Filter Chip web component.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21265-14112
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/chips--docs
 */
@customElement("zeta-filter-chip")
export class ZetaFilterChip extends BaseChip {
  @property({ type: Boolean, reflect: true }) active?: boolean;

  static styles = [super.styles ?? [], styles];

  getIcon() {
    if (this.active) {
      return html`<zeta-icon color=${this.disabled ? "var(--main-disabled)" : "var(--main-inverse)"} class="icon" size="20">check_mark</zeta-icon>`;
    } else {
      return nothing;
    }
  }

  clickHanlder() {
    const event = new CustomEvent("change", {
      detail: this.active
    });
    this.active = !this.active;
    this.dispatchEvent(event);
  }

  protected override render() {
    return html`<button class="container interactive-target" @click=${() => this.clickHanlder()} ?disabled=${this.disabled}>
      ${this.getIcon()}<slot></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-filter-chip": ZetaFilterChip;
  }
}
