import { fixture, html, unsafeStatic, expect, elementUpdated } from "@open-wc/testing";
import type { ZetaRadioButton } from "../../components/radio-button/radio-button.js";
import "../../components/radio-button/radio-button.js";
import { getCssVarColorValue, getCssVarPxValue, MouseActions } from "../utils.js";
import "../../index.css";

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
  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      const el = await fixture(html`<label for="checky">Label</label><zeta-radio-button name="checky"></zeta-radio-button>`);
      expect(el).to.be.accessible();
    });

    it("doesn't meet accessibility requirement without a label", async () => {
      const el = await fixture(html`<zeta-radio-button></zeta-radio-button>`);
      expect(el).not.to.be.accessible();
    });

    it("is accessible by adding aria-label", async () => {
      const el = await fixture(html`<zeta-radio-button aria-label="Test radio button"></zeta-radio-button>`);
      expect(el).to.be.accessible();
    });
  });

  describe("Content", () => {
    it("sets the name attribute correctly", async () => {
      const name = "myRadioButton";
      subject.name = name;
      await elementUpdated(subject);

      const inputElement = subject.shadowRoot?.querySelector("input");
      expect(inputElement).to.not.be.undefined;
      expect(inputElement?.getAttribute("name")).to.equal(name);
    });

    it("sets the id attribute correctly", async () => {
      const id = "myRadioButton";
      subject.id = id;
      await elementUpdated(subject);

      const inputElement = subject.shadowRoot?.querySelector("input");
      expect(inputElement).to.not.be.undefined;
      expect(inputElement?.getAttribute("id")).to.equal(id);
    });

    it("renders the radio button as unchecked by default", () => {
      expect(subject.checked).to.equal(false);
    });
  });

  describe("Dimensions", () => {
    const ring = () => subject.shadowRoot!.querySelector(".container") as HTMLElement;
    const dot = () => subject.shadowRoot!.querySelector("[part=icon]") as HTMLElement;
    const targetSize = (el: HTMLElement) => {
      const style = getComputedStyle(el);
      return el.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    };

    it("defaults to large: control-xs ring and 12px fill inside a control-target-min target", async () => {
      expect(subject.size).to.equal("large");
      subject.checked = true;
      await elementUpdated(subject);
      expect(ring().offsetWidth).to.equal(getCssVarPxValue(subject, "--control-xs"));
      expect(dot().offsetWidth).to.equal(12);
      expect(targetSize(ring())).to.equal(getCssVarPxValue(subject, "--control-target-min"));
    });

    it("renders legacy medium the same as large", async () => {
      subject.size = "medium";
      await elementUpdated(subject);
      expect(ring().offsetWidth).to.equal(getCssVarPxValue(subject, "--control-xs"));
    });

    it("renders the small ring at control-icon-sm with an 8px fill inside the same target", async () => {
      subject.size = "small";
      subject.checked = true;
      await elementUpdated(subject);
      expect(ring().offsetWidth).to.equal(getCssVarPxValue(subject, "--control-icon-sm"));
      expect(dot().offsetWidth).to.equal(8);
      expect(targetSize(ring())).to.equal(getCssVarPxValue(subject, "--control-target-min"));
    });
  });

  describe("Styling", () => {
    const ring = () => subject.shadowRoot!.querySelector(".container") as HTMLElement;
    const dot = () => subject.shadowRoot!.querySelector("[part=icon]") as HTMLElement;

    it("unchecked ring uses the default selection border, no fill and no dot", () => {
      expect(getComputedStyle(ring()).borderColor).to.equal(getCssVarColorValue(subject, "--interactive-selection-border-default"));
      expect(getComputedStyle(ring()).backgroundColor).to.equal("rgba(0, 0, 0, 0)");
      expect(getComputedStyle(dot()).display).to.equal("none");
    });

    it("checked ring and fill use pressed selection tokens", async () => {
      subject.checked = true;
      await elementUpdated(subject);
      expect(getComputedStyle(ring()).borderColor).to.equal(getCssVarColorValue(subject, "--interactive-selection-border-pressed"));
      expect(getComputedStyle(dot()).backgroundColor).to.equal(
        getCssVarColorValue(subject, "--interactive-selection-background-pressed")
      );
    });

    it("disabled checked ring and fill use disabled selection tokens", async () => {
      subject.checked = true;
      subject.disabled = true;
      await elementUpdated(subject);
      expect(getComputedStyle(ring()).borderColor).to.equal(getCssVarColorValue(subject, "--interactive-selection-border-disabled"));
      expect(getComputedStyle(dot()).backgroundColor).to.equal(
        getCssVarColorValue(subject, "--interactive-selection-background-disabled")
      );
    });

    it("label uses label-medium at every size", async () => {
      const label = subject.shadowRoot!.querySelector("label") as HTMLElement;
      for (const size of ["small", "medium", "large"] as const) {
        subject.size = size;
        await elementUpdated(subject);
        expect(getComputedStyle(label).fontSize).to.equal(`${getCssVarPxValue(subject, "--label-medium-font-size")}px`);
      }
    });
  });

  describe("Interaction", () => {
    it("fills the checked dot with foreground-secondary and steps the ring on hover", async () => {
      subject.checked = true;
      await elementUpdated(subject);
      const ring = subject.shadowRoot!.querySelector(".container") as HTMLElement;
      const dot = subject.shadowRoot!.querySelector("[part=icon]") as HTMLElement;
      await MouseActions.hover(ring);
      expect(getComputedStyle(dot).backgroundColor).to.equal(getCssVarColorValue(subject, "--foreground-secondary"));
      expect(getComputedStyle(ring).borderColor).to.equal(getCssVarColorValue(subject, "--interactive-selection-border-hover"));
      await MouseActions.reset();
      expect(getComputedStyle(dot).backgroundColor).to.equal(getCssVarColorValue(subject, "--interactive-selection-background-pressed"));
    });

    it("changes the checked state when clicked", async () => {
      const interactiveNode = subject.shadowRoot?.querySelector("label");
      expect(subject.getAttribute("checked")).to.be.null;
      interactiveNode?.click();
      await elementUpdated(subject);
      expect(subject.getAttribute("checked")).to.be.equal("");
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
    it("renders the radio label correctly", () => {
      const slot = subject.shadowRoot?.querySelector("slot");
      expect(
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
      expect(subject.getAttribute("checked")).to.be.equal("");
      expect(subject.checked).to.be.true;
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
