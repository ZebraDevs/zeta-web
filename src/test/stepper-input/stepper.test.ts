import { assert, fixture, html } from "@open-wc/testing";
import { ZetaStepper } from "../../index.js";
import "../../index.js";

describe("ZetaStepper", () => {
  it("creates from document.createElement", function () {
    const el = document.createElement("zeta-stepper");
    assert.equal("ZETA-STEPPER", el.nodeName);
  });

  it("creates from constructor", function () {
    const el = new ZetaStepper();
    assert.equal("ZETA-STEPPER", el.nodeName);
  });

  it("should render steps", async () => {
    const el = await fixture(html`
      <zeta-stepper>
        <li data-title="title 1" data-label="label 1"></li>
        <li data-title="title 2" data-label="label 2"></li>
        <li data-title="title 3" data-label="label 3"></li>
      </zeta-stepper>
    `);

    const items = el.shadowRoot?.querySelectorAll(".step-container");
    assert.equal(items?.length, 3);
  });
});

