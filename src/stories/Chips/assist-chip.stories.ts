import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaAssistChip } from "../../components/chips/assist-chip/assist-chip.js";
import { html } from "lit";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";

const meta: Meta<ZetaAssistChip> = {
  component: "zeta-assist-chip",
  title: "Components/Chips",
  args: {
    rounded: true,
    disabled: false,
    icon: "star",
    slot: "Label"
  },
  argTypes: {
    icon: {
      options: ZetaIconNameList,
      control: "select"
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21265-14215&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};

export default meta;

export const AssistChip: StoryObj<ZetaAssistChip> = {
  render: args => html`<zeta-assist-chip ?rounded=${args.rounded} ?disabled=${args.disabled} .icon=${args.icon}>${args.slot}</zeta-assist-chip>`
};
