import type { Meta, StoryObj } from "@storybook/react";
import { ZetaPriorityPill } from "./priority-pill.js";
import "./priority-pill.js";
const meta: Meta<typeof ZetaPriorityPill> = {
  component: ZetaPriorityPill,
  args: {
    text: "Priority",
    number: 1,
    rounded: true
  },
  argTypes: {}
};
export default meta;
export const PriorityPill: StoryObj<typeof ZetaPriorityPill> = {};
