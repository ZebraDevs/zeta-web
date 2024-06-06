import { customElement, property } from "lit/decorators.js";
import { LitElement, html, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { ifDefined } from "lit/directives/if-defined.js";
import styles from "./avatar.styles.js";
import "./icon/icon.js";
import "./badges/indicators/indicators.js";

/**
 * An avatar is a visual representation of a user or entity.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=20816-388
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/avatar--docs
 */
@customElement("zeta-avatar")
export class ZetaAvatar extends LitElement {
  /**
   * The URL of the image displayed in the avatar.
   */
  @property({ type: String }) imageUrl?: string;

  /**
   * The initials displayed in the avatar.
   *
   * Will not be displayed an imageUrl is given.
   */
  @property({ type: String }) initials?: string;

  /**
   * The size of the avatar.
   */
  @property({ type: String, reflect: true }) size: "xs" | "sm" | "md" | "lg" | "xl" = "md";

  /**
   * Puts a green border around the avatar.
   */
  @property({ type: Boolean, reflect: true }) showStatus: boolean = false;

  /**
   * The text displayed in the notification badge.
   */
  @property({ type: String }) notificationText?: string;

  /**
   * The icon displayed in the status badge.
   */
  @property({ type: String }) statusIcon?: ZetaIconName;

  /**
   * Alt text for img.
   *
   * @defaultValue "Avatar".
   */
  @property({ type: String }) altText: string = "Avatar";

  private getSize() {
    switch (this.size) {
      case "xs":
        return 24;
      case "sm":
        return 32;
      case "md":
        return 40;
      case "lg":
        return 48;
      case "xl":
        return 64;
    }
  }

  private getContent() {
    if (this.imageUrl) {
      return this.getImage();
    } else if (this.initials) {
      return this.getInitials();
    } else {
      return this.getPlaceholder();
    }
  }

  private getPlaceholder() {
    const size = this.getSize();
    const styles = styleMap({
      width: `${size}px`,
      height: `${size}px`
    });
    return html`<div style=${styles} class="icon-container">
      <zeta-icon
        color="var(--color-cool-50)"
        style=${styleMap({
          position: "relative",
          top: 0,
          left: "-10%"
        })}
        size=${size * 1.2}
        name="person"
      ></zeta-icon>
    </div>`;
  }

  private getImage() {
    const size = this.getSize();

    return html`<img style=${styleMap({
      width: `${size}px`,
      height: `${size}px`
    })} 
    alt=${this.altText}
    src=${ifDefined(this.imageUrl)}></img>`;
  }

  private getInitials() {
    return html`<div class="initials">${this.initials?.toUpperCase()}</div>`;
  }

  private getBadgeSize() {
    switch (this.size) {
      case "xs":
        return "small";
      case "sm":
        return "medium";
      case "md":
      case "lg":
      case "xl":
        return "large";
    }
  }

  private getIndicator() {
    if (this.notificationText) {
      return html`<div class="inidicator">
        <zeta-notification-indicator size=${this.getBadgeSize()} inverse>${this.notificationText}</zeta-notification-indicator>
      </div>`;
    } else {
      return nothing;
    }
  }

  private getBadge() {
    if (this.statusIcon) {
      return html`<div class="status-badge"><zeta-icon-indicator size=${this.getBadgeSize()} icon=${this.statusIcon}></zeta-icon-indicator></div>`;
    } else {
      return nothing;
    }
  }

  protected render() {
    const styles = styleMap({
      width: `${this.getSize()}px`,
      height: `${this.getSize()}px`
    });
    return html`<div class="avatar" style=${styles}>${this.getContent()}${this.getIndicator()}${this.getBadge()}</div>`;
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-avatar": ZetaAvatar;
  }
}
