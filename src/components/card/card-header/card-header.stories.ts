import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaCardHeader } from "./card-header.js";
import "./card-header.js";
import "../../avatar/avatar.js";
import "../../button/icon-button.js";
import { html } from "lit";

const meta: Meta<ZetaCardHeader> = {
  component: "zeta-card-header",
  args: {
    headline: "Headline",
    subHeadline: "Subhead"
  }
};

export default meta;

export const CardHeader: StoryObj<ZetaCardHeader> = {};

export const WithLeadingContent: StoryObj<ZetaCardHeader> = {
  render: args => html`
    <zeta-card-header headline=${args.headline} sub-headline=${args.subHeadline}><zeta-avatar slot="leading"></zeta-avatar></zeta-card-header>
  `
};

export const WithTrailingContent: StoryObj<ZetaCardHeader> = {
  render: args => html`
    <zeta-card-header headline=${args.headline} sub-headline=${args.subHeadline}
      ><zeta-icon-button slot="trailing" iconname="more_vertical" flavor="basic"></zeta-icon-button>
    </zeta-card-header>
  `
};

export const WithLeadingAndTrailingContent: StoryObj<ZetaCardHeader> = {
  render: args => html`
    <zeta-card-header headline=${args.headline} sub-headline=${args.subHeadline}>
      <zeta-avatar slot="leading"></zeta-avatar>
      <zeta-icon-button slot="trailing" iconname="more_vertical" flavor="basic"></zeta-icon-button>
    </zeta-card-header>
  `
};
