import { assert, fixture, expect, html } from "@open-wc/testing";
import type { ZetaIcon } from "../../components/icon/icon.js";
import { ZetaSearch } from "../../components/search/search.js";
import { MouseActions, getCssVarColorValue } from "../utils.js";
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
    it("should set correct default icon size", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search></zeta-search> `);
      const icon = el.shadowRoot?.querySelectorAll("zeta-icon")[0] as ZetaIcon;
      await expect(getComputedStyle(icon).fontSize).to.equal("20px");
    });

    it("should set correct small icon size", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search size='small'></zeta-search> `);
      el.size = "small";
      await el.updateComplete;
      const icon = el.shadowRoot?.querySelectorAll("zeta-icon")[0] as ZetaIcon;
      await expect(getComputedStyle(icon).fontSize).to.equal("16px");
    });

    it("should set correct large icon size", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search></zeta-search> `);
      el.size = "large";
      await el.updateComplete;
      const icon = el.shadowRoot?.querySelectorAll("zeta-icon")[0] as ZetaIcon;
      await expect(getComputedStyle(icon).fontSize).to.equal("24px");
    });
  });

  describe("Styling", () => {
    it("should set correct disabled icon color", async () => {
      // prettier-ignore
      const el = await fixture<ZetaSearch>(html` <zeta-search></zeta-search> `);
      el.disabled = true;
      await el.updateComplete;
      const icon = el.shadowRoot?.querySelectorAll("zeta-icon")[0] as ZetaIcon;
      await expect(getComputedStyle(icon).color).to.equal(getCssVarColorValue(icon, "--main-disabled"));
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
