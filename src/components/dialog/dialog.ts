/* eslint-disable @typescript-eslint/no-floating-promises */
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import { LitElement, html, nothing } from "lit";
import styles from "./dialog.scss?inline";
import { classMap } from "lit/directives/class-map.js";
import { ZetaButton } from "../button/button.js";
import { Contourable, Popup } from "../../index.js";

/**
 * @name Zeta Dialog component
 * @usage use `zeta-button` for the action button slots; button props/variants are handled here.
 * @fires "open" Event on open
 * @fires "close" Event on close
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

  /**
   * Title of the dialog
   */
  @property() title = "";
  /**
   * Icon displayed in the dialog header
   */
  @property({ attribute: "has-icon", type: Boolean }) hasIcon: boolean = false;
  /**
   * Centered header
   */
  @property({ type: Boolean }) centered: boolean = false;

  /**
   *  Whether the modal is initially open.
   */
  @property({ type: Boolean }) initialOpen: boolean = false;
  /**
   * Action button 1 (Confirm).
   */
  @queryAssignedElements({ slot: "confirm", flatten: true }) confirmBtn!: NodeList;
  /**
   * Action button 2 (Cancel)
   */
  @queryAssignedElements({ slot: "cancel", flatten: true }) cancelBtn!: NodeList;
  /**
   * Action button 3 (Learn more/Other)
   */
  @queryAssignedElements({ slot: "other", flatten: true }) otherBtn!: NodeList;

  private renderIcon() {
    return this.hasIcon ? html` <zeta-icon name="warning" .rounded=${this.rounded} color="var(--icon-flavor-warning)" size="32"></zeta-icon> ` : nothing;
  }

  // set props to buttons
  private handleActionButtonChange = () => {
    this.requestUpdate();
    if (this.confirmBtn[0] && this.confirmBtn[0] instanceof ZetaButton) {
      this.confirmBtn[0].flavor = "primary";
      this.confirmBtn[0].rounded = this.rounded;
    }
    if (this.cancelBtn[0] && this.cancelBtn[0] instanceof ZetaButton) {
      this.cancelBtn[0].flavor = "outline-subtle";
      this.cancelBtn[0].rounded = this.rounded;
    }
    if (this.otherBtn[0] && this.otherBtn[0] instanceof ZetaButton) {
      this.otherBtn[0].flavor = "text";
      this.otherBtn[0].rounded = this.rounded;
    }
  };

  protected render() {
    this.handleActionButtonChange();
    const classes = classMap({
      centered: this.centered,
      container: true,
      col3: Boolean(this.otherBtn.length)
    });

    return html`
      <dialog .returnValue=${this.returnValue} @click=${this.onBarrierClicked} id=${this.id} .open=${this.initialOpen}>
        <div class=${classes}>
          <header>
            ${this.renderIcon()}
            <h1 class="dialog-title">${this.title}</h1>
          </header>
          <slot name="dialog-body"></slot>
          <footer>
            <slot
              @click=${() => {
                this.hide("other");
              }}
              @slotchange=${this.handleActionButtonChange}
              name="other"
            ></slot>
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
        </div>
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

