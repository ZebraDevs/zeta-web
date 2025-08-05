import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { type Shape } from "../../../mixins/contourable-three.js";
import { Flavored, type Flavor } from "../../../mixins/flavor.js";
import { BaseButton } from "./../base-button.js";
import styles from "./tile-button.styles.js";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";
import "../../icon/icon.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { SizeType } from "../../../mixins/size.js";

// TODO(thelukewalton): Refactor BaseButton to work better with tile-button.
// Consider shape, flavor, rounded, that are not passed through correctly

//Remove shape 'full'
export type TileButtonShape = Exclude<Shape, "full">;

//Extract only outline-subtle flavor
export type TileButtonFlavor = Extract<Flavor, "outline-subtle">;

/** A large, tappable button with an icon stacked above a label.
 * Ideal for grid layouts, dashboards, or mobile interfaces where quick, visually distinct actions are needed.
 *
 * @slot - Content shown on button; typically text.
 * @part button - The button element
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23126-110945
 * @storybook https://design.zebra.com/web/storybook/?path=/story/components-buttons--tile-button
 */
@customElement("zeta-tile-button")
export class ZetaTileButton extends Flavored(BaseButton) {
  /** @internal */
  static get styles() {
    return [super.styles ?? [], styles];
  }

  //There is only one supported value for the tile button: "outline-subtle".
  @property({ type: String, reflect: true }) flavor: TileButtonFlavor = "outline-subtle";

  // There is only one supported value for the tile button: 'medium'.
  @property({ type: String, reflect: false, state: true }) size: SizeType;

  /**
   * Whether the component is sharp or rounded.
   * This will change the border radius and icon font.
   *
   * Possible values are:
   * - `sharp`: No border radius, uses "zeta-icons-sharp"
   * - `rounded`: Minimal border radius, uses "zeta-icons-round"
   *
   * @type {'sharp' | 'rounded'}
   * @defaultValue "rounded"
   */
  @property({ type: String, reflect: true }) shape: TileButtonShape = "rounded";

  /**
   * Main icon of button. Full list of icons can be found at {@link https://design.zebra.com/icons | Zeta Icons}.
   */
  @property({ type: String }) icon?: ZetaIconName;

  //Handles click events on the button.
  private handleClick() {
    return (e: MouseEvent) => {
      this._handleClick(e);
    };
  }

  protected render() {
    return html`
      <button
        ?disabled=${this.disabled}
        value=${ifDefined(this.value)}
        name=${ifDefined(this.name)}
        type=${ifDefined(this.type)}
        aria-label=${ifDefined(ifDefined(this.ariaLabel))}
        @click=${this.handleClick()}
        part="button"
        class="contourable-target"
      >
        <zeta-icon name="${this.icon || "star"}" .rounded=${this.shape != "sharp"}></zeta-icon>
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-tile-button": ZetaTileButton;
  }
}
