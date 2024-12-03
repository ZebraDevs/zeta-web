import { fixture, html, unsafeStatic, expect, waitUntil } from "@open-wc/testing";
import type { ZetaSnackbar } from "../../components/snackbar/snackbar";
import { getCssVarColorValue, getCssVarValue, getIconColor, MouseActions } from "../utils";
import { sendKeys } from "@web/test-runner-commands";
import "../../components/snackbar/snackbar.js";
import type { ZetaIcon } from "../../components/icon/icon.js";
import "../../components/icon/icon.js";
import "../../index.css";
import "@zebra-fed/zeta-icons/index.css";

describe("zeta-snackbar", () => {
  let subject: ZetaSnackbar;

  const createComponent = (
    template = `<zeta-snackbar actionLabel="Action" status="default" hasCloseAction><zeta-icon slot="icon">happy</zeta-icon>Message</zeta-snackbar>`
  ) => {
    // prettier-ignore
    return fixture<ZetaSnackbar>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
    subject.actionClick = () => console.log("Action Clicked");
  });

  describe("Accessibility Tests", () => {
    // TODO: collaborate with design to fix contrast ratio of action button text in default status
    it.skip("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content Tests", () => {
    it("displays the correct text in the slot", async () => {
      const slotContent = (subject.shadowRoot!.querySelector("slot:not([name='icon'])") as HTMLSlotElement)?.assignedNodes({ flatten: true });
      const textNode = slotContent.find(node => node.nodeType === Node.TEXT_NODE) as Text;

      await expect(textNode.textContent).to.equal("Message");
    });

    it("displays the correct text in the action button", async () => {
      const actionButton = subject.shadowRoot!.querySelector("button") as HTMLElement;
      await expect(actionButton.textContent).to.equal("Action");
    });

    it("displays the correct icon in the slot", async () => {
      const iconSlotContent = (subject.shadowRoot!.querySelector("slot[name='icon']") as HTMLSlotElement)?.assignedNodes({ flatten: true });
      const iconElement = iconSlotContent.find(node => node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName === "ZETA-ICON") as ZetaIcon;

      expect(iconElement).to.not.be.null;
      await expect(iconElement.textContent).to.equal("happy");
    });
  });

  // describe("Dimensions Tests", () => {});

  describe("Styling Tests", () => {
    beforeEach(async () => {
      subject = await createComponent();
      subject.actionClick = () => console.log("Action Clicked");
    });
    it("sets full border radius correctly", async () => {
      subject.round = "full";
      await subject.updateComplete;
      await expect(subject.round).to.equal("full");
      await expect(getComputedStyle(subject).borderRadius).to.equal(getCssVarValue(subject, "--radius-full"));
    });

    it("sets true border radius correctly", async () => {
      subject.round = true;
      await subject.updateComplete;
      expect(subject.round).to.be.true;
      await expect(getComputedStyle(subject).borderRadius).to.equal(getCssVarValue(subject, "--radius-minimal"));
    });

    it("sets false border radius correctly", async () => {
      subject.round = false;
      await subject.updateComplete;
      expect(subject.round).to.be.false;
      await expect(getComputedStyle(subject).borderRadius).to.equal(getCssVarValue(subject, "--radius-none"));
    });

    it("sets the correct colors for default status", async () => {
      const icon = subject.querySelector("zeta-icon") as ZetaIcon;
      const closeIcon = subject.shadowRoot!.querySelector("#closeIcon") as ZetaIcon;
      const actionButton = subject.shadowRoot!.querySelector("button") as HTMLElement;

      subject.status = "default";
      await subject.updateComplete;
      await expect(subject.status).to.equal("default");
      await expect(getComputedStyle(subject).backgroundColor).to.equal(getCssVarColorValue(subject, "--surface-default-inverse"));
      await expect(getComputedStyle(subject).color).to.equal(getCssVarColorValue(subject, "--main-inverse"));
      await expect(getIconColor(icon)).to.equal(getCssVarColorValue(subject, "--main-inverse"));
      await expect(getIconColor(closeIcon)).to.equal(getCssVarColorValue(subject, "--main-inverse"));
      await expect(getComputedStyle(actionButton).color).to.equal(getCssVarColorValue(subject, "--main-primary"));
    });

    it("sets the correct colors for positive status", async () => {
      const icon = subject.querySelector("zeta-icon") as ZetaIcon;
      const closeIcon = subject.shadowRoot!.querySelector("#closeIcon") as ZetaIcon;
      const actionButton = subject.shadowRoot!.querySelector("button") as HTMLElement;

      subject.status = "positive";
      await subject.updateComplete;
      await expect(subject.status).to.equal("positive");
      await expect(getComputedStyle(subject).backgroundColor).to.equal(getCssVarColorValue(subject, "--surface-positive-subtle"));
      await expect(getComputedStyle(subject).color).to.equal(getCssVarColorValue(subject, "--main-default"));
      await expect(getIconColor(icon)).to.equal(getCssVarColorValue(subject, "--main-positive"));
      await expect(getIconColor(closeIcon)).to.equal(getCssVarColorValue(subject, "--main-default"));
      await expect(getComputedStyle(actionButton).color).to.equal(getCssVarColorValue(subject, "--main-default"));
    });

    it("sets the correct colors for info status", async () => {
      const icon = subject.querySelector("zeta-icon") as ZetaIcon;
      const closeIcon = subject.shadowRoot!.querySelector("#closeIcon") as ZetaIcon;
      const actionButton = subject.shadowRoot!.querySelector("button") as HTMLElement;

      subject.status = "info";
      await subject.updateComplete;
      await expect(subject.status).to.equal("info");
      await expect(getComputedStyle(subject).backgroundColor).to.equal(getCssVarColorValue(subject, "--surface-info-subtle"));
      await expect(getComputedStyle(subject).color).to.equal(getCssVarColorValue(subject, "--main-default"));
      await expect(getIconColor(icon)).to.equal(getCssVarColorValue(subject, "--main-info"));
      await expect(getIconColor(closeIcon)).to.equal(getCssVarColorValue(subject, "--main-default"));
      await expect(getComputedStyle(actionButton).color).to.equal(getCssVarColorValue(subject, "--main-default"));
    });

    it("sets the correct colors for warning status", async () => {
      const icon = subject.querySelector("zeta-icon") as ZetaIcon;
      const closeIcon = subject.shadowRoot!.querySelector("#closeIcon") as ZetaIcon;
      const actionButton = subject.shadowRoot!.querySelector("button") as HTMLElement;

      subject.status = "warning";
      await subject.updateComplete;
      await expect(subject.status).to.equal("warning");
      await expect(getComputedStyle(subject).backgroundColor).to.equal(getCssVarColorValue(subject, "--surface-warning-subtle"));
      await expect(getComputedStyle(subject).color).to.equal(getCssVarColorValue(subject, "--main-default"));
      await expect(getIconColor(icon)).to.equal(getCssVarColorValue(subject, "--main-warning"));
      await expect(getIconColor(closeIcon)).to.equal(getCssVarColorValue(subject, "--main-default"));
      await expect(getComputedStyle(actionButton).color).to.equal(getCssVarColorValue(subject, "--main-default"));
    });

    it("sets the correct colors for negative status", async () => {
      const icon = subject.querySelector("zeta-icon") as ZetaIcon;
      const closeIcon = subject.shadowRoot!.querySelector("#closeIcon") as ZetaIcon;
      const actionButton = subject.shadowRoot!.querySelector("button") as HTMLElement;

      subject.status = "negative";
      await subject.updateComplete;
      await expect(subject.status).to.equal("negative");
      await expect(getComputedStyle(subject).backgroundColor).to.equal(getCssVarColorValue(subject, "--surface-negative-subtle"));
      await expect(getComputedStyle(subject).color).to.equal(getCssVarColorValue(subject, "--main-default"));
      await expect(getIconColor(icon)).to.equal(getCssVarColorValue(subject, "--main-negative"));
      await expect(getIconColor(closeIcon)).to.equal(getCssVarColorValue(subject, "--main-default"));
      await expect(getComputedStyle(actionButton).color).to.equal(getCssVarColorValue(subject, "--main-default"));
    });

    it("sets the correct colors for view status", async () => {
      const icon = subject.querySelector("zeta-icon") as ZetaIcon;
      const closeIcon = subject.shadowRoot!.querySelector("#closeIcon") as ZetaIcon;
      const actionButton = subject.shadowRoot!.querySelector("button") as HTMLElement;

      subject.status = "view";
      await subject.updateComplete;
      await expect(subject.status).to.equal("view");
      await expect(getComputedStyle(subject).backgroundColor).to.equal(getCssVarColorValue(subject, "--surface-primary-subtle"));
      await expect(getComputedStyle(subject).color).to.equal(getCssVarColorValue(subject, "--main-default"));
      await expect(getIconColor(icon)).to.equal(getCssVarColorValue(subject, "--main-primary"));
      await expect(getIconColor(closeIcon)).to.equal(getCssVarColorValue(subject, "--main-default"));
      await expect(getComputedStyle(actionButton).color).to.equal(getCssVarColorValue(subject, "--main-default"));
    });
  });

  describe("Interaction Tests", () => {
    it("removes the element from the screen when the close icon is clicked", async () => {
      const closeIcon = subject.shadowRoot!.querySelector("#closeIcon") as ZetaIcon;
      await MouseActions.click(closeIcon, "left");
      await subject.updateComplete;

      const snackbar = document.querySelector("zeta-snackbar");
      expect(snackbar).to.not.exist;
    });

    it("removes the element from the screen when the close icon is enter pressed", async () => {
      await sendKeys({ press: "Tab" });
      await sendKeys({ press: "Tab" });
      await sendKeys({ press: "Enter" });
      await subject.updateComplete;

      const snackbar = document.querySelector("zeta-snackbar");
      expect(snackbar).to.not.exist;
    });

    it("removes the element from the screen when the close icon is space pressed", async () => {
      await sendKeys({ press: "Tab" });
      await sendKeys({ press: "Tab" });
      await sendKeys({ press: " " });
      await subject.updateComplete;

      const snackbar = document.querySelector("zeta-snackbar");
      expect(snackbar).to.not.exist;
    });

    it("calls the action function on enter pressed", async () => {
      let clicked = false;

      subject.actionClick = () => {
        console.log("Action Clicked");
        clicked = true;
      };
      await sendKeys({ press: "Tab" });
      void sendKeys({ press: "Enter" });
      await waitUntil(() => clicked, "Button Action fired", { timeout: 200 });
    });

    it("calls the action function on space pressed", async () => {
      let clicked = false;

      subject.actionClick = () => {
        console.log("Action Clicked");
        clicked = true;
      };
      await sendKeys({ press: "Tab" });
      void sendKeys({ press: " " });
      await waitUntil(() => clicked, "Button Action fired", { timeout: 100 });
    });

    it("calls the action function on mouse click", async () => {
      let clicked = false;

      subject.actionClick = () => {
        console.log("Action Clicked");
        clicked = true;
      };
      await MouseActions.click(subject.shadowRoot!.querySelector("#action") as HTMLElement, "left");
      await waitUntil(() => clicked, "Button Action fired", { timeout: 100 });
    });
  });

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});
