import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaDialog } from "../index.js";

const meta: Meta<ZetaDialog | { "has-icon": boolean }> = {
  component: "zeta-dialog",
  title: "Dialog",
  tags: ["autodocs"],
  args: {
    centered: false,
    rounded: false,
    title: "Title",
    "has-icon": true
  },
  argTypes: {
    initialOpen: {
      table: { disable: true }
    },
    open: {
      table: { disable: true }
    }
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
      <div class="box">
        <zeta-dialog id="dialog1" .rounded=${args.rounded} .centered=${args.centered} .initialOpen=${true} title=${args.title} ?has-icon=${args["has-icon"]}>
          <div slot="dialog-body">
            Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusm od tempor incididunt ut labore et do lore magna aliquaa met, conse ctetur
            adipisc.
          </div>
          <zeta-button slot="confirm">Confirm</zeta-button>
          <zeta-button slot="cancel">Cancel</zeta-button>
          <zeta-button slot="other">Learn more</zeta-button>
        </zeta-dialog>
      </div>
      <style>
        div.box {
          height: 280px;
        }
        @media (max-width: 1020px) {
          div.box {
            height: 400px;
          }
        }
      </style>
    `;
  }
};

export const DialogWithoutIcon: StoryObj = {
  name: "Dialog without icon",
  args: {
    "has-icon": false
  },
  render: args => {
    return html`
      <zeta-button
        @click=${() => {
          const dialog = document.querySelector("#dialog2") as ZetaDialog;
          void dialog.show();
        }}
      >
        dialog without icon
      </zeta-button>
      <zeta-dialog id="dialog2" .rounded=${args.rounded} .centered=${args.centered} title="Dialog title">
        <div slot="dialog-body">
          Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusm od tempor incididunt ut labore et do lore magna aliquaa met, conse ctetur
          adipisc.
        </div>
        <zeta-button slot="confirm">Confirm</zeta-button>
        <zeta-button slot="cancel">Cancel</zeta-button>
        <zeta-button slot="other">Learn more</zeta-button>
      </zeta-dialog>
    `;
  }
};

export const DialogWithIcon: StoryObj<ZetaDialog> = {
  name: "Dialog with icon",
  render: args => {
    return html`
      <zeta-button
        @click=${() => {
          const dialog = document.querySelector("#dialog3") as ZetaDialog;
          void dialog.show();
        }}
      >
        dialog with icon
      </zeta-button>
      <zeta-dialog has-icon id="dialog3" .rounded=${args.rounded} .centered=${args.centered} title="Dialog title">
        <div slot="dialog-body">
          Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusm od tempor incididunt ut labore et do lore magna aliquaa met, conse ctetur
          adipisc.
        </div>
        <zeta-button slot="confirm">Confirm</zeta-button>
        <zeta-button slot="cancel">Cancel</zeta-button>
        <zeta-button slot="other">Learn more</zeta-button>
      </zeta-dialog>
    `;
  }
};

export const DialogWith2Actions: StoryObj<ZetaDialog> = {
  name: "Dialog with two action buttons",
  render: args => {
    return html`
      <zeta-button
        @click=${() => {
          const dialog = document.querySelector("#dialog4") as ZetaDialog;
          void dialog.show();
        }}
      >
        dialog with two buttons
      </zeta-button>
      <zeta-dialog has-icon id="dialog4" .rounded=${args.rounded} .centered=${args.centered} title="Dialog title">
        <div slot="dialog-body">
          Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusm od tempor incididunt ut labore et do lore magna aliquaa met, conse ctetur
          adipisc.
        </div>
        <zeta-button slot="confirm">Confirm</zeta-button>
        <zeta-button slot="cancel">Cancel</zeta-button>
      </zeta-dialog>
    `;
  }
};

export const DialogWith1Action: StoryObj<ZetaDialog> = {
  name: "Dialog with one action button",
  render: args => {
    return html`
      <zeta-button
        @click=${() => {
          const dialog = document.querySelector("#dialog5") as ZetaDialog;
          void dialog.show();
        }}
      >
        dialog with one button
      </zeta-button>
      <zeta-dialog has-icon id="dialog5" .rounded=${args.rounded} .centered=${args.centered} title="Dialog title">
        <div slot="dialog-body">
          Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusm od tempor incididunt ut labore et do lore magna aliquaa met, conse ctetur
          adipisc.
        </div>
        <zeta-button slot="confirm">Confirm</zeta-button>
      </zeta-dialog>
    `;
  }
};

export default meta;
