import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIcon } from "./icon.js";
import "./icon";

const meta: Meta<ZetaIcon> = {
  component: "zeta-icon",
  args: {
    name: "alarm",
    size: "20rem",
    color: "red",
    rounded: false
  },
  argTypes: {}
};
export default meta;

export const Icon: StoryObj<ZetaIcon> = {};

