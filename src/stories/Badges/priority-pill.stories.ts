import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaPriorityPill } from "../../index.js";

const meta: Meta<ZetaPriorityPill> = {
  title: "Badges",
  component: "zeta-priority-pill",
  args: {
    text: "Priority",
    number: 1,
    rounded: true
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21931-2105&mode=design&t=j9Cv98TDx5BKLbgS-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};
export default meta;

export const PriorityPill: StoryObj<ZetaPriorityPill> = {};

