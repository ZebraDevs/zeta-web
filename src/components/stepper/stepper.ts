import { customElement, property } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "./stepper.styles.js";
import "../icon/icon.js";
import "./stepper-item.js";
import "../progress-indicators/progress-bar/progress-bar.js";
import "../button/icon-button/icon-button.js";

/** Steppers convey progress through numbered steps.
 *
 * ZetaStepper is a container component for displaying a sequence of steps in a process.
 *
 * To define individual steps, pass zeta-stepper-item elements as children of this component.
 *
 * @slot - Pass as many zeta-stepper-items as needed.
 * @cssproperty --stepper-container-height - Height of the overall container. Defaults to 92px.
 * @cssproperty -- stepper-bar-width - Width of the bar between each step. Defaults to 200px.
 * @cssproperty -- stepper-bar-height - Height of the bar between each step. Defaults to 3px.
 * @cssproperty -- stepper-bar-vertical-width - Width of the bar between each step in vertical variant. Defaults to 3px.
 * @cssproperty -- stepper-overflow-button-width - Width of the overflow button. Defaults to 50px.
 * @cssproperty -- stepper-overflow-button-height - Height of the overflow button. Defaults to 60px.
 *
 * @figma https://www.figma.com/design/1PXgz5r06wlObIrucWsOqx/Stepper?node-id=40231-1812&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-stepper--docs
 */
@customElement("zeta-stepper")
export class ZetaStepper extends LitElement {
  /** Stepper direction. Defaults to horizontal. */
  @property({ reflect: true }) variant: "vertical" | "horizontal" = "horizontal";

  /**
   * The current progress of the stepper, represented as a floating point number (0.0-1.0).
   * This number is used by the progress bar.
   */
  @property({ type: Number }) progress: number = 0;

  /**
   * Set to true when not all stepper items can be displayed on screen at once.
   * Displays a button that allows users to view additional stepper items.
   * User can set their own functionality to the button.
   */
  @property({ type: Boolean }) showOverflowButton: boolean = false;

  /** Set to true for the progress bar to be shown. */
  @property({ type: Boolean }) progressBar: boolean = false;

  protected render() {
    return html`
      <div class="stepper-container">
        <div class="stepper-container" role="list">
          <slot></slot>
        </div>
        ${this.showOverflowButton
          ? html`<zeta-button flavor="outline-subtle" class="stepper-item-overflow-button"><zeta-icon>chevron_right</zeta-icon></zeta-button>`
          : ""}
      </div>
      ${this.progressBar ? html`<zeta-progress-bar value=${this.progress}></zeta-progress-bar>` : nothing}
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-stepper": ZetaStepper;
  }
}
