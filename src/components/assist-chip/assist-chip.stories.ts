import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaAssistChip } from "./assist-chip.js";
import "./assist-chip.js";

const meta: Meta<ZetaAssistChip> = {
  component: "zeta-assist-chip",
  args: {
    type: "label-only",
    rounded: false,
    condensed: false
  },
  argTypes: {
    type: { options: ["label-only", "label-with-icon"], control: { type: "inline-radio" } }
  }
};

export default meta;

export const AssistChip: StoryObj<ZetaAssistChip> = {};

