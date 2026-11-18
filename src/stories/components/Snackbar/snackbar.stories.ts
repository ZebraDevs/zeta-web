import type { Meta, StoryObj } from "@storybook/web-components";
import { fn } from "@storybook/test";
import { html } from "lit";
import "../../../components/icon/icon.js";
import { ZetaSnackbar } from "../../../components/snackbar/snackbar.js";
import "../../../components/snackbar/snackbar.js";
import "../../../components/button/icon-button/icon-button.js";
import { ZetaIconNameList } from "@zebra-fed/zeta-icons";
import { ShapeList } from "../../../mixins/contourable-three.js";
import { spreadGenerator } from "../../utils.js";

const spread = spreadGenerator(ZetaSnackbar);

const meta: Meta<ZetaSnackbar & { slotIcon: string }> = {
  component: "zeta-snackbar",
  title: "Components/Snackbar",
  args: {
    message: "Message",
    variant: "contextual",
    status: "info",
    shape: "rounded",
    showAction: true,
    showClose: true,
    showIcon: false,
    slotIcon: "happy",
    actionClick: fn(),
    onaction: fn(),
    onclose: fn()
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=6551-170&m=dev"
    },
    status: {
      type: "ready"
    }
  },
  argTypes: {
    slotIcon: {
      options: [...ZetaIconNameList],
      control: {
        type: "select"
      }
    },
    variant: {
      options: ["contextual", "standard"],
      control: {
        type: "inline-radio"
      }
    },
    shape: {
      options: ShapeList,
      control: {
        type: "inline-radio"
      }
    },
    status: {
      options: ["default", "positive", "info", "warning", "negative", "deletion", "view", "action"],
      control: {
        type: "inline-radio"
      }
    },
    actionClick: {
      table: { disable: true }
    }
  }
};

export default meta;

// canvas code block does not show props in snippit.
export const Snackbar: StoryObj<ZetaSnackbar | any> = {
  render: args => html`
    <zeta-snackbar ${spread(args)} .actionClick=${args.actionClick}>
      ${args.showIcon ? html`<zeta-icon slot="icon">${args.slotIcon}</zeta-icon>` : null}
    </zeta-snackbar>

    <zeta-button
      flavor="primary"
      rounded
      @click=${() => {
        const snackbar = document.querySelector("zeta-snackbar");
        const button = document.querySelector("zeta-button");
        const animateIn = [{ transform: "translateY(0px)" }];
        const animateOut = [{ transform: "translateY(-100px)" }];

        if (snackbar && button) {
          button.disabled = true;
          snackbar.animate(animateOut, { duration: 0, iterations: 1, fill: "forwards" });
          snackbar.animate(animateIn, { delay: 500, duration: 1000, iterations: 1, fill: "forwards", easing: "ease-in-out" });
          snackbar.animate(animateOut, { delay: 3000, duration: 1000, iterations: 1, fill: "forwards", easing: "ease-in-out" });
          setTimeout(() => {
            snackbar.animate(animateIn, { duration: 0, iterations: 1, fill: "forwards" });
            button.disabled = false;
          }, 5500);
        }
      }}
      style="margin: 30px"
      >Demo</zeta-button
    >
  `
};
