import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaButton } from "../index.js";

const meta: Meta<ZetaButton> = {
  component: "zeta-button",
  args: {
    disabled: false,
    rounded: true
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"], //TODO: Get values from Size type?
      control: {
        type: "select"
      }
    },
    flavor: {
      options: ["primary", "secondary", "positive", "negative", "outline", "outline-subtle", "text"], //TODO: Get values from ButtonFlavor type?
      control: {
        type: "select"
      }
    }
  }
};
export default meta;

export const ButtonWithText: StoryObj<ZetaButton> = {
  render: args => html` <zeta-button size=${args.size} .disabled=${args.disabled} .rounded=${args.rounded} flavor=${args.flavor}>Button</zeta-button> `
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

