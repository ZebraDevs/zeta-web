import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIconButton } from "./icon-button.js";
import "./icon-button.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";

const meta: Meta<ZetaIconButton> = {
  component: "zeta-icon-button",
  args: {
    disabled: false,
    rounded: true
  },
  argTypes: {
    iconName: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    },
    size: {
      options: ["small", "medium", "large"], //TODO: Get values from Size type?
      control: {
        type: "select"
      }
    },
    flavor: {
      options: ["primary", "secondary", "positive", "negative", "outline", "outline-subtle", "basic", "basic-inverse", "basic-negative"], //TODO: Get values from IconButtonFlavor type?
      control: {
        type: "select"
      }
    }
  }
};

export default meta;

export const IconButton: StoryObj<ZetaIconButton> = {};
