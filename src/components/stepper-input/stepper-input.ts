import { customElement, property } from "lit/decorators.js";
import { html, LitElement } from "lit";
import { live } from "lit/directives/live.js";
import styles from "./stepper-input.scss?inline";
import { ifDefined } from "lit/directives/if-defined.js";
import "../button/icon-button/icon-button.js";
import "../icon/icon.js";
import { Contourable } from "../../mixins/mixins.js";

//TODO: Disable buttons when at min or max
//TODO: disabled prop changes size of box

@customElement("zeta-stepper-input")
export class ZetaStepperInput extends Contourable(LitElement) {
  static styles = [super.styles || [], styles];

  @property({ type: Number }) min?: number;
  @property({ type: Number }) max?: number;
  @property({ type: Boolean }) disabled: boolean = false; //TODO: Use interactive, check styles beforehand
  @property({ reflect: true }) size: "medium" | "large" = "medium";
  @property({ type: Number }) get value() {
    return this.inputValue;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set value(value: number) {
    const valueToNumber = Number(value);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (isNaN(valueToNumber) || valueToNumber === undefined) {
      this.inputValue = 0;
    } else if (this.max && valueToNumber >= this.max) {
      this.inputValue = this.max;
    } else if (this.min !== undefined && valueToNumber <= this.min) {
      this.inputValue = this.min;
    } else {
      this.inputValue = valueToNumber;
    }
  }

  private handleOnChange = (value: number) => {
    if (this.max && value >= this.max) {
      this.value = this.max;
    } else if (this.min && value <= this.min) {
      this.value = this.min;
    } else {
      this.value = value;
    }

    this.requestUpdate();
  };

  private inputValue = 0;

  protected render() {
    return html`
      <div class="container">
        <zeta-icon-button
          .disabled=${this.disabled}
          .rounded=${this.rounded}
          size=${this.size}
          flavor="outline-subtle"
          @click=${() => (this.value = this.value - 1)}
          iconName="remove"
        ></zeta-icon-button>
        <div class="input-container">
          <input
            id=${this.id}
            min=${ifDefined(this.min?.toString())}
            max=${ifDefined(this.max?.toString())}
            type="number"
            @change=${(e: Event) => this.handleOnChange(Number((e.currentTarget as HTMLInputElement).value))}
            .value=${live(this.value.toString())}
            .disabled=${this.disabled}
          />
        </div>
        <zeta-icon-button
          .disabled=${this.disabled}
          .rounded=${this.rounded}
          size=${this.size}
          flavor="outline-subtle"
          @click=${() => (this.value = this.value + 1)}
          iconName="add"
        ></zeta-icon-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-stepper-input": ZetaStepperInput;
  }
}
