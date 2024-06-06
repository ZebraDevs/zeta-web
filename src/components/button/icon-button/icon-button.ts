import { customElement, property } from "lit/decorators.js";
import { html } from "lit";
import styles from "./icon-button.styles.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { ButtonBase } from "../button-base.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../icon/icon.js";

// TODO slot icon name instead of passing it through a property
/** ZetaIconButton web component.
 *
 * A button containing a Zeta Icon.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23126-110314
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/buttons--docs
 */
@customElement("zeta-icon-button")
export class ZetaIconButton extends ButtonBase {
  /** The name of the icon displayed on the button. */
  @property({ type: String }) iconName: ZetaIconName = "star";

  private getIconSize(): number {
    switch (this.size) {
      case "small":
        return 20;
      case "medium":
      case "large":
        return 24;
    }
  }

  protected render() {
    const label: string = `${this.iconName}`.replace(/_/g, " ");
    return html`<button ?disabled=${this.disabled} value=${ifDefined(this.value)} name=${ifDefined(this.name)} flavor=${this.flavor} aria-label=${label}>
      <zeta-icon name=${this.iconName} .rounded=${this.rounded} size=${this.getIconSize()}>
        <div class=${this.flavor}></div>
      </zeta-icon>
    </button>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-icon-button": ZetaIconButton;
  }
}
