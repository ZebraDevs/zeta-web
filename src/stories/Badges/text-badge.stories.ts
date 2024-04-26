import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaLabel } from "../../index.js";

const meta: Meta<ZetaLabel> = {
  title: "Badges",
  component: "zeta-label",
  args: {
    text: "label",
    rounded: true
  },
  argTypes: {
    status: {
      options: ["neutral", "info", "positive", "warning", "negative"],
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21926-1007"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const TextBadge: StoryObj<ZetaLabel> = {};
