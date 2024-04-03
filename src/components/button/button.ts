import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ButtonBase } from "./button-base.js";
import styles from "./button.scss?inline";
export * from "./icon-button/icon-button.js";

//TODO text overflow broken
//TODO: Fix icon button

/** Buttons facilitate user interaction. */
@customElement("zeta-button")
export class ZetaButton extends ButtonBase {
  static get styles() {
    return [super.styles ?? [], styles];
  }

  protected render() {
    return html`
      <button ?disabled=${this.disabled} value=${this.value} name=${this.name}>
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-button": ZetaButton;
  }
}
