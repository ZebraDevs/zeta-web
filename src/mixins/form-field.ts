/* eslint-disable @typescript-eslint/unbound-method */
import type { LitElement, PropertyValues } from "lit";
import { html, nothing } from "lit";
import { property, query, queryAssignedNodes, state } from "lit/decorators.js";
import { type AbstractConstructor } from "./utils.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";

export type InputType =
  | "checkbox"
  | "text"
  | "textarea"
  | "password"
  | "time"
  | "date"
  | "radio"
  | "search"
  | "text-dropdown"
  | "checkbox-dropdown"
  | "radio-dropdown"
  | "slider"
  | "range-selector"
  | "select"
  | "stepper"
  | "number"
  | "integer"; //Extend this when adding more form controls

//TODO add all properties here

declare abstract class FormFieldInterface {
  abstract type: InputType;
  name: string;
  required: boolean;
  value: string;
  disabled: boolean;
  checked?: boolean;
  indeterminate: boolean;
  input: HTMLInputElement;
  internals: ElementInternals;
  placeholder: string;
  min: number;
  max: number;
  abstract handleChange(event: Event): void;
  handleInput(event: Event): void;
  handleFocus(event: FocusEvent): void;
  handleBlur(event: FocusEvent): void;
}

/**
 * Class mixin to add form control properties to a component.
 *
 * @slot - Slot for a label.
 * @param superClass - LitElement to add mixin to
 *
 * @event {FocusEvent>} focus - Fired when the form field is focused
 * @event {BlurEvent} blur - Fired when the form field is blurred
 * @event {InputEvent} input - Fired when the value of the element changes.
 *
 * @returns - component with mixin applied.
 */
export const FormField = <T extends AbstractConstructor<LitElement>>(superClass: T) => {
  /**
   * Represents a form control element that can be associated with a form.
   */
  abstract class FormFieldClass extends superClass {
    static formAssociated = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      super(...args);
      this.internals = this.attachInternals();
    }
    @state() internals: ElementInternals;
    @query("input") input!: HTMLInputElement;
    @query("label") label?: HTMLLabelElement;
    @queryAssignedNodes() slottedElements!: Array<HTMLElement>;

    /**
     * The default value of the form control. This is the initial "value" when created
     */
    protected _defaultValue: string | null = "";
    /**
     * The default checked value of the form control if it is a checkbox/switch.
     * This is the initial "checked" when created
     */
    protected _defaultChecked?: boolean = false;

    /**
     * The type of the form control.
     */
    abstract type: InputType;

    private get isCheckable() {
      return this.type === "checkbox" || this.type === "radio";
    }

    /** Whether inputted text is automatically capitalized and how. Only takes effect on non-keyboard entry */
    @property({ type: String }) autoCapitalize?: "none" | "off" | "sentences" | "on" | "words" | "characters";
    //TODO the enclosing form should override this with its own same attribute. this needs testing.
    @property({ type: String }) autoComplete?: AutoFill;

    /**
     * The name of the form control.
     */
    @property({ type: String, reflect: true }) name: string = "";

    /**
     * The id of the form control.
     */
    @property({ type: String, reflect: true }) id: string = "";

    /**
     * Indicates whether the form control is required to be filled out before submitting the form.
     */
    @property({ type: Boolean, reflect: true }) required: boolean = false;

    /**
     * The value of the Form Control that is submitted when part of a form.
     */
    @property({ type: String }) value: string | null = null;

    /** The state of the Switch or Checkbox that is submitted when part of a form. */
    @property({ type: Boolean, reflect: true }) checked: boolean = this._defaultChecked ?? false;

    /**
     * The state of the Switch or Checkbox defined by a mixed or unknown state.
     */
    @property({ type: Boolean, reflect: true }) indeterminate: boolean = false;

    /** Placeholder text shown when value is empty. */
    @property({ type: String, reflect: true }) placeholder?: string;

    /** The minimum value for number inputs */
    @property({ type: Number, reflect: true }) min?: number;

    /** The maximum value for number inputs */
    @property({ type: Number, reflect: true }) max?: number;

    /** Placeholder text shown when value is empty. */
    @property({ type: Boolean, reflect: true }) readOnly?: boolean;

    /** Whether to spellcheck the input */
    @property({ type: Boolean }) spellCheck?: boolean | "default";
    /**
     * Boolean for if component is disabled.
     *
     * This will apply disabled styles.
     */
    @property({ type: Boolean, reflect: true }) disabled: boolean = false;

    willUpdate(changedProperties: PropertyValues<this>) {
      super.willUpdate(changedProperties);
      if (changedProperties.has("checked")) {
        if (this.checked) {
          this.internals.setFormValue(this.value != null || this.value != undefined ? this.value : "on");
        } else {
          this.internals.setFormValue(null);
        }
      }
    }

    public checkValidity(): boolean {
      return this.internals.checkValidity();
    }

    public reportValidity(): boolean {
      return this.internals.reportValidity();
    }

    public get validity(): ValidityState {
      return this.internals.validity;
    }

    public get validationMessage(): string {
      return this.internals.validationMessage;
    }

    private getValue(value: string | null, checked: boolean | undefined): string | null {
      if (this.isCheckable) {
        if (checked) {
          return this.value ?? "on";
        } else {
          return null;
        }
      }
      return value;
    }

    connectedCallback() {
      super.connectedCallback();
      if (this.checked !== undefined) {
        this._defaultChecked = this.checked;
      }
      this._defaultValue = this.getValue(this.value, this._defaultChecked);

      // Removed the below line as it violates accessability rules https://dequeuniversity.com/rules/axe/4.8/nested-interactive?application=axeAPI
      // if (this.internals.role) this.role = this.internals.role;
      if (this.isCheckable) {
        this.ariaChecked = String(this.checked);
      }
    }

    firstUpdated(_changedProperties: PropertyValues): void {
      super.firstUpdated(_changedProperties);
      if (this.type === "slider") this.setToInitialValues();

      if (this.isCheckable) this.addEventListener("click", this.click);
      // if (this.isCheckable) this.addEventListener("click", this.input.click); //TODO this is probably the source of the click problem
    }

    disconnectedCallback(): void {
      super.disconnectedCallback();
      if (this.isCheckable) this.removeEventListener("click", this.click);
      // if (this.isCheckable) this.removeEventListener("click", this.input.click); //TODO this is probably the source of the click problem
    }

    formResetCallback() {
      this.setToInitialValues();
    }

    setToInitialValues() {
      this._setValue({ checked: this._defaultChecked, value: this._defaultValue });
    }

    //Might need to override or abstract: setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement)

    /**
     * Event fired when the input value changes and is committed:
     * @param event - The input event.
     * @param isInput - Whether the event is an input event, false if change event
     */
    private _handleInput(event: Event, isInput: boolean = true) {
      const input = event.target as HTMLInputElement;
      if (this.type === "integer") {
        this._handleInteger(event as InputEvent);
      }
      this._setValue(input);
      if (isInput) this.handleInput(event as InputEvent);
    }

    private _handleInteger(event: InputEvent) {
      const input = event.target as HTMLInputElement;
      const cursor = input.selectionStart ?? 0;

      // Remove leading minus if min >= 0
      if (this.min !== undefined && this.min >= 0) {
        input.value = input.value.replace(/^-/, "");
      }
      // Remove non-integer characters except leading minus
      const filtered = input.value.replace(/(?!^)-|[^\d-]/g, "");

      if (input.value !== filtered) {
        input.value = filtered;
        this.value = filtered;

        // Adjust cursor position
        const dataLen = event.data?.length ?? 0;
        const cursorBefore = cursor - dataLen;
        const filteredDataLen = event.data?.replace(/(?!^)-|[^\d-]/g, "").length ?? 0;
        const newCursor = dataLen === 1 ? Math.max(0, cursor - 1) : cursorBefore + filteredDataLen;
        input.setSelectionRange(newCursor, newCursor);
      }

      // Clamp to min/max if needed
      if (this.min !== undefined && Number(input.value) < this.min) {
        input.value = String(this.min);
        this.value = String(this.min);
      }
      if (this.max !== undefined && Number(input.value) > this.max) {
        input.value = String(this.max);
        this.value = String(this.max);
      }
    }

    private _setValue(input: { checked?: boolean; value: string | null }) {
      const newVal = this.getValue(input.value, input.checked);

      if (this.isCheckable) {
        this.checked = !!input.checked;
        this.indeterminate = false;
      } else {
        this.value = newVal;
        this.internals.setFormValue(newVal);
      }
    }

    private _handleChange(event: Event) {
      this._handleInput(event, false);
      this.handleChange(event);
    }

    /**
     * Event fired when the input is focussed
     */
    handleFocus(_event: FocusEvent) {
      return _event;
    }

    /**
     * Event fired when the input is blurred
     */
    handleBlur(_event: FocusEvent) {
      return _event;
    }

    /**
     * Event fired when the input value changes and is committed:
     * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
     * or if it is a text-like input, when the user loses focus from the input.
     * or if it is a checkbox-like input, when the checkbox is toggled.
     * or if it is a radio-like input, when the radio is selected (but not unselected).
     */
    handleChange(_event: Event) {
      return _event;
    }

    /**
     * Event fired when the input value changes
     */
    handleInput(_event: InputEvent) {
      return _event;
    }

    /*
      max=${'date'|'month'|'week'|'time'|'datetime-local'|'number'|'range'}
      maxlength=${'text'|'search'|'tel'|'url'|'email'|'password'}
      min=${'date'|'month'|'week'|'time'|'datetime-local'|'number'|'range'}
      minlength=${'text'|'search'|'tel'|'url'|'email'|'password'}
      step=${'date'|'month'|'week'|'time'|'datetime-local'|'number'|'range'}

      multiple=${'email'}
      
      //autofocus?
      aria-describedby=${}
      aria-label=${this.label}
      placeholder=${this.placeholder}
      autocomplete=${this.autoComplete}
      spellcheck=${this.spellCheck}
    */

    protected override render() {
      const notUrlEmailPassword = /*this.type !== 'url' && this.type !== 'email' && */ this.type !== "password";

      switch (this.type) {
        case "checkbox":
        case "radio":
          return html`<input
            type=${this.type}
            id=${ifDefined(this.id !== "" ? this.id : undefined)}
            name=${ifDefined(this.name)}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.ariaLabel || nothing}
            aria-disabled=${this.disabled ? "true" : "false"}
            aria-required=${this.required ? "true" : "false"}
            value=${ifDefined(live(this.value))}
            .checked=${live(this.checked !== undefined ? this.checked : false)}
            aria-checked=${this.checked ? "true" : "false"}
            .indeterminate=${live(this.indeterminate)}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          /> `;
        case "textarea":
          return html`<textarea
            id=${ifDefined(this.id !== "" ? this.id : undefined)}
            name=${ifDefined(this.name)}
            ?disabled=${this.disabled}
            aria-disabled=${this.disabled ? "true" : "false"}
            ?required=${this.required}
            aria-required=${this.required ? "true" : "false"}
            autocapitalize=${ifDefined(this.autoCapitalize)}
            autocomplete=${ifDefined(this.autoComplete)}
            placeholder=${ifDefined(this.placeholder)}
            ?readonly=${this.readOnly}
            spellcheck=${ifDefined(notUrlEmailPassword ? this.spellCheck : undefined)}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            .value=${live(this.value ?? "")}
          ></textarea>`;
        case "text-dropdown":
        case "checkbox-dropdown":
        case "radio-dropdown":
          return html`<input
            type=${this.type}
            id=${ifDefined(this.id !== "" ? this.id : undefined)}
            name=${ifDefined(this.name)}
            ?disabled=${this.disabled}
            aria-disabled=${this.disabled ? "true" : "false"}
            ?required=${this.required}
            aria-required=${this.required ? "true" : "false"}
            autocapitalize=${ifDefined(notUrlEmailPassword ? this.autoCapitalize : undefined)}
            autocomplete=${ifDefined(this.autoComplete)}
            placeholder=${ifDefined(this.placeholder)}
            ?readonly=${this.readOnly}
            .value=${live(this.value ?? "")}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            ?hidden=${true}
          /> `;
        case "slider":
          return html`<input
            type="number"
            id=${ifDefined(this.id !== "" ? this.id : undefined)}
            .id=${this.id}
            name=${ifDefined(this.name)}
            ?disabled=${this.disabled}
            aria-disabled=${this.disabled ? "true" : "false"}
            ?required=${this.required}
            aria-required=${this.required ? "true" : "false"}
            ?readonly=${this.readOnly}
            .value=${live(this.value ?? "")}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            class="contourable-target"
            min=${ifDefined(this.min)}
            max=${ifDefined(this.max)}
          />`;
        case "range-selector":
          return html`<input
            type="text"
            id=${ifDefined(this.id !== "" ? this.id : undefined)}
            .id=${this.id}
            name=${ifDefined(this.name)}
            ?disabled=${this.disabled}
            aria-disabled=${this.disabled ? "true" : "false"}
            ?required=${this.required}
            aria-required=${this.required ? "true" : "false"}
            ?readonly=${this.readOnly}
            .value=${live(this.value ?? "")}
            @input=${this._handleInput}
            @change=${this._handleChange}
            ?hidden=${true}
          />`;
        case "select":
          return html`
            <select
              id=${ifDefined(this.id !== "" ? this.id : undefined)}
              name=${this.name}
              ?disabled=${this.disabled}
              aria-disabled=${this.disabled ? "true" : "false"}
              ?required=${this.required}
              aria-required=${this.required ? "true" : "false"}
              .value=${live(this.value ?? "")}
              @input=${this._handleInput}
              @change=${this._handleChange}
              ?hidden=${true}
            ></select>
          `;
        default:
          return html`<input
            type=${this.type === "stepper" ? "number" : this.type}
            id=${ifDefined(this.id !== "" ? this.id : undefined)}
            name=${ifDefined(this.name)}
            ?disabled=${this.disabled}
            aria-disabled=${this.disabled ? "true" : "false"}
            ?required=${this.required}
            aria-required=${this.required ? "true" : "false"}
            autocapitalize=${ifDefined(notUrlEmailPassword ? this.autoCapitalize : undefined)}
            autocomplete=${ifDefined(this.autoComplete)}
            placeholder=${ifDefined(this.placeholder)}
            ?readonly=${this.readOnly}
            .value=${live(this.value ?? "")}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            min=${ifDefined(this.min)}
            max=${ifDefined(this.max)}
          /> `;

        /*
        -spellcheck
          list
          placeholder=$ {'text'|'search'|'tel'|'url'|'email'|'password'}
          pattern=$     {'text'|'search'|'tel'|'url'|'email'|'password'}
          readonly
        */
      }
      /* There is scope to add more form control events in the above. I.e:
       * @cancel=${this.handleCancel}
       * @drag=${}
       * @dragend=${}
       * @dragenter=${}
       * @dragleave=${}
       * @dragover=${}
       * @dragstart=${}
       * @drop=${}
       */
    }
  }
  return FormFieldClass as AbstractConstructor<FormFieldInterface & LitElement> & T;
};
