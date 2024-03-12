import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaInputChip } from "../index.js";

const meta: Meta<ZetaInputChip> = {
  component: "zeta-input-chip",
  args: {
    type: "label-only",
    rounded: false
  },
  argTypes: {
    type: { options: ["label-only", "label-with-close-icon", "label-with-avatar-icon", "label-with-both-icons"], control: { type: "inline-radio" } }
  }
};

export default meta;

export const InputChip: StoryObj<ZetaInputChip> = {};

