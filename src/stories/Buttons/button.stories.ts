import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaButton } from "../../components/button/button.js";
import "../../components/icon/icon.js";

const meta: Meta<ZetaButton> = {
  component: "zeta-button",
  title: "Buttons",
  args: {
    disabled: false,
    flavor: "primary",
    name: "",
    rounded: true,
    slot: "Button",
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
    }
  }
};
export default meta;

export const ButtonWithText: StoryObj<ZetaButton> = {
  render: args => html`<zeta-button size=${args.size} .disabled=${args.disabled} .rounded=${args.rounded} flavor=${args.flavor}>
    ${args.slot}
  </zeta-button> `
};
export const ButtonWithIconAndText: StoryObj<ZetaButton> = {
  render: args => html`<zeta-button size=${args.size} .disabled=${args.disabled} .rounded=${args.rounded} flavor=${args.flavor}>
    <zeta-icon .rounded=${args.rounded}>star</zeta-icon>
    ${args.slot}
  </zeta-button> `
};

/*const ButtonWithAvatarAndIcon: StoryObj = {
  args: {
    trailingIcon: false
  },
  render: args => {
    return html`<zeta-button
      text=${args.text}
      type=${args.type}
      shape=${args.shape}
      size=${args.size}
      .disabled=${args.disabled}
      .trailingIcon=${args.trailingIcon}
      .onClick=${args.onClick}
      name=${args.name}
    >
      <zeta-avatar></zeta-avatar>
      Hi Ben
    </zeta-button>`;
  }
};*/