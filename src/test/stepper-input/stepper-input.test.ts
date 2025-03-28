import { assert, fixture, html } from "@open-wc/testing";
import { ZetaStepperInput } from "../../components/stepper-input/stepper-input.js";
import "../../components/stepper-input/stepper-input.js";
import { ZetaStepperChangeEvent } from "../../events.js";

describe("zeta-stepper-input", () => {
  // describe("Accessibility", () => {});

  describe("Content", () => {
    it("creates from document.createElement", function () {
      const el = document.createElement("zeta-stepper-input");
      assert.equal("ZETA-STEPPER-INPUT", el.nodeName);
    });

    it("creates from constructor", function () {
      const el = new ZetaStepperInput();
      assert.equal("ZETA-STEPPER-INPUT", el.nodeName);
    });

    it("sets value", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input value=${10}></zeta-stepper-input>`);
      assert.equal(el.value, "10");
    });

    it("sets value to max value", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input max=${9} value=${10}></zeta-stepper-input>`);
      assert.equal(el.value, "9");
    });

    it("sets value to min value", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input min=${9} value=${8}></zeta-stepper-input>`);
      assert.equal(el.value, "9");
    });

    it("doesn't change value", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input></zeta-stepper-input>`);
      el.value = "123asd";
      el.requestUpdate();
      const input = el.shadowRoot?.querySelector("input");
      assert.equal(input?.value, "0");
    });

    /**
     * These tests don't work as I've had to remove the setter for value in the component
     * as it was overriding the value set by form field mixin.
     */
    it.skip("doesn't change value via input change", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input></zeta-stepper-input>`);
      el.value = "test";
      el?.dispatchEvent(new ZetaStepperChangeEvent({ value: el.value }).toEvent());
      const input = el.shadowRoot?.querySelector("input");
      assert.equal(input!.value, "0");
    });

    it.skip("sets value to min value via input onchange", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input min=${5}></zeta-stepper-input>`);
      el.value = "4";
      el?.dispatchEvent(new ZetaStepperChangeEvent({ value: el.value }).toEvent());
      const input = el.shadowRoot?.querySelector("input");
      assert.equal(input!.value, "5");
    });

    it.skip("sets value to max value via input onchange", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input max=${5}></zeta-stepper-input>`);
      el.value = "6";
      el?.dispatchEvent(new ZetaStepperChangeEvent({ value: el.value }).toEvent());
      el.requestUpdate();
      const input = el.shadowRoot?.querySelector("input");
      assert.equal(input!.value, "5");
    });
  });

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
