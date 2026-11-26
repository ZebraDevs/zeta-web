import { fixture, html, expect, waitUntil } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import type { ZetaSnackbar } from "../../components/snackbar/snackbar";
import { getCssVarColorValue, getCssVarPxValue, getCssVarValue, getIconColor, MouseActions } from "../utils";
import "../../components/snackbar/snackbar.js";
import type { ZetaIcon } from "../../components/icon/icon.js";
import "../../components/icon/icon.js";
import "../../index.css";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";

describe("zeta-snackbar", () => {
  let subject: ZetaSnackbar;

  const createComponent = async (template = html`<zeta-snackbar message="Message" status="info"></zeta-snackbar>`) => fixture<ZetaSnackbar>(template);

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });

    it("meets contrast requirements for the dark default, action and standard surfaces", async () => {
      const cases = [
        { status: "default", variant: "contextual" },
        { status: "action", variant: "contextual" },
        { status: "default", variant: "standard" }
      ] as const;

      for (const testCase of cases) {
        subject = await createComponent(html`<zeta-snackbar message="Message" status=${testCase.status} variant=${testCase.variant}></zeta-snackbar>`);
        const root = subject.shadowRoot!.querySelector(".snackbar-root") as HTMLDivElement;
        await contrastTest(`Snackbar ${testCase.variant} ${testCase.status}`, root, root);
      }
    });
  });

  describe("Content", () => {
    it("displays the message property", () => {
      const message = subject.shadowRoot!.querySelector('[part="message"]') as HTMLElement;

      expect(message.textContent).to.equal("Message");
    });

    it("keeps the default slot as a message fallback", async () => {
      subject = await createComponent(html`<zeta-snackbar hasCloseAction>Slotted message</zeta-snackbar>`);
      const slot = subject.shadowRoot!.querySelector("slot:not([name='icon'])") as HTMLSlotElement;
      const textNode = slot.assignedNodes({ flatten: true }).find(node => node.nodeType === Node.TEXT_NODE) as Text;

      expect(textNode.textContent).to.equal("Slotted message");
    });

    it("uses the preset icon for contextual statuses", () => {
      const icon = subject.shadowRoot!.querySelector('[part="icon"] zeta-icon') as ZetaIcon;

      expect(icon.textContent).to.equal("info");
    });

    it("lets a slotted icon override the preset icon", async () => {
      subject = await createComponent(html`
        <zeta-snackbar message="Message" status="info">
          <zeta-icon slot="icon">happy</zeta-icon>
        </zeta-snackbar>
      `);
      await subject.updateComplete;

      const iconSlotContent = (subject.shadowRoot!.querySelector('slot[name="icon"]') as HTMLSlotElement).assignedElements({ flatten: true });
      const presetIcon = subject.shadowRoot!.querySelector('[part="icon"] zeta-icon');

      expect(presetIcon).to.not.exist;
      expect(iconSlotContent[0].textContent).to.equal("happy");
    });

    it("displays the default close icon when closeActionIcon is not provided", () => {
      const closeIcon = subject.shadowRoot!.querySelector("#closeIcon") as ZetaIcon;

      expect(closeIcon.textContent).to.equal("cancel");
    });

    it("displays the custom close icon when closeActionIcon is provided", async () => {
      subject.closeActionIcon = "close";
      await subject.updateComplete;

      const closeIcon = subject.shadowRoot!.querySelector("#closeIcon") as ZetaIcon;
      expect(closeIcon.textContent).to.equal("close");
    });

    it("uses preset action labels for action statuses", async () => {
      subject.status = "deletion";
      await subject.updateComplete;

      const actionButton = subject.shadowRoot!.querySelector("#action") as HTMLButtonElement;
      expect(actionButton.textContent).to.equal("Undo");

      subject.status = "view";
      await subject.updateComplete;

      expect(actionButton.textContent).to.equal("View");
    });

    it("keeps legacy actionLabel and actionClick support", async () => {
      let clicked = false;
      subject = await createComponent(html`<zeta-snackbar actionLabel="Legacy action" hasCloseAction>Message</zeta-snackbar>`);
      subject.actionClick = () => {
        clicked = true;
      };
      await subject.updateComplete;

      const actionButton = subject.shadowRoot!.querySelector("#action") as HTMLButtonElement;
      expect(actionButton.textContent).to.equal("Legacy action");

      await MouseActions.click(actionButton, "left");
      await waitUntil(() => clicked, "legacy actionClick should be called", { timeout: 100 });
    });
  });

  describe("Dimensions", () => {
    it("uses the contextual preset width", () => {
      const root = subject.shadowRoot!.querySelector(".snackbar-root") as HTMLDivElement;
      const expectedWidth =
        getCssVarPxValue(subject, "--scale-21") +
        getCssVarPxValue(subject, "--scale-17") +
        getCssVarPxValue(subject, "--space-md") +
        getCssVarPxValue(subject, "--stroke-thin");

      expect(parseFloat(getComputedStyle(root).inlineSize)).to.equal(expectedWidth);
    });

    it("allows the message to wrap within the max viewport width", () => {
      const message = subject.shadowRoot!.querySelector('[part="message"]') as HTMLElement;

      expect(getComputedStyle(message).whiteSpace).to.equal("normal");
    });
  });

  describe("Styling", () => {
    it("sets rounded contextual radius correctly", async () => {
      subject.shape = "rounded";
      await subject.updateComplete;

      const root = subject.shadowRoot!.querySelector(".snackbar-root") as HTMLDivElement;
      expect(getComputedStyle(root).borderRadius).to.equal(getCssVarValue(subject, "--radius-pill"));
    });

    it("sets rounded standard radius correctly", async () => {
      subject.variant = "standard";
      subject.status = "default";
      subject.shape = "rounded";
      await subject.updateComplete;

      const root = subject.shadowRoot!.querySelector(".snackbar-root") as HTMLDivElement;
      expect(getComputedStyle(root).borderRadius).to.equal(getCssVarValue(subject, "--radius-md"));
    });

    it("sets sharp radius correctly", async () => {
      subject.shape = "sharp";
      await subject.updateComplete;

      const root = subject.shadowRoot!.querySelector(".snackbar-root") as HTMLDivElement;
      expect(getComputedStyle(root).borderRadius).to.equal(getCssVarValue(subject, "--radius-none"));
    });

    it("sets the correct colors for status presets", async () => {
      const cases = [
        { status: "info", background: "--feedback-info-background-subtle", icon: "info" },
        { status: "positive", background: "--feedback-success-background-subtle", icon: "check_circle" },
        { status: "warning", background: "--feedback-warning-background-subtle", icon: "warning" },
        { status: "negative", background: "--feedback-error-background-subtle", icon: "error" },
        { status: "deletion", background: "--feedback-error-background-subtle", icon: "delete" },
        { status: "view", background: "--feedback-neutral-background-subtle", icon: "open_in_new_window" }
      ] as const;

      for (const testCase of cases) {
        subject.status = testCase.status;
        await subject.updateComplete;

        const root = subject.shadowRoot!.querySelector(".snackbar-root") as HTMLDivElement;
        const icon = subject.shadowRoot!.querySelector('[part="icon"] zeta-icon') as ZetaIcon;

        expect(getComputedStyle(root).backgroundColor).to.equal(getCssVarColorValue(subject, testCase.background));
        expect(getComputedStyle(root).color).to.equal(getCssVarColorValue(subject, "--foreground-primary"));
        expect(getIconColor(icon)).to.equal(getCssVarColorValue(subject, "--foreground-primary"));
        expect(icon.textContent).to.equal(testCase.icon);
      }
    });

    it("keeps default and action statuses on the dark overlay surface in light and dark pages", async () => {
      for (const mode of ["light", "dark"] as const) {
        document.documentElement.setAttribute("data-mode", mode);
        try {
          for (const status of ["default", "action"] as const) {
            subject.status = status;
            await subject.updateComplete;

            const root = subject.shadowRoot!.querySelector(".snackbar-root") as HTMLDivElement;
            expect(getComputedStyle(root).backgroundColor, `${status} on ${mode} page`).to.equal(getCssVarColorValue(subject, "--fill-overlay"));
            expect(getComputedStyle(root).color, `${status} on ${mode} page`).to.equal(getCssVarColorValue(subject, "--foreground-primary"));
          }
        } finally {
          document.documentElement.removeAttribute("data-mode");
        }
      }
    });
  });

  describe("Interaction", () => {
    it("removes the element from the screen when the close button is clicked", async () => {
      const closeButton = subject.shadowRoot!.querySelector("#closeButton") as HTMLButtonElement;

      await MouseActions.click(closeButton, "left");

      const snackbar = document.querySelector("zeta-snackbar");
      expect(snackbar).to.not.exist;
    });

    it("removes the element from the screen when the close button is enter pressed", async () => {
      const closeButton = subject.shadowRoot!.querySelector("#closeButton") as HTMLButtonElement;
      closeButton.focus();
      await sendKeys({ press: "Enter" });

      const snackbar = document.querySelector("zeta-snackbar");
      expect(snackbar).to.not.exist;
    });

    it("dispatches the close event when the close button is clicked", async () => {
      let closed = false;
      subject.addEventListener("close", () => {
        closed = true;
      });

      await MouseActions.click(subject.shadowRoot!.querySelector("#closeButton") as HTMLButtonElement, "left");

      await waitUntil(() => closed, "close event should be dispatched", { timeout: 100 });
    });

    it("dispatches an action event and removes the element when the action button is clicked", async () => {
      let actionEvent: Event | undefined;
      subject.status = "deletion";
      await subject.updateComplete;
      subject.addEventListener("action", event => {
        actionEvent = event;
      });

      await MouseActions.click(subject.shadowRoot!.querySelector("#action") as HTMLButtonElement, "left");

      await waitUntil(() => actionEvent, "action event should be dispatched", { timeout: 100 });
      expect(actionEvent!.bubbles).to.be.true;
      expect(actionEvent!.composed).to.be.true;
      expect(document.querySelector("zeta-snackbar")).to.not.exist;
    });

    it("dispatches an action event when the action button is space pressed", async () => {
      let actionEvent: Event | undefined;
      subject.status = "view";
      await subject.updateComplete;
      subject.addEventListener("action", event => {
        actionEvent = event;
      });

      const actionButton = subject.shadowRoot!.querySelector("#action") as HTMLButtonElement;
      actionButton.focus();
      await sendKeys({ press: " " });

      await waitUntil(() => actionEvent, "action event should be dispatched", { timeout: 100 });
    });

    it("respects showAction and showClose for preset controls", async () => {
      subject.showAction = false;
      subject.showClose = false;
      subject.status = "deletion";
      await subject.updateComplete;

      expect(subject.shadowRoot!.querySelector("#action")).to.not.exist;
      expect(subject.shadowRoot!.querySelector("#closeButton")).to.not.exist;
    });
  });
});
