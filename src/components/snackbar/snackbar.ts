import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./snackbar.styles.js";
import "../icon/icon.js";
import "../button/button.js";
import { Interactive } from "../../mixins/interactive.js";
import { ContourableThree } from "../../mixins/contourable-three.js";

/**
 * Snackbars provide brief messages about app processes at the bottom of the screen.
 * Contextual snackbars provide brief messages in relation to an action that has been taken by the user.
 *
 * @slot - The text of the snackbar.
 * @slot icon - The icon of the snackbar.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-13&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-snackbar--docs
 */
@customElement("zeta-snackbar")
export class ZetaSnackbar extends ContourableThree(Interactive(LitElement)) {
  /**
   * Status of the component.
   */
  @property({ type: String, reflect: true }) status: "default" | "positive" | "info" | "warning" | "negative" | "view" = "default";

  /**
   * Whether the snackbar has a close action.
   */
  @property({ type: Boolean }) hasCloseAction: boolean = false;

  /**
   * Label of the action.
   */
  @property({ type: String }) actionLabel?: string;

  /**
   * Function to call when the action is clicked.
   * @type {Function}
   * @default () => {}
   */
  @property() actionClick?: () => void;

  render() {
    return html`
      <div class="snackbar-root contourable-target">
        <div>
          <slot name="icon"></slot>
          <slot></slot>
        </div>
        <div>
          ${this.actionLabel && this.actionClick ? html` <button id="action" @click=${this.actionClick}>${this.actionLabel}</button> ` : nothing}
          ${this.hasCloseAction
            ? html`
                <button id="closeButton" @click=${() => this.remove()}>
                  <zeta-icon id="closeIcon" .rounded=${this.shape !== "sharp"}>close</zeta-icon>
                </button>
              `
            : nothing}
        </div>
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
