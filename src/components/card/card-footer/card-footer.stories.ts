import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaCardFooter } from "./card-footer.js";
import { html } from "lit-html";
import "../../button/button.js";
import "./card-footer.js";

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
