import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaEmptyState } from "../../components/empty-state/empty-state";
import "../../../src/components/empty-state/empty-state";
import { html } from "lit";
import "../../components/illustration/illustration";
import { spreadGenerator } from "../utils";

const spread = spreadGenerator(ZetaEmptyState);

const meta: Meta<ZetaEmptyState | any> = {
  component: "zeta-empty-state",
  tags: ["autodocs"],
  title: "Components/Empty State",
  args: {
    rounded: true,
    title: "Title",
    description: "This is a placeholder description. It explains what this view is for and what to do next."
    // illustration: html`<zeta-illustration name="serverDisconnected"> </zeta-illustration>`
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
  argTypes: {},
  render: args => html`
    <zeta-empty-state ${spread(args)}>
      <zeta-illustration slot="illustration" name="serverDisconnect"> </zeta-illustration>
    </zeta-empty-state>
  `
};
