import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ZetaIconButton } from "../../components/button/icon-button/icon-button.js";
import { spreadGenerator } from "../utils.js";
import { html } from "lit";
const spread = spreadGenerator(ZetaIconButton);

const meta: Meta<ZetaIconButton> = {
  title: "Components/Buttons",
  component: "zeta-icon-button",
  args: {
    disabled: false,
    flavor: "primary",
    name: "",
    rounded: true,
    slot: "star",
    type: undefined,
    value: ""
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=23126-110314&mode=design&t=lGrwQ4pCwYESXz6b-4"
    },
    status: {
      type: "needsAttention"
    }
  },
  argTypes: {
    slot: {
      options: ZetaIconNameList,
      control: {
        type: "select"
      },
      type: "string"
    },
    size: {
      options: ["small", "medium", "large"],
      control: {
        type: "select"
      }
    },
    type: {
      options: ["button", "submit", "reset"],
      control: {
        type: "select"
      }
    },
    flavor: {
      options: ["primary", "secondary", "positive", "negative", "outline", "outline-subtle", "text"],
      control: {
        type: "select"
      }
    }
  }
};

export default meta;

export const IconButton: StoryObj = {
  render: ({ slot, ...args }) => {
    return html`
      <style>
        :root {
          ${args["--icon-button-color"] && `--icon-button-color: ${args["--icon-button-color"]}`} ;
          ${args["--icon-button-icon-color"] && `--icon-button-icon-color: ${args["--icon-button-icon-color"]}`} ;
          ${args["--icon-button-icon-color-disabled"] && `--icon-button-icon-color-disabled: ${args["--icon-button-icon-color-disabled"]}`} ;
        }
      </style>
      <zeta-icon-button ${spread(args)}>${slot}</zeta-icon-button>
    `;
  }
};
