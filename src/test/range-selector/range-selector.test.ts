import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import { type ZetaRangeSelector } from "../../components/slider/range-selector/range-selector.js";
import "../../components/slider/range-selector/range-selector.js";

import "../../index.css";
import { getCssVarColorValue, getCssVarPxValue, getCssVarValue } from "../utils.js";

describe("zeta-range-selector", () => {
  let subject: ZetaRangeSelector;

  const createComponent = (template = `<zeta-range-selector></zeta-range-selector>`) => {
    // prettier-ignore
    return fixture<ZetaRangeSelector>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", () => {
      expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("renders the zeta slider", () => {
      const slider = subject.shadowRoot?.querySelector("zeta-slider");
      expect(slider).to.exist;
    });

    it("renders the label", async () => {
      subject.label = "Label";
      await subject.updateComplete;

      const label = subject.shadowRoot?.querySelector("label");
      expect(label).to.exist;

      const labelText = label?.textContent;
      expect(labelText).to.equal("Label");
    });

    it("renders the lower input field", () => {
      const input = subject.shadowRoot?.querySelector(".lower-input") as HTMLInputElement;
      expect(input).to.exist;

      const inputValue = input?.value;
      expect(inputValue).to.equal("10");
    });

    it("renders the upper input field", () => {
      const input = subject.shadowRoot?.querySelector(".upper-input") as HTMLInputElement;
      expect(input).to.exist;

      const inputValue = input?.value;
      expect(inputValue).to.equal("90");
    });

    it("sets the initial values correctly", () => {
      expect(subject.initialValues.min).to.equal(10);
      expect(subject.initialValues.max).to.equal(90);
      expect(subject.min).to.equal(0);
      expect(subject.max).to.equal(100);
      expect(subject.stepIncrement).to.equal(undefined);
      expect(subject.label).to.equal(undefined);
      expect(subject.disabled).to.equal(false);
      expect(subject.error).to.equal(false);
      expect(subject.rounded).to.equal(true);
      expect(subject.name).to.equal("");
    });
  });

  describe("Dimensions", () => {
    it("sets the lower input width and height correctly", () => {
      const lowerInput = subject.shadowRoot?.querySelector("input.lower-input");
      const inputPaddingLeft = getComputedStyle(lowerInput!).paddingLeft?.split("px")?.shift();
      const inputPaddingRight = getComputedStyle(lowerInput!).paddingRight?.split("px")?.shift();
      const inputWidth = 56 + parseInt(inputPaddingLeft!) + parseInt(inputPaddingRight!);

      expect(lowerInput?.clientWidth).to.equal(inputWidth);
      expect((lowerInput as HTMLElement).offsetHeight).to.equal(getCssVarPxValue(lowerInput!, "--control-md"));
    });

    it("sets the upper input width and height correctly", () => {
      const upperInput = subject.shadowRoot?.querySelector("input.upper-input");
      const upperinputPaddingLeft = getComputedStyle(upperInput!).paddingLeft?.split("px")?.shift();
      const upperinputPaddingRight = getComputedStyle(upperInput!).paddingRight?.split("px")?.shift();
      const upperInputWidth = 56 + parseInt(upperinputPaddingLeft!) + parseInt(upperinputPaddingRight!);

      expect(upperInput?.clientWidth).to.equal(upperInputWidth);
      expect((upperInput as HTMLElement).offsetHeight).to.equal(getCssVarPxValue(upperInput!, "--control-md"));
    });
  });

  describe("Styling", () => {
    it("sets the correct styles for the label", async () => {
      subject.label = "Label";
      await subject.updateComplete;
      const label = subject.shadowRoot?.querySelector("label");

      const labelFontSize = getComputedStyle(label!).fontSize;
      const labelFontWeight = getComputedStyle(label!).fontWeight;
      const labelColor = getComputedStyle(label!).color;

      expect(labelFontSize).to.equal(getCssVarValue(label as Element, "--label-medium-font-size"));
      expect(labelFontWeight).to.equal(getCssVarValue(label as Element, "--label-medium-font-weight"));
      expect(labelColor).to.equal(getCssVarColorValue(label as Element, "--foreground-primary"));
    });

    it("sets the correct styles for the lower input", () => {
      const input = subject.shadowRoot?.querySelector("input.lower-input");

      const inputFontSize = getComputedStyle(input!).fontSize;
      const inputFontWeight = getComputedStyle(input!).fontWeight;
      const inputColor = getComputedStyle(input!).color;

      expect(inputFontSize).to.equal("16px");
      expect(inputFontWeight).to.equal("400");
      expect(inputColor).to.equal(getCssVarColorValue(input as Element, "--foreground-primary"));
    });

    it("sets the correct styles for the upper input", () => {
      const input = subject.shadowRoot?.querySelector("input.upper-input");

      const inputFontSize = getComputedStyle(input!).fontSize;
      const inputFontWeight = getComputedStyle(input!).fontWeight;
      const inputColor = getComputedStyle(input!).color;

      expect(inputFontSize).to.equal("16px");
      expect(inputFontWeight).to.equal("400");
      expect(inputColor).to.equal(getCssVarColorValue(input as Element, "--foreground-primary"));
    });
  });

  describe("Interaction", () => {
    it("updates the hidden input value when the slider value changes", () => {
      const slider = subject.shadowRoot?.querySelector("zeta-slider");
      slider?.dispatchEvent(new CustomEvent("change", { detail: { min: 25, max: 75 } }));

      const input = subject.shadowRoot?.querySelector("input#hidden-range-selector-input") as HTMLInputElement;
      const inputValue = input?.value;
      expect(inputValue).to.equal("25-75");
    });

    it("updates the slider value when the lower input value changes", async () => {
      const input = subject.shadowRoot?.querySelector("input.lower-input") as HTMLInputElement;
      if (input) {
        input.value = "25";
        input.dispatchEvent(new Event("input"));
      }

      await subject.updateComplete;

      const slider = subject.shadowRoot?.querySelector("zeta-slider");
      const sliderValue = slider?.getAttribute("lowerValue");
      expect(sliderValue).to.equal("25");
    });

    it("updates the slider value when the lower input value changes", async () => {
      const input = subject.shadowRoot?.querySelector("input.upper-input") as HTMLInputElement;
      if (input) {
        input.value = "75";
        input.dispatchEvent(new Event("input"));
      }

      await subject.updateComplete;

      const slider = subject.shadowRoot?.querySelector("zeta-slider");
      const sliderValue = slider?.getAttribute("upperValue");
      expect(sliderValue).to.equal("75");
    });
  });

  describe("Golden", () => {});

  describe("Performance", () => {});
});
