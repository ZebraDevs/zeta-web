import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaStatusChip } from "../../index.js";

const meta: Meta<ZetaStatusChip> = {
  title: "Chips",
  component: "zeta-status-chip",
  args: {
    text: "Input Custom",
    rounded: true
  },
  argTypes: {}
};

export default meta;

export const StatusChip: StoryObj<ZetaStatusChip> = {};

