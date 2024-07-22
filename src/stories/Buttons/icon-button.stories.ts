import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ZetaIconButton } from "../../components/button/icon-button/icon-button.js";
import { html } from "lit";

const meta: Meta<ZetaIconButton> = {
  title: "Buttons",
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

export const IconButton: StoryObj<ZetaIconButton> = {
  render: ({ slot, ...args }) => {
    return html`<zeta-icon-button size=${args.size} .disabled=${args.disabled} .rounded=${args.rounded} flavor=${args.flavor}>${slot}</zeta-icon-button>`;
  }
};
