import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaRadioButton } from "../../components/radio-button/radio-button.js";
import { html } from "lit";
import { spreadGenerator } from "../utils.js";
import { fn } from "@storybook/test";
import "../../components/button/button.js";

const spread = spreadGenerator(ZetaRadioButton);

const meta: Meta<ZetaRadioButton> = {
  component: "zeta-radio-button",
  tags: ["autodocs"],
  title: "Components/Radio Button",
  args: {
    disabled: false,
    checked: false,
    name: "",
    id: "",
    onchange: fn(),
    oninput: fn()
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21510-54345&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
} satisfies Meta<ZetaRadioButton>;

export default meta;

export const RadioButton: StoryObj<ZetaRadioButton> = {
  render: ({ slot, onchange, ...args }) => html`<zeta-radio-button ${spread(args)} @change=${onchange}>${slot}</zeta-radio-button>`
};

export const RadioButtonWithLabel: StoryObj<ZetaRadioButton> = {
  args: {
    slot: "Label"
  },
  render: RadioButton.render
};

export const RadioButtonInForm: StoryObj<ZetaRadioButton> = {
  args: {
    name: "myRadioButton"
  },
  render: args => html`
    <form
      @submit=${(ev: Event) => {
        console.log("Submit", ev);
        const data = new FormData(ev.target as HTMLFormElement);
        console.log(Object.fromEntries(data));
      }}
    >
      <fieldset>
        <zeta-radio-button name="choice" @input=${args.oninput} @change=${args.onchange}>Yes</zeta-radio-button>
        <zeta-radio-button name="choice" value="No" @input=${args.oninput} @change=${args.onchange}>No</zeta-radio-button>
        <label> <input type="radio" name="choice" />Maybe</label>
        <label> <input type="radio" name="choice" value="N/A" />Not Applicable</label>
      </fieldset>
      <zeta-button type="submit">Submit</zeta-button>
      <zeta-button type="reset">Reset</zeta-button>
    </form>
  `
};
