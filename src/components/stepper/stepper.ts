import { customElement, property } from "lit/decorators.js";

import { html, LitElement } from "lit";
import styles from "./stepper.styles.js";
import "../icon/icon";
import "./stepper-item";

//TODO:
// - Make flavours for items for active, completed, etc
// - Make Stepper item flavor able to be set in storybook

/** Stepper container which holds the individual step items.
 *
 * For the steps, pass `li` elements with `data-title` and `data-label` attributes as children
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21529-11408
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21529-11531
 *
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-stepper--docs
 */
@customElement("zeta-stepper")
export class ZetaStepper extends LitElement {
  /** Stepper direction. Defaults to horizontal. */
  @property({ reflect: true }) variant: "vertical" | "horizontal" = "horizontal";

  protected render() {
    return html`
      <ul class="steps">
        <slot></slot>
      </ul>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-stepper": ZetaStepper;
  }
}
