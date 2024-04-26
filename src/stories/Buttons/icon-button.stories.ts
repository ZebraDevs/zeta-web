import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ZetaIconButton } from "../../index.js";

const meta: Meta<ZetaIconButton> = {
  component: "zeta-icon-button",
  title: "Buttons",
  args: {
    disabled: false,
    rounded: true,
    flavor: "primary",
    name: "",
    value: ""
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=23126-110314&mode=design&t=lGrwQ4pCwYESXz6b-4"
    },
    status: {
      type: "needsAttention"
    }
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
      options: ["primary", "secondary", "positive", "negative", "outline", "outline-subtle", "text"],
      control: {
        type: "select"
      }
    }
  }
};

export default meta;

export const IconButton: StoryObj<ZetaIconButton> = {};
