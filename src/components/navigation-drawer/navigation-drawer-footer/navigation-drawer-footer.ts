import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-drawer-footer.scss";

/** ZetaNavigationDrawerFooter web component.
 *
 * The footer used on a navigation drawer.
 *
 * @slot - The headline text.
 * @slot leading - Content placed before the headline.
 * @slot trailing - Content placed after the headline.
 *
 * @public */
@customElement("zeta-navigation-drawer-footer")
export class ZetaNavigationDrawerFooter extends LitElement {
  /**
   * The headline text. Can also be slotted.
   */
  @property({ type: String }) headline?: string;
  /**
   * The sub headline text.
   */
  @property({ type: String, attribute: "sub-headline" }) subHeadline?: string;

  /**
   * Shows a divider above the footer.
   */
  @property({ type: Boolean, reflect: true }) divide: boolean = false;

  protected override render() {
    return html`<footer class="drawer-footer">
      <div class="leading">
        <slot name="leading"></slot>
        <div class="main-content">
          <h1>${this.headline}<slot></slot></h1>
          ${this.subHeadline ? html`<h2>${this.subHeadline}</h2>` : nothing}
        </div>
      </div>
      <div class="trailing">
        <slot name="trailing"></slot>
      </div>
    </footer>`;
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-drawer-footer": ZetaNavigationDrawerFooter;
  }
}
