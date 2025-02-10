/* eslint-disable @typescript-eslint/unbound-method -- Cannot tie this to a specific line. I wasted hours on this stupid rule */
import type { LitElement, PropertyValues } from "lit";
import { css } from "lit";
import { property, query } from "lit/decorators.js";
import { type Constructor } from "./utils.js";
import { ZetaPopupEvent } from "../events.js";

declare class PopupInterface {
  returnValue: string;
  open: boolean;
  hide: (returnValue?: string) => Promise<void>;
  show: () => Promise<void>;
  showModal: () => Promise<void>;
  onBarrierClicked: (e: Event) => void;
}

/**
 * Mixin to add make component pop up as a dialog.
 *
 * @param superClass - LitElement to add mixin to
 * @event {CustomEvent<ZetaPopupEventDetail>} open - Fired when the popup is opened.
 * @event {Event} close - Fired when the popup is closed.
 * @event {Event} cancel - Fired when the popup is cancelled.
 * @returns - component with mixin applied.
 */
export const Popup = <T extends Constructor<LitElement>>(superClass: T) => {
  class PopupClass extends superClass {
    @query("dialog") private readonly dialog!: HTMLDialogElement;

    /** Return value of the dialog. */
    @property({ type: String }) returnValue: string = "";

    /** Whether component is open or closed. */
    @property({ type: Boolean, reflect: true, attribute: "open" })
    get open() {
      return this.dialog?.open ?? false;
    }

    async showModal() {
      return this._show(true);
    }

    async show() {
      return this._show(false);
    }

    /** @internal */
    async _show(isModal: boolean) {
      await this.updateComplete;
      if (isModal) {
        this.dialog.showModal();
      } else {
        this.dialog.show();
      }

      this.dispatchEvent(new ZetaPopupEvent("open").toEvent());
    }

    async hide(returnValue = this.returnValue) {
      await this.updateComplete;
      this.returnValue = returnValue;
      this.dialog.close(returnValue);
    }

    async cancel() {
      await this.hide("cancel");
    }

    _onClose(_e: Event) {
      this.dispatchEvent(new Event("close"));
    }

    _onCancel() {
      this.dispatchEvent(new Event("cancel"));
    }

    onBarrierClicked(e: Event) {
      if (e.target !== this.dialog) {
        return;
      }
      e.preventDefault();
      void this.cancel();
    }

    /** @internal adds all the eventListeners*/
    firstUpdated(_changedProperties: PropertyValues): void {
      super.firstUpdated(_changedProperties);

      if (this.dialog) {
        this.dialog.addEventListener("click", this.onBarrierClicked.bind(this));
        this.dialog.addEventListener("close", this._onClose.bind(this));
        this.dialog.addEventListener("cancel", this._onCancel.bind(this));
      }
    }
    /** @internal removes all the eventListeners*/
    disconnectedCallback(): void {
      super.disconnectedCallback();
      this.dialog.removeEventListener("click", this.onBarrierClicked);
      this.dialog.removeEventListener("close", this._onClose);
      this.dialog.removeEventListener("cancel", this._onCancel);
    }

    static styles = [
      (superClass as unknown as typeof LitElement).styles ?? [],
      css`
        dialog::backdrop {
          background-color: var(--surface-overlay);
        }
      `
    ];
  }
  return PopupClass as Constructor<PopupInterface & LitElement> & T;
};
