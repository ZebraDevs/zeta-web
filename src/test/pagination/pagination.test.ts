import { assert, expect, fixture, html } from "@open-wc/testing";
import { ZetaPagination } from "../../components/pagination/pagination.js";
import "../../components/pagination/pagination.js";
import "../../index.css";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";

function $(el: Element, selector: string) {
  return el.shadowRoot!.querySelector<HTMLButtonElement>(selector)!;
}

function pageLabels(el: Element) {
  return Array.from(el.shadowRoot!.querySelectorAll(".page")).map(p => p.textContent.trim());
}

describe("zeta-pagination", () => {
  describe("Accessibility", () => {
    it("meets aria requirements", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="10" currentPage="4" outline></zeta-pagination>`);
      await expect(el).to.be.accessible();
    });

    it("has sufficient contrast on the page numbers and the selected page", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="10" currentPage="4"></zeta-pagination>`);
      await contrastTest("Pagination page", $(el, ".page:not(.selected)"), $(el, ".page:not(.selected)"));
      await contrastTest("Pagination selected page", $(el, ".page.selected"), $(el, ".page.selected"));
    });

    it("is a named navigation landmark", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination></zeta-pagination>`);
      const nav = el.shadowRoot!.querySelector("nav")!;
      assert.equal(nav.getAttribute("aria-label"), "Pagination");
    });

    it("names the jump buttons and the page numbers", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="3" currentPage="2"></zeta-pagination>`);
      assert.equal($(el, ".first_page").getAttribute("aria-label"), "First page");
      assert.equal($(el, ".chevron_left").getAttribute("aria-label"), "Previous page");
      assert.equal($(el, ".chevron_right").getAttribute("aria-label"), "Next page");
      assert.equal($(el, ".last_page").getAttribute("aria-label"), "Last page");
      assert.equal($(el, ".page").getAttribute("aria-label"), "Page 1");
    });

    it("marks only the current page with aria-current", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="3" currentPage="2"></zeta-pagination>`);
      const current = el.shadowRoot!.querySelectorAll("[aria-current]");
      assert.equal(current.length, 1);
      assert.equal(current[0].textContent.trim(), "2");
    });

    it("gives the overflow marker an accessible name", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="10" currentPage="4"></zeta-pagination>`);
      const more = el.shadowRoot!.querySelector(".more-control")!;
      assert.equal(more.getAttribute("role"), "img");
      assert.equal(more.getAttribute("aria-label"), "More pages");
    });
  });

  describe("Content", () => {
    it("creates from document.createElement", function () {
      const el = document.createElement("zeta-pagination");
      assert.equal("ZETA-PAGINATION", el.nodeName);
    });

    it("creates from constructor", function () {
      const el = new ZetaPagination();
      assert.equal("ZETA-PAGINATION", el.nodeName);
    });

    it("renders the jump controls as native buttons", async () => {
      const el = await fixture(html`<zeta-pagination></zeta-pagination>`);
      for (const name of ["first_page", "chevron_left", "chevron_right", "last_page"]) {
        const control = $(el, `.${name}`);
        assert.equal(control.tagName, "BUTTON");
        assert.equal(control.getAttribute("type"), "button");
        assert.equal(control.querySelector("zeta-icon")!.textContent.trim(), name);
      }
    });

    it("should disable left controls", async () => {
      const el = await fixture(html`<zeta-pagination></zeta-pagination>`);
      const prevButton = el.shadowRoot?.querySelector("button.chevron_left") as HTMLElement;
      const startButton = el.shadowRoot?.querySelector("button.first_page") as HTMLElement;
      expect(prevButton).to.have.attribute("disabled");
      expect(startButton).to.have.attribute("disabled");
    });

    it("should disable right controls", async () => {
      const el = await fixture(html`<zeta-pagination currentPage="10"></zeta-pagination>`);
      const nextButton = el.shadowRoot?.querySelector("button.chevron_right") as HTMLElement;
      const endButton = el.shadowRoot?.querySelector("button.last_page") as HTMLElement;
      expect(nextButton).to.have.attribute("disabled");
      expect(endButton).to.have.attribute("disabled");
    });

    it("should not set invalid page", async () => {
      // prettier-ignore
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="10" currentPage="15"></zeta-pagination>`);
      assert.equal(el.currentPage, 10);
    });

    it("should not set invalid page", async () => {
      // prettier-ignore
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="10" currentPage="-1"></zeta-pagination>`);
      assert.equal(el.currentPage, 1);
    });

    it("should show left and right dots", async () => {
      // prettier-ignore
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="10" currentPage="4"></zeta-pagination>`);
      const dots = el.shadowRoot?.querySelectorAll("zeta-icon.more");
      assert.equal(dots?.length, 2);
    });

    it("should not show any dots", async () => {
      // prettier-ignore
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="5"></zeta-pagination>`);
      const dots = el.shadowRoot?.querySelectorAll("zeta-icon.more");
      assert.equal(dots?.length, 0);
    });

    it("hides the four jump controls with showControls off, from markup and from the property", async () => {
      // A plain string, not an html template: this tests the `="false"` markup that lit-analyzer rejects on a boolean attribute
      const el = await fixture<ZetaPagination>(`<zeta-pagination showcontrols="false" totalPages="5"></zeta-pagination>`);
      assert.isFalse(el.showControls);
      expect(el.shadowRoot!.querySelector(".control")).to.not.exist;
      assert.deepEqual(pageLabels(el), ["1", "2", "3", "4", "5"]);
      el.removeAttribute("showcontrols");
      await el.updateComplete;
      assert.isTrue(el.showControls);
      assert.equal(el.shadowRoot!.querySelectorAll(".control").length, 4);
    });

    it("drops the overflow marker and its paired page with showMore off", async () => {
      // A plain string, not an html template: this tests the `="false"` markup that lit-analyzer rejects on a boolean attribute
      const el = await fixture<ZetaPagination>(`<zeta-pagination showmore="false" totalPages="10" currentPage="5"></zeta-pagination>`);
      assert.isFalse(el.showMore);
      expect(el.shadowRoot!.querySelector(".more-control")).to.not.exist;
      assert.deepEqual(pageLabels(el), ["4", "5", "6"]);
      const start = await fixture<ZetaPagination>(`<zeta-pagination showmore="false" totalPages="10" currentPage="1"></zeta-pagination>`);
      assert.deepEqual(pageLabels(start), ["1", "2", "3", "4", "5"]);
    });
  });

  describe("Dimensions", () => {
    // Size tokens change with the viewport, so the expected size is resolved from the token instead of being hard-coded in px
    function controlSize(el: Element) {
      const probe = document.createElement("div");
      probe.style.cssText = "position:absolute;visibility:hidden;height:var(--control-sm)";
      el.shadowRoot!.appendChild(probe);
      const size = probe.getBoundingClientRect().height;
      probe.remove();
      return size;
    }

    it("makes every jump control, page number and overflow marker a --control-sm square", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="10" currentPage="4"></zeta-pagination>`);
      const expected = controlSize(el);
      const squares = Array.from(el.shadowRoot!.querySelectorAll(".control, .page, .more-control"));
      assert.isAbove(squares.length, 4);
      for (const square of squares) {
        const box = square.getBoundingClientRect();
        assert.approximately(box.height, expected, 0.5);
        assert.approximately(box.width, expected, 0.5);
      }
    });

    it("spaces the buttons by --space-sm", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="3"></zeta-pagination>`);
      const [first, second] = Array.from(el.shadowRoot!.querySelectorAll(".control, .page")).map(b => b.getBoundingClientRect());
      const probe = document.createElement("div");
      probe.style.cssText = "position:absolute;visibility:hidden;width:var(--space-sm)";
      el.shadowRoot!.appendChild(probe);
      const gap = probe.getBoundingClientRect().width;
      probe.remove();
      assert.approximately(second.left - first.right, gap, 0.5);
    });
  });

  describe("Styling", () => {
    it("has no border by default and a 1px border with outline", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="3"></zeta-pagination>`);
      const page = () => getComputedStyle($(el, ".page"));
      assert.equal(page().borderTopWidth, "0px");
      el.outline = true;
      await el.updateComplete;
      assert.equal(page().borderTopWidth, "1px");
      assert.equal(getComputedStyle($(el, ".chevron_right")).borderTopWidth, "1px");
    });

    it("uses sharp corners when not rounded and a radius when rounded", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="3"></zeta-pagination>`);
      assert.notEqual(getComputedStyle($(el, ".page")).borderTopLeftRadius, "0px");
      el.rounded = false;
      await el.updateComplete;
      assert.equal(getComputedStyle($(el, ".page")).borderTopLeftRadius, "0px");
    });

    it("fills the selected page with the inverse colour and leaves the others neutral", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="3" currentPage="2"></zeta-pagination>`);
      const selected = getComputedStyle($(el, ".page.selected"));
      const other = getComputedStyle($(el, ".page:not(.selected)"));
      assert.notEqual(selected.backgroundColor, other.backgroundColor);
      assert.notEqual(selected.color, other.color);
    });

    it("draws the jump icons in the primary foreground colour, not the action colour", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="3" currentPage="2"></zeta-pagination>`);
      const probe = document.createElement("div");
      probe.style.cssText = "position:absolute;visibility:hidden;color:var(--foreground-primary)";
      el.shadowRoot!.appendChild(probe);
      const primary = getComputedStyle(probe).color;
      probe.remove();
      assert.equal(getComputedStyle($(el, ".chevron_right")).color, primary);
    });
  });

  describe("Interaction", () => {
    it("should increment page", async () => {
      // prettier-ignore
      const el = await fixture<ZetaPagination>(html`<zeta-pagination></zeta-pagination>`);
      const next = el.shadowRoot?.querySelector("button.chevron_right") as HTMLElement;
      next.click();
      await el.updateComplete;
      assert.equal(el.currentPage, 2);
    });

    it("should decrement page", async () => {
      // prettier-ignore
      const el = await fixture<ZetaPagination>(html`<zeta-pagination currentPage="3"></zeta-pagination>`);
      const prev = el.shadowRoot?.querySelector("button.chevron_left") as HTMLElement;
      prev.click();
      await el.updateComplete;
      assert.equal(el.currentPage, 2);
    });

    it("jumps to the first and last page", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="8" currentPage="4"></zeta-pagination>`);
      $(el, ".last_page").click();
      await el.updateComplete;
      assert.equal(el.currentPage, 8);
      $(el, ".first_page").click();
      await el.updateComplete;
      assert.equal(el.currentPage, 1);
    });

    it("goes to a page number and fires pageChange as a bubbling, composed event", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="5"></zeta-pagination>`);
      let received: CustomEvent<{ page: number }> | undefined;
      el.addEventListener("pageChange", e => (received = e as CustomEvent<{ page: number }>));
      el.shadowRoot!.querySelectorAll<HTMLButtonElement>(".page")[2].click();
      await el.updateComplete;
      assert.equal(el.currentPage, 3);
      assert.equal(received?.detail.page, 3);
      assert.isTrue(received?.bubbles);
      assert.isTrue(received?.composed);
    });

    it("keeps every enabled button in the tab order and leaves disabled ones out", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="3" currentPage="1"></zeta-pagination>`);
      const buttons = Array.from(el.shadowRoot!.querySelectorAll<HTMLButtonElement>("button"));
      assert.isTrue(buttons.filter(b => !b.disabled).every(b => b.tabIndex === 0));
      assert.isTrue(buttons.filter(b => b.disabled).length > 0);
    });
  });
});
