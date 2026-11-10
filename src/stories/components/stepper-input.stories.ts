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
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=5595-122"
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
