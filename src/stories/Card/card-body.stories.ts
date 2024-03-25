import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaCardBody } from "../../index.js";

const meta: Meta<ZetaCardBody> = {
  title: "Cards",
  component: "zeta-card-body",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/zzzpriTQpJKlW4gB5Fn3bF/Design-System-Sprint-3?type=design&node-id=1197-30562&mode=design&t=w4IloFPD61aGcU37-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const Body: StoryObj<ZetaCardBody> = {
  render: () =>
    html`<zeta-card-body
      >Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusm od tempor incididunt ut labore et do lore magna aliqua.</zeta-card-body
    >`
};

