import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaStatusChip } from "../../index.js";

const meta: Meta<ZetaStatusChip> = {
  title: "Chips",
  component: "zeta-status-chip",
  args: {
    text: "Input Custom",
    rounded: true
  },
  argTypes: {},
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21265-14282&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const StatusChip: StoryObj<ZetaStatusChip> = {};

