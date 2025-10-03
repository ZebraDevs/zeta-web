import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaTooltip } from "../../components/tooltip/tooltip.js";
import { html } from "lit";

const meta: Meta<ZetaTooltip> = {
  component: "zeta-tooltip",
  tags: ["autodocs"],
  title: "Components/Tooltip",
  args: {
    point: "bottom",
    rounded: false,
    slot: "Label"
  },
  argTypes: {
    point: {
      options: ["left", "right", "bottom", "top"],
      control: { type: "inline-radio" }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21816-222&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Tooltip: StoryObj = {
  render: args => {
    return html` <zeta-tooltip .point=${args.point} .rounded=${args.rounded}> ${args.slot} </zeta-tooltip>`;
  }
};
