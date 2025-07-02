import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../components/illustration/illustration";
import { ZetaIllustration, ZetaIllustrationNamesList } from "../../../components/illustration/illustration.js";

const meta: Meta<ZetaIllustration> = {
  component: "zeta-illustration",
  title: "Assets/Illustration",
  tags: ["autodocs"],

  argTypes: {
    name: {
      options: ZetaIllustrationNamesList,
      control: { type: "select" }
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

type Story = StoryObj<ZetaIllustration>;

export const Illustrations: Story = {
  args: {
    name: "welcome"
  },
  render: args => html`<zeta-illustration name="${args.name}" style="width: 50%; height: 50%; display: inline-block"></zeta-illustration>`
};
