import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaNavigationProfile } from "../../components/navigation-profile/navigation-profile.js";
import "../../components/avatar/avatar.js";

const meta: Meta<ZetaNavigationProfile> = {
  component: "zeta-navigation-profile",
  title: "Components/Navigation Header",
  args: {
    rounded: true
  },
  argTypes: {}
};
export default meta;

export const Profile: StoryObj<ZetaNavigationProfile> = {
  render: args =>
    html`<zeta-navigation-profile .rounded=${args.rounded}><zeta-avatar slot="leading" size="s"></zeta-avatar>My account</zeta-navigation-profile>`
};
