import { assert, fixture } from "@open-wc/testing";
import { ZetaDialog } from "../../src/index.js";
import { html } from "lit";

describe("zeta-dialog", () => {
  it("creates from document.createElement", function () {
    const el = document.createElement("zeta-dialog");
    assert.equal("ZETA-DIALOG", el.nodeName);
  });

  it("creates from constructor", function () {
    const el = new ZetaDialog();
    assert.equal("ZETA-DIALOG", el.nodeName);
  });

  it("changes open property on open", async () => {
    const el = await fixture<ZetaDialog>(html` <zeta-dialog> </zeta-dialog> `);
    await el.updateComplete;
    await el.show();
    assert.equal(el.open, true);
  });

  it("changes open property on close", async () => {
    const el = await fixture<ZetaDialog>(html` <zeta-dialog> </zeta-dialog> `);
    el.open = true;
    await el.close();
    assert.equal(el.open, false);
  });

  it("calls close method and sets return value", async () => {
    const el = await fixture<ZetaDialog>(html` <zeta-dialog> </zeta-dialog> `);
    el.open = true;
    await el.close("testing");
    assert.equal(el.returnValue, "testing");
  });

  it("shoould not call close method ", async () => {
    const el = await fixture<ZetaDialog>(html` <zeta-dialog> </zeta-dialog> `);
    el.open = false;
    await el.close("testing");
    assert.equal(el.returnValue, "");
  });
});

