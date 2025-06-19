import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaFab } from "../../../components/fab/fab.js";
import "../../../components/icon/icon.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { spreadGenerator } from "../../utils.js";

const spread = spreadGenerator(ZetaFab);

const meta: Meta<ZetaFab> = {
  component: "zeta-fab",
  title: "Components/Fabs",
  args: {
    disabled: false,
    flavor: "primary",
    name: "",
    slot: "add",
    type: undefined,
    value: "",
    label: "Label",
    rounded: "true",
    size: "small",
    extended: false
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21816-4283&m=dev&t=lGrwQ4pCwYESXz6b-4"
    },
    status: {
      type: "ready"
    }
  },
  argTypes: {
    rounded: {
      control: { type: "select" },
      options: ["true", "false", "full"]
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
      options: ["primary", "secondary", "inverse"],
      control: {
        type: "inline-radio"
      },
      description:
        "The flavor of the button. \n * Primary - blue background. \n * Secondary - yellow background. \n * Inverse - black/white background. \n\n Ignore options below."
    }
  }
};

export default meta;

export const Fab: StoryObj = {
  render: args => html`<zeta-fab ${spread(args)}> ${args.slot} </zeta-fab> `
};

export const ExtendedFab: StoryObj = {
  args: {
    extended: true
  },

  render: args => html`<zeta-fab ${spread(args)}> ${args.slot} </zeta-fab> `
};

export const FabSecondary: StoryObj = {
  args: {
    flavor: "secondary"
  },
  argTypes: {
    flavor: { table: { disable: true } }
  },
  render: args => html`<zeta-fab ${spread(args)}> ${args.slot} </zeta-fab> `
};

export const FabInverse: StoryObj = {
  args: {
    flavor: "inverse"
  },
  argTypes: {
    flavor: { table: { disable: true } }
  },
  render: args => html` <zeta-fab ${spread(args)}> ${args.slot} </zeta-fab> `
};
