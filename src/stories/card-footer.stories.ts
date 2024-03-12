import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
import { ZetaCardFooter } from "../index.js";

const meta: Meta<ZetaCardFooter> = {
  component: "zeta-card-footer"
};

export default meta;

export const OneAction: StoryObj<ZetaCardFooter> = {
  render: () =>
    html`<zeta-card-footer>
      <zeta-button>Button</zeta-button>
    </zeta-card-footer>`
};

export const TwoActions: StoryObj<ZetaCardFooter> = {
  render: () =>
    html`<zeta-card-footer>
      <zeta-button flavor="outline">Button</zeta-button>
      <zeta-button>Button</zeta-button>
    </zeta-card-footer>`
};

export const OneActionLeft: StoryObj<ZetaCardFooter> = {
  render: () =>
    html`<zeta-card-footer>
      <zeta-button flavor="text">Button</zeta-button>
    </zeta-card-footer>`
};

