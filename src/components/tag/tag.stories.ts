import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaTag } from "./tag.js";

const meta: Meta<ZetaTag> = {
  component: "zeta-tag",
  args: {
    text: "Tag",
    rounded: false,
    point: "right"
  },
  argTypes: {
    point: {
      options: ["left", "right"],
      control: { type: "inline-radio" }
    }
  }
};

export default meta;

export const Tag: StoryObj<ZetaTag> = {};

