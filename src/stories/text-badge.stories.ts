import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaTextBadge } from "../index.js";

const meta: Meta<ZetaTextBadge> = {
  component: "zeta-text-badge",
  args: {
    text: "label",
    rounded: true
  },
  argTypes: {
    status: {
      options: ["neutral", "info", "positive", "warning", "negative"],
      control: {
        type: "select"
      }
    }
  }
};

export default meta;

export const TextBadge: StoryObj<ZetaTextBadge> = {};

