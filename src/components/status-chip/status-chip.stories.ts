import "./status-chip.js";
import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaStatusChip } from "./status-chip.js";

const meta: Meta<ZetaStatusChip> = {
  component: "zeta-status-chip",
  args: {
    text: "Input Custom",
    rounded: true
  },
  argTypes: {}
};

export default meta;

export const StatusChip: StoryObj<ZetaStatusChip> = {};

