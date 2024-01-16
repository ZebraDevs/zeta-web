import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaCard } from "./card.js";
import { html } from "lit-html";
import "./card.js";
import "./card-header/card-header.js";
import "./card-footer/card-footer.js";
import "./card-body/card-body.js";
import "../button/button.js";
import "../button/icon-button.js";
import "../icon/icon.js";
import { styleMap } from "lit-html/directives/style-map.js";

const meta: Meta<ZetaCard> = {
  component: "zeta-card",
  args: {
    rounded: true
  }
};

export default meta;

const placeholderStyle = styleMap({
  background: "var(--color-cool-30)",
  display: "flex",
  flex: "1",
  alignItems: "center",
  justifyContent: "center",
  padding: "48px"
});

const placeholderImg = html`<div style=${placeholderStyle}><zeta-icon size="48" color="var(--color-cool-50)">image</zeta-icon></div>`;

const cardBody = html`<zeta-card-body
  >Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusm od tempor incididunt ut labore et do lore magna aliqua.</zeta-card-body
>`;

export const CardWithHeader: StoryObj<ZetaCard> = {
  render: args =>
    html`<zeta-card .rounded=${args.rounded}>
      <zeta-card-header headline="Headline" sub-headline="Subhead"
        ><zeta-icon-button slot="trailing" iconname="more_vertical" flavor="basic"></zeta-icon-button
      ></zeta-card-header>
      ${placeholderImg} ${cardBody}
      <zeta-card-footer>
        <zeta-button>Button</zeta-button>
      </zeta-card-footer>
    </zeta-card> `
};

export const CardWithTwoActions: StoryObj<ZetaCard> = {
  render: args =>
    html`<zeta-card .rounded=${args.rounded}>
      <zeta-card-header headline="Headline" sub-headline="Subhead"
        ><zeta-icon-button slot="trailing" iconname="more_vertical" flavor="basic"></zeta-icon-button
      ></zeta-card-header>
      ${placeholderImg} ${cardBody}
      <zeta-card-footer>
        <zeta-button flavor="outline">Button</zeta-button>
        <zeta-button>Button</zeta-button>
      </zeta-card-footer>
    </zeta-card> `
};

export const CardWithOneActionLeft: StoryObj<ZetaCard> = {
  render: args =>
    html`<zeta-card .rounded=${args.rounded}>
      <zeta-card-header headline="Headline" sub-headline="Subhead"
        ><zeta-icon-button slot="trailing" iconname="more_vertical" flavor="basic"></zeta-icon-button
      ></zeta-card-header>
      ${placeholderImg} ${cardBody}
      <zeta-card-footer>
        <zeta-button flavor="text">Button</zeta-button>
      </zeta-card-footer>
    </zeta-card> `
};

export const CardWithTitle: StoryObj<ZetaCard> = {
  render: args =>
    html`<zeta-card .rounded=${args.rounded}>
      ${placeholderImg}
      <zeta-card-header headline="Headline" sub-headline="Subhead"></zeta-card-header>
      ${cardBody}
      <zeta-card-footer>
        <zeta-button>Button</zeta-button>
      </zeta-card-footer>
    </zeta-card> `
};
