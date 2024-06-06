import { LitElement, html, nothing } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import styles from "./navigation-drawer-footer.styles.js";
import ZebraLogo from "../../../../assets/zebra-logo.svg";

/**
 * The footer used on a navigation drawer.
 *
 * @slot - The headline text.
 * @slot leading - Content placed before the headline. Not shown if 'variant' is set to 'logo'.
 * @slot trailing - Content placed after the headline. Not shown if 'variant' is set to 'logo'.
 * @slot logo - The element that replaces the default Zebra logo. Not shown if 'variant' is set to 'profile'.
 */
@customElement("zeta-navigation-drawer-footer")
export class ZetaNavigationDrawerFooter extends LitElement {
  /** The headline text. Can also be slotted. */
  @property({ type: String }) headline?: string;

  /** The sub headline text. */
  @property({ type: String }) subHeadline?: string;

  /** Shows a divider above the footer. */
  @property({ type: Boolean, reflect: true }) divide: boolean = false;

  /**
   * The variant of the footer.
   *
   * If set to 'logo' the zebra logo or the contents of the 'logo' slot will be shown and the headline text will be displayed beneath the logo.
   */
  @property({ type: String, reflect: true }) variant: "profile" | "logo" = "profile";

  @property({ type: Boolean, reflect: true }) hideDefaultLogo?: boolean;
  @queryAssignedElements({ slot: "logo", flatten: true }) customLogo!: NodeList;

  private getProfileFooter() {
    return html`<footer class="drawer-footer-profile">
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

  private handleSlotChange = () => {
    this.requestUpdate();
    if (this.customLogo.length > 0) {
      this.hideDefaultLogo = true;
    } else {
      this.hideDefaultLogo = false;
    }
  };

  private getLogoFooter() {
    // TODO remove unsafeSVG and try and use svg instead
    return html`<footer class="drawer-footer-logo">
      <slot name="logo" @slotchange=${this.handleSlotChange}></slot>
      <div class="logo">${unsafeSVG(ZebraLogo)}</div>
      <h3>${this.headline}<slot></slot></h3>
    </footer>`;
  }

  protected override render() {
    switch (this.variant) {
      case "profile":
        return this.getProfileFooter();
      case "logo":
        return this.getLogoFooter();
    }
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-drawer-footer": ZetaNavigationDrawerFooter;
  }
}
