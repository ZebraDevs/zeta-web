import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./upload-item.styles.js";
import { Contourable } from "../../mixins/contour.js";
import "../icon/icon.js";
import "../progress-indicators/progress-circle/progress-circle.js";
import { ZetaCancelUploadEvent } from "../../events.js";

/** Represents a file being uploaded.
 *
 * @slot - The title of the file being uploaded.
 * @slot subtitle - Any extra information about the upload.
 * @slot leading - The thumbnail of the file being uploaded.
 *
 * @event {CustomEvent<ZetaCancelUploadEventDetail>} cancelUpload - Fired when the cancel button inside the progress circle is clicked.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-42&node-type=canvas&m=dev
 * @storybook https://zeta-ds.web.app/web/storybook/index.html?path=/docs/file-upload--docs
 */
@customElement("zeta-upload-item")
export class ZetaUploadItem extends Contourable(LitElement) {
  /** The flavor of the upload item. */
  @property({ type: String }) flavor: "default" | "completed" | "error" = "default";

  /** The progress shown on the progress circle on the upload item. */
  @property({ type: Number }) progress = 0;

  private getTrailingContent() {
    switch (this.flavor) {
      case "completed":
        return html`<zeta-icon>check_circle</zeta-icon>`;
      case "error":
        return html`<zeta-icon>error</zeta-icon>`;
      default:
        return html` <zeta-progress-circle size="48" type="upload" progress=${this.progress}></zeta-progress-circle>`;
    }
  }

  private onCancelClicked() {
    this.dispatchEvent(new ZetaCancelUploadEvent().toEvent());
  }

  protected render() {
    return html`
      <div>
        <slot name="leading"> </slot>
        <div class="body">
          <div class="title"><slot></slot></div>
          <div class="subtitle"><slot name="subtitle">4.6MB of 5.7MB</slot></div>
        </div>
        <div class="trailing">
          ${this.getTrailingContent()}
          <zeta-icon id="cancel" @click=${() => this.onCancelClicked()}>close</zeta-icon>
        </div>
      </div>
    `;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-upload-item": ZetaUploadItem;
  }
}
