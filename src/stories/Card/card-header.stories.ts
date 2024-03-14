import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaCardHeader } from "../../index.js";

const meta: Meta<ZetaCardHeader> = {
  component: "zeta-card-header",
  title: "Cards",
  args: {
    headline: "Headline",
    subHeadline: "Subhead"
  }
};

export default meta;

export const Header: StoryObj<ZetaCardHeader> = {};

export const HeaderWithLeadingContent: StoryObj<ZetaCardHeader> = {
  render: args => html`
    <zeta-card-header headline=${args.headline} sub-headline=${args.subHeadline}><zeta-avatar slot="leading"></zeta-avatar></zeta-card-header>
  `
};

export const HeaderWithTrailingContent: StoryObj<ZetaCardHeader> = {
  render: args => html`
    <zeta-card-header headline=${args.headline} sub-headline=${args.subHeadline}
      ><zeta-icon-button slot="trailing" iconname="more_vertical" flavor="basic"></zeta-icon-button>
    </zeta-card-header>
  `
};

export const HeaderWithLeadingAndTrailingContent: StoryObj<ZetaCardHeader> = {
  render: args => html`
    <zeta-card-header headline=${args.headline} sub-headline=${args.subHeadline}>
      <zeta-avatar slot="leading"></zeta-avatar>
      <zeta-icon-button slot="trailing" iconname="more_vertical" flavor="basic"></zeta-icon-button>
    </zeta-card-header>
  `
};

