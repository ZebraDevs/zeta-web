import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaFab } from "../../components/fab/fab.js";
import "../../components/icon/icon.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";

const staticArgTypes = {
  disabled: { table: { disable: true } },
  flavor: { table: { disable: true } },
  name: { table: { disable: true } },
  slot: { table: { disable: true } },
  type: { table: { disable: true } },
  value: { table: { disable: true } },
  label: { table: { disable: true } },
  round: { table: { disable: true } },
  size: { table: { disable: true } },
  extended: { table: { disable: true } }
};

const meta: Meta<ZetaFab> = {
  component: "zeta-fab",
  title: "Fabs",
  args: {
    disabled: false,
    flavor: "primary",
    name: "",
    slot: "add",
    type: undefined,
    value: "",
    label: "Label",
    round: true,
    size: "small",
    extended: false
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21816-4283&m=dev&t=lGrwQ4pCwYESXz6b-4"
    },
    status: {
      type: "needsAttention"
    }
  },
  argTypes: {
    rounded: {
      table: { disable: true }
    },
    tabIndex: {
      table: { disable: true }
    },
    slot: {
      options: ZetaIconNameList,
      control: { type: "select" }
    },
    size: {
      options: ["small", "large"],
      control: {
        type: "inline-radio"
      }
    },
    type: {
      options: ["button", "submit", "reset"],
      control: {
        type: "select"
      }
    },
    flavor: {
      options: ["primary", "variant", "inverse"],
      control: {
        type: "inline-radio"
      },
      description:
        "The flavor of the button. \n * Primary - blue background. \n * Varient - yellow background. \n * Inverse - black/white background. \n\n Ignore options below."
    },
    round: {
      options: ["full", true, false],
      control: {
        type: "inline-radio"
      }
    }
  }
};

export default meta;

export const Fab: StoryObj<ZetaFab> = {
  render: args =>
    html`<zeta-fab
      .extended=${args.extended}
      label=${args.label}
      size=${args.size}
      .disabled=${args.disabled}
      round=${args.round}
      flavor=${args.flavor}
      name=${ifDefined(args.name)}
      value=${ifDefined(args.value)}
      type=${ifDefined(args.type)}
    >
      ${args.slot}
    </zeta-fab> `
};

export const ExtendedFab: StoryObj<ZetaFab> = {
  args: {
    extended: true
  },
  argTypes: {
    size: { table: { disable: true } }
  },
  render: args =>
    html`<zeta-fab
      .extended=${args.extended}
      label=${args.label}
      .disabled=${args.disabled}
      round=${args.round}
      flavor=${args.flavor}
      name=${ifDefined(args.name)}
      value=${ifDefined(args.value)}
      type=${ifDefined(args.type)}
    >
      ${args.slot}
    </zeta-fab> `
};

export const FabVariant: StoryObj<ZetaFab> = {
  argTypes: staticArgTypes,
  render: args =>
    html`<div style="display: flex; justify-content: space-around;flex-wrap: wrap; gap: 30px;">
      <zeta-fab .extended=${args.extended} label=${args.label} size=${args.size} .disabled=${args.disabled} round=${args.round} flavor="variant">
        ${args.slot}
      </zeta-fab>
      <zeta-fab ?extended=${true} label=${args.label} size=${args.size} .disabled=${args.disabled} round=${args.round} flavor="variant">
        ${args.slot}
      </zeta-fab>
    </div> `
};

export const FabInverse: StoryObj<ZetaFab> = {
  argTypes: staticArgTypes,
  render: args =>
    html`<div style="display: flex; justify-content: space-around;flex-wrap: wrap; gap: 30px;">
      <zeta-fab .extended=${args.extended} label=${args.label} size=${args.size} .disabled=${args.disabled} round=${args.round} flavor="inverse">
        ${args.slot}
      </zeta-fab>
      <zeta-fab ?extended=${true} label=${args.label} size=${args.size} .disabled=${args.disabled} round=${args.round} flavor="inverse">
        ${args.slot}
      </zeta-fab>
    </div> `
};
