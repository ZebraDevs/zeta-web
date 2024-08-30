import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ZetaButton } from "../../components/button/button.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import "../../components/icon/icon.js";

const meta: Meta<ZetaButton> = {
  title: "Buttons",
  component: "zeta-button",
  args: {
    disabled: false,
    flavor: "primary",
    name: "",
    rounded: true,
    slot: "Button Name",
    type: undefined,
    value: ""
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=23126-110945&mode=design&t=lGrwQ4pCwYESXz6b-4"
    },
    status: {
      type: "needsAttention"
    }
  },
  argTypes: {
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
    },
    leading: {
      options: [null, ...ZetaIconNameList],
      control: { type: "select" }
    },
    trailing: {
      options: [null, ...ZetaIconNameList],
      control: { type: "select" }
    }
  }
};
export default meta;

export const Button: StoryObj<ZetaButton> = {
  render: args =>
    html`<zeta-button size=${args.size} .disabled=${args.disabled} .rounded=${args.rounded} flavor=${args.flavor}>
      ${args.leading && args.leading.length > 1 ? html`<zeta-icon slot="leadingIcon">${args.leading}</zeta-icon>` : nothing}${args.slot}
      ${args.trailing && args.trailing.length > 1 ? html`<zeta-icon slot="trailingIcon">${args.trailing}</zeta-icon>` : nothing}
    </zeta-button> `
};
