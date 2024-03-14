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
  argTypes: {}
};
export default meta;

export const PriorityPill: StoryObj<ZetaPriorityPill> = {};

