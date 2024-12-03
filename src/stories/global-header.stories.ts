import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaGlobalHeader } from "../components/global-header/global-header.js";
import "../components/button/icon-button/icon-button.js";
import "../components/search/search.js";
import "../components/navigation-profile/navigation-profile.js";
import "../components/tab-bar/tab-bar.js";
import "../components/tab-bar/tab-item/tab-item.js";
import "../components/avatar/avatar.js";

const meta: Meta<ZetaGlobalHeader> = {
  component: "zeta-global-header",
  tags: ["autodocs"],
  title: "Global Header",
  args: {
    headline: "Service Name",
    rounded: true,
    menuPosition: "inline"
  },
  argTypes: {
    menuPosition: {
      options: ["inline", "below"],
      control: {
        type: "select"
      }
    }
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
    return html`<zeta-global-header headline=${args.headline}>
      <zeta-icon-button slot="leading">hamburger_menu</zeta-icon-button>
      <zeta-search slot="trailing" size="large" round="full"></zeta-search>
      <zeta-icon-button slot="trailing">alert</zeta-icon-button>
      <zeta-icon-button slot="trailing">star</zeta-icon-button>
      <div slot="trailing" class="divider">&nbsp;</div>
      <zeta-icon-button slot="trailing">apps</zeta-icon-button>
      <zeta-navigation-profile slot="trailing" rounded>
        <zeta-avatar slot="leading" size="s"></zeta-avatar>
        My account
      </zeta-navigation-profile>
    </zeta-global-header>`;
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
