/* eslint-disable @typescript-eslint/no-floating-promises */
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import { LitElement, html } from "lit";
import styles from "./dialog.styles.js";
import { ZetaButton } from "../button/button.js";
import { Contourable, Popup } from "../../mixins/mixins.js";
import "../icon/icon.js";

/*
 * TODO: dialog Autofocus.
 */
/**
 * A reusable dialog or modal window with a customizable interface and functionality.
 *
 * A dialog should popup either in response to user action or to get the users attention.
 * @slot - Body of dialog; typically text.
 * @slot {zeta-icon} icon - A `zeta-icon` element. Size will be restricted based on dialog type.
 * @slot {zeta-button} confirm - Button used in footer. Must be of type zeta-button.
 * @slot {zeta-button} cancel - Button used in footer. Must be of type zeta-button.
 * @slot {zeta-button} other - Button used in footer. Must be of type zeta-button.
 *
 * @part body - Styles the dialog body
 * @part footer - Styles the dialog footer
 * @part header - Styles the dialog header
 *
 * @cssproperty --dialog-max-width - Max width of the dialog. Defaults to 480px.
 * @cssproperty --dialog-max-height - Max height of the dialog. Defaults to 80vh.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-14&node-type=canvas&m=dev
 * @storybook https://zeta-ds.web.app/web/storybook/index.html?path=/docs/dialog--docs
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

  private _title: string = "";
  /** Title of the dialog. */
  @property({ type: String })
  get title() {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  /** Whether header text should be centered. */
  @property({ type: Boolean, reflect: true }) centered: boolean = false;

  /** Whether the modal is initially open. */
  @property({ type: Boolean }) initialOpen: boolean = false;

  @property({ type: String, reflect: true }) size: "small" | "large" = "small";

  @queryAssignedElements({ slot: "icon", flatten: true }) icon!: NodeList;

  /** Action button 1 (Confirm). */
  @queryAssignedElements({ slot: "confirm", flatten: true }) confirmBtn!: NodeList;

  /** Action button 2 (Cancel). */
  @queryAssignedElements({ slot: "cancel", flatten: true }) cancelBtn!: NodeList;

  /** Action button 3 (Learn more/Other). */
  @queryAssignedElements({ slot: "other", flatten: true }) otherBtn!: NodeList;

  // set props to buttons
  private handleActionButtonChange = () => {
    this.requestUpdate();
    let count = 0;
    if (this.confirmBtn[0] && this.confirmBtn[0] instanceof ZetaButton) {
      this.confirmBtn[0].flavor = "primary";
      this.confirmBtn[0].rounded = this.rounded;
      count++;
    }
    if (this.cancelBtn[0] && this.cancelBtn[0] instanceof ZetaButton) {
      this.cancelBtn[0].flavor = "outline-subtle";
      this.cancelBtn[0].rounded = this.rounded;
      count++;
    }
    if (this.otherBtn[0] && this.otherBtn[0] instanceof ZetaButton) {
      this.otherBtn[0].flavor = "text";
      this.otherBtn[0].rounded = this.rounded;
      count++;
    }
    return count;
  };

  protected render() {
    const count = this.handleActionButtonChange();

    return html`
      <dialog .returnValue=${this.returnValue} id=${this.id} ?open=${this.initialOpen}>
        <header part="header">
          <slot name="icon"></slot>
          <h1>${this._title}</h1>
        </header>
        <div part="body"><slot></slot></div>
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
