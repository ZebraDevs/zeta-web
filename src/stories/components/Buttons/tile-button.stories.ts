import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaTileButton } from "../../../components/button/tile-button/tile-button";
import "../../../components/button/base-button.js";
import { spreadGenerator } from "../../utils.js";
import { html } from "lit";
import { fn } from "@storybook/test";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import "../../../components/icon/icon.js";

const spread = spreadGenerator(ZetaTileButton);

const meta: Meta<ZetaTileButton> = {
  title: "Components/Buttons",
  component: "zeta-tile-button",
  args: {
    disabled: false,
    name: "",
    shape: "rounded",
    slot: "Button",
    type: undefined,
    value: "",
    onclick: fn()
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=36355-10869"
    },
    status: {
      type: "ready"
    }
  },
  argTypes: {
    shape: {
      options: ["sharp", "rounded"],
      control: { type: "inline-radio" }
    },
    type: {
      options: ["button", "submit", "reset"],
      control: {
        type: "select"
      }
    },
    icon: {
      options: [null, ...ZetaIconNameList],
      control: { type: "select" }
    },
    flavor: { table: { disable: true } },
    size: { table: { disable: true } }
  }
};

export default meta;

export const TileButton: StoryObj = {
  render: ({ slot, ...args }) => {
    return html`<zeta-tile-button ${spread(args)}>${slot}</zeta-tile-button> `;
  }
};
