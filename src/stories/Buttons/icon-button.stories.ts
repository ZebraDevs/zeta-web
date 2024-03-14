import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ZetaIconButton } from "../../index.js";

const meta: Meta<ZetaIconButton> = {
  component: "zeta-icon-button",
  title: "Buttons",
  args: {
    disabled: false,
    rounded: true,
    flavor: "primary"
  },
  argTypes: {
    iconName: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    },
    size: {
      options: ["small", "medium", "large"],
      control: {
        type: "select"
      }
    },
    flavor: {
      options: ["primary", "secondary", "positive", "negative", "outline", "outline-subtle", "basic", "basic-inverse", "basic-negative"],
      control: {
        type: "select"
      }
    }
  }
};

export default meta;

export const IconButton: StoryObj<ZetaIconButton> = {};

