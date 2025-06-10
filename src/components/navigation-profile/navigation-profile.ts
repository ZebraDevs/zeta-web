import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./navigation-profile.styles.js";
import { Contourable } from "../../mixins/mixins.js";

/**
 * TODO this has been removed from the FIGMA, this may become deprecated soon
 * @slot - The headline text.
 * @slot leading - The leading content. Typically a zeta-avatar.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1075-21296&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/story/components-navigation-header--profile
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
