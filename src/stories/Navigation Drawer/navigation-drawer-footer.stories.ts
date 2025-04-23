import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { ZetaNavigationDrawerFooter } from "../../components/navigation-drawer/navigation-drawer-footer/navigation-drawer-footer.js";
import { spreadGenerator } from "../utils.js";
const spread = spreadGenerator(ZetaNavigationDrawerFooter);
import "../../components/avatar/avatar.js";
import "../../components/icon/icon.js";

const meta: Meta<ZetaNavigationDrawerFooter> = {
  title: "Components/Navigation Drawer",
  component: "zeta-navigation-drawer-footer",
  args: {
    headline: "Title",
    subHeadline: "subtitle",
    divide: false
  },
  argTypes: {
    variant: { table: { disable: true } },
    hideDefaultLogo: { table: { disable: true } }
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
  render: args => html` <zeta-navigation-drawer-footer ${spread(args)}> </zeta-navigation-drawer-footer> `
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
    html`<zeta-navigation-drawer-footer ${spread(args)}>
      <zeta-avatar slot="leading"></zeta-avatar>
      <zeta-icon slot="trailing" color="white">settings</zeta-icon>
    </zeta-navigation-drawer-footer>`
};

export const FooterDefaultLogo: StoryObj = {
  args: {
    variant: "logo"
  },
  argTypes: {
    subHeadline: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1113-32425&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  },
  render: args => html`<zeta-navigation-drawer-footer ${spread(args)}></zeta-navigation-drawer-footer>`
};

export const FooterCustomLogo: StoryObj = {
  args: {
    variant: "logo"
  },
  argTypes: {
    subHeadline: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=1113-32425&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  },
  render: args => html`<zeta-navigation-drawer-footer ${spread(args)}>
    <img style=${styleMap({
      width: "200px",
      height: "var(--spacing-20)",
      objectFit: "contain"
    })} slot="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"></img>
  </zeta-navigation-drawer-footer>`
};
