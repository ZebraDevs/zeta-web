import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { ZetaCard } from "../../index.js";

const meta: Meta<ZetaCard> = {
  component: "zeta-card",
  title: "Cards",
  args: {
    rounded: true
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/zzzpriTQpJKlW4gB5Fn3bF/Design-System-Sprint-3?type=design&node-id=2379-71025&mode=design&t=w4IloFPD61aGcU37-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

const placeholderStyle = styleMap({
  background: "var(--color-cool-30)",
  display: "flex",
  flex: "1",
  alignItems: "center",
  justifyContent: "center",
  padding: "var(--spacing-12)"
});

const placeholderImg = html`<div style=${placeholderStyle}><zeta-icon size="48" color="var(--color-cool-50)">image</zeta-icon></div>`;

const cardBody = html`<zeta-card-body
  >Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusm od tempor incididunt ut labore et do lore magna aliqua.</zeta-card-body
>`;

export const CardWithHeader: StoryObj<ZetaCard> = {
  render: args =>
    html`<zeta-card .rounded=${args.rounded}>
      <zeta-card-header headline="Headline" sub-headline="Subhead"
        ><zeta-icon-button slot="trailing" iconname="more_vertical" flavor="text"></zeta-icon-button
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
        ><zeta-icon-button slot="trailing" iconname="more_vertical" flavor="text"></zeta-icon-button
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
        ><zeta-icon-button slot="trailing" iconname="more_vertical" flavor="text"></zeta-icon-button
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
