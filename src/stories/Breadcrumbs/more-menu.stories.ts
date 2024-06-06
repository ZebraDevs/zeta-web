import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ZetaMoreMenu } from "../../components/breadcrumbs/more-menu/more-menu.js";

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
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21265-26581&mode=design&t=xLGLqCoG43B0vRUv-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};
export default meta;

export const MoreMenu: StoryObj<ZetaMoreMenu> = {};
