import { fixture, html, unsafeStatic, expect, elementUpdated } from "@open-wc/testing";
import type { ZetaRadioButton } from "../../components/radio-button/radio-button.js";
import "../../components/radio-button/radio-button.js";

describe("zeta-radio-button", () => {
  let subject: ZetaRadioButton;

  const createComponent = (template = `<zeta-radio-button></zeta-radio-button>`) => {
    // prettier-ignore
    return fixture<ZetaRadioButton>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  /** TODO need a full reassess of form control labels */
  describe.skip("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      const el = await fixture(html`<label for="checky">Label</label><zeta-radio-button name="checky"></zeta-radio-button>`);
      await expect(el).to.be.accessible();
    });

    it("doesn't meet accessibility requirement without a label", async () => {
      const el = await fixture(html`<zeta-radio-button></zeta-radio-button>`);
      await expect(el).not.to.be.accessible();
    });

    it("is accessible by adding aria-label", async () => {
      const el = await fixture(html`<zeta-radio-button aria-label="Test radio button"></zeta-radio-button>`);
      await expect(el).to.be.accessible();
    });
  });

  describe("Content", () => {
    it("sets the name attribute correctly", async () => {
      const name = "myRadioButton";
      subject.name = name;
      await elementUpdated(subject);

      const inputElement = subject.shadowRoot?.querySelector("input");
      expect(inputElement).to.not.be.undefined;
      await expect(inputElement?.getAttribute("name")).to.equal(name);
    });

    it("sets the id attribute correctly", async () => {
      const id = "myRadioButton";
      subject.id = id;
      await elementUpdated(subject);

      const inputElement = subject.shadowRoot?.querySelector("input");
      expect(inputElement).to.not.be.undefined;
      await expect(inputElement?.getAttribute("id")).to.equal(id);
    });

    it("renders the radio button as unchecked by default", async () => {
      await expect(subject.checked).to.equal(false);
    });
  });

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  describe("Interaction", () => {
    it("changes the checked state when clicked", async () => {
      const interactiveNode = subject.shadowRoot?.querySelector("label");
      expect(subject.getAttribute("checked")).to.be.null;
      interactiveNode?.click();
      await elementUpdated(subject);
      await expect(subject.getAttribute("checked")).to.be.equal("");
      expect(subject.checked).to.be.true;
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});

describe("zeta-radio-button label", () => {
  let subject: ZetaRadioButton;
  const labelTest = "Test Label";

  const createComponent = (template = `<zeta-radio-button>${labelTest}</zeta-radio-button>`) => {
    // prettier-ignore
    return fixture<ZetaRadioButton>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  // describe("Accessibility", () => {});

  describe("Content", () => {
    it("renders the radio label correctly", async () => {
      const slot = subject.shadowRoot?.querySelector("slot");
      await expect(
        slot
          ?.assignedNodes()
          .map(a => a.nodeValue)
          .join()
      ).to.equal(labelTest);
    });
  });

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  describe("Interaction", () => {
    it("checks the radio when label is clicked", async () => {
      const labelText = subject.shadowRoot?.querySelector("slot");
      expect(subject.getAttribute("checked")).to.be.null;
      labelText?.click();
      await elementUpdated(subject);
      await expect(subject.getAttribute("checked")).to.be.equal("");
      expect(subject.checked).to.be.true;
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
