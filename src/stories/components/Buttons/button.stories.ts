import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaButton } from "../../../components/button/button.js";
import "../../../components/button/base-button.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { fn } from "@storybook/test";
import "../../../components/icon/icon.js";
import { spreadGenerator } from "../../utils.js";
import { ShapeList } from "../../../mixins/contourable-three.js";

const spread = spreadGenerator(ZetaButton);

const meta: Meta<ZetaButton> = {
  title: "Components/Buttons",
  component: "zeta-button",
  args: {
    disabled: false,
    flavor: "primary",
    name: "",
    shape: "rounded",
    slot: "Button",
    type: undefined,
    value: "",
    onclick: fn()
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=23126-110945&mode=design&t=lGrwQ4pCwYESXz6b-4"
    },
    status: {
      type: "ready"
    }
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: {
        type: "select"
      }
    },
    shape: {
      options: ShapeList,
      control: { type: "inline-radio" }
    },
    type: {
      options: ["button", "submit", "reset"],
      control: {
        type: "select"
      }
    },
    flavor: {
      options: ["primary", "positive", "negative", "outline", "outline-subtle", "text"],
      control: {
        type: "select"
      }
    },
    leadingIcon: {
      options: [null, ...ZetaIconNameList],
      control: { type: "select" }
    },
    trailingIcon: {
      options: [null, ...ZetaIconNameList],
      control: { type: "select" }
    }
  }
};
export default meta;

export const Button: StoryObj = {
  render: args => html`<zeta-button ${spread(args)}>${args.slot}</zeta-button>`
};
