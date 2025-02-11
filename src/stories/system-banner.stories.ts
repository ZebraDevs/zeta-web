import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaSystemBanner } from "../components/system-banner/system-banner.js";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { ZetaIconNameList, type ZetaIconName } from "@zebra-fed/zeta-icons";
import "../components/system-banner/system-banner.js";

const meta: Meta<ZetaSystemBanner | { leadingIcon: ZetaIconName; trailingIcon: ZetaIconName }> = {
  title: "System Banner",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=229-12"
    },
    status: {
      type: "ready"
    }
  },
  component: "zeta-system-banner",
  args: {
    text: "Banner title",
    align: "center",
    status: "default",
    rounded: true,
    leadingIcon: "star",
    trailingIcon: "star"
  },
  argTypes: {
    status: {
      options: ["default", "positive", "warning", "negative"],
      control: {
        type: "select"
      }
    },
    align: {
      options: ["center", "start"],
      control: { type: "radio" }
    },
    leadingIcon: { options: [null, ...ZetaIconNameList], control: { type: "select" } },
    trailingIcon: { options: [null, ...ZetaIconNameList], control: { type: "select" } }
  }
};
export default meta;

export const Banner: StoryObj = {
  argTypes: {
    slot: { table: { disable: true } }
  },
  render: args =>
    html`<zeta-system-banner align=${ifDefined(args.align)} status=${ifDefined(args.status)} text=${ifDefined(args.text)} .rounded=${args.rounded}>
      ${args.leadingIcon && args.leadingIcon.length > 1 ? html`<zeta-icon slot="leadingIcon">${args.leadingIcon}</zeta-icon>` : nothing}
      ${args.trailingIcon && args.trailingIcon.length > 1 ? html`<zeta-icon slot="trailingIcon">${args.trailingIcon}</zeta-icon>` : nothing}
    </zeta-system-banner>`
};
