import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./fab.styles.js";
import "../icon/icon.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { Flavored, type Flavor } from "../../mixins/flavor.js";
import { BaseButton } from "../button/base-button.js";

export type FabFlavor = Extract<Flavor, "primary" | "secondary" | "inverse">;

/** Floating Action Buttons are used to trigger the primary action on a screen. They are circular buttons that float above the content.
 *
 * @slot - The icon of the button. Entered as a plain string.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21816-4283&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-fabs--docs
 */

@customElement("zeta-fab")
export class ZetaFab extends Flavored(BaseButton) {
  static get styles() {
    return [super.styles ?? [], styles];
  }
  /**
   * The label display on or below the button.
   */
  @property({ type: String }) label: string = "";

  @property({ type: String, reflect: true }) flavor: FabFlavor = "primary";

  @property({ type: Boolean, reflect: true }) extended: boolean = false;

  @property({ type: String, reflect: true }) size: "small" | "large" = "small";

  private getLabel() {
    return this.label ? html`<div class="label">${this.label}</div>` : nothing;
  }
  protected render() {
    return html`
      <button ?disabled=${this.disabled} value=${ifDefined(this.value)} name=${ifDefined(this.name)} type=${ifDefined(this.type)}>
        <zeta-icon .rounded=${this.shape != "sharp"}><slot></slot></zeta-icon>
        ${this.extended ? this.getLabel() : nothing}
      </button>
      ${this.extended ? nothing : this.getLabel()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-fab": ZetaFab;
  }
}
