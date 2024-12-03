import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSwitch } from "../components/switch/switch.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { spreadGenerator } from "./utils.js";
import { html } from "lit";
import { fn } from "@storybook/test";

const spread = spreadGenerator(ZetaSwitch);

const meta: Meta<ZetaSwitch> = {
  component: "zeta-switch",
  tags: ["autodocs"],
  title: "Switch",
  args: {
    rounded: true,
    disabled: false,
    onclick: fn(),
    onchange: fn(),
    oninput: fn()
  },
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
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1153-26923&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;
export const SwitchDefault: StoryObj<ZetaSwitch> = {};
export const SwitchMuteControl: StoryObj<ZetaSwitch> = {
  args: { activeIcon: "volume_up", inactiveIcon: "volume_off" }
};
export const SwitchDisabled: StoryObj<ZetaSwitch> = {
  args: { disabled: true, activeIcon: "volume_up", inactiveIcon: "volume_off" }
};

export const SwitchCustomSize: StoryObj = {
  args: { activeIcon: "microphone", inactiveIcon: "microphone_off" },
  render: args => {
    return html`<style>
        zeta-switch.custom-size {
          --switch-height: 48px;
          --switch-width: 96px;
          --switch-thumb-size: 40px;
        }
      </style>
      <zeta-switch class="custom-size" ${spread(args)}></zeta-switch> `;
  }
};
export const SausageSwitch: StoryObj = {
  args: { activeIcon: "microphone", inactiveIcon: "microphone_off" },
  render: args => {
    return html`<style>
        zeta-switch.sausage {
          --switch-height: 48px;
          --switch-width: 512px;
          --switch-thumb-size: 40px;
        }
      </style>
      <zeta-switch class="sausage" ${spread(args)}></zeta-switch> `;
  }
};
export const PattySwitch: StoryObj = {
  args: { activeIcon: "microphone", inactiveIcon: "microphone" },
  render: args => {
    return html`<style>
        zeta-switch.patty {
          --switch-height: 48px;
          --switch-width: 72px;
          --switch-thumb-size: 40px;
          --switch-icon-size: 12px;
        }
      </style>
      <zeta-switch class="patty" ${spread(args)}></zeta-switch> `;
  }
};
//TODO % dont work
export const SwitchCustomIconSize: StoryObj = {
  args: { activeIcon: "microphone", inactiveIcon: "microphone" },
  render: args => {
    return html`<style>
        zeta-switch.custom-icon-size {
          --switch-icon-size: 12px;
        }
      </style>
      <zeta-switch class="custom-icon-size" ${spread(args)}></zeta-switch> `;
  }
};
