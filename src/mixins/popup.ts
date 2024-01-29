/* eslint-disable @typescript-eslint/no-floating-promises */
import { LitElement, css } from "lit";
import { property, query } from "lit/decorators.js";
import { Constructor } from "./_utils.js";
import { Contourable } from "./contour.js";

// Define the interface for the mixin
export declare class PopupInterface {
  returnValue: string;
  open: boolean;
  hide: (returnValue?: string | undefined) => Promise<void>;
  show: () => Promise<void>;
  onBarrierClicked: (e: Event) => void;
}

export const Popup = <T extends Constructor<LitElement>>(superClass: T) => {
  class PopupClass extends superClass {
    @query("dialog") private readonly dialog!: HTMLDialogElement | null;

    /**
     * Return value of the dialog
     */
    @property({ attribute: false }) returnValue = "";

    @property({ type: Boolean, reflect: true })
    get open() {
      return this.dialog?.open ?? false;
    }

    async show() {
      await this.updateComplete;
      const dialog = this.dialog!;
      dialog.showModal();
      this.dispatchEvent(new CustomEvent("open"));
    }

    async hide(returnValue = this.returnValue) {
      await this.updateComplete;
      const dialog = this.dialog!;
      this.returnValue = returnValue;
      dialog.close(returnValue);
      this.dispatchEvent(new CustomEvent("close"));
    }

    onBarrierClicked(e: Event) {
      if (e.target !== this.dialog) {
        return;
      }
      e.preventDefault();
      this.hide();
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

export const PopupElement = Popup(LitElement);

export const ContourablePopupElement = Contourable(Popup(LitElement));
