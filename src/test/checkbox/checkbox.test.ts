import { fixture, html, unsafeStatic, expect, elementUpdated, assert } from "@open-wc/testing";
import { ZetaCheckbox } from "../../components/checkbox/checkbox.js";
import "../../components/checkbox/checkbox.js";

describe("zeta-checkbox", () => {
  let subject: ZetaCheckbox;

  const createComponent = (template = `<zeta-checkbox></zeta-checkbox>`) => {
    // prettier-ignore
    return fixture<ZetaCheckbox>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  /** TODO need a full reassess of form control labels */
  // describe("Accessibility Tests", () => {
  //   it.skip("meets accessibility requirements", async () => {
  //     const el = await fixture(html`<label for="checky">Label</label><zeta-checkbox name="checky"></zeta-checkbox>`);
  //     await expect(el).to.be.accessible();
  //   });

  //   it.skip("doesn't meet accessibility requirement without a label", async () => {
  //     const el = await fixture(html`<zeta-checkbox></zeta-checkbox>`);
  //     await expect(el).not.to.be.accessible();
  //   });

  //   it.skip("is accessible by adding aria-label", async () => {
  //     const el = await fixture(html`<zeta-checkbox aria-label="Test Checkbox"></zeta-checkbox>`);
  //     await expect(el).to.be.accessible();
  //   });
  // });

  describe("Content Tests", () => {
    it("sets the name attribute correctly", async () => {
      const name = "myCheckbox";
      subject.name = name;
      await elementUpdated(subject);

      const inputElement = subject.shadowRoot?.querySelector("input");
      expect(inputElement).to.not.be.undefined;
      await expect(inputElement?.getAttribute("name")).to.equal(name);
    });

    it("sets the id attribute correctly", async () => {
      const id = "myCheckbox";
      subject.setAttribute("id", id);
      await elementUpdated(subject);

      const inputElement = subject.shadowRoot?.querySelector("input");
      expect(inputElement).to.not.be.undefined;
      await expect(inputElement?.getAttribute("id")).to.equal(id);
    });

    it("creates from document.createElement", function () {
      const el = document.createElement("zeta-checkbox");
      assert.equal("ZETA-CHECKBOX", el.nodeName);
    });

    it("creates from constructor", function () {
      const el = new ZetaCheckbox();
      assert.equal("ZETA-CHECKBOX", el.nodeName);
    });
  });

  // describe("Dimensions Tests", () => {});

  // describe("Styling Tests", () => {});

  describe("Interaction Tests", () => {
    it("changes the checked state when clicked", async () => {
      subject.click();
      await expect(subject.checked).to.equal(true);
    });
  });

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});

describe("zeta-checkbox + label", () => {
  let subject: ZetaCheckbox;
  const labelTest = "Test Label";

  const createComponent = (template = `<zeta-checkbox id="checkbox">${labelTest}</zeta-checkbox>`) => {
    // prettier-ignore
    return fixture<ZetaCheckbox>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  // describe("Accessibility Tests", () => {});

  describe("Content Tests", () => {
    it("renders the checkbox label correctly", async () => {
      const slot = subject.shadowRoot?.querySelector("slot");
      await expect(
        slot
          ?.assignedNodes()
          .map(a => a.nodeValue)
          .join()
      ).to.equal(labelTest);
    });
  });

  // describe("Dimensions Tests", () => {});

  // describe("Styling Tests", () => {});

  describe("Interaction Tests", () => {
    it("checks the checkbox when label is clicked", async () => {
      const labelText = subject.shadowRoot?.querySelector("label");
      expect(subject.getAttribute("checked")).to.be.null;
      labelText?.click();
      await elementUpdated(subject);
      await expect(subject.getAttribute("checked")).to.be.equal("");
      expect(subject.checked).to.be.true;
    });
  });

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});
