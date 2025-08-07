import { assert, fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import { ZetaDialog, type DialogFlavor } from "../../components/dialog/dialog.js";
import "../../components/dialog/dialog.js";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";
import "../../index.css";
import sinon from "sinon";
import { MouseActions } from "../utils.js";

const flavors = ["default", "info", "success", "warning", "error"];
const confirmButtonFlavors = ["primary", "positive", "negative"];

describe("zeta-dialog", () => {
  let subject: ZetaDialog;
  const createComponent = (
    template = `<zeta-dialog id="dialog1" title="Dialog title" flavor="default" initialOpen>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          <zeta-icon slot="icon">block</zeta-icon>
          <zeta-button slot="confirm">Button</zeta-button>
          <zeta-button slot="cancel">Button</zeta-button>
          <zeta-button slot="other">Button</zeta-button>
        </zeta-dialog>`
  ) => {
    // prettier-ignore
    return fixture<ZetaDialog>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  const createFlavoredDialog = async (subject: ZetaDialog, flavor: DialogFlavor = "default") => {
    subject.remove();
    await elementUpdated(subject);
    return await createComponent(`<zeta-dialog id="dialog1" title="Dialog title" flavor=${flavor} initialOpen>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          <zeta-icon slot="icon">block</zeta-icon>
          <zeta-button slot="confirm">Button</zeta-button>
          <zeta-button slot="cancel">Button</zeta-button>
          <zeta-button slot="other">Button</zeta-button>
        </zeta-dialog>`);
  };

  describe("Accessibility", () => {
    //Remove the theme and contrast stylesheets after each test
    afterEach(() => {
      document.getElementById("theme-mode")?.remove();
      document.getElementById("contrast-mode")?.remove();
    });

    flavors.map(flavor => {
      it(`meets contrast requirements for the ${flavor} flavor`, async () => {
        subject = await createFlavoredDialog(subject, flavor as DialogFlavor);
        await elementUpdated(subject);
        // Check color contrast between text and background
        const dialogEl = subject.shadowRoot?.querySelector("dialog");
        if (dialogEl) {
          await contrastTest(`Dialog ${flavor} `, dialogEl, dialogEl);
        }
      });
      it(`meets aria requirements for the ${flavor} flavor`, async () => {
        subject = await createFlavoredDialog(subject, flavor as DialogFlavor);
        await expect(subject).to.be.accessible();
        await expect(subject).shadowDom.to.be.accessible();
      });
    });
  });

  describe("Content", () => {
    it("creates from document.createElement", function () {
      const el = document.createElement("zeta-dialog");
      assert.equal("ZETA-DIALOG", el.nodeName);
    });

    it("creates from constructor", function () {
      const el = new ZetaDialog();
      assert.equal("ZETA-DIALOG", el.nodeName);
    });

    it("changes open property on open", async () => {
      // prettier-ignore
      const el = await fixture<ZetaDialog>(html` <zeta-dialog> </zeta-dialog> `);
      await el.updateComplete;
      await el.show();
      assert.equal(el.open, true);
    });

    it("changes open property on close", async () => {
      // prettier-ignore
      const el = await fixture<ZetaDialog>(html` <zeta-dialog> </zeta-dialog> `);
      await el.show();
      await el.hide();
      assert.equal(el.open, false);
    });

    it("calls close method and sets return value", async () => {
      // prettier-ignore
      const el = await fixture<ZetaDialog>(html` <zeta-dialog> </zeta-dialog> `);
      await el.show();
      await el.hide("testing");
      assert.equal(el.returnValue, "testing");
    });

    it("closes when clicking on the barrier if closeOnBarrierClick is true", async () => {
      // prettier-ignore
      const el = await fixture<ZetaDialog>(html`<zeta-dialog .closeOnBarrierClicked=${true}></zeta-dialog>`);
      await el.showModal();
      const dialogElement = el.shadowRoot?.querySelector("dialog");
      dialogElement?.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
      await el.updateComplete;
      expect(el.open).to.be.false;
    });

    it("does not close when clicking on the barrier if closeOnBarrierClick is false", async () => {
      // prettier-ignore
      const el = await fixture<ZetaDialog>(html`<zeta-dialog .closeOnBarrierClicked=${false}></zeta-dialog>`);
      await el.showModal();
      const dialogElement = el.shadowRoot?.querySelector("dialog");
      dialogElement?.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
      await el.updateComplete;
      expect(el.open).to.be.true;
    });

    it("renders an icon", async () => {
      const icon = subject.shadowRoot?.querySelector("zeta-icon");
      expect(icon).to.exist;
      await expect(icon?.name).to.equal("block");
    });

    it("renders the correct icon for each flavor", async () => {
      for (const flavor of flavors) {
        subject = await createFlavoredDialog(subject, flavor as DialogFlavor);
        await elementUpdated(subject);
        const icon = subject.shadowRoot?.querySelector("zeta-icon");
        const expectedIcon = flavor === "success" ? "verified" : flavor === "default" ? "block" : flavor;
        await expect(icon?.name).to.equal(expectedIcon);
      }
    });

    it("renders the title in the header slot", () => {
      const headerH1 = subject.shadowRoot?.querySelector("header h1");
      expect(headerH1).to.exist;
      expect(headerH1?.textContent).to.include("Dialog title");
    });

    it("renders the confirm button in the 'confirm' slot", () => {
      const confirmButton = subject.querySelector('zeta-button[slot="confirm"]');
      expect(confirmButton).to.exist;
      expect(confirmButton?.textContent).to.include("Button");
    });

    it("renders the cancel button in the 'cancel' slot", () => {
      const cancelButton = subject.querySelector('zeta-button[slot="cancel"]');
      expect(cancelButton).to.exist;
      expect(cancelButton?.textContent).to.include("Button");
    });

    it("renders the other button in the 'other' slot", () => {
      const otherButton = subject.querySelector('zeta-button[slot="other"]');
      expect(otherButton).to.exist;
      expect(otherButton?.textContent).to.include("Button");
    });

    it("truncates the label when text is longer than button width", async () => {
      const headerH1 = subject.shadowRoot?.querySelector("header h1");
      expect(headerH1).to.exist;
      headerH1!.textContent = "This title is very long and should be truncated";
      await elementUpdated(subject);
      expect((headerH1 as HTMLElement).offsetWidth).to.be.lessThan((headerH1 as HTMLElement).scrollWidth);
      await expect(getComputedStyle(headerH1 as HTMLElement).textOverflow).to.equal("ellipsis");
      await expect(getComputedStyle(headerH1 as HTMLElement).overflow).to.equal("hidden");
    });
  });

  describe("Dimensions", () => {
    it("renders the correct width", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      await expect(getComputedStyle(dialog!).width).to.equal("480px");
    });

    it("renders the correct height", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      await expect(getComputedStyle(dialog!).height).to.equal("256px");
    });

    it("stays the same width when the title is very long", async () => {
      const headerH1 = subject.shadowRoot?.querySelector("header h1");
      expect(headerH1).to.exist;
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      headerH1!.textContent = "This title is very long and should not change the dialog width";
      await elementUpdated(subject);
      await expect(getComputedStyle(dialog!).width).to.equal("480px");
    });

    it("stays the same width when the content is very long", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      const body = subject.shadowRoot?.querySelector("div[part='body']");
      expect(body).to.exist;
      body!.textContent = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Nulla blandit maximus iaculis. Donec quam lacus, feugiat vel pellentesque nec, 
      pharetra eu ante. Cras ante nisi, iaculis non sapien non, gravida tempus magna. 
      Aenean in ligula convallis, ullamcorper tortor id, vehicula mi. 
      Duis sit amet lacus blandit, lacinia ligula a, tristique tortor.`;
      await elementUpdated(subject);
      await expect(getComputedStyle(dialog!).width).to.equal("480px");
    });

    it("adjusts height to fit content when the content is very long", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      const body = subject.shadowRoot?.querySelector("div[part='body']");
      expect(body).to.exist;
      body!.textContent = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Nulla blandit maximus iaculis. Donec quam lacus, feugiat vel pellentesque nec, 
      pharetra eu ante. Cras ante nisi, iaculis non sapien non, gravida tempus magna. 
      Aenean in ligula convallis, ullamcorper tortor id, vehicula mi. 
      Duis sit amet lacus blandit, lacinia ligula a, tristique tortor.`;
      await elementUpdated(subject);
      await expect(getComputedStyle(dialog!).height).to.not.equal("256px");
    });
  });

  describe("Styling", () => {
    it("has the --surface-default background colour", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      await expect(getComputedStyle(dialog!).backgroundColor).to.equal("rgb(255, 255, 255)");
    });

    it("has the --main-default font colour", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      await expect(getComputedStyle(dialog!).color).to.equal("rgb(29, 30, 35)");
    });

    it("has the border-default border colour", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      const borderColor = getComputedStyle(dialog!).borderColor;
      await expect(borderColor).to.equal("rgb(206, 210, 219)");
    });

    it("has the correct icon colour for each flavor", async () => {
      for (const flavor of flavors) {
        subject = await createFlavoredDialog(subject, flavor as DialogFlavor);
        await elementUpdated(subject);
        const icon = subject.shadowRoot?.querySelector("zeta-icon");
        expect(icon).to.exist;
        if (flavor === "success") {
          await expect(getComputedStyle(icon!).color).to.equal("rgb(0, 134, 79)");
        } else if (flavor === "error") {
          await expect(getComputedStyle(icon!).color).to.equal("rgb(215, 0, 21)");
        } else if (flavor === "warning") {
          await expect(getComputedStyle(icon!).color).to.equal("rgb(174, 101, 0)");
        } else if (flavor === "info") {
          await expect(getComputedStyle(icon!).color).to.equal("rgb(126, 12, 255)");
        } else if (flavor === "default") {
          await expect(getComputedStyle(icon!).color).to.equal("rgb(29, 30, 35)");
        }
      }
    });

    it("has the correct confirm button background colour when confirmButtonFlavor is changed", async () => {
      const buttonEl = subject.querySelector('zeta-button[slot="confirm"]')?.shadowRoot?.querySelector("button");
      expect(buttonEl).to.exist;
      for (const flavor of confirmButtonFlavors) {
        subject.confirmButtonFlavor = flavor as "primary" | "positive" | "negative";
        await elementUpdated(subject);
        if (flavor === "primary") {
          await expect(getComputedStyle(buttonEl!).backgroundColor).to.equal("rgb(0, 115, 230)");
        } else if (flavor === "positive") {
          await expect(getComputedStyle(buttonEl!).backgroundColor).to.equal("rgb(0, 134, 79)");
        } else if (flavor === "negative") {
          await expect(getComputedStyle(buttonEl!).backgroundColor).to.equal("rgb(215, 0, 21)");
        }
      }
    });

    it("has primary button flavour by default", async () => {
      const buttonEl = subject.querySelector('zeta-button[slot="confirm"]')?.shadowRoot?.querySelector("button");
      expect(buttonEl).to.exist;
      await expect(getComputedStyle(buttonEl!).backgroundColor).to.equal("rgb(0, 115, 230)");
    });

    it("has the correct background colour when confirm button is hovered for each flavor", async () => {
      const buttonEl = subject.querySelector('zeta-button[slot="confirm"]')?.shadowRoot?.querySelector("button");
      expect(buttonEl).to.exist;
      for (const flavor of confirmButtonFlavors) {
        subject.confirmButtonFlavor = flavor as "primary" | "positive" | "negative";
        await MouseActions.hover(buttonEl!);
        await elementUpdated(subject);
        if (flavor === "primary") {
          await expect(getComputedStyle(buttonEl!).backgroundColor).to.equal("rgb(89, 159, 229)");
        } else if (flavor === "positive") {
          await expect(getComputedStyle(buttonEl!).backgroundColor).to.equal("rgb(103, 183, 150)");
        } else if (flavor === "negative") {
          await expect(getComputedStyle(buttonEl!).backgroundColor).to.equal("rgb(243, 97, 112)");
        }
      }
    });

    it("has the correct background colour when the cancel button is hovered", async () => {
      const buttonEl = subject.querySelector('zeta-button[slot="cancel"]')?.shadowRoot?.querySelector("button");
      expect(buttonEl).to.exist;
      await MouseActions.hover(buttonEl!);
      await elementUpdated(subject);
      await expect(getComputedStyle(buttonEl!).backgroundColor).to.equal("rgb(243, 246, 250)");
    });
  });

  describe("Interaction", () => {
    it("closes the dialog when the close button is clicked", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      const closeButton = subject.shadowRoot?.querySelector('zeta-icon[name="close"]');
      expect(closeButton).to.exist;
      const eventSpy = sinon.spy();
      closeButton!.addEventListener("click", eventSpy);
      await MouseActions.click(closeButton! as HTMLElement);
      await elementUpdated(subject);
      expect(dialog!.open).to.be.false;
    });
    it("opens the dialog when show() is called", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      await subject.show();
      await elementUpdated(subject);
      expect(dialog!.open).to.be.true;
    });
    it("closes the dialog when hide() is called", async () => {
      const dialog = subject.shadowRoot?.querySelector("dialog");
      expect(dialog).to.exist;
      await subject.hide();
      await elementUpdated(subject);
      expect(dialog!.open).to.be.false;
    });
    it("calls the onClick handler when the confirm button is clicked", async () => {
      const confirmButton = subject.querySelector('zeta-button[slot="confirm"]');
      expect(confirmButton).to.exist;
      const eventSpy = sinon.spy();
      confirmButton!.addEventListener("click", eventSpy);
      await MouseActions.click(confirmButton! as HTMLElement);
      expect(eventSpy).to.have.been.calledOnce;
    });
    it("calls the onClick handler when the cancel button is clicked", async () => {
      const cancelButton = subject.querySelector('zeta-button[slot="cancel"]');
      expect(cancelButton).to.exist;
      const eventSpy = sinon.spy();
      cancelButton!.addEventListener("click", eventSpy);
      await MouseActions.click(cancelButton! as HTMLElement);
      expect(eventSpy).to.have.been.calledOnce;
    });
    it("calls the onClick handler when the other button is clicked", async () => {
      const otherButton = subject.querySelector('zeta-button[slot="other"]');
      expect(otherButton).to.exist;
      const eventSpy = sinon.spy();
      otherButton!.addEventListener("click", eventSpy);
      await MouseActions.click(otherButton! as HTMLElement);
      expect(eventSpy).to.have.been.calledOnce;
    });
  });
  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
