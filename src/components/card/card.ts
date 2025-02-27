import { html, LitElement } from "lit";
import { Contourable } from "../../mixins/mixins.js";
import { customElement } from "lit/decorators.js";
import styles from "./card.styles.js";

export * from "./card-body/card-body.js";
export * from "./card-footer/card-footer.js";
export * from "./card-header/card-header.js";

/**
 * Cards are used to display content.
 *
 * @slot - The content of the card.
 * @cssproperty --card-border-size the width of the border
 * @cssproperty --card-border-color the color of the border
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-10&node-type=canvas&m=dev
 * @storybook https://zeta-ds.web.app/web/storybook/index.html?path=/docs/cards--docs
 */
@customElement("zeta-card")
export class ZetaCard extends Contourable(LitElement) {
  protected render() {
    return html` <div class="card"><slot></slot></div>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-card": ZetaCard;
  }
}
