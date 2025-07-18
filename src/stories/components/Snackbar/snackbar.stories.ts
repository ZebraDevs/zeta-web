import type { Meta, StoryObj } from "@storybook/web-components";
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
  component: "zeta-Snackbar",
  title: "Components/Snackbar",
  args: {
    slotIcon: "happy",
    slot: "Message",
    hasCloseAction: true,
    actionLabel: "Action",
    status: "default",
    actionClick: () => console.log("Action Clicked")
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21816-4283&m=dev&t=lGrwQ4pCwYESXz6b-4"
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
    shape: {
      options: ShapeList,
      control: {
        type: "inline-radio"
      }
    },
    status: {
      options: ["default", "positive", "info", "warning", "negative", "view"],
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
    <zeta-snackbar ${spread(args)} .actionClick=${() => console.log("Action Clicked")}>
      <zeta-icon slot="icon">${args.slotIcon}</zeta-icon>
      ${args.slot}
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
