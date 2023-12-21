import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIcon } from "./icon.js";
import "./icon";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";

const meta: Meta<ZetaIcon> = {
  component: "zeta-icon",
  args: {
    name: "alarm",
    size: "20rem",
    color: "red",
    rounded: false
  },
  argTypes: {
    name: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    }
  }
};
export default meta;

export const Icon: StoryObj<ZetaIcon> = {};
