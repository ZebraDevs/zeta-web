import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaDialog } from "../index.js";

const meta: Meta<ZetaDialog> = {
  component: "zeta-dialog",
  title: "Dialog",
  tags: ["autodocs"],
  args: {
    centered: false,
    rounded: false
  }
};

export const Dialog: StoryObj<ZetaDialog> = {
  name: "Dialog without icon",
  args: {
    initialOpen: true
  },
  render: args => {
    return html`
      <zeta-dialog id="dialog1" .rounded=${args.rounded} .centered=${args.centered} .initialOpen=${args.initialOpen} title="Dialog title">
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

export const DialogWithoutIcon: StoryObj<ZetaDialog> = {
  name: "Dialog without icon",
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

