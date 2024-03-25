import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { ZetaNavigationDrawerFooter } from "../../index.js";

const meta: Meta<ZetaNavigationDrawerFooter> = {
  title: "Navigation Drawer",
  component: "zeta-navigation-drawer-footer"
};
export default meta;

export const Footer: StoryObj<ZetaNavigationDrawerFooter> = {
  args: {
    headline: "Title",
    subHeadline: "subtitle",
    divide: false
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1092-21721&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export const FooterAvatarAndIcon: StoryObj<ZetaNavigationDrawerFooter> = {
  args: {
    headline: "Title",
    subHeadline: "subtitle",
    divide: false
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1092-21721&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  },
  render: args =>
    html`<zeta-navigation-drawer-footer headline=${args.headline} sub-headline=${args.subHeadline} .divide=${args.divide} variant="profile"
      ><zeta-avatar slot="leading"></zeta-avatar><zeta-icon slot="trailing" color="white">settings</zeta-icon></zeta-navigation-drawer-footer
    >`
};

export const FooterDefaultLogo: StoryObj<ZetaNavigationDrawerFooter> = {
  args: {
    headline: "Title",
    divide: false
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1113-32425&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  },
  render: args => html`<zeta-navigation-drawer-footer headline=${args.headline} .divide=${args.divide} variant="logo"></zeta-navigation-drawer-footer>`
};

export const FooterCustomLogo: StoryObj<ZetaNavigationDrawerFooter> = {
  args: {
    headline: "Title",
    divide: false
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1113-32425&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  },
  render: args => html`<zeta-navigation-drawer-footer headline=${args.headline} .divide=${args.divide} variant="logo">
    <img style=${styleMap({
      width: "200px",
      height: "var(--spacing-20)",
      objectFit: "contain"
    })} slot="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"></img>
  </zeta-navigation-drawer-footer>`
};

