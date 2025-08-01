import { html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./file-upload.styles.js";

import { msg } from "@lit/localize";
import { Contourable } from "../../mixins/mixins.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "../button/button.js";

/**
 * A file input that supports drag and drop.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=898-10794
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-file-upload--docs
 */
@customElement("zeta-file-upload")
export class ZetaFileUpload extends Contourable(LitElement) {
  private defaultHeadline = msg("Drop files here to upload");
  private errorMsg: string = "";

  /** The headline text. */
  @property({ type: String }) headline: string = this.defaultHeadline;

  /** The caption text. */
  @property({ type: String, reflect: true }) caption?: string;

  /**
   * A comma separated list of accepted file formats.
   *
   * For more information see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#additional_attributes.
   */
  @property({ type: String }) accept?: string;

  /** Allows multiple files to be added to the input. Also affects drag and drop. */
  @property({ type: Boolean }) multiple = true;

  /** The name given to the file input.*/
  @property({ type: String }) name?: string;

  /** Used to trigger the 'active' state of the file input. */
  @property({ type: Boolean, reflect: true }) active: boolean = false;

  /** Use to show the 'error' state of the file input. */
  @property({ type: Boolean, reflect: true }) error: boolean = false;

  @query("input") fileInput?: HTMLInputElement;

  private checkMultiple(e: DragEvent) {
    return this.multiple || (!this.multiple && e.dataTransfer?.items && e.dataTransfer?.items.length == 1);
  }

  private checkTypes(files: FileList) {
    if (!this.accept || this.accept.length === 0) return true;
    const allowedExtensions = this.accept?.split(",");

    let filesAccepted = true;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      let typeMatch = false;
      for (const ext of allowedExtensions) {
        typeMatch = this.typesEqual(file!.type, ext);
        if (typeMatch) break;
      }

      if (!typeMatch) {
        filesAccepted = false;
        break;
      }
    }

    return filesAccepted;
  }

  private typesEqual(fileType: string, allowedType: string): boolean {
    // MIME types are equal eg image/jpg
    if (fileType === allowedType) return true;

    // E.g. fileType is image/png, allowedType is .png
    const t = allowedType.replaceAll(".", "");
    if (fileType.includes(t)) return true;

    // E.g. fileType is image/png, allowedType is image/*
    const allowedSplit = allowedType.split("/");
    const fileTypeSplit = fileType.split("/");
    if (allowedSplit[1] == "*" && allowedSplit[0] == fileTypeSplit[0]) return true;

    return false;
  }

  private dropHandler = (e: DragEvent) => {
    e.preventDefault();
    this.active = false;
    this.error = false;

    if (!this.checkTypes(e.dataTransfer!.files)) {
      this.errorMsg = msg("Selection contains files with invalid types.");
      this.error = true;
    } else if (this.checkMultiple(e) && e.dataTransfer?.items && this.fileInput) {
      this.fileInput.files = e.dataTransfer.files;
    }
  };

  private dragOverHandler = (e: DragEvent) => {
    e.preventDefault();

    if (!this.checkMultiple(e)) {
      this.errorMsg = msg("Multiple files are not allowed.");
      this.error = true;
    } else {
      this.active = true;
    }
  };

  private dragLeaveHandler = (e: Event) => {
    e.preventDefault();
    this.active = false;
    this.error = false;
  };

  private mouseLeaveHandler = () => {
    this.error = false;
  };

  private openFileInput = () => {
    this.fileInput?.click();
  };

  protected override render() {
    return html`
      <div
        class="file-upload"
        @drop=${this.dropHandler}
        @dragover=${this.dragOverHandler}
        @dragleave=${this.dragLeaveHandler}
        @mouseleave=${this.mouseLeaveHandler}
      >
        <div class="main-content">
          <h1>${this.headline}</h1>
          <h2>${msg("or")}</h2>
          <zeta-button .rounded=${this.rounded} @click=${this.openFileInput}>Select Files</zeta-button>
        </div>
        ${this.errorMsg || this.caption ? html`<h2 class="caption">${this.errorMsg || this.caption}</h2>` : nothing}
        <input type="file" id=${this.id} name=${ifDefined(this.name)} accept=${ifDefined(this.accept)} .multiple=${this.multiple} />
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-file-upload": ZetaFileUpload;
  }
}
