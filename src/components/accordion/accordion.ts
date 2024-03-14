import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./accordion.scss?inline";
import "../icon/icon.js";
import { ContourableInteractiveElement } from "../../mixins/interactive.js";

/**
 * The accordion is a control element comprising a vertically stacked list of items, such as labels or thumbnails. Each item can be "expanded" or "collapsed" to reveal the content associated with that item. There can be zero expanded items, exactly one, or more than one item expanded at a time, depending on the configuration.
 *
 * The contents within the tag will be the child of the open accordion. Typically, this would be list items. Custom styles are applied to ```<li>``` elements to match Zeta styles.
 *
 * @slot default - li goes here
 *
 * @public
 */
@customElement("zeta-accordion")
export class ZetaAccordion extends ContourableInteractiveElement {
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

  /** Disabled the accordion.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;

  private toggleOpen() {
    if (!this.disabled) this.open = !this.open;
  }

  private titleTemplate() {
    return html`
      <div class="title">
        <div>${this.accordionTitle}</div>
        <zeta-icon .rounded=${this.rounded} size="24">${this.open ? "remove" : "add"}</zeta-icon>
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

