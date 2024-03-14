import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaAccordion } from "../index.js";
import { html } from "lit";

const meta: Meta<ZetaAccordion> = {
  component: "zeta-accordion",
  title: "Accordion",
  tags: ["autodocs"],
  args: {
    accordionTitle: "Title",
    disabled: false,
    open: false,
    rounded: false,
    contained: false
  },
  argTypes: {}
};

export default meta;

export const Accordion: StoryObj<ZetaAccordion> = {
  render: args => {
    return html`<zeta-accordion
      accordionTitle=${args.accordionTitle}
      .disabled=${args.disabled}
      .open=${args.open}
      .rounded=${args.rounded}
      .contained=${args.contained}
    >
      <li>Item one</li>
      <li>Item two</li>
      <li>Item three</li>
      <li>Item four</li>
    </zeta-accordion>`;
  }
};

