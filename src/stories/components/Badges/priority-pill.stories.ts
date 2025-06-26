import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaPriorityPill } from "../../../components/badges/priority-pill/priority-pill.js";
import { spreadGenerator } from "../../utils.js";
import { html } from "lit";

const spread = spreadGenerator(ZetaPriorityPill);

const meta: Meta<ZetaPriorityPill> = {
  title: "Components/Badges",
  component: "zeta-priority-pill",
  args: {
    rounded: true,
    status: "urgent",
    type: "lozenge",
    size: "large"
  },
  argTypes: {
    status: {
      options: ["urgent", "high", "medium", "low"],
      control: { type: "inline-radio" }
    },
    size: {
      options: ["small", "large"],
      control: { type: "inline-radio" }
    },
    type: {
      options: ["badge", "lozenge"],
      control: { type: "inline-radio" }
    },
    slot: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21931-2105&mode=design&t=j9Cv98TDx5BKLbgS-4"
    },
    status: {
      type: "ready"
    }
  }
};
export default meta;

export const PriorityPill: StoryObj = {
  render: args => {
    return html`
      <style>
        zeta-priority-pill {
          ${args["--priority-pill-index-background-color"] && html`--priority-pill-index-background-color: ${args["--priority-pill-index-background-color"]}`};
          ${args["--priority-pill-index-text-color"] && html`--priority-pill-index-text-color: ${args["--priority-pill-index-text-color"]}`};
          ${args["--priority-pill-text-color"] && html`--priority-pill-text-color: ${args["--priority-pill-text-color"]}`};
          ${args["--priority-pill-background-color"] && html`--priority-pill-background-color: ${args["--priority-pill-background-color"]}`};
        }
      </style>
      <zeta-priority-pill ${spread(args)}> </zeta-priority-pill>
    `;
  }
};
