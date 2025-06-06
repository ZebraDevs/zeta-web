import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { fn } from "@storybook/test";
import { spreadGenerator } from "../../utils.js";
import { ZetaInPageBanner } from "../../../components/in-page-banner/in-page-banner.js";
const spread = spreadGenerator(ZetaInPageBanner);

const meta: Meta<ZetaInPageBanner> = {
  component: "zeta-in-page-banner",
  title: "Components/In Page Banner",
  args: {
    title: "Components/Banner title",
    slot: "Lorem ipsum dolor sit amet, conse ctetur  cididunt ut labore et do lore magna aliqua.",
    rounded: true,
    status: "default",
    onclose: fn()
  },
  argTypes: {
    status: {
      options: ["default", "info", "positive", "warning", "negative"],
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21156-27071&mode=design&t=DUHsS5bjWB5UW1iG-4"
    },
    status: {
      type: "ready"
    }
  }
};

export default meta;

export const Banner: StoryObj = {
  argTypes: {
    action: { table: { disable: true } }
  }
};

export const BannerSingleAction: StoryObj = {
  argTypes: {
    action: { table: { disable: true } }
  },
  render: args =>
    html`<zeta-in-page-banner ${spread(args)}>
      ${args.slot}
      <zeta-button slot="action">Button</zeta-button>
    </zeta-in-page-banner>`
};

export const BannerDualAction: StoryObj = {
  argTypes: {
    action: { table: { disable: true } }
  },
  render: args =>
    html`<zeta-in-page-banner ${spread(args)}>
      ${args.slot}
      <zeta-button slot="action">Button</zeta-button>
      <zeta-button slot="action">Button 2</zeta-button>
    </zeta-in-page-banner>`
};

export const BannerWithImage: StoryObj<ZetaInPageBanner & { imageX: number; imageY: number }> = {
  args: {
    imageX: 450,
    imageY: 330
  },
  argTypes: {
    imageX: {
      control: {
        type: "range",
        min: 50,
        max: 2000,
        step: 50
      }
    },
    imageY: {
      control: {
        type: "range",
        min: 50,
        max: 2000,
        step: 50
      }
    },
    slot: { table: { disable: true } }
  },
  render: ({ slot, imageX, imageY, ...args }) =>
    html` <zeta-in-page-banner ${spread(args)}>
      <img src=${"https://placehold.co/" + imageX + "x" + imageY + "/png"} />
      <zeta-button slot="action">Button</zeta-button>
    </zeta-in-page-banner>`
};

export const BannerWithContent: StoryObj<ZetaInPageBanner & { constrainedWidth: boolean }> = {
  args: {
    constrainedWidth: false,
    slot: `<h1 style="text-decoration: underline">Add more content</h1>
<h3>Add even more</h3>
<p>And even more</p>
<ol style="font-style: italic">
      <li>Add</li>
      <li>a</li>
      <li>List</li>
</ol>
<h4 style="margin-bottom: 8px;">Use normal HTML and CSS inside the banner</h4>
<div style="width: 250px">
      <img src=${"https://placehold.co/250x200/png"} />
</div>`
  },
  render: ({ title, rounded, status, constrainedWidth, slot }) => {
    const renderedBanner = html`<zeta-in-page-banner title=${title} ?rounded=${rounded} status=${status}>
      ${unsafeHTML(`${slot}`)}
      <zeta-button slot="action">Button</zeta-button>
    </zeta-in-page-banner>`;

    const renderedBannerInContainer = html`<div style="max-width: 500px;">${renderedBanner}</div>`;

    if (constrainedWidth) {
      return renderedBannerInContainer;
    } else {
      return renderedBanner;
    }
  }
};

export const BannerConstrainedWidth: StoryObj = {
  args: {
    imageX: 450,
    imageY: 330,
    constrainedWidth: true
  },
  argTypes: {
    imageX: {
      control: {
        type: "range",
        min: 50,
        max: 2000,
        step: 50
      }
    },
    imageY: {
      control: {
        type: "range",
        min: 50,
        max: 2000,
        step: 50
      },
      action: { table: { disable: true }, slot: { table: { disable: true } } }
    }
  },
  render: ({ slot, constrainedWidth, imageX, imageY, ...args }) => {
    const renderedBanner = html`<zeta-in-page-banner ${spread(args)}>
      <img src=${"https://placehold.co/" + imageX + "x" + imageY + "/png"} />
    < zeta - button flavor = "positive" slot = "action" > Button </zeta-button>
      </zeta-in-page-banner>`;

    const renderedBannerInContainer = html`<div style="max-width: 500px;">${renderedBanner}</div>`;

    if (constrainedWidth) {
      return renderedBannerInContainer;
    } else {
      return renderedBanner;
    }
  }
};
