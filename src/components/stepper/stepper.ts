import { customElement, property } from "lit/decorators.js";
import { html, LitElement } from "lit";
import styles from "./stepper.styles.js";
import "../icon/icon";
import "./stepper-item";
import "../progress-indicators/progress-bar/progress-bar";
import "../button/icon-button/icon-button";

/**
 * ZetaStepper is a container component for displaying a sequence of steps in a process.
 *
 * To define individual steps, pass zeta-stepper-item elements as children of this component.
 *
 * @slot - Pass as many zeta-stepper-items as needed.
 *
 * @figma https://www.figma.com/design/1PXgz5r06wlObIrucWsOqx/Stepper?node-id=40231-1812&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-stepper--docs
 */
@customElement("zeta-stepper")
export class ZetaStepper extends LitElement {
  /** Stepper direction. Defaults to horizontal. */
  @property({ reflect: true }) variant: "vertical" | "horizontal" = "horizontal";

  /**
   * The current progress of the stepper, represented as a percentage (0-100).
   */
  @property({ type: Number }) progress: number = 0;

  /**
   * Whether the amount of stepper items has exceeded its container.
   * Shows a button to overflow the items.
   */
  @property({ type: Boolean }) overflowed: boolean = false;

  protected render() {
    return html`
      <ul class="stepper-container">
        <slot></slot>
        ${this.overflowed
          ? html`<zeta-button flavor="outline-subtle" class="stepper-item-overflow-button"><zeta-icon>chevron_right</zeta-icon></zeta-button>`
          : ""}
      </ul>
      <zeta-progress-bar value=${this.progress}></zeta-progress-bar>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-stepper": ZetaStepper;
  }
}
