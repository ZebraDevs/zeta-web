import { fixture, html, unsafeStatic, expect, elementUpdated, assert } from "@open-wc/testing";
import { ZetaCheckbox } from "../../components/checkbox/checkbox.js";
import "../../components/checkbox/checkbox.js";
import { getCssVarColorValue, getCssVarPxValue } from "../utils.js";
import "../../index.css";

describe("zeta-checkbox", () => {
  let subject: ZetaCheckbox;

  const createComponent = (template = `<zeta-checkbox></zeta-checkbox>`) => {
    // prettier-ignore
    return fixture<ZetaCheckbox>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    const input = () => subject.shadowRoot!.querySelector("input")!;

    it("keeps aria-checked in sync with checked", async () => {
      expect(subject.getAttribute("aria-checked")).to.equal("false");
      subject.checked = true;
      await elementUpdated(subject);
      expect(subject.getAttribute("aria-checked")).to.equal("true");
      expect(input().getAttribute("aria-checked")).to.equal("true");
    });

    it("exposes indeterminate as mixed", async () => {
      subject.indeterminate = true;
      await elementUpdated(subject);
      expect(subject.getAttribute("aria-checked")).to.equal("mixed");
      expect(input().getAttribute("aria-checked")).to.equal("mixed");
    });

    it("leaves mixed once clicked", async () => {
      subject.indeterminate = true;
      await elementUpdated(subject);
      subject.shadowRoot!.querySelector("label")!.click();
      await elementUpdated(subject);
      expect(subject.getAttribute("aria-checked")).to.equal("true");
    });
  });

  /** TODO need a full reassess of form control labels */
  // describe("Accessibility", () => {
  //   it.skip("meets accessibility requirements", async () => {
  //     const el = await fixture(html`<label for="checky">Label</label><zeta-checkbox name="checky"></zeta-checkbox>`);
  //     expect(el).to.be.accessible();
  //   });

  //   it.skip("doesn't meet accessibility requirement without a label", async () => {
  //     const el = await fixture(html`<zeta-checkbox></zeta-checkbox>`);
  //     expect(el).not.to.be.accessible();
  //   });

  //   it.skip("is accessible by adding aria-label", async () => {
  //     const el = await fixture(html`<zeta-checkbox aria-label="Test Checkbox"></zeta-checkbox>`);
  //     expect(el).to.be.accessible();
  //   });
  // });

  describe("Content", () => {
    it("sets the name attribute correctly", async () => {
      const name = "myCheckbox";
      subject.name = name;
      await elementUpdated(subject);

      const inputElement = subject.shadowRoot?.querySelector("input");
      expect(inputElement).to.not.be.undefined;
      expect(inputElement?.getAttribute("name")).to.equal(name);
    });

    it("sets the id attribute correctly", async () => {
      const id = "myCheckbox";
      subject.setAttribute("id", id);
      await elementUpdated(subject);

      const inputElement = subject.shadowRoot?.querySelector("input");
      expect(inputElement).to.not.be.undefined;
      expect(inputElement?.getAttribute("id")).to.equal(id);
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

  describe("Dimensions", () => {
    const box = () => subject.shadowRoot!.querySelector(".container") as HTMLElement;
    const targetSize = (el: HTMLElement) => {
      const style = getComputedStyle(el);
      return el.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    };

    it("defaults to large: control-xs box inside a control-target-min target", () => {
      expect(subject.size).to.equal("large");
      expect(box().offsetWidth).to.equal(getCssVarPxValue(subject, "--control-xs"));
      expect(targetSize(box())).to.equal(getCssVarPxValue(subject, "--control-target-min"));
    });

    it("renders legacy medium the same as large", async () => {
      subject.size = "medium";
      await elementUpdated(subject);
      expect(box().offsetWidth).to.equal(getCssVarPxValue(subject, "--control-xs"));
    });

    it("renders the small box at control-icon-sm inside the same target", async () => {
      subject.size = "small";
      await elementUpdated(subject);
      expect(box().offsetWidth).to.equal(getCssVarPxValue(subject, "--control-icon-sm"));
      expect(targetSize(box())).to.equal(getCssVarPxValue(subject, "--control-target-min"));
    });
  });

  describe("Styling", () => {
    const box = () => subject.shadowRoot!.querySelector(".container") as HTMLElement;

    it("unchecked box has selection border and no fill", () => {
      expect(getComputedStyle(box()).borderColor).to.equal(getCssVarColorValue(subject, "--interactive-selection-border-default"));
      expect(getComputedStyle(box()).backgroundColor).to.equal("rgba(0, 0, 0, 0)");
    });

    for (const state of ["checked", "indeterminate"] as const) {
      it(`${state} box uses pressed selection tokens`, async () => {
        subject[state] = true;
        await elementUpdated(subject);
        expect(getComputedStyle(box()).borderColor).to.equal(getCssVarColorValue(subject, "--interactive-selection-border-pressed"));
        expect(getComputedStyle(box()).backgroundColor).to.equal(getCssVarColorValue(subject, "--interactive-selection-background-pressed"));
      });
    }

    it("disabled checked box uses disabled selection tokens and keeps the mark", async () => {
      subject.checked = true;
      subject.disabled = true;
      await elementUpdated(subject);
      expect(getComputedStyle(box()).borderColor).to.equal(getCssVarColorValue(subject, "--interactive-selection-border-disabled"));
      expect(getComputedStyle(box()).backgroundColor).to.equal(getCssVarColorValue(subject, "--interactive-selection-background-disabled"));
      const icon = subject.shadowRoot!.querySelector("[part=icon]") as HTMLElement;
      expect(getComputedStyle(icon).display).to.not.equal("none");
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

  // describe("Accessibility", () => {});

  describe("Content", () => {
    it("renders the checkbox label correctly", () => {
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
    it("checks the checkbox when label text is clicked", async () => {
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
