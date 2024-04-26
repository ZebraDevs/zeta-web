import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { ZetaNavigationDrawerFooter } from "../../index.js";
import { spread } from "@open-wc/lit-helpers";

const meta: Meta<ZetaNavigationDrawerFooter | { "sub-headline": string; "hide-default-logo": boolean }> = {
  title: "Navigation Drawer",
  component: "zeta-navigation-drawer-footer",
  args: {
    headline: "Title",
    "sub-headline": "subtitle",
    divide: false
  },
  argTypes: {
    variant: { table: { disable: true } },
    "hide-default-logo": { table: { disable: true } }
  }
};
export default meta;

export const Footer: StoryObj = {
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1092-21721&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  },
  render: args => html` <zeta-navigation-drawer-footer ${spread(args)} .divide=${args.divide}> </zeta-navigation-drawer-footer> `
};

export const FooterAvatarAndIcon: StoryObj = {
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1092-21721&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  },

  render: args =>
    html`<zeta-navigation-drawer-footer ${spread(args)} .divide=${args.divide}>
      <zeta-avatar slot="leading"></zeta-avatar><zeta-icon slot="trailing" color="white">settings</zeta-icon>
    </zeta-navigation-drawer-footer>`
};

export const FooterDefaultLogo: StoryObj = {
  args: {
    variant: "logo"
  },
  argTypes: {
    "sub-headline": { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1113-32425&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  },
  render: args => html`<zeta-navigation-drawer-footer ${spread(args)} .divide=${args.divide}></zeta-navigation-drawer-footer>`
};

export const FooterCustomLogo: StoryObj = {
  args: {
    variant: "logo"
  },
  argTypes: {
    "sub-headline": { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1113-32425&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  },
  render: args => html`<zeta-navigation-drawer-footer ${spread(args)} .divide=${args.divide}>
    <img style=${styleMap({
      width: "200px",
      height: "var(--spacing-20)",
      objectFit: "contain"
    })} slot="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"></img>
  </zeta-navigation-drawer-footer>`
};
