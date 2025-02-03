import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaSliderInputField } from "../../components/slider/slider-input-field/slider-input-field.js";
import "../../components/slider/slider-input-field/slider-input-field.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";
import type { FormEvent } from "react";

describe("zeta-slider-input-field", () => {
  let subject: ZetaSliderInputField;

  const createComponent = (template = `<zeta-slider-input-field label="Label"></zeta-slider-input-field>`) => {
    // prettier-ignore
    return fixture<ZetaSliderInputField>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
    await subject.updateComplete;
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
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
      await expect(labelText).to.equal("Label");
    });

    it("renders the input field", async () => {
      const input = subject.shadowRoot?.querySelector("input");
      expect(input).to.exist;

      const inputValue = input?.value;
      await expect(inputValue).to.equal("50");
    });

    it("renders the min and max labels", async () => {
      const minLabel = subject.shadowRoot?.querySelector(".range-label-container p:first-child");
      expect(minLabel).to.exist;

      const minLabelText = minLabel?.textContent;
      await expect(minLabelText).to.equal("0");

      const maxLabel = subject.shadowRoot?.querySelector(".range-label-container p:last-child");
      expect(maxLabel).to.exist;

      const maxLabelText = maxLabel?.textContent;
      await expect(maxLabelText).to.equal("100");
    });

    it("sets the initial values correctly", async () => {
      await expect(subject.initialValue).to.equal(50);
      await expect(subject.min).to.equal(0);
      await expect(subject.max).to.equal(100);
      await expect(subject.stepIncrement).to.equal(undefined);
      await expect(subject.label).to.equal("Label");
      await expect(subject.disabled).to.equal(false);
      await expect(subject.error).to.equal(false);
      await expect(subject.rounded).to.equal(undefined);
      await expect(subject.name).to.equal("");
    });
  });

  describe("Dimensions", () => {
    it("sets the input width and height correctly", async () => {
      const input = subject.shadowRoot?.querySelector("input.contourable-target");
      const inputPaddingLeft = getComputedStyle(input!).paddingLeft?.split("px")?.shift();
      const inputPaddingRight = getComputedStyle(input!).paddingRight?.split("px")?.shift();
      const inputWidth = 56 + parseInt(inputPaddingLeft!) + parseInt(inputPaddingRight!);

      const inputPaddingTop = getComputedStyle(input!).paddingTop?.split("px")?.shift();
      const inputPaddingBottom = getComputedStyle(input!).paddingBottom?.split("px")?.shift();
      const inputHeight = +48 + parseInt(inputPaddingTop!) + parseInt(inputPaddingBottom!);

      await expect(input?.clientWidth).to.equal(inputWidth);
      await expect(input?.clientHeight).to.equal(inputHeight);
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

      await expect(labelFontSize).to.equal("16px");
      await expect(labelFontWeight).to.equal("400");
      await expect(labelColor).to.equal(getCssVarColorValue(label as Element, "--main-default"));
    });

    it("sets the correct styles for the input", async () => {
      const input = subject.shadowRoot?.querySelector("input");

      const inputFontSize = getComputedStyle(input!).fontSize;
      const inputFontWeight = getComputedStyle(input!).fontWeight;
      const inputColor = getComputedStyle(input!).color;

      await expect(inputFontSize).to.equal("16px");
      await expect(inputFontWeight).to.equal("400");
      await expect(inputColor).to.equal(getCssVarColorValue(input as Element, "--main-subtle"));
    });

    it("sets the correct styles for the range labels", async () => {
      const rangeLabel = subject.shadowRoot?.querySelector(".range-label-container p:first-child");

      const rangeLabelFontSize = getComputedStyle(rangeLabel!).fontSize;
      const rangeLabelFontWeight = getComputedStyle(rangeLabel!).fontWeight;
      const rangeLabelColor = getComputedStyle(rangeLabel!).color;

      await expect(rangeLabelFontSize).to.equal("16px");
      await expect(rangeLabelFontWeight).to.equal("400");
      await expect(rangeLabelColor).to.equal(getCssVarColorValue(rangeLabel!, "--main-default"));
    });
  });

  describe("Interaction", () => {
    it("updates the hidden input value when the slider value changes", async () => {
      const slider = subject.shadowRoot?.querySelector("zeta-slider");
      slider?.dispatchEvent(new CustomEvent("zeta-slider-change", { detail: { value: 75 } }));

      const input = subject.shadowRoot?.querySelector("input#hidden-slider-input") as HTMLInputElement;
      const inputValue = input?.value;
      await expect(inputValue).to.equal("75");
    });

    it("updates the slider value when the input value changes", async () => {
      const input = subject.shadowRoot?.querySelector("input.contourable-target") as HTMLInputElement;
      if (input) {
        input.value = "25";
        input.dispatchEvent(new Event("input"));
      }

      await subject.updateComplete;

      const slider = subject.shadowRoot?.querySelector("zeta-slider");
      const sliderValue = slider?.getAttribute("value");
      await expect(sliderValue).to.equal("25");
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
      const slider = form.querySelector("zeta-slider-input-field") as ZetaSliderInputField;
      const button = form.querySelector("button") as HTMLButtonElement;

      const zetaSlider = slider.shadowRoot?.querySelector("zeta-slider");
      zetaSlider?.dispatchEvent(new CustomEvent("zeta-slider-change", { detail: { value: 75 } }));

      if (button) {
        button.click();
      }

      await expect(value).to.equal(75);
    });
  });

  describe("Golden", () => {});

  describe("Performance", () => {});
});
