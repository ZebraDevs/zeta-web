import { html, LitElement, type PropertyValues } from "lit";
import styles from "./avatar-rail.styles.js";
import sizeStyles from "../avatar/avatar-size.styles.js";
import { customElement, property } from "lit/decorators.js";
import type { AvatarSize } from "../avatar/avatar-size.js";
import type { ZetaAvatar } from "../avatar/avatar.js";

/** A rail containing 0 or more Avatars that can be scrolled horizontally.
 *
 * @slot {zeta-avatar-rail[]} - The avatars to be displayed in the rail.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=6494-1953&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-avatar-rail--docs
 */
@customElement("zeta-avatar-rail")
export class ZetaAvatarRail extends LitElement {
  readonly #userExplicitSizes = new WeakMap<ZetaAvatar, AvatarSize | undefined>();
  readonly #userExplicitShowClose = new WeakMap<ZetaAvatar, boolean | undefined>();
  /**
   * Shows the close icon on all avatars in the rail. This will be overridden by the individual avatar's `show-close` attribute.
   * When clicked, the avatar fires a bubbling `close` event, which can be listened to on the rail; `event.target` is the avatar.
   */
  @property({ type: Boolean, reflect: true, attribute: "show-close" }) showClose: boolean = false;

  /**
   * The size of the avatars in the rail. This will be overridden by the individual avatar's `size` attribute.
   */
  @property({ type: String, reflect: true }) size?: AvatarSize;

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("showClose")) {
      this.#applyShowCloseToAvatars();
    }
    if (changed.has("size")) {
      this.#applySizeToAvatars();
    }
  }

  /**
   * Pushes `showClose` onto every slotted avatar that hasn't set its own `show-close`, so the
   * rail's toggle is driven programmatically rather than relying on CSS to cascade the state.
   */
  #applyShowCloseToAvatars(slot?: HTMLSlotElement) {
    const avatars = (slot ?? this.shadowRoot?.querySelector("slot"))?.assignedElements() as ZetaAvatar[] | undefined;
    avatars?.forEach(avatar => {
      // Track user-explicit show-close the first time we see each avatar
      if (!this.#userExplicitShowClose.has(avatar)) {
        this.#userExplicitShowClose.set(avatar, avatar.hasAttribute("show-close") ? avatar.showClose : undefined);
      }

      // Only apply rail showClose if avatar doesn't have a user-specified show-close
      const userShowClose = this.#userExplicitShowClose.get(avatar);
      if (userShowClose === undefined) {
        avatar.showClose = this.showClose;
      }
    });
  }

  /**
   * Pushes `size` onto every slotted avatar that hasn't set its own `size`, so the rail's
   * size cascades to its avatars and their status indicators scale accordingly.
   */
  #applySizeToAvatars(slot?: HTMLSlotElement) {
    const avatars = (slot ?? this.shadowRoot?.querySelector("slot"))?.assignedElements() as ZetaAvatar[] | undefined;
    avatars?.forEach(avatar => {
      // Track user-explicit sizes the first time we see each avatar
      if (!this.#userExplicitSizes.has(avatar)) {
        this.#userExplicitSizes.set(avatar, avatar.hasAttribute("size") ? avatar.size : undefined);
      }

      // Only apply rail size if avatar doesn't have a user-specified size
      const userSize = this.#userExplicitSizes.get(avatar);
      if (!userSize) {
        avatar.size = this.size;
      }
    });
  }

  protected render() {
    return html`<slot
      @slotchange=${(e: Event) => {
        const slot = e.target as HTMLSlotElement;
        this.#applyShowCloseToAvatars(slot);
        this.#applySizeToAvatars(slot);
      }}
    ></slot>`;
  }

  static styles = [sizeStyles, styles, super.styles ?? []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-avatar-rail": ZetaAvatarRail;
  }
}
