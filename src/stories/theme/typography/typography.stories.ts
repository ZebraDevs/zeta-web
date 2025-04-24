import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { typographyTypes } from "./typography-types";
const meta: Meta = {
  title: "Theme/Typography",
  args: {
    text: "Hello World",
    textStyle: "display-large",
    typeface: "IBM Plex Sans"
  },
  parameters: {
    figma: "https://www.figma.com/design/REjc5TauZb2EXYouaEKTYa/Zeta-Foundations?node-id=429-13438"
  },
  argTypes: {
    text: {
      control: { type: "text" }
    },
    textStyle: {
      control: { type: "select" },
      options: typographyTypes.map(type => type.cssVar)
    },
    typeface: {
      control: { type: "select" },
      options: ["IBM Plex Sans", "Comic Sans MS", "Arial", "Courier New", "Georgia", "Times New Roman"]
    }
  }
};

export default meta;

export const Typography: StoryObj<{ text: string; textStyle: string; typeface: string }> = {
  render: ({ ...args }) =>
    html` <style>
        :root {
          --type-family-regular: ${args.typeface};
        }
      </style>

      <p style="font: ${args.textStyle}">${args.text}</p>`
};
