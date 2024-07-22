import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable, Interactive } from "../mixins/mixins.js";
import styles from "./accordion.styles.js";
import "./icon/icon.js";

/**
 * The accordion is a control element comprising a vertically stacked list of items, such as labels or thumbnails. Each item can be "expanded" or "collapsed" to reveal the content associated with that item. There can be zero expanded items, exactly one, or more than one item expanded at a time, depending on the configuration.
 *
 * The contents within the tag will be the child of the open accordion. Typically, this would be list items. Custom styles are applied to ```<li>``` elements to match Zeta styles.
 *
 * @slot - Typically li
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=3427-67874
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/accordion--docs
 */
@customElement("zeta-accordion")
export class ZetaAccordion extends Contourable(Interactive(LitElement)) {
  /** The title of the accordion. */
  @property({ type: String }) accordionTitle?: string;

  /** Creates a border around the accordion.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true }) contained: boolean = false;

  /**
   * Whether the accordion is open.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true }) open = false;

  private toggleOpen() {
    if (!this.disabled) this.open = !this.open;
  }

  private titleTemplate() {
    return html`
      <div class="title">
        <div>${this.accordionTitle}</div>
        <zeta-icon .rounded=${this.rounded}>${this.open ? "remove" : "add"}</zeta-icon>
      </div>
    `;
  }

  private bodyTemplate() {
    return html`<div class="body" ?open=${this.open}><slot></slot></div>`;
  }

  protected render() {
    return html`<div class="accordion" @click=${(_e: Event) => this.toggleOpen()}>${this.titleTemplate()} ${this.bodyTemplate()}</div>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-accordion": ZetaAccordion;
  }
}
