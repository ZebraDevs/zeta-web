import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaCardBody } from "../index.js";

const meta: Meta<ZetaCardBody> = {
  component: "zeta-card-body"
};

export default meta;

export const CardBody: StoryObj<ZetaCardBody> = {
  render: () =>
    html`<zeta-card-body
      >Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusm od tempor incididunt ut labore et do lore magna aliqua.</zeta-card-body
    >`
};

