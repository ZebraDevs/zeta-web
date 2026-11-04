import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaInputChip } from "../../../index.js";
import "../../../index.js";
import { getCssVarColorValue, getCssVarPxValue } from "../../utils.js";

const labelText = "Label";

describe("zeta-input-chip", () => {
  let subject: ZetaInputChip;

  const createComponent = (template = `<zeta-input-chip>${labelText}</zeta-input-chip>`) => {
    // prettier-ignore
    return fixture<ZetaInputChip>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("it meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("sets the correct text on the chip", () => {
      expect(subject.lastChild?.nodeValue).to.equal(labelText);
    });
  });

  describe("Dimensions", () => {
    it("is control-target-min tall", () => {
      const container = subject.shadowRoot!.querySelector(".container")!;
      expect(container.getBoundingClientRect().height).to.equal(getCssVarPxValue(container, "--control-target-min"));
    });
  });

  describe("Styling", () => {
    it("uses the ghost background and label/medium font", () => {
      const container = subject.shadowRoot!.querySelector(".container")!;
      const style = getComputedStyle(container);
      expect(style.backgroundColor).to.equal(getCssVarColorValue(container, "--interactive-ghost-background-default"));
      expect(style.fontSize).to.equal(`${getCssVarPxValue(container, "--label-medium-font-size")}px`);
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
