import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaFilterChip } from "../../../components/chips/filter-chip/filter-chip.js";
import { html } from "lit";
import { fn } from "@storybook/test";
import { dragReorder } from "./drag-reorder.js";

const meta: Meta<ZetaFilterChip> = {
  component: "zeta-filter-chip",
  title: "Components/Chips",
  args: {
    active: false,
    rounded: false,
    slot: "Chip",
    disabled: false,
    draggable: false,
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
    html`<zeta-filter-chip ?disabled=${args.disabled} ?draggable=${args.draggable} @change=${onchange} ?rounded=${args.rounded} ?active=${args.active}>
      ${slot}
    </zeta-filter-chip>`
};

/** Drag the chips to reorder them. The chips only provide the drag source; the reordering here is handled by the story, as an app would. The disabled chip can't be dragged. */
export const DraggableFilterChips: StoryObj<ZetaFilterChip> = {
  render: ({ onchange, ...args }) => {
    const reorder = dragReorder("zeta-filter-chip");
    return html`<div style="display: flex; gap: 8px; flex-wrap: wrap" @dragstart=${reorder.dragstart} @dragover=${reorder.dragover} @drop=${reorder.drop}>
      ${["Fruit", "Vegetables", "Dairy", "Bakery"].map(
        (label, i) => html`<zeta-filter-chip draggable ?rounded=${args.rounded} ?active=${i === 1} @change=${onchange}>${label}</zeta-filter-chip>`
      )}
      <zeta-filter-chip draggable disabled ?rounded=${args.rounded}>Frozen</zeta-filter-chip>
    </div>`;
  }
};
