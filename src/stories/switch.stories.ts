import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSwitch } from "../index.js";

const meta: Meta<ZetaSwitch> = {
  component: "zeta-switch"
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

