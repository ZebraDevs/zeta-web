import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaFilterChip } from "../../../components/chips/filter-chip/filter-chip.js";
import { html } from "lit";
import { fn } from "@storybook/test";

const meta: Meta<ZetaFilterChip> = {
  component: "zeta-filter-chip",
  title: "Components/Chips",
  args: {
    active: false,
    rounded: false,
    slot: "Chip",
    disabled: false,
    onchange: fn()
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21265-14112&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const FilterChip: StoryObj<ZetaFilterChip> = {
  render: ({ slot, onchange, ...args }) =>
    html`<zeta-filter-chip ?disabled=${args.disabled} @change=${onchange} ?rounded=${args.rounded} ?active=${args.active}> ${slot} </zeta-filter-chip>`
};
