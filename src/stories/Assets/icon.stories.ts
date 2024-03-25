import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ZetaIcon } from "../../index.js";

const meta: Meta<ZetaIcon> = {
  component: "zeta-icon",
  title: "Assets",
  args: {
    name: "alarm",
    size: "20rem",
    color: "var(--surface-primary)",
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
