import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../index.js";
const meta = {
    component: "zeta-in-page-banner",
    args: {
        title: "Banner title",
        body: "Lorem ipsum dolor sit amet, conse ctetur  cididunt ut labore et do lore magna aliqua.",
        rounded: true,
        condensed: false,
        status: "default"
    },
    argTypes: {
        status: {
            options: ["default", "info", "positive", "warning", "negative"],
            control: {
                type: "select"
            }
        }
    }
};
export default meta;
export const Banner = {};
export const BannerSingleAction = {
    render: args => html `<zeta-in-page-banner
      title=${ifDefined(args.title)}
      body=${ifDefined(args.body)}
      .rounded=${ifDefined(args.rounded)}
      .condensed=${ifDefined(args.condensed)}
      status=${ifDefined(args.status)}
    >
      <zeta-button slot="leading-action">Button</zeta-button>
    </zeta-in-page-banner>`
};
export const BannerDualAction = {
    render: args => html `<zeta-in-page-banner
      title=${ifDefined(args.title)}
      body=${ifDefined(args.body)}
      .rounded=${ifDefined(args.rounded)}
      .condensed=${ifDefined(args.condensed)}
      status=${ifDefined(args.status)}
      ><zeta-button slot="leading-action">Button</zeta-button> <zeta-button slot="trailing-action">Button 2</zeta-button>
    </zeta-in-page-banner>`
};
//# sourceMappingURL=in-page-banner.stories.js.map