import type { Meta, StoryObj } from "@storybook/web-components";
import { ZetaGlobalHeader } from "../../components/global-header/global-header.js";
import { html } from "lit";
import "../../components/global-header/global-header";
import "../../components/action-menu/action-menu-button";

const meta: Meta<ZetaGlobalHeader> = {
  component: "zeta-global-header",
  tags: ["autodocs"],
  title: "Components/Global Header",
  args: {
    platformName: "Platform Name",
    name: "Name",
    initials: "RK",
    appSwitcher: true,
    searchbar: true,
    rounded: false
  },
  argTypes: {
    platformName: { control: "text" },
    name: { control: "text" },
    initials: { control: "text" },
    appSwitcher: { control: "boolean" },
    searchbar: { control: "boolean" },
    rounded: { control: "boolean" }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=23144-118110&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "needsAttention"
    }
  }
};
export default meta;

export const GlobalHeader: StoryObj = {
  argTypes: {
    menuPosition: {
      table: {
        disable: true
      }
    }
  },
  render: args => {
    return html`<zeta-global-header
      .platformName=${args.platformName}
      .name=${args.name}
      .initials=${args.initials}
      .appSwitcher=${args.appSwitcher}
      .searchbar=${args.searchbar}
      .rounded=${args.rounded}
    >
      <!-- Menu items -->
      <zeta-dropdown-menu-button
        rounded=${args.rounded}
        slot="menu-items"
        flavor="subtle"
        .items=${[{ label: "Menu Item" }, { label: "Menu Item" }, { label: "Menu Item" }]}
        >Nav Item</zeta-dropdown-menu-button
      >
      <zeta-button shape=${args.rounded ? "rounded" : "sharp"} slot="menu-items" flavor="subtle">Nav Item</zeta-button>
      <zeta-button shape=${args.rounded ? "rounded" : "sharp"} slot="menu-items" flavor="subtle">Nav Item</zeta-button>
      <zeta-button shape=${args.rounded ? "rounded" : "sharp"} slot="menu-items" flavor="subtle">Nav Item</zeta-button>
      <zeta-button shape=${args.rounded ? "rounded" : "sharp"} slot="menu-items" flavor="subtle">Nav Item</zeta-button>
      <zeta-button shape=${args.rounded ? "rounded" : "sharp"} slot="menu-items" flavor="subtle">Nav Item</zeta-button>
      <zeta-button shape=${args.rounded ? "rounded" : "sharp"} slot="menu-items" flavor="subtle">Nav Item</zeta-button>
      <!-- Action items -->
      <zeta-action-menu-button
        shape=${args.rounded ? "rounded" : "sharp"}
        slot="action-items"
        icon="more_horizontal"
        flavor="subtle"
        .items=${[{ label: "Menu Item" }, { label: "Menu Item" }, { label: "Menu Item" }]}
      ></zeta-action-menu-button>
      <zeta-icon-button shape=${args.rounded ? "rounded" : "sharp"} slot="action-items" flavor="subtle">star</zeta-icon-button>
      <zeta-icon-button shape=${args.rounded ? "rounded" : "sharp"} slot="action-items" flavor="subtle">star</zeta-icon-button>
      <zeta-icon-button shape=${args.rounded ? "rounded" : "sharp"} slot="action-items" flavor="subtle">star</zeta-icon-button>
      <zeta-icon-button shape=${args.rounded ? "rounded" : "sharp"} slot="action-items" flavor="subtle">star</zeta-icon-button>
      <zeta-icon-button shape=${args.rounded ? "rounded" : "sharp"} slot="action-items" flavor="subtle">star</zeta-icon-button>
    </zeta-global-header>`;
  }
};

// export const WithMenuItems: StoryObj = {
//   render: args =>
//     html`<zeta-global-header menuPosition=${args.menuPosition} headline=${args.headline}>
//       <zeta-icon-button slot="leading" flavor="text">apps</zeta-icon-button>
//       <zeta-tab-bar slot="navigation-menu">
//         <zeta-tab-item active>Menu Item</zeta-tab-item>
//         <zeta-tab-item>Menu Item</zeta-tab-item>
//         <zeta-tab-item>Menu Item</zeta-tab-item>
//         <zeta-tab-item>Menu Item</zeta-tab-item>
//       </zeta-tab-bar>
//       <zeta-icon-button slot="trailing" flavor="text">star</zeta-icon-button>
//       <zeta-icon-button slot="trailing" flavor="text">star</zeta-icon-button>
//       <zeta-icon-button slot="trailing" flavor="text">star</zeta-icon-button>
//       <zeta-navigation-profile slot="trailing" rounded>
//         <zeta-avatar slot="leading" size="s"></zeta-avatar>
//         My account
//       </zeta-navigation-profile>
//     </zeta-global-header>`
// };
