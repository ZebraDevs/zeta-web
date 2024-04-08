import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ButtonBase } from "./button-base.js";
import styles from "./button.scss?inline";
import { ifDefined } from "lit/directives/if-defined.js";
export * from "./icon-button/icon-button.js";

//TODO text overflow broken
//TODO: Fix icon button

/** Buttons facilitate user interaction.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23126-110945
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/buttons--docs
 */
@customElement("zeta-button")
export class ZetaButton extends ButtonBase {
  static get styles() {
    return [super.styles ?? [], styles];
  }

  protected render() {
    return html`
      <button ?disabled=${this.disabled} value=${ifDefined(this.value)} name=${ifDefined(this.name)}>
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
