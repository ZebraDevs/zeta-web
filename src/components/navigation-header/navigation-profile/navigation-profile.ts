import { html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./navigation-profile.scss?inline";
import { ContourableInteractiveElement } from "../../../mixins/interactive.js";

/** ZetaNavigationProfile web component.
 *
 * @slot - The headline text.
 * @slot leading - The leading content. Typically a zeta-avatar.
 *
 * @public */
@customElement("zeta-navigation-profile")
export class ZetaNavigationProfile extends ContourableInteractiveElement {
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
