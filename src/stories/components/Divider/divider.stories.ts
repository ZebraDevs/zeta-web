import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import type { ZetaDivider } from "../../../components/divider/divider";
import "../../../components/divider/divider";

const meta: Meta<ZetaDivider> = {
  component: "zeta-divider",
  title: "Components/Divider",
  args: {
    orientation: "horizontal"
  },
  argTypes: {
    orientation: {
      options: ["horizontal", "vertical"]
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2152-8803"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Divider: StoryObj<ZetaDivider> = {
  render: ({ orientation }) => {
    const style = orientation === "vertical" ? "height: 40px" : "width: 320px";
    return html`<zeta-divider style=${style} orientation=${orientation}></zeta-divider>`;
  }
};
