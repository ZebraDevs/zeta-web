import { assert, expect, fixture, html } from "@open-wc/testing";
import { ZetaPagination } from "../../index.js";
import "../../index.js";

describe("ZetaPagination", () => {
  it("creates from document.createElement", function () {
    const el = document.createElement("zeta-pagination");
    assert.equal("ZETA-PAGINATION", el.nodeName);
  });

  it("creates from constructor", function () {
    const el = new ZetaPagination();
    assert.equal("ZETA-PAGINATION", el.nodeName);
  });

  it("should disable left controls", async () => {
    const el = await fixture(html`<zeta-pagination></zeta-pagination>`);
    const prevButton = el.shadowRoot?.querySelector("zeta-icon-button[iconname='chevron_left']") as HTMLElement;
    const startButton = el.shadowRoot?.querySelector("zeta-icon-button[iconname='first_page']") as HTMLElement;
    expect(prevButton).to.have.attribute("disabled");
    expect(startButton).to.have.attribute("disabled");
  });

  it("should disable right controls", async () => {
    const el = await fixture(html`<zeta-pagination currentPage="10"></zeta-pagination>`);
    const nextButton = el.shadowRoot?.querySelector("zeta-icon-button[iconname='chevron_right']") as HTMLElement;
    const endButton = el.shadowRoot?.querySelector("zeta-icon-button[iconname='last_page']") as HTMLElement;
    expect(nextButton).to.have.attribute("disabled");
    expect(endButton).to.have.attribute("disabled");
  });

  it("should increment page", async () => {
    const el = await fixture<ZetaPagination>(html`<zeta-pagination></zeta-pagination>`);
    const next = el.shadowRoot?.querySelector("zeta-icon-button[iconname='chevron_right']") as HTMLElement;
    next.click();
    await el.updateComplete;
    assert.equal(el.currentPage, 2);
  });

  it("should decrement page", async () => {
    const el = await fixture<ZetaPagination>(html`<zeta-pagination currentPage="3"></zeta-pagination>`);
    const prev = el.shadowRoot?.querySelector("zeta-icon-button[iconname='chevron_left']") as HTMLElement;
    prev.click();
    await el.updateComplete;
    assert.equal(el.currentPage, 2);
  });

  it("should not set invalid page", async () => {
    const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="10" currentPage="15"></zeta-pagination>`);
    assert.equal(el.currentPage, 10);
  });

  it("should not set invalid page", async () => {
    const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="10" currentPage="-1"></zeta-pagination>`);
    assert.equal(el.currentPage, 1);
  });

  it("should show left and right dots", async () => {
    const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="10" currentPage="4"></zeta-pagination>`);
    const dots = el.shadowRoot?.querySelectorAll("zeta-icon[name='more_horizontal']");
    assert.equal(dots?.length, 2);
  });

  it("should not show any dots", async () => {
    const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="5"></zeta-pagination>`);
    const dots = el.shadowRoot?.querySelectorAll("zeta-icon[name='more_horizontal']");
    assert.equal(dots?.length, 0);
  });
});
