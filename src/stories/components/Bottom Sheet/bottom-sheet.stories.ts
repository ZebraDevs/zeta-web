import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaBottomSheet } from "../../../components/bottom-sheets/bottom-sheet";
import { html } from "lit";
import "../../../components/list/list-item/list-item";
import "../../../components/icon/icon";
import "../../../components/grid-menu-item/grid-menu-item";

const meta: Meta<ZetaBottomSheet> = {
  component: "zeta-bottom-sheet",
  title: "Components/Bottom Sheet",
  args: {
    headerText: "Title",
    headerAlignment: "start",
    isExpanded: true
  },
  argTypes: {
    headerText: {
      control: {
        type: "text"
      }
    },
    headerAlignment: {
      options: ["start", "center"],
      control: { type: "inline-radio" }
    },
    isGrid: { table: { disable: true } },
    isGenericContent: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?m=auto&node-id=229-9"
    },
    status: {
      type: "designPending"
    }
  }
};

export default meta;

export const BottomSheetList: StoryObj<ZetaBottomSheet> = {
  render: args => {
    return html`
      <zeta-bottom-sheet headerText="${args.headerText}" headerAlignment="${args.headerAlignment}" ?isExpanded=${args.isExpanded} ?isGrid="${args.isGrid}">
        <zeta-list-item @click=${() => console.log("Item 1 clicked")} headline=${"Item 1"}>
          <zeta-icon slot="leading">star</zeta-icon>
          <zeta-icon slot="trailing">chevron_left</zeta-icon>
        </zeta-list-item>
        <zeta-list-item @click=${() => console.log("Item 2 clicked")} headline=${"Item 2"}>
          <zeta-icon slot="leading">star</zeta-icon>
          <zeta-icon slot="trailing">chevron_left</zeta-icon>
        </zeta-list-item>
        <zeta-list-item @click=${() => console.log("Item 3 clicked")} headline=${"Item 3"}>
          <zeta-icon slot="leading">star</zeta-icon>
          <zeta-icon slot="trailing">chevron_left</zeta-icon>
        </zeta-list-item>
        <zeta-list-item @click=${() => console.log("Item 4 clicked")} headline=${"Item 4"}>
          <zeta-icon slot="leading">star</zeta-icon>
          <zeta-icon slot="trailing">chevron_left</zeta-icon>
        </zeta-list-item>
        <zeta-list-item @click=${() => console.log("Item 5 clicked")} headline=${"Item 5"}>
          <zeta-icon slot="leading">star</zeta-icon>
          <zeta-icon slot="trailing">chevron_left</zeta-icon>
        </zeta-list-item>
        <zeta-list-item @click=${() => console.log("Item 6 clicked")} headline=${"Item 6"}>
          <zeta-icon slot="leading">star</zeta-icon>
          <zeta-icon slot="trailing">chevron_left</zeta-icon>
        </zeta-list-item>
      </zeta-bottom-sheet>
    `;
  }
};

export const BottomSheetGrid: StoryObj<ZetaBottomSheet> = {
  render: args => {
    return html`
      <zeta-bottom-sheet headerText=${args.headerText} headerAlignment=${args.headerAlignment} ?isExpanded=${args.isExpanded} ?isGrid=${args.isGrid}>
        <zeta-grid-menu-item
          @click=${() => console.log("Item 1 clicked")}
          .rounded=${true}
          .active=${true}
          icon=${"star"}
          label=${"Label"}
          .notificationValue=${true}
        >
        </zeta-grid-menu-item>
        <zeta-grid-menu-item
          @click=${() => console.log("Item 2 clicked")}
          .rounded=${true}
          .active=${false}
          icon=${"star"}
          label=${"Label"}
          .notificationValue=${false}
        >
        </zeta-grid-menu-item>
        <zeta-grid-menu-item
          @click=${() => console.log("Item 3 clicked")}
          .rounded=${true}
          .active=${false}
          icon=${"star"}
          label=${"Label"}
          .notificationValue=${false}
        >
        </zeta-grid-menu-item>
        <zeta-grid-menu-item
          @click=${() => console.log("Item 4 clicked")}
          .rounded=${true}
          .active=${false}
          icon=${"star"}
          label=${"Label"}
          .notificationValue=${false}
        >
        </zeta-grid-menu-item>
        <zeta-grid-menu-item
          @click=${() => console.log("Item 5 clicked")}
          .rounded=${true}
          .active=${false}
          icon=${"star"}
          label=${"Label"}
          .notificationValue=${false}
        >
        </zeta-grid-menu-item>
        <zeta-grid-menu-item
          @click=${() => console.log("Item 6 clicked")}
          .rounded=${true}
          .active=${false}
          icon=${"star"}
          label=${"Label"}
          .notificationValue=${false}
        >
        </zeta-grid-menu-item>
      </zeta-bottom-sheet>
    `;
  }
};

export const BottomSheetGenericContent: StoryObj<ZetaBottomSheet> = {
  render: args => {
    return html`
      <zeta-bottom-sheet headerText="${args.headerText}" headerAlignment="${args.headerAlignment}" ?isExpanded=${args.isExpanded} ?isGrid="${args.isGrid}">
        <div style="padding: 16px;">
          <h1 style="margin: 0;">Generic Content</h1>
          <p style="margin: 0;">This is generic content</p>
          <div style="margin-top: 16px;">
            <h2>Section 1</h2>
            <p>This is the first section of the generic content.</p>
          </div>
          <div style="margin-top: 16px;">
            <h2>Section 2</h2>
            <p>This is the second section of the generic content.</p>
          </div>
          <div style="margin-top: 16px;">
            <p>This section has an image</p>
            <img src="https://placehold.co/250x180/png" />
          </div>
          <div style="margin-top: 16px;">
            <h2>Section 3</h2>
            <p>This is the third section of the generic content.</p>
          </div>
          <div style="margin-top: 16px;">
            <h2>Section 4</h2>
            <p>This is the fourth section of the generic content.</p>
          </div>
          <div style="margin-top: 16px;">
            <h2>Section 5</h2>
            <p>This is the fifth section of the generic content.</p>
          </div>
        </div>
      </zeta-bottom-sheet>
    `;
  }
};
