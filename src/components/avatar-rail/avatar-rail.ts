import { html, LitElement } from "lit";
import styles from "./avatar-rail.styles.js";
import { customElement, property } from "lit/decorators.js";
import type { AvatarSize } from "../avatar/avatar-size.js";

/** Avatar rail is a container for multiple avatars.
 *
 * @slot - The avatars to be displayed in the rail.
 */
@customElement("zeta-avatar-rail")
export class ZetaAvatarRail extends LitElement {
  /**
   * Shows the close icon on all avatars in the rail. This will be overridden by the individual avatar's `show-close` attribute.
   * When clicked, an `avatar-close` event will be fired which can be listened to by adding a listener for the `avatar-close` event on the rail.
   */
  @property({ type: Boolean, reflect: true, attribute: "show-close" }) showClose: boolean = false;

  /**
   * The size of the avatars in the rail. This will be overridden by the individual avatar's `size` attribute.
   */
  @property({ type: String, reflect: true }) size?: AvatarSize;

  protected render() {
    return html`<slot></slot> `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-avatar-rail": ZetaAvatarRail;
  }
}
