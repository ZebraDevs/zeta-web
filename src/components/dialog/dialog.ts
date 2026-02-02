/* eslint-disable @typescript-eslint/no-floating-promises */
import { customElement, property, queryAssignedElements, queryAssignedNodes } from "lit/decorators.js";
import { LitElement, html } from "lit";
import styles from "./dialog.styles.js";
import { ZetaButton } from "../button/button.js";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";
import { Contourable, Popup } from "../../mixins/mixins.js";

export type DialogFlavor = "default" | "info" | "success" | "warning" | "error";

/*
 * TODO: dialog Autofocus.
 */
/** A popup dialog used to convey a message to the user.
 *
 * A reusable dialog or modal window with a customizable interface and functionality.
 *
 * A dialog should popup either in response to user action or to get the users attention.
 *
 * The dialog can be shown either as a modal or non-modal dialog. Modal is recommended for most uses.
 * To show the dialog, call `showModal()` or `show()` method:
 *
 * ```ts
 *   (document.querySelector("#dialog1") as ZetaDialog)?.showModal();
 * ```
 * When shown as a modal, clicking the background barrier will close the modal by default; this can be changed with the `closeOnBarrierClicked` property.
 *
 * When the confirm button is clicked, the dialog will close. To change this behavior, you can set the button's `type` attribute to `submit`.
 *
 * @slot - Body of dialog; typically text.
 * @slot {zeta-button} confirm - Button used in footer. Must be of type zeta-button.
 * @slot {zeta-button} cancel - Button used in footer. Must be of type zeta-button.
 * @slot {zeta-button} other - Button used in footer. Must be of type zeta-button.
 *
 * @part body - Styles the dialog body
 * @part footer - Styles the dialog footer
 * @part header - Styles the dialog header
 *
 * @cssproperty --dialog-width - Width of the dialog. Defaults to 480px.
 * @cssproperty --dialog-max-height - Max height of the dialog. Defaults to 80vh.
 * @cssproperty --dialog-title-font-size - Font size of the dialog title. Defaults to 1.25rem.
 * @cssproperty --dialog-title-line-height - Line height of the dialog title. Defaults to 1.5rem.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-14&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-dialog--docs
 */
@customElement("zeta-dialog")
export class ZetaDialog extends Contourable(Popup(LitElement)) {
  constructor() {
    super();
    this.addEventListener("submit", this.handleSubmit);
  }
  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };

  // In case of form in the dialog body, close and set returnValue to button value
  private handleSubmit = (e: SubmitEvent) => {
    const form = e.target as HTMLFormElement;
    const { submitter } = e;
    if (form.method !== "dialog" || !submitter) {
      return;
    }
    this.hide(submitter.getAttribute("value") ?? this.returnValue);
  };

  //Changes the icon based on the dialog flavor
  private getHeaderIconName(): "verified" | "warning" | "error" | "block" | "info" {
    switch (this.flavor) {
      case "info":
        return "info";
      case "success":
        return "verified";
      case "warning":
        return "warning";
      case "error":
        return "error";
      default:
        return "block";
    }
  }

  private _title: string = "";
  /** Title of the dialog. */
  @property({ type: String })
  get title() {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  /**
   * @deprecated Whether header text should be centered.
   * Feature is deprecated.
   */
  @property({ type: Boolean, reflect: true }) centered: boolean = false;

  /** Whether the modal is initially open. */
  @property({ type: Boolean }) initialOpen: boolean = false;

  /** Whether to show a leading icon in the header. */
  @property({ type: Boolean }) showLeadingIcon: boolean = true;

  /** Icon to display in the header. Initial value is undefined. */
  @property({ type: String }) leadingIcon?: ZetaIconName = undefined;

  /**
   * What type of dialog box to show.
   * This will change the icon and icon colour shown in the header.
   *
   * Possible values are:
   * - `default`: Shows black block icon.
   * - `info`: Shows purple info icon.
   * - `success`: Shows green verified icon.
   * - `warning`: Shows yellow warning icon.
   * - `error`: Shows red error icon.
   *
   * @type {DialogFlavor}
   * @defaultValue 'default'
   */
  @property({ type: String, reflect: true }) flavor: DialogFlavor = "default";

  /**
   * Colour of the confirm button.
   *
   * Possible values are:
   * - `primary`: Blue background.
   * - `positive`: Green background.
   * - `negative`: Red background.
   *
   * @type {"primary" | "positive" | "negative"}
   * @defaultValue 'primary'
   */
  @property({ type: String }) confirmButtonFlavor: "primary" | "positive" | "negative" = "primary";

  /** Action button 1 (Confirm). */
  @queryAssignedElements({ slot: "confirm", flatten: true }) confirmBtn!: NodeList;

  /** Action button 2 (Cancel). */
  @queryAssignedElements({ slot: "cancel", flatten: true }) cancelBtn!: NodeList;

  /** Action button 3 (Learn more/Other). */
  @queryAssignedElements({ slot: "other", flatten: true }) otherBtn!: NodeList;

  /**
   * Content in the dialog body.
   * In the class where this is used, it will change overflow from auto to visible when there is an element node in the slot.
   * Plain text will maintain overflow: auto (creating as scroll bar on overflow).
   */
  @queryAssignedNodes({ flatten: true }) bodyContent!: NodeList;

  // set props to buttons
  private handleActionButtonChange = () => {
    this.requestUpdate();
    let count = 0;
    if (this.confirmBtn[0] && this.confirmBtn[0] instanceof ZetaButton) {
      this.confirmBtn[0].flavor = this.confirmButtonFlavor;
      this.confirmBtn[0].shape = this.rounded ? "rounded" : "sharp";
      count++;
    }
    if (this.cancelBtn[0] && this.cancelBtn[0] instanceof ZetaButton) {
      this.cancelBtn[0].flavor = "outline-subtle";
      this.cancelBtn[0].shape = this.rounded ? "rounded" : "sharp";
      count++;
    }
    if (this.otherBtn[0] && this.otherBtn[0] instanceof ZetaButton) {
      this.otherBtn[0].flavor = "text";
      this.otherBtn[0].shape = this.rounded ? "rounded" : "sharp";
      count++;
    }
    return count;
  };

  protected render() {
    const count = this.handleActionButtonChange();

    return html`
      <dialog .returnValue=${this.returnValue} id=${this.id} ?open=${this.initialOpen} class=${this.bodyContent.length > 0 ? "has-content" : ""}>
        <header part="header">
          ${this.showLeadingIcon ? html`<zeta-icon part="header-icon" name=${this.leadingIcon ?? this.getHeaderIconName()}></zeta-icon>` : ""}
          <h1>${this._title}</h1>
          <zeta-icon @click=${() => this.hide("close")} name="close"></zeta-icon>
        </header>
        <div part="body" class=${this.bodyContent.length > 0 ? "has-content" : ""}><slot></slot></div>
        <footer data-element-count=${count} part="footer">
          <slot @click=${() => this.hide("other")} @slotchange=${this.handleActionButtonChange} name="other"></slot>
          <div class="actions">
            <slot @click=${() => this.hide("cancel")} @slotchange=${this.handleActionButtonChange} name="cancel"></slot>
            <slot
              @click=${(e: Event) => {
                const btn = e.target as HTMLButtonElement;
                if (btn.type !== "submit") {
                  this.hide("confirm");
                }
              }}
              @slotchange=${this.handleActionButtonChange}
              name="confirm"
            ></slot>
          </div>
        </footer>
      </dialog>
    `;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-dialog": ZetaDialog;
  }
}
