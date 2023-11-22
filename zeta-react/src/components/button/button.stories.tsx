import type { Meta, StoryObj } from "@storybook/react";
import { ZetaButton } from "./button.js";
import "../../index.js";
import React from "react";
const meta: Meta<typeof ZetaButton> = {
  component: ZetaButton,
  args: {
    condensed: false,
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
      options: ["primary", "negative", "outline", "primary-variant", "outline-subtle", "text", "text-inverse"], //TODO: Get values from ButtonFlavor type?
      control: {
        type: "select"
      }
    }
  }
};
export default meta;
export const ButtonWithText: StoryObj<typeof ZetaButton> = {
//TODO: This render method may need to change for react
  render: args => <ZetaButton {...args} >Button</ZetaButton>
  
};
export const ButtonWithTextAndIcon: StoryObj = {
  args: {
    trailingIcon: false
  },
//TODO: This render method may need to change for react
  render: args => {
    return <ZetaButton {...args} >
      <div slot="icon"><svg  viewBox="0 0 48 48">
        <path
          d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z"
        />
      </svg>
    </div></ZetaButton>;
  }
};