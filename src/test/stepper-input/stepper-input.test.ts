import { assert, fixture, html } from "@open-wc/testing";
import { ZetaStepperInput } from "../../components/stepper-input/stepper-input.js";
import "../../components/stepper-input/stepper-input.js";

describe("zeta-stepper-input", () => {
  it("creates from document.createElement", function () {
    const el = document.createElement("zeta-stepper-input");
    assert.equal("ZETA-STEPPER-INPUT", el.nodeName);
  });

  it("creates from constructor", function () {
    const el = new ZetaStepperInput();
    assert.equal("ZETA-STEPPER-INPUT", el.nodeName);
  });

  it("sets value", async () => {
    const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input value=${10}></zeta-stepper-input>`);
    assert.equal(el.value, 10);
  });

  it("sets value to max value", async () => {
    const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input max=${9} value=${10}></zeta-stepper-input>`);
    assert.equal(el.value, 9);
  });

  it("sets value to min value", async () => {
    const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input min=${9} value=${8}></zeta-stepper-input>`);
    assert.equal(el.value, 9);
  });

  it("doesn't change value", async () => {
    const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input></zeta-stepper-input>`);
    el.value = Number("123asd");
    assert.equal(el.value, 0);
  });

  it("doesn't change value", async () => {
    const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input></zeta-stepper-input>`);
    const input = el.shadowRoot?.querySelector("input");
    input!.value = "test";
    input?.dispatchEvent(new Event("change", { bubbles: true }));
    assert.equal(el.value, 0);
  });

  it("sets value to min value via input onchange", async () => {
    const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input min=${5}></zeta-stepper-input>`);
    const input = el.shadowRoot?.querySelector("input");
    input!.value = "4";
    input?.dispatchEvent(new Event("change", { bubbles: true }));
    assert.equal(el.value, 5);
  });

  it("sets value to max value via input onchange", async () => {
    const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input max=${5}></zeta-stepper-input>`);
    const input = el.shadowRoot?.querySelector("input");
    input!.value = "6";
    input?.dispatchEvent(new Event("change", { bubbles: true }));
    assert.equal(el.value, 5);
  });
});
