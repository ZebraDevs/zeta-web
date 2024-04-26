import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaTag } from "../../index.js";

const meta: Meta<ZetaTag> = {
  title: "Badges",
  component: "zeta-tag",
  args: {
    text: "Tag",
    rounded: false
  },
  argTypes: {
    point: {
      options: ["left", "right"],
      control: { type: "inline-radio" }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22000-10073"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const Tag: StoryObj<ZetaTag> = {};
