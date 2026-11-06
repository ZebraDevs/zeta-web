import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaSliderInputField } from "../../components/slider/slider-input-field/slider-input-field.js";
import "../../components/slider/slider-input-field/slider-input-field.js";
import "../../index.css";
import { getCssVarColorValue, getCssVarPxValue, getCssVarValue } from "../utils.js";
import type { FormEvent } from "react";
import type { ZetaSlider } from "../../components/slider/slider.js";

describe("zeta-slider-input-field", () => {
  let subject: ZetaSliderInputField;

  const createComponent = (template = `<zeta-slider-input-field label="Label" id="slider"></zeta-slider-input-field>`) => {
    // prettier-ignore
    return fixture<ZetaSliderInputField>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
    await subject.updateComplete;
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

    it("renders the input field", () => {
      const input = subject.shadowRoot?.querySelector("input");
      expect(input).to.exist;

      const inputValue = input?.value;
      expect(inputValue).to.equal("50");
    });

    it("renders the min and max labels", () => {
      const minLabel = subject.shadowRoot?.querySelector(".range-label-container p:first-child");
      expect(minLabel).to.exist;

      const minLabelText = minLabel?.textContent;
      expect(minLabelText).to.equal("0");

      const maxLabel = subject.shadowRoot?.querySelector(".range-label-container p:last-child");
      expect(maxLabel).to.exist;

      const maxLabelText = maxLabel?.textContent;
      expect(maxLabelText).to.equal("100");
    });

    it("sets the initial values correctly", () => {
      expect(subject.value).to.equal("50");
      expect(subject.min).to.equal(0);
      expect(subject.max).to.equal(100);
      expect(subject.stepIncrement).to.equal(undefined);
      expect(subject.label).to.equal("Label");
      expect(subject.disabled).to.equal(false);
      expect(subject.error).to.equal(false);
      expect(subject.rounded).to.equal(true);
      expect(subject.name).to.equal("");
    });
  });

  describe("Dimensions", () => {
    it("sets the input width and height correctly", () => {
      const input = subject.shadowRoot?.querySelector("input.contourable-target");
      const inputPaddingLeft = getComputedStyle(input!).paddingLeft?.split("px")?.shift();
      const inputPaddingRight = getComputedStyle(input!).paddingRight?.split("px")?.shift();
      const inputWidth = 56 + parseInt(inputPaddingLeft!) + parseInt(inputPaddingRight!);

      expect(input?.clientWidth).to.equal(inputWidth);
      expect((input as HTMLElement).offsetHeight).to.equal(getCssVarPxValue(input!, "--control-md"));
      expect(getComputedStyle(input!).paddingLeft).to.equal(getCssVarValue(input!, "--space-md"));
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

    it("sets the correct styles for the input", () => {
      const input = subject.shadowRoot?.querySelector("input");

      const inputFontSize = getComputedStyle(input!).fontSize;
      const inputFontWeight = getComputedStyle(input!).fontWeight;
      const inputColor = getComputedStyle(input!).color;

      expect(inputFontSize).to.equal("16px");
      expect(inputFontWeight).to.equal("400");
      expect(inputColor).to.equal(getCssVarColorValue(input as Element, "--foreground-primary"));
      expect(getComputedStyle(input!).height).to.equal(getCssVarValue(input as Element, "--control-md"));
      expect(getComputedStyle(input!).borderColor).to.equal(getCssVarColorValue(input as Element, "--interactive-neutral-border-default"));
      expect(getComputedStyle(input!).backgroundColor).to.equal(getCssVarColorValue(input as Element, "--interactive-neutral-background-default"));
    });

    it("sets the correct styles for the range labels", () => {
      const rangeLabel = subject.shadowRoot?.querySelector(".range-label-container p:first-child");

      const rangeLabelFontSize = getComputedStyle(rangeLabel!).fontSize;
      const rangeLabelFontWeight = getComputedStyle(rangeLabel!).fontWeight;
      const rangeLabelColor = getComputedStyle(rangeLabel!).color;

      expect(rangeLabelFontSize).to.equal(getCssVarValue(rangeLabel!, "--indicator-medium-font-size"));
      expect(rangeLabelFontWeight).to.equal(getCssVarValue(rangeLabel!, "--indicator-medium-font-weight"));
      expect(rangeLabelColor).to.equal(getCssVarColorValue(rangeLabel!, "--foreground-secondary"));
    });
  });

  describe("Interaction", () => {
    it("updates the slider value when the input value changes", async () => {
      const input = subject.shadowRoot?.querySelector("input.contourable-target") as HTMLInputElement;
      if (input) {
        input.value = "25";
        input.dispatchEvent(new Event("input"));
      }

      await subject.updateComplete;

      const slider = subject.shadowRoot?.querySelector("zeta-slider");
      const sliderValue = slider?.getAttribute("value");
      expect(sliderValue).to.equal("25");
    });

    it("returns the correct data when in a form", async () => {
      let value = 0;
      const form: HTMLFormElement = await fixture(
        html`<form
          @submit=${(e: FormEvent) => {
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            value = parseInt(data.get("test") as string);
          }}
        >
          <zeta-slider-input-field name="test"></zeta-slider-input-field><button type="submit">Submit</button>
        </form>`
      );
      const sliderInputField = form.querySelector("zeta-slider-input-field") as ZetaSliderInputField;
      const button = form.querySelector("button") as HTMLButtonElement;

      const slider = sliderInputField.shadowRoot?.querySelector("zeta-slider") as ZetaSlider;
      slider.value = 75;
      slider.dispatchEvent(new CustomEvent("change", { detail: { value: 75 } }));

      await sliderInputField.updateComplete;

      // simulate form submission
      if (button) {
        button.click();
      }

      expect(value).to.equal(75);
    });
  });

  describe("Golden", () => {});

  describe("Performance", () => {});
});
