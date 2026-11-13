import { assert, expect, fixture, html } from "@open-wc/testing";
import { ZetaPagination } from "../../components/pagination/pagination.js";
import "../../components/pagination/pagination.js";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";
import { disableShadowDOMTransitions, getCssVarColorValue, getCssVarPxValue, getCssVarValue } from "../utils.js";

describe("zeta-pagination", () => {
  describe("Accessibility", () => {
    it("meets aria requirements", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination></zeta-pagination>`);
      await expect(el).to.be.accessible();
      await expect(el).shadowDom.to.be.accessible();
    });

    it("gives the overflow control an accessible name", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="10" currentPage="4"></zeta-pagination>`);
      const more = el.shadowRoot?.querySelector(".more") as HTMLElement;
      expect(more).to.have.attribute("role", "img");
      expect(more).to.have.attribute("aria-label");
    });

    it("marks only the current page with aria-current=page", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="5" currentPage="3"></zeta-pagination>`);
      const current = el.shadowRoot?.querySelectorAll("[aria-current='page']");
      assert.equal(current?.length, 1);
      assert.equal(current?.[0].textContent?.trim(), "3");
    });

    it("gives every control and page an accessible name", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="5"></zeta-pagination>`);
      const buttons = [...(el.shadowRoot?.querySelectorAll("button") ?? [])];
      assert.isAbove(buttons.length, 4);
      buttons.forEach(b => expect(b.getAttribute("aria-label")).to.not.be.empty);
    });

    it("meets aria requirements with overflow and disabled controls", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="20" currentPage="1"></zeta-pagination>`);
      await expect(el).shadowDom.to.be.accessible();
    });

    [false, true].forEach(outline => {
      it(`meets contrast requirements for the selected page, outline=${outline}`, async () => {
        const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="5" .outline=${outline}></zeta-pagination>`);
        disableShadowDOMTransitions(el);
        const selected = el.shadowRoot?.querySelector(".page.selected") as HTMLElement;
        await contrastTest(`Pagination selected page, outline=${outline}`, selected, selected);
      });
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
      const dots = el.shadowRoot?.querySelectorAll(".more");
      assert.equal(dots?.length, 2);
    });

    it("should not show any dots", async () => {
      // prettier-ignore
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="5"></zeta-pagination>`);
      const dots = el.shadowRoot?.querySelectorAll(".more");
      assert.equal(dots?.length, 0);
    });

    it("should never render a page number beyond totalPages or duplicate the last page, for a large siblingCount", async () => {
      // Regression test: siblingCount=10 with totalPages=20 used to make the near-the-start branch
      // compute leftItemCount=23 (3 + 2*siblingCount), generating pages 21-23 (which don't exist)
      // and appending totalPages=20 again after the dots, even though it was already in that range.
      // prettier-ignore
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="20" currentPage="1" siblingCount="10"></zeta-pagination>`);
      const pageButtons = [...(el.shadowRoot?.querySelectorAll("button.page") ?? [])].map(b => Number(b.textContent?.trim()));
      assert.isTrue(
        pageButtons.every(page => page >= 1 && page <= 20),
        `All rendered pages must be within 1-20, got: ${pageButtons.join(", ")}`
      );
      assert.equal(new Set(pageButtons).size, pageButtons.length, `No page should be rendered twice, got: ${pageButtons.join(", ")}`);
      assert.deepEqual(
        pageButtons,
        Array.from({ length: 20 }, (_, i) => i + 1)
      );
    });

    it("should hide the overflow control when showMore is false, even if the range would otherwise collapse", async () => {
      // prettier-ignore
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="20" currentPage="10" .showMore=${false}></zeta-pagination>`);
      const dots = el.shadowRoot?.querySelectorAll(".more");
      const pages = el.shadowRoot?.querySelectorAll("button.page");
      assert.equal(dots?.length, 0);
      assert.equal(pages?.length, 20);
    });

    it("should hide all four jump controls when showControls is false", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination .showControls=${false}></zeta-pagination>`);
      const controls = el.shadowRoot?.querySelectorAll("button.control");
      assert.equal(controls?.length, 0);
    });

    it("should show all four jump controls by default", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination></zeta-pagination>`);
      const controls = el.shadowRoot?.querySelectorAll("button.control");
      assert.equal(controls?.length, 4);
    });
  });

  describe("Dimensions", () => {
    it("renders controls and page indicators as control-sm squares spaced by space-sm", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="5"></zeta-pagination>`);
      const size = getCssVarPxValue(el, "--control-sm");
      el.shadowRoot?.querySelectorAll<HTMLElement>(".page, .control").forEach(item => {
        assert.equal(item.getBoundingClientRect().height, size);
        assert.equal(item.getBoundingClientRect().width, size);
      });
      const bar = el.shadowRoot?.querySelector(".pagination") as HTMLElement;
      assert.equal(getComputedStyle(bar).columnGap, getCssVarValue(bar, "--space-sm"));
    });
  });

  describe("Styling", () => {
    it("has no border by default", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="5"></zeta-pagination>`);
      const page = el.shadowRoot?.querySelector(".page") as HTMLElement;
      assert.equal(getComputedStyle(page).borderWidth, "0px");
    });

    it("renders a bordered page when outline is set", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="5" outline></zeta-pagination>`);
      // The first page is the selected one, which takes the inverse border, so check an unselected page.
      const page = el.shadowRoot?.querySelector(".page:not(.selected)") as HTMLElement;
      assert.equal(getComputedStyle(page).borderWidth, getCssVarValue(page, "--stroke-thin"));
      assert.equal(getComputedStyle(page).borderColor, getCssVarColorValue(page, "--interactive-neutral-border-default"));
    });

    it("uses radius-sm when rounded and radius-none when sharp", async () => {
      const rounded = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="5" rounded></zeta-pagination>`);
      const sharp = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="5" .rounded=${false}></zeta-pagination>`);
      const roundedPage = rounded.shadowRoot?.querySelector(".page") as HTMLElement;
      const sharpPage = sharp.shadowRoot?.querySelector(".page") as HTMLElement;
      assert.equal(getComputedStyle(roundedPage).borderTopLeftRadius, getCssVarValue(roundedPage, "--radius-sm"));
      assert.equal(getComputedStyle(sharpPage).borderTopLeftRadius, "0px");
    });

    it("uses the disabled tokens for disabled controls", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="5"></zeta-pagination>`);
      const first = el.shadowRoot?.querySelector("button.first_page") as HTMLElement;
      assert.equal(getComputedStyle(first).backgroundColor, getCssVarColorValue(first, "--interactive-neutral-background-disabled"));
      assert.equal(getComputedStyle(first).color, getCssVarColorValue(first, "--foreground-disabled"));
    });

    it("uses the inverse background/foreground tokens for the selected page", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="5"></zeta-pagination>`);
      disableShadowDOMTransitions(el);
      const selected = el.shadowRoot?.querySelector(".page.selected") as HTMLElement;
      assert.equal(getComputedStyle(selected).backgroundColor, getCssVarColorValue(selected, "--interactive-inverse-background-selected"));
      assert.equal(getComputedStyle(selected).color, getCssVarColorValue(selected, "--foreground-inverse"));
    });
  });

  describe("Interaction", () => {
    it("fires pagechange and the deprecated pageChange, both bubbling and composed", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="5"></zeta-pagination>`);
      const events: CustomEvent<{ page: number }>[] = [];
      el.addEventListener("pagechange", e => events.push(e as CustomEvent<{ page: number }>));
      el.addEventListener("pageChange", e => events.push(e as CustomEvent<{ page: number }>));
      (el.shadowRoot?.querySelectorAll("button.page")[2] as HTMLElement).click();
      await el.updateComplete;
      assert.equal(events.length, 2);
      events.forEach(e => {
        assert.equal(e.detail.page, 3);
        assert.isTrue(e.bubbles);
        assert.isTrue(e.composed);
      });
      assert.equal(el.currentPage, 3);
    });

    it("does not fire pagechange for programmatic changes or a click on the current page", async () => {
      const el = await fixture<ZetaPagination>(html`<zeta-pagination totalPages="5"></zeta-pagination>`);
      let count = 0;
      el.addEventListener("pagechange", () => count++);
      el.currentPage = 4;
      await el.updateComplete;
      (el.shadowRoot?.querySelector("button.selected") as HTMLElement).click();
      assert.equal(count, 0);
    });

    it("honours currentpage regardless of attribute order", async () => {
      // Regression: currentpage used to be clamped against the default totalPages (10) when set before totalpages.
      const el = await fixture<ZetaPagination>(html`<zeta-pagination currentpage="15" totalpages="20"></zeta-pagination>`);
      assert.equal(el.currentPage, 15);
      el.totalPages = 8;
      assert.equal(el.currentPage, 8);
    });

    it("turns off showControls and showMore with ='false' attributes", async () => {
      // A plain markup string, as a consumer would write it, rather than a lit binding.
      const el = await fixture<ZetaPagination>(`<zeta-pagination totalpages="20" currentpage="10" showcontrols="false" showmore="false"></zeta-pagination>`);
      assert.isFalse(el.showControls);
      assert.isFalse(el.showMore);
      assert.equal(el.shadowRoot?.querySelectorAll("button.control").length, 0);
      assert.equal(el.shadowRoot?.querySelectorAll(".more").length, 0);
    });

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
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
