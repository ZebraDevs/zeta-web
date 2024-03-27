import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaMoreMenu } from "../../index.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";

const meta: Meta<ZetaMoreMenu> = {
  component: "zeta-more-menu",
  title: "BreadCrumb",
  args: {
    disabled: false,
    rounded: false
  },
  argTypes: {
    icon: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    }
  }
};

export default meta;

export const MoreMenu: StoryObj<ZetaMoreMenu> = {};
