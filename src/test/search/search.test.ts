import { assert, fixture, expect, html } from "@open-wc/testing";
import type { ZetaIcon } from "../../components/icon/icon.js";
import { ZetaSearch } from "../../components/search/search.js";
import { MouseActions, getCssVarColorValue, getCssVarPxValue } from "../utils.js";
import "../../components/search/search.js";
import "../../index.css";

//TODO keyboard Tab doesnt seem to work
//TODO test enter (submit) and escape (clear) keys
//TODO test the input event
describe("zeta-search", () => {
  // describe("Accessibility", () => {});

  describe("Content", () => {
    it("creates from document.createElement", function () {
      const el = document.createElement("zeta-search");
      assert.equal("ZETA-SEARCH", el.nodeName);
    });

    it("creates from constructor", function () {
      const el = new ZetaSearch();
      assert.equal("ZETA-SEARCH", el.nodeName);
    });

    it("focus on input when field focused", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search></zeta-search> `);
      el.focus();
      expect(el.shadowRoot?.querySelector("input:focus")).to.exist;
    });

    it("blur input when field is blurred", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search></zeta-search> `);
      el.focus();
      el.blur();
      expect(el.shadowRoot?.querySelector("input:focus")).not.to.exist;
    });

    it("should render microphone icon", async () => {
      const speechRecognition = (<any>window).SpeechRecognition || (<any>window).webkitSpeechRecognition;
      if (speechRecognition) {
        // prettier-ignore
        const el = await fixture<ZetaSearch>(html` <zeta-search hasIcon></zeta-search> `);
        const icons = [...el.shadowRoot!.querySelectorAll("zeta-icon")];
        expect(icons).to.exist;
        expect(icons).to.have.lengthOf(2);
        const icon = icons.find((e: any) => e.innerText === "microphone");
        expect(icon).to.exist;
      }
    });

    it("should not render microphone icon", async () => {
      const el = await fixture<ZetaSearch>(html` <zeta-search hasIcon></zeta-search> `);
      delete (<any>window).SpeechRecognition;
      delete (<any>window).webkitSpeechRecognition;
      el.requestUpdate();
      await el.updateComplete;
      const icon = el.shadowRoot?.querySelectorAll("zeta-icon");
      /// If only 1 icon displayed, that will be the search icon, not microphone.
      expect(icon).to.have.lengthOf(1);
    });
  });

  describe("Dimensions", () => {
    it("should use the control-icon-md icon size at every size", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search></zeta-search> `);
      const icon = el.shadowRoot?.querySelectorAll("zeta-icon")[0] as ZetaIcon;
      for (const size of ["small", "medium", "large"] as const) {
        el.size = size;
        await el.updateComplete;
        expect(getComputedStyle(icon).fontSize).to.equal(`${getCssVarPxValue(icon, "--control-icon-md")}px`);
      }
    });

    it("should size the field height from the control tokens", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search></zeta-search> `);
      const form = el.shadowRoot!.querySelector("form")!;
      expect(form.getBoundingClientRect().height).to.equal(getCssVarPxValue(el, "--control-md"));
      el.size = "small";
      await el.updateComplete;
      expect(form.getBoundingClientRect().height).to.equal(getCssVarPxValue(el, "--control-sm"));
      el.size = "large";
      await el.updateComplete;
      expect(form.getBoundingClientRect().height).to.equal(getCssVarPxValue(el, "--control-lg"));
    });
  });

  describe("Styling", () => {
    it("should set correct disabled icon color", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search></zeta-search> `);
      el.disabled = true;
      await el.updateComplete;
      const icon = el.shadowRoot?.querySelectorAll("zeta-icon")[0] as ZetaIcon;
      await expect(getComputedStyle(icon).color).to.equal(getCssVarColorValue(icon, "--interactive-neutral-foreground-disabled"));
    });

    it("should colour the leading icon foreground-primary and trailing icons interactive-neutral-foreground-default", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search value="query"></zeta-search> `);
      const [leading, cancel] = el.shadowRoot!.querySelectorAll("zeta-icon");
      expect(getComputedStyle(leading).color).to.equal(getCssVarColorValue(el, "--foreground-primary"));
      expect(getComputedStyle(cancel).color).to.equal(getCssVarColorValue(el, "--interactive-neutral-foreground-default"));
    });

    it("should use neutral tokens for the field at rest", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search></zeta-search> `);
      const style = getComputedStyle(el.shadowRoot!.querySelector("form")!);
      expect(style.borderTopColor).to.equal(getCssVarColorValue(el, "--interactive-neutral-border-default"));
      expect(style.borderTopWidth).to.equal(`${getCssVarPxValue(el, "--stroke-thin")}px`);
      expect(style.backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-neutral-background-default"));
      expect(style.paddingLeft).to.equal(`${getCssVarPxValue(el, "--space-md")}px`);
    });

    it("should use the text and cursor tokens", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search></zeta-search> `);
      const input = el.shadowRoot!.querySelector("input")!;
      expect(getComputedStyle(input).color).to.equal(getCssVarColorValue(el, "--foreground-primary"));
      expect(getComputedStyle(input).caretColor).to.equal(getCssVarColorValue(el, "--foreground-cursor"));
    });

    it("should draw the focus outline with border-focus at stroke-thick", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search></zeta-search> `);
      el.focus();
      const style = getComputedStyle(el.shadowRoot!.querySelector("form")!);
      expect(style.outlineColor).to.equal(getCssVarColorValue(el, "--border-focus"));
      expect(style.outlineWidth).to.equal(`${getCssVarPxValue(el, "--stroke-thick")}px`);
    });

    it("should use disabled tokens for the field when disabled", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search disabled></zeta-search> `);
      const style = getComputedStyle(el.shadowRoot!.querySelector("form")!);
      expect(style.borderTopColor).to.equal(getCssVarColorValue(el, "--interactive-neutral-border-disabled"));
      expect(style.backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-neutral-background-disabled"));
    });

    it("should draw a gradient border when flavor is gradient", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search flavor="gradient"></zeta-search> `);
      const style = getComputedStyle(el.shadowRoot!.querySelector("form")!);
      expect(style.borderTopColor).to.equal("rgba(0, 0, 0, 0)");
      expect(style.backgroundImage).to.include("linear-gradient");
    });

    it("should have no visible border when flavor is ghost, and optionally no focus outline", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search flavor="ghost"></zeta-search> `);
      const form = el.shadowRoot!.querySelector("form")!;
      expect(getComputedStyle(form).borderTopWidth).to.equal(`${getCssVarPxValue(el, "--stroke-base")}px`);
      expect(getComputedStyle(form).backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-ghost-background-default"));
      el.focus();
      expect(getComputedStyle(form).outlineStyle).to.equal("solid");
      el.hideFocusOutline = true;
      await el.updateComplete;
      expect(getComputedStyle(form).outlineStyle).to.equal("none");
    });

    it("should keep the --search-border-color override", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search style="--search-border-color: transparent"></zeta-search> `);
      expect(getComputedStyle(el.shadowRoot!.querySelector("form")!).borderTopColor).to.equal("rgba(0, 0, 0, 0)");
    });
  });

  describe("Interaction", () => {
    it("clears input", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search></zeta-search> `);
      el.value = "change";
      await el.updateComplete;
      const icon = el.shadowRoot?.querySelectorAll("zeta-icon")[1] as ZetaIcon;
      icon.click();
      await el.updateComplete;
      assert.equal(el.value, "");
    });

    it("renders the clear control as a named button only when there is a value", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search></zeta-search> `);
      expect(el.shadowRoot!.querySelector('button[aria-label="Clear search"]')).not.to.exist;
      el.value = "query";
      await el.updateComplete;
      const button = el.shadowRoot!.querySelector('button[aria-label="Clear search"]') as HTMLButtonElement;
      expect(button).to.exist;
      button.click();
      await el.updateComplete;
      assert.equal(el.value, "");
    });

    it("should call input onchange", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search></zeta-search> `);
      const input = el.shadowRoot?.querySelector("input");
      input!.value = "change";
      input?.dispatchEvent(new Event("change", { bubbles: true }));
      assert.equal(el.value, "change");
    });

    let subject: ZetaSearch;
    let interactiveTarget: HTMLFormElement;

    it.skip("should not be activatable", async () => {
      // prettier-ignore
      subject = await fixture<ZetaSearch>(html`<zeta-search></zeta-search>`);
      interactiveTarget = subject.shadowRoot!.querySelector(".interactive-target") as HTMLFormElement;

      let subjectStyles = getComputedStyle(subject!);
      let interactiveTargetStyles = getComputedStyle(interactiveTarget!);
      await expect(subjectStyles.outlineWidth).to.equal("0px");
      await expect(subjectStyles.outlineStyle).to.equal("none");
      await expect(interactiveTargetStyles.outlineWidth).to.equal("0px");
      await expect(interactiveTargetStyles.outlineStyle).to.equal("none");
      await MouseActions.down(subject);

      subjectStyles = getComputedStyle(subject!);
      interactiveTargetStyles = getComputedStyle(interactiveTarget!);
      await expect(subjectStyles.outlineWidth).to.equal("0px");
      await expect(subjectStyles.outlineStyle).to.equal("none");
      await expect(interactiveTargetStyles.outlineWidth).to.equal("0px");
      await expect(interactiveTargetStyles.outlineStyle).to.equal("none");
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
