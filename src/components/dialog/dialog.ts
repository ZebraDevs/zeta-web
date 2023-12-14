/* eslint-disable @typescript-eslint/no-floating-promises */
import { customElement, property, query, queryAssignedElements } from "lit/decorators.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
import { LitElement, html, nothing } from "lit";
import styles from "./dialog.scss";
import { classMap } from "lit/directives/class-map.js";
import { ZetaButton } from "../button/button.js";

/**
 * @name Zeta Dialog component
 * @usage use `zeta-button` for the action button slots; button props/variants are handled here.
 * @fires "open" Event on open
 * @fires "close" Event on close
 */
@customElement("zeta-dialog")
export class ZetaDialog extends ContourableCondensableElement {
  constructor() {
    super();
    this.addEventListener("submit", this.handleSubmit);
  }
  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };

  @query("dialog") private readonly dialog!: HTMLDialogElement | null;

  @property({ type: Boolean })
  get open() {
    return this.isOpen;
  }

  set open(open: boolean) {
    if (open === this.isOpen) {
      return;
    }

    this.isOpen = open;
    if (open) {
      this.show();
    } else {
      this.close();
    }
  }

  async show() {
    await this.updateComplete;
    if (this.isOpen) {
      return;
    }
    const dialog = this.dialog!;
    dialog.showModal();
    this.open = true;
    this.dispatchEvent(new CustomEvent("open"));
  }

  async close(returnValue = this.returnValue) {
    await this.updateComplete;
    if (!this.isOpen) {
      return;
    }
    const dialog = this.dialog!;
    this.returnValue = returnValue;
    dialog.close(returnValue);
    this.open = false;
    this.dispatchEvent(new CustomEvent("close"));
  }

  private handleClick = (e: Event) => {
    if (e.target !== this.dialog) {
      return;
    }
    e.preventDefault();
    this.close();
  };

  // In case of form in the dialog body, close and set returnValue to button value
  private handleSubmit = (e: SubmitEvent) => {
    const form = e.target as HTMLFormElement;
    const { submitter } = e;
    if (form.method !== "dialog" || !submitter) {
      return;
    }
    this.close(submitter.getAttribute("value") ?? this.returnValue);
  };

  private isOpen = false;

  /**
   * Return value of the dialog
   */
  @property({ attribute: false }) returnValue = "";
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
    return this.hasIcon ? html` <zeta-icon name="warning" .rounded=${this.rounded} color="var(--icon-warning)" size="32"></zeta-icon> ` : nothing;
  }

  // set props to buttons
  private handleActionButtonChange = () => {
    this.requestUpdate();
    if (this.confirmBtn[0] && this.confirmBtn[0] instanceof ZetaButton) {
      this.confirmBtn[0].flavor = "primary";
      this.confirmBtn[0].condensed = this.condensed;
      this.confirmBtn[0].rounded = this.rounded;
    }
    if (this.cancelBtn[0] && this.cancelBtn[0] instanceof ZetaButton) {
      this.cancelBtn[0].flavor = "outline-subtle";
      this.cancelBtn[0].condensed = this.condensed;
      this.cancelBtn[0].rounded = this.rounded;
    }
    if (this.otherBtn[0] && this.otherBtn[0] instanceof ZetaButton) {
      this.otherBtn[0].flavor = "text";
      this.otherBtn[0].condensed = this.condensed;
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
      <dialog .returnValue=${this.returnValue} @click=${this.handleClick} id=${this.id}>
        <div class=${classes}>
          <header>
            ${this.renderIcon()}
            <h1 class="dialog-title">${this.title}</h1>
          </header>
          <slot name="dialog-body"></slot>
          <footer>
            <slot
              @click=${() => {
                this.close("other");
              }}
              @slotchange=${this.handleActionButtonChange}
              name="other"
            ></slot>
            <div class="actions">
              <slot @click=${() => this.close("cancel")} @slotchange=${this.handleActionButtonChange} name="cancel"></slot>
              <slot
                @click=${(e: Event) => {
                  const btn = e.target as HTMLButtonElement;
                  if (btn.type !== "submit") {
                    this.close("confirm");
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

