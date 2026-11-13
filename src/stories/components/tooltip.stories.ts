import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaTooltip } from "../../components/tooltip/tooltip.js";
import { html } from "lit";

const meta: Meta<ZetaTooltip> = {
  component: "zeta-tooltip",
  tags: ["autodocs"],
  title: "Components/Tooltip",
  args: {
    point: "bottom",
    rounded: true,
    slot: "Label"
  },
  argTypes: {
    point: {
      options: ["left", "right", "bottom", "top"],
      control: { type: "inline-radio" }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=5508-57"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Tooltip: StoryObj = {
  render: args => {
    return html` <zeta-tooltip .point=${args.point} .rounded=${args.rounded}> ${args.slot} </zeta-tooltip>`;
  }
};
