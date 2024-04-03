import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./navigation-profile.scss?inline";
import { Contourable } from "../../../index.js";

/**
 * @slot - The headline text.
 * @slot leading - The leading content. Typically a zeta-avatar.
 */
@customElement("zeta-navigation-profile")
export class ZetaNavigationProfile extends Contourable(LitElement) {
  protected override render() {
    // TODO: dropdown variant
    return html`
      <div class="navigation-profile">
        <div class="leading">
          <slot name="leading"></slot>
        </div>
        <slot></slot>
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-profile": ZetaNavigationProfile;
  }
}
