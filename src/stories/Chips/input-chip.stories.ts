import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaInputChip } from "../../index.js";

const meta: Meta<ZetaInputChip> = {
  title: "Chips",
  component: "zeta-input-chip",
  args: {
    type: "label-only",
    rounded: false,
    text: "Chip",
    disabled: false
  },
  argTypes: {
    type: { options: ["label-only", "label-with-close-icon", "label-with-avatar-icon", "label-with-both-icons"], control: { type: "inline-radio" } }
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21265-2159&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const InputChip: StoryObj<ZetaInputChip> = {};
