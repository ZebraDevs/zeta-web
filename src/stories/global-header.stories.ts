import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaGlobalHeader } from "../components/global-header/global-header.js";
import "../components/button/icon-button/icon-button.js";
import "../components/search/search.js";
import "../components/navigation-header/navigation-profile/navigation-profile.js";
import "../components/navigation-header/navigation-header.js";
import "../components/navigation-header/navigation-item/navigation-item.js";
import "../components/avatar.js";

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
      table: {
        disable: true
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
      <zeta-icon-button slot="leading" flavor="text" iconname="apps"></zeta-icon-button>
      <zeta-search slot="trailing" size="small"></zeta-search>
      <zeta-icon-button slot="trailing" flavor="text" iconname="star"></zeta-icon-button>
      <zeta-icon-button slot="trailing" flavor="text" iconname="star"></zeta-icon-button>
      <zeta-icon-button slot="trailing" flavor="text" iconname="star"></zeta-icon-button>
      <zeta-navigation-profile slot="trailing" rounded>
        <zeta-avatar slot="leading" size="sm"></zeta-avatar>
        My account
      </zeta-navigation-profile>
    </zeta-global-header>`;
  }
};

export const WithMenuItems: StoryObj = {
  argTypes: {
    menuPosition: {
      options: ["inline", "below"],
      control: {
        type: "select"
      }
    }
  },
  render: args =>
    html`<zeta-global-header menuPosition=${args.menuPosition} headline=${args.headline}>
      <zeta-icon-button slot="leading" flavor="text" iconname="apps"></zeta-icon-button>
      <zeta-navigation-header slot="navigation-menu">
        <zeta-navigation-item active>Menu Item</zeta-navigation-item>
        <zeta-navigation-item>Menu Item</zeta-navigation-item>
        <zeta-navigation-item>Menu Item</zeta-navigation-item>
        <zeta-navigation-item>Menu Item</zeta-navigation-item>
      </zeta-navigation-header>
      <zeta-icon-button slot="trailing" flavor="text" iconname="star"></zeta-icon-button>
      <zeta-icon-button slot="trailing" flavor="text" iconname="star"></zeta-icon-button>
      <zeta-icon-button slot="trailing" flavor="text" iconname="star"></zeta-icon-button>
      <zeta-navigation-profile slot="trailing" rounded>
        <zeta-avatar slot="leading" size="sm"></zeta-avatar>
        My account
      </zeta-navigation-profile>
    </zeta-global-header>`
};
