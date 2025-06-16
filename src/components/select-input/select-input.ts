import { customElement, property, query, queryAssignedNodes, state } from "lit/decorators.js";
import { html, LitElement, nothing, type PropertyValues, type TemplateResult } from "lit";

import { FormField, type InputType } from "../../mixins/form-field.js";
import { Size } from "../../mixins/size.js";
import { Contourable } from "../../mixins/contour.js";
import { Interactive } from "../../mixins/interactive.js";

import styles from "./select-input.styles.js";

import type { ZetaOption } from "./option.js";
import "./option.js";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";
import "../icon/icon.js";
import type { ZetaOptionClickEventDetail } from "../../events";

/**
 * TODO:
 * Multi-select
 * Typing
 * Arrow keys to navigate options
 */

/**
 * ZetaSelectInput web component. Text input with dropdown select.
 * Currently no typing or multi-select support.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-39&m=dev
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-select-input--docs
 */
@customElement("zeta-select-input")
export class ZetaSelectInput extends FormField(Size(Contourable(Interactive(LitElement)))) {
  /** @internal */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: "open",
    delegatesFocus: true
  };
  static styles = [styles, super.styles ?? []];

  /** The type used in FormField mixin */
  @property({ type: String, attribute: false }) type: InputType = "select";

  /** Whether field is in error state. */
  @property({ type: Boolean, reflect: true }) error = false;

  /** Whether an option is selected. */
  @property({ type: Boolean, reflect: true }) isSelected = false;

  /** Whether the dialog is open. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Leading icon name. */
  @property({ type: String }) icon?: ZetaIconName;

  /** Label shown above the field. */
  @property({ type: String }) label: string = "";

  /** Hint text shown below text field.
   *  if `error`, then `errorText` is shown instead. */
  @property({ type: String }) hintText: string = "";

  /** Error hint text
   *  Shown if `error`, replaces `hintText`. */
  @property({ type: String }) errorText: string = "";

  /** Height of options dropdown
   *  Default is 200px */
  @property({ type: Number }) optionsDialogHeight = 200;

  @queryAssignedNodes() optionsNodeList: NodeListOf<HTMLOptionElement>;

  @state() private _selectedOption: HTMLOptionElement | undefined = undefined;

  @query("slot") slotElement!: HTMLSlotElement;

  @query("select") select!: HTMLSelectElement;

  handleChange = (event: Event): void => {
    this.dispatchEvent(new Event("change", event));
  };

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.shadowRoot?.addEventListener("zeta-option-click", (event: Event) => {
      const newValue = ((event as CustomEvent).detail as ZetaOptionClickEventDetail).value;

      if (this.value === newValue) {
        // this.setValue("");
        // this.isSelected = false;
        // comment out below and uncomment above to enable deselect
        this.toggleOpen();
      } else {
        this.setValue(newValue);

        this.handleChange(event);

        this.optionsNodeList.forEach(option => {
          if (option.value === this.value) {
            option.selected = true;
            if (!this.disabled) this.isSelected = true;
          } else {
            option.selected = false;
          }
        });
        this.slotElement.dispatchEvent(new Event("slotchange"));

        this.toggleOpen();
      }
    });
  }

  setValue(v: string): void {
    this.value = v;
    this.internals.setFormValue(v);
  }

  updateSelectedOption = () => (this._selectedOption = Array.from(this.optionsNodeList).find(option => option.selected || option.value === this.value));

  updateOptionsWidth = (): void => {
    const inputField = this.shadowRoot?.querySelector(".input");
    const inputFieldWidth = inputField ? inputField.clientWidth : 0;
    const optionsDiv = this.shadowRoot?.querySelector(".options");
    (optionsDiv as HTMLElement).style.maxHeight = `${this.optionsDialogHeight}px`;
    (optionsDiv as HTMLElement).style.width = `${inputFieldWidth}px`;
  };

  handleSlotChange = (e: Event): void => {
    this.updateSelectedOption();

    ((e.target as HTMLSlotElement).assignedElements() as ZetaOption[]).forEach(option => {
      switch (this.size) {
        case "small":
          option.size = "small";
          break;
        case "medium":
          option.size = "medium";
          break;
        case "large":
          option.size = "large";
          break;
      }
      if (option.selected && !this.value) {
        if (!this.disabled) this.isSelected = true;
        this.setValue(option.value);
      }
    });
  };

  renderLabel(): TemplateResult | void {
    if (this.label) {
      return html`<div class="label">
        <label for="select">${this.label}</label>
        ${this.required ? html`<span class="required">*</span>` : ""}
      </div>`;
    }
  }

  renderInputContent(): TemplateResult {
    return html`
      ${this.icon ? html`<zeta-icon class="contourable-target">${this.icon}</zeta-icon>` : nothing}
      ${this._selectedOption
        ? this._selectedOption.innerText
        : this.placeholder === undefined
          ? "Select an option"
          : this.placeholder === ""
            ? ""
            : this.placeholder}
      <zeta-icon class="contourable-target expand-more">expand_more</zeta-icon>
    `;
  }

  renderHint(): TemplateResult | void {
    const text = this.errorText && this.error ? this.errorText : this.hintText;

    if (text) {
      return html`<div class="hint">
        <zeta-icon class="contourable-target hint-icon">${this.error ? "error" : "info"}</zeta-icon>
        <span class="hint-text">${text}</span>
      </div>`;
    }
  }

  toggleOpen = (): void => {
    if (!this.disabled) {
      this.updateOptionsWidth();
      this.open = !this.open;
    }
  };

  key(e: KeyboardEvent, type: "down" | "up") {
    if (type === "down") {
      if (e.key === " " || e.key === "Enter") {
        this.toggleOpen();
      }
    }
  }

  private handleOutsideClick = (e: Event) => {
    if (this.open && this !== (e.target as Node)) {
      this.open = false;
    }
  }
  
  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("click", this.handleOutsideClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleOutsideClick);
  }

  protected override render() {
    return html`
    <div class='wrapper'>
        <div class="hidden-select">${super.render()}</div>
        ${this.renderLabel()}
        <div class="input-options">
          <div
            class="input contourable-target"
            tabindex="0"
            @click=${() => this.toggleOpen()}
            @keydown=${(e: KeyboardEvent) => this.key(e, "down")}
            @keyup=${(e: KeyboardEvent) => this.key(e, "up")}
          >
            ${this.renderInputContent()}
          </div>
          <slot class="options contourable-target" @slotchange=${this.handleSlotChange}></slot>
        </div>
        ${this.renderHint()}
      </div>
    </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-select-input": ZetaSelectInput;
  }
}
