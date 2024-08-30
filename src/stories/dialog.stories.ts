import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ZetaDialog } from "../components/dialog/dialog.js";
import "../components/dialog/dialog.js";
import "../components/button/button.js";

import { ZetaIconNameList } from "@zebra-fed/zeta-icons";

const meta: Meta<ZetaDialog | { confirm: string; cancel: string; other: string; icon?: String; "--icon-color": String }> = {
  component: "zeta-dialog",
  title: "Dialog",
  tags: ["autodocs"],
  args: {
    centered: false,
    rounded: false,
    title: "Title",
    slot: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusm od tempor incididunt ut labore et do lore magna aliquaa met, conse ctetur adipisc.",
    confirm: "Confirm",
    cancel: "Cancel",
    other: "Learn more",
    icon: "warning"
  },
  argTypes: {
    initialOpen: {
      table: { disable: true }
    },
    open: {
      table: { disable: true }
    },
    icon: {
      options: [null, ...ZetaIconNameList],
      control: { type: "select" }
    },
    "--icon-color": { control: "color" }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=23144-119557&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export const Dialog: StoryObj = {
  name: "Dialog preview",

  render: args => {
    return html`
      <style>
        :root {
          ${args["--icon-color"] && `--icon-color: ${args["--icon-color"]}`} ;
        }
      </style>
      <div class="box">
        <zeta-dialog id="dialog1" .rounded=${args.rounded} .centered=${args.centered} .initialOpen=${true} title=${args.title}>
          ${args.slot} ${args.icon ? html`<zeta-icon slot="icon">${args.icon}</zeta-icon>` : nothing}
          ${args.confirm && args.confirm.length > 0 ? html`<zeta-button slot="confirm">${args.confirm}</zeta-button>` : nothing}
          ${args.cancel && args.cancel.length > 0 ? html`<zeta-button slot="cancel">${args.cancel}</zeta-button>` : nothing}
          ${args.other && args.other.length > 0 ? html`<zeta-button slot="other">${args.other}</zeta-button>` : nothing}
        </zeta-dialog>
      </div>
    `;
  }
};

export default meta;
