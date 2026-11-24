import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./snackbar.styles.js";
import "../icon/icon.js";
import { Interactive } from "../../mixins/interactive.js";
import { ContourableThree } from "../../mixins/contourable-three.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";

export type SnackbarStatus = "default" | "positive" | "info" | "warning" | "negative" | "deletion" | "view" | "action";
export type SnackbarVariant = "contextual" | "standard";

/** Snackbars provide brief messages about app processes at the bottom of the screen.
 *
 * Contextual snackbars provide brief messages in relation to an action that has been taken by the user.
 *
 * @slot - Deprecated fallback for the message text. Prefer the `message` property.
 * @slot icon - Optional icon slot. Contextual statuses render their own icon unless one is slotted.
 *
 * @part root - The snackbar surface.
 * @part content - The message and leading icon container.
 * @part icon - The leading icon container.
 * @part message - The message text.
 * @part controls - The action and close controls.
 * @part action - The action button.
 * @part close - The close button.
 *
 * @cssproperty --snackbar-background-color - Background color of the snackbar.
 * @cssproperty --snackbar-foreground-color - Foreground color of the snackbar message and controls.
 * @cssproperty --snackbar-icon-color - Color of the leading and close icons.
 * @cssproperty --snackbar-action-background-color - Background color of the action button.
 * @cssproperty --snackbar-action-border-color - Border color of the action button.
 *
 * @event {Event} close - Fired when the snackbar is closed.
 * @event {Event} action - Fired when the action button is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=6551-170&m=dev
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-snackbar--docs
 */
@customElement("zeta-snackbar")
export class ZetaSnackbar extends ContourableThree(Interactive(LitElement)) {
  /**
   * Message displayed in the snackbar.
   */
  @property({ type: String }) message: string = "";

  /**
   * Visual variant of the snackbar.
   *
   * Possible values are:
   * - `contextual`: Status controls the tint, icon, and default controls.
   * - `standard`: Inverse surface with a filled action button.
   *
   * @defaultValue "contextual"
   */
  @property({ type: String, reflect: true }) variant: SnackbarVariant = "contextual";

  /**
   * Status of the component.
   *
   * Possible values are:
   * - `default`: Inverse surface with a close control.
   * - `info`: Info feedback tint with an info icon and close control.
   * - `positive`: Success feedback tint with a check icon and close control.
   * - `warning`: Warning feedback tint with a warning icon and close control.
   * - `negative`: Error feedback tint with an error icon and close control.
   * - `deletion`: Error feedback tint with delete icon, Undo action, and close control.
   * - `view`: Neutral feedback tint with view action and no close control.
   * - `action`: Inverse surface with a bordered action control.
   *
   * @defaultValue "default"
   */
  @property({ type: String, reflect: true }) status: SnackbarStatus = "default";

  /**
   * Whether the snackbar has a close action.
   *
   * @deprecated Use `showClose` for design presets. This remains for backwards compatibility.
   */
  @property({ type: Boolean }) hasCloseAction: boolean = false;

  /**
   * Whether the snackbar renders its preset action control.
   *
   * @defaultValue true
   */
  @property({ type: Boolean }) showAction: boolean = true;

  /**
   * Whether the snackbar renders its preset close control.
   *
   * @defaultValue true
   */
  @property({ type: Boolean }) showClose: boolean = true;

  /**
   * Whether the standard/default/action snackbar exposes the icon slot.
   *
   * Contextual statuses with their own icons ignore this setting.
   *
   * @defaultValue false
   */
  @property({ type: Boolean }) showIcon: boolean = false;

  /**
   * Label of the action.
   *
   * @deprecated Contextual presets choose their own action label. This remains for backwards compatibility.
   */
  @property({ type: String }) actionLabel?: string;

  /**
   * Icon used for the close icon.
   * Will default to 'cancel' icon if not provided.
   */
  @property({ type: String }) closeActionIcon?: ZetaIconName;

  /**
   * Function to call when the action is clicked.
   * @type {Function}
   * @default () => {}
   * @deprecated Listen for the `action` event instead. This remains for backwards compatibility.
   */
  @property() actionClick?: () => void;

  @state() private hasSlottedIcon = false;

  private readonly statusIcons: Partial<Record<SnackbarStatus, ZetaIconName>> = {
    info: "info",
    positive: "check_circle",
    warning: "warning",
    negative: "error",
    deletion: "delete",
    view: "open_in_new_window"
  };

  private get usesMessageProperty() {
    return this.message.length > 0;
  }

  private get presetActionLabel() {
    if (this.actionLabel) {
      return this.actionLabel;
    }

    if (this.status === "deletion") {
      return "Undo";
    }

    if (this.status === "view") {
      return "View";
    }

    return "Action";
  }

  private get hasPresetAction() {
    return this.variant === "standard" || this.status === "deletion" || this.status === "view" || this.status === "action";
  }

  private get hasPresetClose() {
    return this.variant === "standard" || (this.status !== "view" && this.status !== "action");
  }

  private get shouldShowAction() {
    const hasLegacyAction = Boolean(this.actionLabel && this.actionClick);
    return hasLegacyAction || (this.usesMessageProperty && this.showAction && this.hasPresetAction);
  }

  private get shouldShowClose() {
    return this.hasCloseAction || (this.usesMessageProperty && this.showClose && this.hasPresetClose);
  }

  private get presetIcon() {
    if (this.variant !== "contextual" || this.hasSlottedIcon) {
      return undefined;
    }

    return this.statusIcons[this.status];
  }

  private get shouldShowIconSlot() {
    return this.hasSlottedIcon || this.showIcon || !this.presetIcon;
  }

  private updateIconSlot = (event: Event) => {
    this.hasSlottedIcon = (event.target as HTMLSlotElement).assignedElements({ flatten: true }).length > 0;
  };

  private close = () => {
    this.remove();
    this.dispatchEvent(new Event("close"));
  };

  private handleActionClick = () => {
    this.actionClick?.();
    this.dispatchEvent(new Event("action", { bubbles: true, composed: true }));
    this.close();
  };

  private renderIcon() {
    const icon = this.presetIcon;
    const hasVisibleIcon = Boolean(icon || this.hasSlottedIcon || this.showIcon);

    return html`
      <span class="leading-icon" part="icon" ?hidden=${!hasVisibleIcon}>
        ${icon ? html`<zeta-icon .rounded=${this.shape !== "sharp"}>${icon}</zeta-icon>` : nothing}
        <slot name="icon" @slotchange=${this.updateIconSlot} ?hidden=${!this.shouldShowIconSlot}></slot>
      </span>
    `;
  }

  private renderAction() {
    if (!this.shouldShowAction) {
      return nothing;
    }

    return html`<button id="action" part="action" @click=${this.handleActionClick}>${this.presetActionLabel}</button>`;
  }

  private renderClose() {
    if (!this.shouldShowClose) {
      return nothing;
    }

    return html`
      <button id="closeButton" part="close" aria-label="Close" @click=${this.close}>
        <zeta-icon id="closeIcon" .rounded=${this.shape !== "sharp"}>${this.closeActionIcon ?? "cancel"}</zeta-icon>
      </button>
    `;
  }

  render() {
    return html`
      <div class="snackbar-root contourable-target" part="root">
        <div class="content" part="content">
          ${this.renderIcon()}
          <div class="message" part="message">${this.message || html`<slot></slot>`}</div>
        </div>
        <div class="controls" part="controls">${this.renderAction()} ${this.renderClose()}</div>
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-snackbar": ZetaSnackbar;
  }
}
