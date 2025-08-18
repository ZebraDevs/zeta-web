import { customElement } from "lit/decorators.js";
import styles from "./icon-button.styles.js";
import { ZetaButton } from "../button.js";
import "../../icon/icon.js";
// TODO slot icon name instead of passing it through a property

/**  Icon buttons are used to trigger actions with an icon.
 *
 * @cssproperty --icon-button-color the color of the button.
 * @cssproperty --icon-button-icon-color the color of the icon.
 * @cssproperty --icon-button-icon-color-disabled the color of the icon when the button is disabled.
 * @slot {ZetaIconName} - The name of the icon. Full list of icons can be found at {@link https://design.zebra.com/icons Zeta Icons}.
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23126-110314
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-buttons--docs
 */
@customElement("zeta-icon-button")
export class ZetaIconButton extends ZetaButton {
  static get styles() {
    return [super.styles || [], styles];
  }
  protected override _buttonType: "text" | "icon" = "icon";
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-icon-button": ZetaIconButton;
  }
}
