import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ZetaIcon } from "../../components/icon/icon.js";

const meta: Meta<ZetaIcon> = {
  component: "zeta-icon",
  title: "Assets",
  args: {
    name: "alarm",
    size: "20rem",
    color: "var(--icon-default)",
    rounded: true
  },
  argTypes: {
    name: {
      options: ZetaIconNameList,
      control: { type: "select" }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/VQ7Aa3rDYB7mgpToI3bZ4D/%F0%9F%A6%93-ZDS---Assets?type=design&node-id=240-6&mode=design"
    },
    status: {
      type: "ready"
    }
  }
};
export default meta;

export const Icon: StoryObj<ZetaIcon> = {};
