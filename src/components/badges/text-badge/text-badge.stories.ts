import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaTextBadge } from "./text-badge.js";
import "./priority-pill.js";
const meta: Meta<ZetaTextBadge> = {
  component: "zeta-priority-pill",
  args: {
    text: "label",
    rounded: true
  },
  argTypes: {}
};
export default meta;

export const TextBadge: StoryObj<ZetaTextBadge> = {};

