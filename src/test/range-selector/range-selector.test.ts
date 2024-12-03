import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import { type ZetaRangeSelector } from "../../components/slider/range-selector/range-selector.js";
import "../../components/slider/range-selector/range-selector.js";

import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

describe("zeta-range-selector", () => {
  let subject: ZetaRangeSelector;

  const createComponent = (template = `<zeta-range-selector></zeta-range-selector>`) => {
    // prettier-ignore
    return fixture<ZetaRangeSelector>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility Tests", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content Tests", () => {
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
      await expect(labelText).to.equal("Label");
    });

    it("renders the lower input field", async () => {
      const input = subject.shadowRoot?.querySelector(".lower-input") as HTMLInputElement;
      expect(input).to.exist;

      const inputValue = input?.value;
      await expect(inputValue).to.equal("10");
    });

    it("renders the upper input field", async () => {
      const input = subject.shadowRoot?.querySelector(".upper-input") as HTMLInputElement;
      expect(input).to.exist;

      const inputValue = input?.value;
      await expect(inputValue).to.equal("90");
    });

    it("sets the initial values correctly", async () => {
      await expect(subject.initialValues.min).to.equal(10);
      await expect(subject.initialValues.max).to.equal(90);
      await expect(subject.min).to.equal(0);
      await expect(subject.max).to.equal(100);
      await expect(subject.stepIncrement).to.equal(undefined);
      await expect(subject.label).to.equal(undefined);
      await expect(subject.disabled).to.equal(false);
      await expect(subject.error).to.equal(false);
      await expect(subject.rounded).to.equal(undefined);
      await expect(subject.name).to.equal("");
    });
  });

  describe("Dimensions Tests", () => {
    it("sets the lower input width and height correctly", async () => {
      const lowerInput = subject.shadowRoot?.querySelector("input.lower-input");
      const inputPaddingLeft = getComputedStyle(lowerInput!).paddingLeft?.split("px")?.shift();
      const inputPaddingRight = getComputedStyle(lowerInput!).paddingRight?.split("px")?.shift();
      const inputWidth = 56 + parseInt(inputPaddingLeft!) + parseInt(inputPaddingRight!);

      const inputPaddingTop = getComputedStyle(lowerInput!).paddingTop?.split("px")?.shift();
      const inputPaddingBottom = getComputedStyle(lowerInput!).paddingBottom?.split("px")?.shift();
      const inputHeight = +48 + parseInt(inputPaddingTop!) + parseInt(inputPaddingBottom!);

      await expect(lowerInput?.clientWidth).to.equal(inputWidth);
      await expect(lowerInput?.clientHeight).to.equal(inputHeight);
    });

    it("sets the upper input width and height correctly", async () => {
      const upperInput = subject.shadowRoot?.querySelector("input.upper-input");
      const upperinputPaddingLeft = getComputedStyle(upperInput!).paddingLeft?.split("px")?.shift();
      const upperinputPaddingRight = getComputedStyle(upperInput!).paddingRight?.split("px")?.shift();
      const upperInputWidth = 56 + parseInt(upperinputPaddingLeft!) + parseInt(upperinputPaddingRight!);

      const upperInputPaddingTop = getComputedStyle(upperInput!).paddingTop?.split("px")?.shift();
      const upperInputPaddingBottom = getComputedStyle(upperInput!).paddingBottom?.split("px")?.shift();
      const upperInputHeight = +48 + parseInt(upperInputPaddingTop!) + parseInt(upperInputPaddingBottom!);

      await expect(upperInput?.clientWidth).to.equal(upperInputWidth);
      await expect(upperInput?.clientHeight).to.equal(upperInputHeight);
    });
  });

  describe("Styling Tests", () => {
    it("sets the correct styles for the label", async () => {
      subject.label = "Label";
      await subject.updateComplete;
      const label = subject.shadowRoot?.querySelector("label");

      const labelFontSize = getComputedStyle(label!).fontSize;
      const labelFontWeight = getComputedStyle(label!).fontWeight;
      const labelColor = getComputedStyle(label!).color;

      await expect(labelFontSize).to.equal("16px");
      await expect(labelFontWeight).to.equal("400");
      await expect(labelColor).to.equal(getCssVarColorValue(label as Element, "--main-default"));
    });

    it("sets the correct styles for the lower input", async () => {
      const input = subject.shadowRoot?.querySelector("input.lower-input");

      const inputFontSize = getComputedStyle(input!).fontSize;
      const inputFontWeight = getComputedStyle(input!).fontWeight;
      const inputColor = getComputedStyle(input!).color;

      await expect(inputFontSize).to.equal("16px");
      await expect(inputFontWeight).to.equal("400");
      await expect(inputColor).to.equal(getCssVarColorValue(input as Element, "--main-subtle"));
    });

    it("sets the correct styles for the upper input", async () => {
      const input = subject.shadowRoot?.querySelector("input.upper-input");

      const inputFontSize = getComputedStyle(input!).fontSize;
      const inputFontWeight = getComputedStyle(input!).fontWeight;
      const inputColor = getComputedStyle(input!).color;

      await expect(inputFontSize).to.equal("16px");
      await expect(inputFontWeight).to.equal("400");
      await expect(inputColor).to.equal(getCssVarColorValue(input as Element, "--main-subtle"));
    });
  });

  describe("Interaction Tests", () => {
    it("updates the hidden input value when the slider value changes", async () => {
      const slider = subject.shadowRoot?.querySelector("zeta-slider");
      slider?.dispatchEvent(new CustomEvent("zeta-range-slider-change", { detail: { min: 25, max: 75 } }));

      const input = subject.shadowRoot?.querySelector("input#hidden-range-selector-input") as HTMLInputElement;
      const inputValue = input?.value;
      await expect(inputValue).to.equal("25-75");
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
      await expect(sliderValue).to.equal("25");
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
      await expect(sliderValue).to.equal("75");
    });
  });

  describe("Golden Tests", () => {});

  describe("Performance Tests", () => {});
});
