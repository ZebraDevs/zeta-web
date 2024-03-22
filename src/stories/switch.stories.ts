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

