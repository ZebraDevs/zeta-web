import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSwitch } from "../index.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";

const meta: Meta<ZetaSwitch> = {
  component: "zeta-switch",
  tags: ["autodocs"],
  title: "Switch",
  args: { rounded: true },
  argTypes: {
    activeIcon: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    },
    inactiveIcon: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1153-26923&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;
export const SwitchDefault: StoryObj<ZetaSwitch> = {
  args: {
    active: false
  }
};
export const SwitchDisabled: StoryObj<ZetaSwitch> = {
  args: {
    disabled: true
  }
};
export const SwitchDefaultWithIcon: StoryObj<ZetaSwitch> = {
  args: {
    active: false,
    activeIcon: "microphone",
    inactiveIcon: "microphone_off"
  }
};
export const SwitchDefaultWithIconSharp: StoryObj<ZetaSwitch> = {
  args: {
    active: false,
    rounded: false,
    activeIcon: "microphone",
    inactiveIcon: "microphone_off"
  }
};
export const SwitchDefaultWithIconDisabled: StoryObj<ZetaSwitch> = {
  args: {
    disabled: true,
    activeIcon: "microphone",
    inactiveIcon: "microphone_off"
  }
};

