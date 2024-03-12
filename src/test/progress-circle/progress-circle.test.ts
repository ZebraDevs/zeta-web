import { assert, expect, fixture, html } from "@open-wc/testing";
import { ZetaProgressCircle } from "../../index.js";
import "../../index.js";

describe("ZetaProgressCircle", () => {
  it("creates from document.createElement", function () {
    const el = document.createElement("zeta-progress-circle");
    assert.equal("ZETA-PROGRESS-CIRCLE", el.nodeName);
  });

  it("creates from constructor", function () {
    const el = new ZetaProgressCircle();
    assert.equal("ZETA-PROGRESS-CIRCLE", el.nodeName);
  });

  it("should set value to 100 if above 100", async () => {
    const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle></zeta-progress-circle>`);
    el.progress = 101;
    await el.updateComplete;
    assert.equal(el.progress, 100);
  });

  it("should set value to 0 if below 0", async () => {
    const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle></zeta-progress-circle>`);
    el.progress = -1;
    await el.updateComplete;
    assert.equal(el.progress, 0);
  });

  it("should set value ", async () => {
    const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle progress="50"></zeta-progress-circle>`);
    assert.equal(el.progress, 50);
  });

  it("should render uploading components", async () => {
    const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle></zeta-progress-circle>`);
    el.uploading = true;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".uploading")).to.exist;
  });

  it("should cancel upload on button click", async () => {
    const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle></zeta-progress-circle>`);
    el.uploading = true;
    await el.updateComplete;
    const btn = el.shadowRoot?.querySelector(".cancel") as HTMLElement;
    btn.click();
    await el.updateComplete;
    assert.equal(el.uploading, false);
  });
});

