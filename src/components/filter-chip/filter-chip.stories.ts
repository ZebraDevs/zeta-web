import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaFilterChip } from "./filter-chip.js";
import "./filter-chip.js";

const meta: Meta<ZetaFilterChip> = {
  component: "zeta-filter-chip",
  args: {
    type: "unselected",
    rounded: false
  },
  argTypes: {
    type: { options: ["unselected", "selected"], control: { type: "inline-radio" } }
  }
};

export default meta;

export const FilterChip: StoryObj<ZetaFilterChip> = {};

