import type { Meta, StoryObj } from "@storybook/react";
import { ZetaIcon } from "./icon.js";
import "./icon";
const meta: Meta<typeof ZetaIcon> = {
  component: ZetaIcon,
  args: {
    name: "check-box",
    size: 24,
    color: "red"
  },
  argTypes: {}
};
export default meta;
export const Icon: StoryObj<typeof ZetaIcon> = {};