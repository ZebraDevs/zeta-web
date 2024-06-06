import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaButton } from "../../components/button/button.js";

const meta: Meta<ZetaButton> = {
  title: "Buttons",
  component: "zeta-button",
  args: {
    flavor: "primary",
    disabled: false,
    rounded: true,
    name: "",
    slot: "Button",
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
  render: args => html` <zeta-button size=${args.size} .disabled=${args.disabled} .rounded=${args.rounded} flavor=${args.flavor}>${args.slot}</zeta-button> `
};

export const ButtonWithTextAndIcon: StoryObj = {
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
      <svg slot="icon" viewBox="0 0 48 48">
        <path
          d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z"
        />
      </svg>
    </zeta-button>`;
  }
};
