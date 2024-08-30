import { assert, fixture, html } from "@open-wc/testing";
import { ZetaDialog } from "../../components/dialog/dialog.js";
import "../../components/dialog/dialog.js";

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
    await el.show();
    await el.hide();
    assert.equal(el.open, false);
  });

  it("calls close method and sets return value", async () => {
    const el = await fixture<ZetaDialog>(html` <zeta-dialog> </zeta-dialog> `);
    await el.show();
    await el.hide("testing");
    assert.equal(el.returnValue, "testing");
  });
});
