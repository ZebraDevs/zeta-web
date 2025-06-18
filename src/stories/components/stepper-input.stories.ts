import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaStepperInput } from "../../components/stepper-input/stepper-input.js";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { fn } from "@storybook/test";

const meta: Meta<ZetaStepperInput> = {
  component: "zeta-stepper-input",
  tags: ["autodocs"],
  title: "Components/Stepper Input",
  args: {
    min: 0,
    max: 100,
    rounded: false,
    disabled: false,
    error: false,
    size: "medium",
    value: "1",
    onchange: fn(),
    oninput: fn(),
    onfocus: fn(),
    onblur: fn()
  },
  argTypes: {
    size: {
      options: ["medium", "large"],
      control: { type: "select" }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21529-9963&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export const StepperInput: StoryObj<ZetaStepperInput> = {
  render: ({ oninput, onchange, onblur, onfocus, ...args }) => html`
    <form
      id="form"
      @submit=${(e: SubmitEvent) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        console.log(Object.fromEntries(data));
      }}
      @reset=${(e: Event) => {
        console.error("Form reset", e);
      }}
    >
      <zeta-stepper-input
        name="stepper-input"
        @change=${onchange}
        @input=${oninput}
        @blur=${onblur}
        @focus=${onfocus}
        min=${ifDefined(args.min)}
        max=${ifDefined(args.max)}
        value=${ifDefined(args.value)}
        size=${args.size}
        ?rounded=${args.rounded}
        ?disabled=${args.disabled}
        ?error=${args.error}
      ></zeta-stepper-input>
      <!-- <zeta-button style="margin-top: 15px" type="submit">Submit</zeta-button> -->
    </form>
  `
};

export const StepperInputWithHint: StoryObj<ZetaStepperInput> = {
  render: args => html`
    <form
      id="form"
      @submit=${(e: SubmitEvent) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        console.log(Object.fromEntries(data));
      }}
      @reset=${(e: Event) => {
        console.error("Form reset", e);
      }}
    >
      <zeta-stepper-input
        name="stepper-input"
        min=${ifDefined(args.min)}
        max=${ifDefined(args.max)}
        value=${ifDefined(args.value)}
        size=${args.size}
        hintText="hint"
        errorText="error"
        ?rounded=${args.rounded}
        ?disabled=${args.disabled}
        ?error=${args.error}
      ></zeta-stepper-input>
      <zeta-button style="margin-top: 15px" type="submit">Submit</zeta-button>
    </form>
  `
};

export default meta;
