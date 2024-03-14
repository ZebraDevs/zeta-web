import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaAssistChip } from "../index.js";

const meta: Meta<ZetaAssistChip> = {
  component: "zeta-assist-chip",
  title: "Chips",
  args: {
    type: "label-only"
  },
  argTypes: {
    type: { options: ["label-only", "label-with-icon"], control: { type: "inline-radio" } }
  }
};

export default meta;

export const AssistChip: StoryObj<ZetaAssistChip> = {};

