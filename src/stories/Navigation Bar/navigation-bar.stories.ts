import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ZetaNavigationBar } from "../../components/navigation-bar/navigation-bar.js";
import "../../components/grid-menu-item/grid-menu-item";
import "../../components/button/button.js";

type _navBarType = ZetaNavigationBar & { numItems: number } & { divider: number } & { spacer: number } & { selected: number } & { button: Boolean } & {
  notificationValue: string | boolean;
};

const staticArgTypes = {
  divider: { table: { disable: true } },
  spacer: { table: { disable: true } },
  shrinkItems: { table: { disable: true } },
  numItems: { table: { disable: true } },
  selected: { table: { disable: true } },
  notificationValue: { table: { disable: true } },
  button: { table: { disable: true } },
  slot: { table: { disable: true } }
};

const meta: Meta<_navBarType> = {
  component: "zeta-navigation-bar",
  title: "Components/Navigation Bar",
  args: {
    numItems: 4,
    divider: 0,
    spacer: 0,
    shrinkItems: false,
    button: false,
    selected: 1
  },
  argTypes: {
    numItems: {
      control: {
        type: "range",
        min: 2,
        max: 6,
        step: 1
      }
    },
    selected: {
      control: {
        type: "range",
        min: 0,
        max: 6,
        step: 1
      }
    },
    divider: {
      control: {
        type: "range",
        min: 0,
        max: 7,
        step: 1
      }
    },
    spacer: {
      control: {
        type: "range",
        min: 0,
        max: 7,
        step: 1
      }
    },
    notificationValue: {
      options: [true, false, "1", "2", "3", "4", "5", "6", "7", "8", "9", "+"],
      control: {
        type: "select"
      }
    },
    slot: { table: { disable: true } }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21186-40498&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const BarIconAndLabel: StoryObj<_navBarType> = {
  render: args => {
    const navigationBarItems = Array.from({ length: args.numItems }, (_, index) => {
      return html`
        ${index == (args.spacer as number) - 1 ? html` <div class="spacer"></div>` : nothing}
        <zeta-grid-menu-item .active=${args.selected === index + 1} .notificationValue=${args.notificationValue}>
          <zeta-icon slot="icon">star</zeta-icon>
          Label
        </zeta-grid-menu-item>
        ${index == (args.divider as number) - 1 ? html` <div class="divider"></div>` : nothing}
        ${index == args.numItems - 1 && index + 1 == (args.spacer as number) - 1 ? html` <div class="spacer"></div>` : nothing}
        ${index == args.numItems - 1 && args.button == true ? html` <zeta-button>Button</zeta-button>` : nothing}
      `;
    });

    return html`<zeta-navigation-bar ?shrinkItems=${args.shrinkItems}> ${navigationBarItems} </zeta-navigation-bar>`;
  }
};

export const BarIconsOnly: StoryObj<_navBarType> = {
  render: args => {
    const navigationBarItems = Array.from({ length: args.numItems }, (_, index) => {
      return html`
        ${index == (args.spacer as number) - 1 ? html` <div class="spacer"></div>` : nothing}
        <zeta-grid-menu-item .active=${args.selected === index + 1} .notificationValue=${args.notificationValue}
          ><zeta-icon slot="icon">star</zeta-icon></zeta-grid-menu-item
        >

        ${index == (args.divider as number) - 1 ? html` <div class="divider"></div>` : nothing}
        ${index == args.numItems - 1 && index + 1 == (args.spacer as number) - 1 ? html` <div class="spacer"></div>` : nothing}
        ${index == args.numItems - 1 && args.button == true ? html` <zeta-button>Button</zeta-button>` : nothing}
      `;
    });

    return html`<zeta-navigation-bar ?shrinkItems=${args.shrinkItems}> ${navigationBarItems} </zeta-navigation-bar>`;
  }
};

export const WithDivider: StoryObj<_navBarType> = {
  argTypes: staticArgTypes,

  render: () => {
    return html` <zeta-navigation-bar>
      <zeta-grid-menu-item .active=${true}><zeta-icon slot="icon">star</zeta-icon>Label</zeta-grid-menu-item>
      <zeta-grid-menu-item><zeta-icon slot="icon">star</zeta-icon>Label</zeta-grid-menu-item>
      <div class="divider"></div>
      <zeta-grid-menu-item><zeta-icon slot="icon">star</zeta-icon>Label</zeta-grid-menu-item>
      <zeta-grid-menu-item><zeta-icon slot="icon">star</zeta-icon>Label</zeta-grid-menu-item>
    </zeta-navigation-bar>`;
  }
};

export const WithSpacer: StoryObj<_navBarType> = {
  argTypes: staticArgTypes,

  render: () => {
    return html` <zeta-navigation-bar>
      <zeta-grid-menu-item .active=${true}><zeta-icon slot="icon">star</zeta-icon>Label</zeta-grid-menu-item>
      <zeta-grid-menu-item><zeta-icon slot="icon">star</zeta-icon>Label</zeta-grid-menu-item>
      <div class="spacer"></div>
      <zeta-grid-menu-item><zeta-icon slot="icon">star</zeta-icon>Label</zeta-grid-menu-item>
      <zeta-grid-menu-item><zeta-icon slot="icon">star</zeta-icon>Label</zeta-grid-menu-item>
    </zeta-navigation-bar>`;
  }
};

export const WithSpacerAndShrinkItems: StoryObj<_navBarType> = {
  argTypes: staticArgTypes,

  render: () => {
    return html` <zeta-navigation-bar shrinkItems>
      <zeta-grid-menu-item .active=${true}><zeta-icon slot="icon">star</zeta-icon>Label</zeta-grid-menu-item>
      <zeta-grid-menu-item><zeta-icon slot="icon">star</zeta-icon>Label</zeta-grid-menu-item>
      <div class="spacer"></div>
      <zeta-grid-menu-item><zeta-icon slot="icon">star</zeta-icon>Label</zeta-grid-menu-item>
      <zeta-grid-menu-item><zeta-icon slot="icon">star</zeta-icon>Label</zeta-grid-menu-item>
    </zeta-navigation-bar>`;
  }
};

export const WithButton: StoryObj<_navBarType> = {
  argTypes: staticArgTypes,

  render: () => {
    return html` <zeta-navigation-bar>
      <zeta-grid-menu-item .active=${true}><zeta-icon slot="icon">star</zeta-icon>Label</zeta-grid-menu-item>
      <zeta-grid-menu-item><zeta-icon slot="icon">star</zeta-icon>Label</zeta-grid-menu-item>
      <zeta-grid-menu-item><zeta-icon slot="icon">star</zeta-icon>Label</zeta-grid-menu-item>
      <zeta-button>Button</zeta-button>
    </zeta-navigation-bar>`;
  }
};
