import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable, Interactive } from "../../mixins/mixins.js";
import styles from "./accordion.styles.js";

/**
 * The accordion is a control element comprising a vertically stacked list of items, such as labels or thumbnails. Each item can be "expanded" or "collapsed" to reveal the content associated with that item. There can be zero expanded items, exactly one, or more than one item expanded at a time, depending on the configuration.
 *
 * @slot - children should be `zeta-accordion-item` elements.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=3427-67874
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-accordion--docs
 */
@customElement("zeta-accordion")
export class ZetaAccordion extends Contourable(Interactive(LitElement)) {
  /** Determines if the ZetaAccordion should be in a card container. */
  @property({ type: Boolean, reflect: true }) inCard = false;

  /** Determines if multiple items can be open at the same time.
  When `false`, only one accordion item can be open at a time. */
  @property({ type: Boolean, reflect: true }) openMultiple = false;

  /** Determines if multiple accordion items can be selected. */
  @property({ type: Boolean, reflect: true }) selectMultiple = false;

  protected render() {
    return html` <div class="accordion contourable-target">
      <slot> </slot>
    </div>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-accordion": ZetaAccordion;
  }
}
