import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaGlobalHeader } from "../../components/global-header/global-header.js";
import { html } from "lit";
import "../../components/global-header/global-header";
import { spreadGenerator } from "../utils.js";
const spread = spreadGenerator(ZetaGlobalHeader);

const meta: Meta<ZetaGlobalHeader> = {
  component: "zeta-global-header",
  tags: ["autodocs"],
  title: "Components/Global Header",
  args: {
    platformName: "Platform Name",
    menuItems: 6,
    actionItems: 6,
    name: "Name",
    initials: "RK",
    appSwitcher: true,
    searchbar: true,
    rounded: false
  },
  argTypes: {
    platformName: { control: "text" },
    menuItems: { control: { type: "number", min: 0, max: 6, step: 1 } },
    actionItems: { control: { type: "number", min: 0, max: 6, step: 1 } },
    name: { control: "text" },
    initials: { control: "text" },
    appSwitcher: { control: "boolean" },
    searchbar: { control: "boolean" },
    rounded: { control: "boolean" }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=23144-118110&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};
export default meta;

export const GlobalHeader: StoryObj = {
  argTypes: {
    menuPosition: {
      table: {
        disable: true
      }
    }
  },
  render: args => {
    return html`<zeta-global-header ${spread(args)}> </zeta-global-header>`;
  }
};

export const WithMenuItems: StoryObj = {
  render: args =>
    html`<zeta-global-header menuPosition=${args.menuPosition} headline=${args.headline}>
      <zeta-icon-button slot="leading" flavor="text">apps</zeta-icon-button>
      <zeta-tab-bar slot="navigation-menu">
        <zeta-tab-item active>Menu Item</zeta-tab-item>
        <zeta-tab-item>Menu Item</zeta-tab-item>
        <zeta-tab-item>Menu Item</zeta-tab-item>
        <zeta-tab-item>Menu Item</zeta-tab-item>
      </zeta-tab-bar>
      <zeta-icon-button slot="trailing" flavor="text">star</zeta-icon-button>
      <zeta-icon-button slot="trailing" flavor="text">star</zeta-icon-button>
      <zeta-icon-button slot="trailing" flavor="text">star</zeta-icon-button>
      <zeta-navigation-profile slot="trailing" rounded>
        <zeta-avatar slot="leading" size="s"></zeta-avatar>
        My account
      </zeta-navigation-profile>
    </zeta-global-header>`
};
