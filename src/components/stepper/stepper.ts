import { customElement, property } from "lit/decorators.js";
import { html, LitElement } from "lit";
import styles from "./stepper.styles.js";
import "../icon/icon";
import "./stepper-item";

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
