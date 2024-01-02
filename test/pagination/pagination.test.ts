import { assert, expect, fixture } from "@open-wc/testing";
import { ZetaPagination } from "../../src";
import { html } from "lit";

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
    const paginationControls = el.shadowRoot?.querySelectorAll<HTMLButtonElement>(".pagination-control");
    expect(paginationControls![0]).to.have.attribute("disabled");
    expect(paginationControls![1]).to.have.attribute("disabled");
  });

  it("should disable left controls", async () => {
    const el = await fixture(html`<zeta-pagination current-page="10"></zeta-pagination>`);
    const paginationControls = el.shadowRoot?.querySelectorAll<HTMLButtonElement>(".pagination-control");
    expect(paginationControls![2]).to.have.attribute("disabled");
    expect(paginationControls![3]).to.have.attribute("disabled");
  });

  it("should increment page", async () => {
    const el = await fixture<ZetaPagination>(html`<zeta-pagination></zeta-pagination>`);
    const next = el.shadowRoot?.querySelector("zeta-icon[name='chevron_right']") as HTMLElement;
    next.click();
    await el.updateComplete;
    assert.equal(el.currentPage, 2);
  });

  it("should decrement page", async () => {
    const el = await fixture<ZetaPagination>(html`<zeta-pagination current-page="3"></zeta-pagination>`);
    const prev = el.shadowRoot?.querySelector("zeta-icon[name='chevron_left']") as HTMLElement;
    prev.click();
    await el.updateComplete;
    assert.equal(el.currentPage, 2);
  });

  it("should not set invalid page", async () => {
    const el = await fixture<ZetaPagination>(html`<zeta-pagination total-pages="10" current-page="15"></zeta-pagination>`);
    assert.equal(el.currentPage, 10);
  });

  it("should not set invalid page", async () => {
    const el = await fixture<ZetaPagination>(html`<zeta-pagination total-pages="10" current-page="-1"></zeta-pagination>`);
    assert.equal(el.currentPage, 1);
  });

  it("should show left and right dots", async () => {
    const el = await fixture<ZetaPagination>(html`<zeta-pagination total-pages="10" current-page="4"></zeta-pagination>`);
    const dots = el.shadowRoot?.querySelectorAll("zeta-icon[name='more_horizontal']");
    assert.equal(dots?.length, 2);
  });

  it("should not show any dots", async () => {
    const el = await fixture<ZetaPagination>(html`<zeta-pagination total-pages="5"></zeta-pagination>`);
    const dots = el.shadowRoot?.querySelectorAll("zeta-icon[name='more_horizontal']");
    assert.equal(dots?.length, 0);
  });
});

