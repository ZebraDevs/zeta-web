import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ZetaDialog } from "../../components/dialog/dialog.js";
import { fn } from "@storybook/test";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";

const meta: Meta<
  Omit<ZetaDialog, "icon"> & {
    confirm: string;
    cancel: string;
    other: string;
    flavor: "info" | "success" | "warning" | "error" | "default";
    confirmButtonFlavor: "primary" | "positive" | "negative";
    showLeadingIcon: boolean;
    leadingIcon: string;
    "--icon-color": String;
    onOpen: () => void;
    onClose: () => void;
    onCancel: () => void;
  }
> = {
  component: "zeta-dialog",
  title: "Components/Dialog",
  tags: ["autodocs"],
  args: {
    rounded: false,
    title: "Dialog Title",
    slot: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusm od tempor incididunt ut labore et do lore magna aliquaa met, conse ctetur adipisc.",
    confirm: "Button",
    cancel: "Button",
    other: "Button",
    flavor: "default",
    confirmButtonFlavor: "primary",
    onOpen: fn(),
    onClose: fn(),
    onCancel: fn(),
    closeOnBarrierClicked: true,
    showLeadingIcon: true
  },
  argTypes: {
    initialOpen: {
      table: { disable: true }
    },
    open: {
      table: { disable: true }
    },
    flavor: {
      options: ["default", "info", "success", "warning", "error"],
      control: { type: "select" }
    },
    confirmButtonFlavor: {
      options: ["primary", "positive", "negative"],
      control: { type: "select" }
    },
    leadingIcon: {
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
      type: "ready"
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
        <zeta-dialog
          id="dialog1"
          .rounded=${args.rounded}
          .initialOpen=${true}
          .title=${args.title}
          .flavor=${args.flavor}
          .confirmButtonFlavor=${args.confirmButtonFlavor}
          .showLeadingIcon=${args.showLeadingIcon}
          .leadingIcon=${args.leadingIcon}
          @open=${args.onOpen}
          @close=${args.onClose}
          @cancel=${args.onCancel}
        >
          ${args.slot} ${html`<zeta-icon slot="icon">${args.icon || "block"}</zeta-icon>`}
          ${args.confirm && args.confirm.length > 0 ? html`<zeta-button slot="confirm">${args.confirm}</zeta-button>` : nothing}
          ${args.cancel && args.cancel.length > 0 ? html`<zeta-button slot="cancel">${args.cancel}</zeta-button>` : nothing}
          ${args.other && args.other.length > 0 ? html`<zeta-button slot="other">${args.other}</zeta-button>` : nothing}
        </zeta-dialog>
      </div>
    `;
  }
};

export const DialogOpen: StoryObj = {
  name: "Trigger Dialog Opening",

  render: args => {
    return html`
      <style>
        :root {
          ${args["--icon-color"] && `--icon-color: ${args["--icon-color"]}`} ;
        }
      </style>
      <div class="box">
        <zeta-button
          @click=${() => {
            (document.querySelector("#dialog1") as ZetaDialog)?.hide();
            (document.querySelector("#dialog1") as ZetaDialog)?.showModal();
          }}
        >
          <zeta-icon>open</zeta-icon>Open Dialog as Modal</zeta-button
        >
        <zeta-button
          @click=${() => {
            (document.querySelector("#dialog1") as ZetaDialog)?.hide();
            (document.querySelector("#dialog1") as ZetaDialog)?.show();
          }}
        >
          <zeta-icon>open</zeta-icon>Open Dialog</zeta-button
        >
        <zeta-dialog
          id="dialog1"
          .rounded=${args.rounded}
          .title=${args.title}
          .flavor=${args.flavor}
          .confirmButtonFlavor=${args.confirmButtonFlavor}
          .showLeadingIcon=${args.showLeadingIcon}
          .leadingIcon=${args.leadingIcon}
          @open=${args.onOpen}
          @close=${args.onClose}
          @cancel=${args.onCancel}
          .closeOnBarrierClicked=${args.closeOnBarrierClicked}
        >
          ${args.slot} ${html`<zeta-icon slot="icon">${args.icon || "block"}</zeta-icon>`}
          ${args.confirm && args.confirm.length > 0 ? html`<zeta-button slot="confirm">${args.confirm}</zeta-button>` : nothing}
          ${args.cancel && args.cancel.length > 0 ? html`<zeta-button slot="cancel">${args.cancel}</zeta-button>` : nothing}
          ${args.other && args.other.length > 0 ? html`<zeta-button slot="other">${args.other}</zeta-button>` : nothing}
        </zeta-dialog>
      </div>
    `;
  }
};

export default meta;
