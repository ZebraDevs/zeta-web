import { customElement, property, state } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "./stepper-item.styles.js";
import "../icon/icon.js";

//Make a type for flavor
export type StepperItemFlavor = "partial" | "success" | "active" | "default";

/**
 * The step items that the stepper uses to convey progress through numbered steps.
 * Steps are automatically incremented starting from 1.
 *
 * @slot - Title of the label for each step.
 * @cssproperty --step-title-width - Width of the title text. Defaults to 230px.
 * @cssproperty --step-edit-icon-left - Left position of the edit icon. Defaults to 7px.
 * @cssproperty --step-edit-icon-border-color - Border color of the edit icon. Defaults to rgb(250, 251, 252).
 * @cssproperty --step-edit-icon-color - Color of the edit icon. Defaults to var(--main-subtle).
 * @cssproperty --step-success-icon-color - Color of the success checkmark icon. Defaults to var(--state-default-focus).
 * @cssproperty --step-text-default-color - Text color for default flavor. Defaults to var(--main-default).
 * @cssproperty --step-text-active-color - Text color for active flavor. Defaults to var(--state-default-focus).
 * @cssproperty --step-background-default-color - Background color for default flavor. Defaults to var(--surface-default).
 * @cssproperty --step-background-active-color - Background color for active flavor. Defaults to var(--surface-primary).
 * @cssproperty --step-background-partial-color - Background color for partial flavor. Defaults to var(--surface-positive-subtle).
 * @cssproperty --step-background-success-color - Background color for success flavor. Defaults to var(--surface-positive).
 *
 * @figma https://www.figma.com/design/1PXgz5r06wlObIrucWsOqx/Stepper?node-id=40231-1812&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-stepper--docs
 */
@customElement("zeta-stepper-item")
export class ZetaStepperItem extends LitElement {
  connectedCallback(): void {
    // @ts-expect-error-next-line
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this.setAttribute("role", "listitem");
  }

  /**
   * The flavor of the component determines the visual style of the component.
   *
   * @type {StepperItemFlavor}
   *
   * @defaultValue "default"
   *
   * @remarks
   * Supported values for `flavor`:
   * - `"partial"` - Light green background with dark green dashed border and black text.
   * - `"success"` - Green background with white checkmark icon instead of number.
   * - `"active"` - Blue background with white text.
   * - `"default"` - White background with black text.
   */
  @property({ type: String, reflect: true }) flavor: StepperItemFlavor = "default";

  /**
   * Set to true when page is being edited. Shows pen icon on step. Defaults to false.
   */
  @property({ type: Boolean, reflect: true }) editing = false;

  /**
   * The step number to display. This is automatically assigned by the parent zeta-stepper component; do not set this property manually.
   */
  @state({}) stepNumber: number = 0;

  /**
   * Obtain the orientation of the stepper parent.
   */
  private obtainOrientation() {
    return this.closest("zeta-stepper")?.getAttribute("variant") ?? "horizontal";
  }

  protected render() {
    return html`
      <div class="step">
        <span class="step-number">
          ${this.flavor === "success" ? html`<zeta-icon name="check_mark"></zeta-icon>` : html`<span class="number">${this.stepNumber}</span>`}
          ${this.editing ? html`<zeta-icon name="edit"></zeta-icon>` : nothing}
        </span>
        <span class="step-title"><slot></slot></span>
      </div>
    `;
  }

  /* Apply orientation attribute directly to zeta-stepper-item.
   * Used for styling purposes.
   */
  updated() {
    const orientation = this.obtainOrientation();
    this.setAttribute("variant", orientation);
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-stepper-item": ZetaStepperItem;
  }
}
