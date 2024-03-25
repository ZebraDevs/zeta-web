import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaAssistChip } from "../../index.js";

const meta: Meta<ZetaAssistChip> = {
  component: "zeta-assist-chip",
  title: "Chips",
  args: {
    type: "label-only"
  },
  argTypes: {
    type: { options: ["label-only", "label-with-icon"], control: { type: "inline-radio" } }
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21265-14215&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const AssistChip: StoryObj<ZetaAssistChip> = {};

