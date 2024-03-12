import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { styleMap } from "lit-html/directives/style-map.js";
import { ZetaNavigationDrawerFooter } from "../index.js";

const meta: Meta<ZetaNavigationDrawerFooter> = {
  component: "zeta-navigation-drawer-footer"
};
export default meta;

export const NavigationDrawerFooter: StoryObj<ZetaNavigationDrawerFooter> = {
  args: {
    headline: "Title",
    subHeadline: "subtitle",
    divide: false
  }
};

export const AvatarAndIcon: StoryObj<ZetaNavigationDrawerFooter> = {
  args: {
    headline: "Title",
    subHeadline: "subtitle",
    divide: false
  },
  render: args =>
    html`<zeta-navigation-drawer-footer headline=${args.headline} sub-headline=${args.subHeadline} .divide=${args.divide} variant="profile"
      ><zeta-avatar slot="leading"></zeta-avatar><zeta-icon slot="trailing" color="white">settings</zeta-icon></zeta-navigation-drawer-footer
    >`
};

export const DefaultLogo: StoryObj<ZetaNavigationDrawerFooter> = {
  args: {
    headline: "Title",
    divide: false
  },
  render: args => html`<zeta-navigation-drawer-footer headline=${args.headline} .divide=${args.divide} variant="logo"></zeta-navigation-drawer-footer>`
};

export const CustomLogo: StoryObj<ZetaNavigationDrawerFooter> = {
  args: {
    headline: "Title",
    divide: false
  },
  render: args => html`<zeta-navigation-drawer-footer headline=${args.headline} .divide=${args.divide} variant="logo">
    <img style=${styleMap({
      width: "200px",
      height: "var(--spacing-20)",
      objectFit: "contain"
    })} slot="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"></img>
  </zeta-navigation-drawer-footer>`
};

