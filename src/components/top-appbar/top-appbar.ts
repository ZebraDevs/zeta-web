import { html, LitElement, nothing } from "lit";
import styles from "./top-appbar.styles.js";
import { customElement, property } from "lit/decorators.js";

/**
 * Top Appbars provide content and actions related to the current screen.
 *
 * @slot - The content of the appbar.
 * @slot leading - The content to be placed at the start of the appbar.
 * @slot trailing - The content to be placed at the end of the appbar.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-37&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-top-appbar--docs
 */
@customElement("zeta-top-appbar")
export class ZetaTopAppbar extends LitElement {
  /** Centers the content of the title. */
  @property({ type: Boolean, reflect: true }) centered = false;

  /** Places the title below the main appbar. */
  @property({ type: Boolean, reflect: true }) extended = false;

  getTitle() {
    return html` <div class="title">
      <slot id="content-slot"></slot>
    </div>`;
  }

  protected render() {
    return html`
      <header>
        <div class="body">
          <slot id="leading-slot" name="leading"></slot>
          ${!this.extended ? this.getTitle() : nothing}
          <slot id="trailing-slot" name="trailing"></slot>
        </div>
        ${this.extended ? this.getTitle() : nothing}
      </header>
    `;
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-top-appbar": ZetaTopAppbar;
  }
}
