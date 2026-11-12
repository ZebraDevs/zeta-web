import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaOption } from "../../../components/select-input/option.js";
import "../../../components/select-input/option";
import { spreadGenerator } from "../../utils.js";
const spread = spreadGenerator(ZetaOption);

const meta: Meta<ZetaOption> = {
  component: "zeta-option",
  title: "Components/Select Input",
  tags: ["autodocs"],
  args: {
    disabled: false,
    rounded: true,
    value: "Option",
    selected: false,
    size: "medium"
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
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

export const Option: StoryObj = {
  render: args => html` <zeta-option ${spread(args)}>${args.value}</zeta-option> `
};
