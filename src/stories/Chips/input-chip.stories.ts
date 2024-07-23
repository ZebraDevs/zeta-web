import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaInputChip } from "../../components/chips/input-chip/input-chip.js";
import { html } from "lit";

const meta: Meta<ZetaInputChip> = {
  title: "Chips",
  component: "zeta-input-chip",
  args: {
    rounded: false,
    slot: "Label"
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21265-2159&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const InputChip: StoryObj<ZetaInputChip> = {
  render: args =>
    html`<zeta-input-chip ?rounded=${args.rounded} ?disabled=${args.disabled}
      ><zeta-avatar size="xs" slot="leading"></zeta-avatar> ${args.slot}</zeta-input-chip
    >`
};
