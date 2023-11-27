import type { Meta, StoryObj } from "@storybook/react";
import { ZetaIcon } from "./icon.js";
import "./icon";
const meta: Meta<typeof ZetaIcon> = {
  component: ZetaIcon,
  args: {
    name: "alarm",
    size: "20rem",
    color: "red",
    rounded: false
  },
  argTypes: {}
};
export default meta;
export const Icon: StoryObj<typeof ZetaIcon> = {};