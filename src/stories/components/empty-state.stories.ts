import type { Meta, StoryObj } from "@storybook/web-components";
import type { ZetaEmptyState } from "../../components/empty-state/empty-state";
import "../../../src/components/empty-state/empty-state";

const meta: Meta<ZetaEmptyState> = {
  component: "zeta-empty-state",
  tags: ["autodocs"],
  title: "Components/Empty State",
  args: {
    rounded: true
  },
  argTypes: {},
  parameters: {
    design: {
      url: "https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=38470-1055"
    },
    status: {
      type: "ready"
    }
  }
};
export default meta;
export const EmptyState: StoryObj = {
  argTypes: {}
  //   render: args => html``
};
