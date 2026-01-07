import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ZetaChartCard } from "../../../components/chart-card/chart-card.js";
import "../../../components/chart-card/chart-card";
import "../../../components/button/button.js";
import { spreadGenerator } from "../../utils.js";

const spread = spreadGenerator(ZetaChartCard);

const meta: Meta<ZetaChartCard> = {
  title: "Components/Chart Card",
  component: "zeta-chart-card",
  args: {
    loading: false,
    clickable: false
  },
  argTypes: {
    loading: {
      control: { type: "boolean" },
      description: "Show loading skeleton"
    },
    clickable: {
      control: { type: "boolean" },
      description: "Make card clickable with hover effects"
    },
    minHeight: {
      control: { type: "text" },
      description: "Minimum height of the card",
      table: { defaultValue: { summary: "undefined" } }
    },
    error: {
      control: { type: "text" },
      description: "Error message to display",
      table: { defaultValue: { summary: "undefined" } }
    },
    slot: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-10&m=dev"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Default: StoryObj = {
  args: {
    content: true
  },
  render: args => html`
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--spacing-2xl); padding: var(--spacing-2xl);">
      <zeta-chart-card ${spread(args)}>
        <span slot="title">Chart Title</span>
        <span slot="subtitle">Chart Subtitle</span>
        ${args.content ? html`<div style="height: 200px; background: var(--surface-subtle); border-radius: var(--spacing-small); display: flex; align-items: center; justify-content: center; color: var(--main-subtle);">Chart Content</div>` : nothing}
        <zeta-button slot="footer" flavor="outline" size="small">View Details</zeta-button>
      </zeta-chart-card>
    </div>
  `
};

export const LoadingState: StoryObj = {
  args: {
    loading: true
  },
  argTypes: {
    loading: { table: { disable: true } }
  },
  render: args => html`
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--spacing-2xl); padding: var(--spacing-2xl);">
      <zeta-chart-card ${spread(args)}></zeta-chart-card>
      <zeta-chart-card ${spread(args)}></zeta-chart-card>
      <zeta-chart-card ${spread(args)}></zeta-chart-card>
    </div>
  `
};

export const ErrorState: StoryObj = {
  args: {
    error: "Failed to load chart data. Please try again later.",
    content: false
  },
  argTypes: {
    error: { table: { disable: true } },
    content: { table: { disable: true } }
  },
  render: args => html`
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--spacing-2xl); padding: var(--spacing-2xl);">
      <zeta-chart-card ${spread(args)}>
        <span slot="title">Chart with Error</span>
        <span slot="subtitle">Error example</span>
      </zeta-chart-card>
    </div>
  `
};

export const Clickable: StoryObj = {
  args: {
    clickable: true,
    content: true
  },
  argTypes: {
    clickable: { table: { disable: true } }
  },
  render: args => html`
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--spacing-2xl); padding: var(--spacing-2xl);">
      <zeta-chart-card 
        ${spread(args)}
        @click=${() => alert("Card clicked!")}
      >
        <span slot="title">Clickable Card</span>
        <span slot="subtitle">Click to interact</span>
        ${args.content ? html`<div style="height: 200px; background: var(--surface-subtle); border-radius: var(--spacing-small); display: flex; align-items: center; justify-content: center; color: var(--main-subtle);">Chart Content</div>` : nothing}
      </zeta-chart-card>
    </div>
  `
};

