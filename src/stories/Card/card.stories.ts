import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { ZetaCard } from "../../components/card/card.js";
import "../../components/card/card-body/card-body.js";
import "../../components/card/card-footer/card-footer.js";
import "../../components/card/card-header/card-header.js";
import "../../components/button/icon-button/icon-button.js";
import "../../components/button/button.js";
import "../../components/icon/icon.js";

const meta: Meta<ZetaCard | any> = {
  component: "zeta-card",
  title: "Cards",
  args: {
    rounded: true
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/zzzpriTQpJKlW4gB5Fn3bF/Design-System-Sprint-3?type=design&node-id=2379-71025&mode=design&t=w4IloFPD61aGcU37-4"
    },
    status: {
      type: "designPending"
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
  padding: "var(--spacing-8xl)",
  "--icon-size": "48px",
  "--icon-color": "var(--main-subtle)"
});

const placeholderImg = html`<div style=${placeholderStyle}>
  <zeta-icon>image</zeta-icon>
</div>`;

const cardBody = html`<zeta-card-body>
  Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusm od tempor incididunt ut labore et do lore magna aliqua.
</zeta-card-body>`;

export const CardWithHeader: StoryObj = {
  render: args => html`
    <style>
       :root {
        ${args["--card-border-color"] && `--card-border-color: ${args["--card-border-color"]}`} ;
        ${args["--card-border-size"] && `--card-border-size: ${args["--card-border-size"]}`} ;
      }
    </style>
    <zeta-card .rounded=${args.rounded}>
      <zeta-card-header headline="Headline" subHeadline="Subhead">
        <zeta-icon-button slot="trailing" flavor="text">more_vertical</zeta-icon-button>
      </zeta-card-header>
      ${placeholderImg} ${cardBody}
      <zeta-card-footer>
        <zeta-button>Button</zeta-button>
      </zeta-card-footer>
    </zeta-card>
  `
};

export const CardWithTwoActions: StoryObj = {
  render: args => html`
    <style>
       :root {
        ${args["--card-border-color"] && `--card-border-color: ${args["--card-border-color"]}`} ;
        ${args["--card-border-size"] && `--card-border-size: ${args["--card-border-size"]}`} ;
      }
    </style>
    <zeta-card .rounded=${args.rounded}>
      <zeta-card-header headline="Headline" subHeadline="Subhead">
        <zeta-icon-button slot="trailing" flavor="text">more_vertical</zeta-icon-button>
      </zeta-card-header>
      ${placeholderImg} ${cardBody}
      <zeta-card-footer>
        <zeta-button flavor="outline">Button</zeta-button>
        <zeta-button>Button</zeta-button>
      </zeta-card-footer>
    </zeta-card>
  `
};

export const CardWithOneActionLeft: StoryObj = {
  render: args => html`
    <style>
       :root {
        ${args["--card-border-color"] && `--card-border-color: ${args["--card-border-color"]}`} ;
        ${args["--card-border-size"] && `--card-border-size: ${args["--card-border-size"]}`} ;
      }
    </style>
    <zeta-card .rounded=${args.rounded}>
      <zeta-card-header headline="Headline" subHeadline="Subhead">
        <zeta-icon-button slot="trailing" flavor="text">more_vertical</zeta-icon-button>
      </zeta-card-header>
      ${placeholderImg} ${cardBody}
      <zeta-card-footer>
        <zeta-button flavor="text">Button</zeta-button>
      </zeta-card-footer>
    </zeta-card>
  `
};

export const CardWithTitle: StoryObj = {
  render: args => {
    return html`
      <style>
         :root {
          ${args["--card-border-color"] && `--card-border-color: ${args["--card-border-color"]}`} ;
          ${args["--card-border-size"] && `--card-border-size: ${args["--card-border-size"]}`} ;
        }
      </style>
      <zeta-card .rounded=${args.rounded}>
        ${placeholderImg}
        <zeta-card-header headline="Headline" subHeadline="Subhead"></zeta-card-header>
        ${cardBody}
        <zeta-card-footer>
          <zeta-button>Button</zeta-button>
        </zeta-card-footer>
      </zeta-card>
    `;
  }
};
