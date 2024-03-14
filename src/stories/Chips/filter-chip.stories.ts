import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaFilterChip } from "../index.js";

const meta: Meta<ZetaFilterChip> = {
  component: "zeta-filter-chip",
  title: "Chips",

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

