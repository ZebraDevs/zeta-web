import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaGlobalHeader } from "../index.js";

const meta: Meta<ZetaGlobalHeader> = {
  component: "zeta-global-header",
  tags: ["autodocs"],
  title: "Global Header"
};
export default meta;

export const GlobalHeader: StoryObj<ZetaGlobalHeader> = {
  render: () =>
    html`<zeta-global-header>
      <zeta-icon-button slot="leading" flavor="basic-inverse" iconname="apps"></zeta-icon-button>
      Service Name
      <zeta-search slot="trailing" size="small"></zeta-search>
      <zeta-icon-button slot="trailing" flavor="basic-inverse" iconname="star"></zeta-icon-button>
      <zeta-icon-button slot="trailing" flavor="basic-inverse" iconname="star"></zeta-icon-button>
      <zeta-icon-button slot="trailing" flavor="basic-inverse" iconname="star"></zeta-icon-button>
      <zeta-navigation-profile slot="trailing" rounded><zeta-avatar slot="leading" size="sm"></zeta-avatar>My account</zeta-navigation-profile>
    </zeta-global-header>`
};

export const WithMenuItems: StoryObj<ZetaGlobalHeader> = {
  args: {
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
  render: args =>
    html`<zeta-global-header menu-position=${args.menuPosition}>
      <zeta-icon-button slot="leading" flavor="basic-inverse" iconname="apps"></zeta-icon-button>
      Service Name
      <zeta-navigation-header slot="navigation-menu">
        <zeta-navigation-item active>Menu Item</zeta-navigation-item>
        <zeta-navigation-item>Menu Item</zeta-navigation-item>
        <zeta-navigation-item>Menu Item</zeta-navigation-item>
        <zeta-navigation-item>Menu Item</zeta-navigation-item>
      </zeta-navigation-header>
      <zeta-icon-button slot="trailing" flavor="basic-inverse" iconname="star"></zeta-icon-button>
      <zeta-icon-button slot="trailing" flavor="basic-inverse" iconname="star"></zeta-icon-button>
      <zeta-icon-button slot="trailing" flavor="basic-inverse" iconname="star"></zeta-icon-button>
      <zeta-navigation-profile slot="trailing" rounded><zeta-avatar slot="leading" size="sm"></zeta-avatar>My account</zeta-navigation-profile>
    </zeta-global-header>`
};

