import { assert, fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import { ZetaDialog, type DialogFlavor } from "../../components/dialog/dialog.js";
import "../../components/dialog/dialog.js";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";
import "../../index.css";

const flavors = ["default", "info", "success", "warning", "error"];

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

  describe("Accessibility", async () => {
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
        subject.flavor = flavor as typeof subject.flavor;
        await elementUpdated(subject);
        const icon = subject.shadowRoot?.querySelector("zeta-icon");
        //fix verified
        flavor === "default" ? await expect(icon?.name).to.equal("block") : await expect(icon?.name).to.equal(flavor);
      }
    });
  });

  //TODO:: write rest of tests
  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
