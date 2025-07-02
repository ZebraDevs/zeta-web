import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../components/illustration/illustration";
import { ZetaIllustration, ZetaIllustrationNamesList } from "../../../components/illustration/illustration.js";
import { spreadGenerator } from "../../utils";

const spread = spreadGenerator(ZetaIllustration);
const meta: Meta<ZetaIllustration> = {
  component: "zeta-illustration",
  title: "Assets/Illustration",
  tags: ["autodocs"],
  args: {
    basePath: "",
    name: "welcome"
  },
  argTypes: {
    name: {
      options: ZetaIllustrationNamesList,
      control: { type: "select" }
    },
    basePath: {
      table: { disable: true }
    },
    alt: {
      table: { disable: true }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/VQ7Aa3rDYB7mgpToI3bZ4D/%F0%9F%A6%93-ZDS---Assets?node-id=3439-3003"
    },
    status: {
      type: "ready"
    }
  }
};
export default meta;

export const Illustrations: StoryObj = {
  render: args => html` <zeta-illustration ${spread(args)} style="width: 50%; height: 50%; display: inline-block"></zeta-illustration> `
};
