import { Meta, StoryObj } from "@storybook/web-components";
import { ZetaAccordion } from "../index.js";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

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
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=229-3"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const Accordion: StoryObj<ZetaAccordion> = {
  render: args => {
    return html`<zeta-accordion
      accordionTitle=${ifDefined(args.accordionTitle)}
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
