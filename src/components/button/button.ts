/* eslint-disable @typescript-eslint/unbound-method */
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseButton } from "./base-button.js";
import styles from "./button.styles.js";
import { ifDefined } from "lit/directives/if-defined.js";

//TODO text overflow broken

/** Buttons facilitate user interaction.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23126-110945
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/buttons--docs
 */
@customElement("zeta-button")
export class ZetaButton extends BaseButton {
  static get styles() {
    return [super.styles ?? [], styles];
  }
  /** @internal */
  protected _buttonType: "text" | "icon" = 'text';

  /** @internal */
  protected _slotContent?: string;

  protected render() {
    return html`
      <button
        ?disabled=${this.disabled}
        value=${ifDefined(this.value)}
        name=${ifDefined(this.name)}
        type=${ifDefined(this.type)}
        @click=${this._handleClick}>
        ${this._buttonType === "text" ?
        html`<slot></slot>` :
        html`<zeta-icon .rounded=${this.rounded}><slot>${this._slotContent}</slot></zeta-icon>`}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-button": ZetaButton;
  }
}
