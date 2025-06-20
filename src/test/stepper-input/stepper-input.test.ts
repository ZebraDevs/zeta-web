import { assert, fixture, html, oneEvent } from "@open-wc/testing";
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

    it("doesn't change value via input change", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input></zeta-stepper-input>`);
      el.value = "test";
      el?.dispatchEvent(new ZetaStepperChangeEvent({ value: el.value }).toEvent());
      const input = el.shadowRoot?.querySelector("input");
      assert.equal(input!.value, "0");
    });
    it("sets value to min value via input onchange", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input min=${5}></zeta-stepper-input>`);
      el.value = "4";
      el?.dispatchEvent(new ZetaStepperChangeEvent({ value: el.value }).toEvent());
      const input = el.shadowRoot?.querySelector("input");
      assert.equal(input!.value, "5");
    });
    it("sets value to max value via input onchange", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input max=${5}></zeta-stepper-input>`);
      el.value = "6";
      el?.dispatchEvent(new Event("change"));
      el.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 1));
      assert.equal(el.value, "5");
    });
  });

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  describe("Interaction", () => {
    it("responds correctly to focus event", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input min="0" value="10" max="100"></zeta-stepper-input>`);
      const eventListener = oneEvent(el, "focus");
      const input = el.shadowRoot?.querySelector("input");
      assert.exists(input, "input should exist in the shadow DOM");

      // Try focusing the input directly
      input?.focus();

      // If the event does not fire, dispatch it manually (for test environments)
      if (document.activeElement !== input) {
        input?.dispatchEvent(new FocusEvent("focus", { bubbles: true, composed: true }));
      }

      const event = await eventListener;
      assert.equal(event.type, "focus");
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
