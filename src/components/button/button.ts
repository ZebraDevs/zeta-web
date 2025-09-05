/* eslint-disable @typescript-eslint/unbound-method */
import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BaseButton } from "./base-button.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "../icon/icon.js";
import { Flavored, type Flavor } from "../../mixins/flavor.js";
import styles from "./button.styles.js";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";

//TODO text overflow broken

export type ButtonFlavor = Exclude<Flavor, "inverse">;

/** Buttons are used to trigger actions.
 *
 * @slot - Content shown on button; typically text.
 * @part button - The button element
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23126-110945
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-buttons--docs
 */
@customElement("zeta-button")
export class ZetaButton extends Flavored(BaseButton) {
  /** @internal */
  protected _buttonType: "text" | "icon" = "text";

  static get styles() {
    return [super.styles ?? [], styles];
  }

  /**
   * The flavor of the component determines the visual style of the component.
   *
   * @type {ButtonFlavor}
   *
   * @defaultValue "primary"
   *
   * @remarks
   * Supported values for `flavor`:
   * - `"primary"` - Blue background.
   * - `"positive"` - Green background.
   * - `"negative"` - Red background.
   * - `"outline"` - Primary outline only.
   * - `"outline-subtle"` - Grey outline only.
   * - `"text"` - Primary text only.
   * - `"subtle"` - White background with grey text. Same action colors as 'text' flavor.
   *
   * @remarks The value `"secondary"` is no longer supported and should not be used.
   */
  @property({ type: String, reflect: true }) flavor: ButtonFlavor = "primary";

  /**
   * Leading icon of button. Full list of icons can be found at {@link https://design.zebra.com/icons | Zeta Icons}.
   */
  @property({ type: String }) leadingIcon: ZetaIconName | null = null;

  /**
   * Trailing icon of button. Full list of icons can be found at {@link https://design.zebra.com/icons | Zeta Icons}.
   */
  @property({ type: String }) trailingIcon: ZetaIconName | null = null;

  protected render() {
    const leading = this.leadingIcon ? html`<zeta-icon name="${this.leadingIcon}" .rounded=${this.shape != "sharp"}></zeta-icon>` : nothing;
    const trailing = this.trailingIcon ? html`<zeta-icon name="${this.trailingIcon}" .rounded=${this.shape != "sharp"}></zeta-icon>` : nothing;

    return html`
      <button
        ?disabled=${this.disabled}
        value=${ifDefined(this.value)}
        name=${ifDefined(this.name)}
        type=${ifDefined(this.type)}
        aria-label=${ifDefined(ifDefined(this.ariaLabel))}
        @click=${this._handleClick}
        part="button"
        class="contourable-target"
      >
        ${this._buttonType === "icon"
          ? html`<zeta-icon part="icon" .rounded=${this.shape != "sharp"}><slot></slot></zeta-icon>`
          : html`${leading}
              <slot></slot>
              ${trailing}`}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-button": ZetaButton;
  }
}
