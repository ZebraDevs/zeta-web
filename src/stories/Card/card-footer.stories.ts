import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaCardFooter } from "../../index.js";

const meta: Meta<ZetaCardFooter> = {
  title: "Cards",
  component: "zeta-card-footer",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/zzzpriTQpJKlW4gB5Fn3bF/Design-System-Sprint-3?type=design&node-id=1197-29400&mode=design&t=w4IloFPD61aGcU37-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const FooterOneAction: StoryObj<ZetaCardFooter> = {
  render: () =>
    html`<zeta-card-footer>
      <zeta-button>Button</zeta-button>
    </zeta-card-footer>`
};

export const FooterTwoActions: StoryObj<ZetaCardFooter> = {
  render: () =>
    html`<zeta-card-footer>
      <zeta-button flavor="outline">Button</zeta-button>
      <zeta-button>Button</zeta-button>
    </zeta-card-footer>`
};

export const FooterOneActionLeft: StoryObj<ZetaCardFooter> = {
  render: () =>
    html`<zeta-card-footer>
      <zeta-button flavor="text">Button</zeta-button>
    </zeta-card-footer>`
};
