import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaPriorityPill } from "./priority-pill.js";
import "./priority-pill.js";
const meta: Meta<ZetaPriorityPill> = {
  component: "zeta-priority-pill",
  args: {
    text: "Priority",
    number: 1,
    rounded: true,
    condensed: false
  },
  argTypes: {}
};
export default meta;

export const PriorityPill: StoryObj<ZetaPriorityPill> = {};

