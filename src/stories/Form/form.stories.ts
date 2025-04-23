import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import type { FormEvent } from "react";
import "../../components/text-input/text-input.js";
import "../../components/button/button.js";
import "../../components/switch/switch.js";
import { styleMap } from "lit/directives/style-map.js";
import "../../components/checkbox/checkbox";
import "../../components/radio-button/radio-button";
import "../../components/slider/slider-input-field/slider-input-field.js";
import "../../components/slider/range-selector/range-selector.js";
import "../../components/select-input/select-input.js";
import "../../components/stepper-input/stepper-input.js";

const meta: Meta = {
  title: "Components/Form"
};

export default meta;

export const Form: StoryObj = {
  render: () => html`
    <h1>Zeta Form</h1>
    <form
      style=${styleMap({
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        maxWidth: "100%",
        gap: "var(--spacing-large)"
      })}
      id="form"
      @submit=${(e: FormEvent) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        console.log(Object.fromEntries(data));
      }}
      @reset=${(e: Event) => {
        console.error("Form reset", e);
      }}
    >
      <div style=${columnStyle}>
        <h4 style=${subheadingStyle}>Inputs</h4>
        <div style=${rowStyle}>
          <div style=${columnStyle}>
            <zeta-text-input id="zeta-input" name="zeta-input" placeholder="Placeholder" hintText="Hint text" value="Default value">Text Input</zeta-text-input>
            <zeta-text-input id="zeta-date-input" name="zeta-date-input" placeholder="Placeholder" hintText="Hint text" type="date">Date Input</zeta-text-input>
            <zeta-text-input id="zeta-time-input" name="zeta-time-input" placeholder="Placeholder" hintText="Hint text" type="time">Time Input</zeta-text-input>
          </div>
          <div style=${columnStyle}>
            <zeta-text-input id="zeta-password-input" name="zeta-password-input" placeholder="Placeholder" hintText="Hint text" type="password"
              >Password Input</zeta-text-input
            >
            <zeta-text-input id="zeta-text-area" name="zeta-text-area" placeholder="Placeholder" hintText="Hint text" type="textarea"
              >Text Area</zeta-text-input
            >
          </div>
        </div>
      </div>

      <zeta-slider-input-field name="zeta-slider-input-field"></zeta-slider-input-field>

      <zeta-range-selector rounded name="zeta-range-selector"></zeta-range-selector>

      <zeta-switch id="switch" name="my-zeta-switch" checked>Switch</zeta-switch>
      <div style=${rowStyle}>
        <div style=${columnStyle}>
          <h4 style=${subheadingStyle}>Checkboxes</h4>
          <zeta-checkbox id="chkbx-1" name="zeta-checkbox-1" value="val">Checkbox 1</zeta-checkbox>
          <zeta-checkbox name="zeta-checkbox-2">Checkbox 2</zeta-checkbox>
          <zeta-checkbox name="zeta-checkbox-3">Checkbox 3</zeta-checkbox>
        </div>
        <fieldset style=${styleMap({ display: "flex", flexDirection: "column", gap: "var(--spacing-small)", flex: 1, margin: 0, borderWidth: 0, padding: 0 })}>
          <h4 style=${subheadingStyle}>Radio Buttons WORK IN PROGRESS</h4>
          <zeta-radio-button name="zeta-radio-button-1" value="val">Radio 1</zeta-radio-button>
          <zeta-radio-button name="zeta-radio-button-1">Radio 2</zeta-radio-button>
          <zeta-radio-button name="zeta-radio-button-1" value="notVal">Radio 3</zeta-radio-button>
        </fieldset>
      </div>

      <zeta-select-input name="zeta-select-input" icon="star" rounded>
        <zeta-option value="1">Option 1</zeta-option>
        <zeta-option value="2">Option 2</zeta-option>
        <zeta-option value="3">Option 3</zeta-option>
        <zeta-option value="4">Option 4</zeta-option>
        <zeta-option value="5">Option 5</zeta-option>
        <zeta-option value="6">Option 6</zeta-option>
      </zeta-select-input>

      <zeta-stepper-input name="zeta-stepper-input"></zeta-stepper-input>

      <div
        style=${styleMap({
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px"
        })}
      >
        <zeta-button type="reset" flavor="outline">Reset</zeta-button>
        <zeta-button type="submit">Submit</zeta-button>
      </div>
    </form>
  `
};

const columnStyle = styleMap({ display: "flex", flexDirection: "column", gap: "var(--spacing-small)", flex: 1 });
const rowStyle = styleMap({ display: "flex", gap: "var(--spacing-large)", flex: 1 });
const subheadingStyle = styleMap({ margin: 0 });
