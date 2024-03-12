import { html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./file-upload.scss?inline";
import { ContourableElement } from "../../mixins/contour.js";
import { msg } from "@lit/localize";
import "../button/button.js";

/** ZetaFileUpload web component.
 *
 * A file input that supports drag and drop.
 *
 * @public */
@customElement("zeta-file-upload")
export class ZetaFileUpload extends ContourableElement {
  private defaultHeadline = msg("Drop files here to upload");
  private errorMsg: string = "";

  /**
   * The headline text.
   */
  @property({ type: String }) headline: string = this.defaultHeadline;
  /**
   * The caption text.
   */
  @property({ type: String }) caption?: string;
  /**
   * A comma separated list of accepted file formats.
   * For more information see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#additional_attributes}
   */
  @property({ type: String }) accept?: string;
  /**
   * Allows multiple files to be added to the input. Also affects drag and drop.
   * Defaults to true.
   */
  @property({ type: Boolean }) multiple = true;
  /**
   * The name given to the file input.
   */
  @property({ type: String }) name?: string;
  /**
   * Used to trigger the 'active' state of the file input.
   */
  @property({ type: Boolean, reflect: true }) active: boolean = false;
  /**
   * Use to show the 'error' state of the file input.
   */
  @property({ type: Boolean, reflect: true }) error: boolean = false;

  @query("input") fileInput: HTMLInputElement | undefined;

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

  private getCaption() {
    if (this.error) {
      return html`<h2 error>${this.errorMsg}</h2>`;
    } else if (this.caption) {
      return html`<h2>${this.caption}</h2>`;
    } else {
      return nothing;
    }
  }

  protected override render() {
    return html`
      <div
        class="file-upload"
        @drop=${this.dropHandler}
        @dragover=${this.dragOverHandler}
        @dragleave=${this.dragLeaveHandler}
        @mouseleave=${this.mouseLeaveHandler}
        ?active=${this.active}
        ?disabled=${this.error}
      >
        <div class="main-content">
          <h1>${this.headline}</h1>
          <h2>${msg("or")}</h2>
          <zeta-button .rounded=${this.rounded} @click=${this.openFileInput}>Select Files</zeta-button>
        </div>
        ${this.getCaption()}
        <input type=file id=${this.id} name=${this.name} .accept=${this.accept} .multiple=${this.multiple}></input>
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

