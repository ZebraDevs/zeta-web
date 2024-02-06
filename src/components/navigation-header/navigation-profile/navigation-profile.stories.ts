import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaNavigationProfile } from "./navigation-profile.js";
import "./navigation-profile.js";
import "../../avatar/avatar.js";
import { html } from "lit-html";

const meta: Meta<ZetaNavigationProfile> = {
  component: "zeta-navigation-profile",
  args: {
    rounded: true
  },
  argTypes: {}
};
export default meta;

export const NavigationProfile: StoryObj<ZetaNavigationProfile> = {
  render: args =>
    html`<zeta-navigation-profile .rounded=${args.rounded}><zeta-avatar slot="leading" size="sm"></zeta-avatar>My account</zeta-navigation-profile>`
};
