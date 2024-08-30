/* eslint-disable @typescript-eslint/unbound-method */
import { html, nothing } from "lit";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import { BaseButton } from "./base-button.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
import "../icon/icon.js";
import type { Flavor } from "../../mixins/flavor.js";

//TODO text overflow broken

export type ButtonFlavor = Exclude<Flavor, "inverse">;

/**
 * Buttons facilitate user interaction.
 *
 * @slot - Content shown on button; typically text.
 * @slot {zeta-icon} leadingIcon - Leading icon of button. Full list of icons can be found at {@link https://zeta-icons.web.app/ | Zeta Icons}.
 * @slot {zeta-icon} trailingIcon - Trailing icon of button. Full list of icons can be found at  {@link https://zeta-icons.web.app/ | Zeta Icons}
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23126-110945
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/buttons--docs
 */
@customElement("zeta-button")
export class ZetaButton extends BaseButton {
  /** @internal */
  protected _buttonType: "text" | "icon" = "text";

  @queryAssignedElements({ slot: "leadingIcon", flatten: true }) leading?: Array<Node>;
  @queryAssignedElements({ slot: "trailingIcon", flatten: true }) trailing?: Array<Node>;

  @property({ type: String, reflect: true }) flavor: ButtonFlavor = "primary";

  protected render() {
    const hide = styleMap({ display: "none" });
    const leadingIcon = html`<span style="${this.leading && this.leading.length > 0 ? nothing : hide}">
      <slot name="leadingIcon" @slotchange=${() => this.requestUpdate()}></slot>
    </span>`;
    const trailingIcon = html`<span style="${this.trailing && this.trailing.length > 0 ? nothing : hide}">
      <slot name="trailingIcon" @slotchange=${() => this.requestUpdate()}></slot>
    </span>`;
    return html`
      <button
        ?disabled=${this.disabled}
        value=${ifDefined(this.value)}
        name=${ifDefined(this.name)}
        type=${ifDefined(this.type)}
        aria-label=${ifDefined(ifDefined(this.ariaLabel))}
        @click=${this._handleClick}
      >
        ${this._buttonType === "icon"
          ? html`<zeta-icon .rounded=${this.rounded}><slot></slot></zeta-icon>`
          : html`${leadingIcon}
              <slot></slot>
              ${trailingIcon}`}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-button": ZetaButton;
  }
}
