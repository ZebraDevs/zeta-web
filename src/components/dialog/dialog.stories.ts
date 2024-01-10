import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaDialog } from "./dialog.js";
import { html } from "lit";
import "./dialog.js";
import "../button/button.js";

const meta: Meta<ZetaDialog> = {
  component: "zeta-dialog",
  args: {
    centered: false,
    rounded: false,
    condensed: false
  }
};

export const Dialog: StoryObj<ZetaDialog> = {
  name: "Dialog without icon",
  render: args => {
    return html`
      <zeta-button
        @click=${() => {
          const dialog = document.querySelector("#dialog") as ZetaDialog;
          dialog.show();
        }}
      >
        dialog without icon
      </zeta-button>
      <zeta-dialog id="dialog" .condensed=${args.condensed} .rounded=${args.rounded} .centered=${args.centered} title="Dialog title">
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
          const dialog = document.querySelector("#dialog") as ZetaDialog;
          dialog.show();
        }}
      >
        dialog with icon
      </zeta-button>
      <zeta-dialog has-icon id="dialog" .condensed=${args.condensed} .rounded=${args.rounded} .centered=${args.centered} title="Dialog title">
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
          const dialog = document.querySelector("#dialog") as ZetaDialog;
          dialog.show();
        }}
      >
        dialog with two buttons
      </zeta-button>
      <zeta-dialog has-icon id="dialog" .condensed=${args.condensed} .rounded=${args.rounded} .centered=${args.centered} title="Dialog title">
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
          const dialog = document.querySelector("#dialog") as ZetaDialog;
          dialog.show();
        }}
      >
        dialog with one button
      </zeta-button>
      <zeta-dialog has-icon id="dialog" .condensed=${args.condensed} .rounded=${args.rounded} .centered=${args.centered} title="Dialog title">
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
