import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSelectInput } from "../../components/select-input/select-input.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { html } from "lit";
import { spreadGenerator } from "../utils.js";
const spread = spreadGenerator(ZetaSelectInput);

const meta: Meta<ZetaSelectInput> = {
  component: "zeta-select-input",
  title: "Select Input",
  tags: ["autodocs"],
  args: {
    disabled: false,
    rounded: true,
    error: false,
    required: true,
    label: "Label",
    hintText: "Hint text",
    errorText: "Error text",
    icon: "star",
    value: "",
    size: "medium",
    name: "select-input",
    optionsDialogHeight: 200,
    open: false
  },
  argTypes: {
    slot: { table: { disable: true } },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "select" }
    },
    icon: {
      options: ZetaIconNameList,
      control: { type: "select" }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-39&m=dev"
    },
    status: {
      type: "inProgress"
    }
  }
};
export default meta;

export const SelectInput: StoryObj = {
  render: args => html`
    <form
      id="form"
      @submit=${(ev: Event) => {
        ev.preventDefault();
        console.log("Submit", ev);
        const data = new FormData(ev.target as HTMLFormElement);
        console.log(Object.fromEntries(data));
      }}
      @reset=${(e: Event) => {
        console.error("Form reset", e);
      }}
    >
      <zeta-select-input ${spread(args)}>
        <zeta-option value="1">Option 1</zeta-option>
        <zeta-option value="2">Option 2</zeta-option>
        <zeta-option value="3">Option 3</zeta-option>
        <zeta-option value="4">Option 4</zeta-option>
        <zeta-option value="5">Option 5</zeta-option>
        <zeta-option value="6">Option 6</zeta-option>
      </zeta-select-input>

      <button type="submit">Submit</button>
    </form>
  `
};
