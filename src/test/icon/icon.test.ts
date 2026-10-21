import { fixture, html, expect } from "@open-wc/testing";
import type { ZetaIcon } from "../../components/icon/icon.js";
import "../../components/icon/icon.js";
import "../../index.css";

describe("zeta-icon", () => {
  const px = async (tpl: ReturnType<typeof html>) => {
    const el = await fixture<ZetaIcon>(tpl);
    const s = getComputedStyle(el);
    return [s.width, s.height];
  };

  describe("Dimensions", () => {
    it("is 16px at small", async () => {
      expect(await px(html`<zeta-icon size="small" name="home"></zeta-icon>`)).to.eql(["16px", "16px"]);
    });
    it("is 20px at medium by default", async () => {
      expect(await px(html`<zeta-icon name="home"></zeta-icon>`)).to.eql(["20px", "20px"]);
    });
    it("is 28px at large", async () => {
      expect(await px(html`<zeta-icon size="large" name="home"></zeta-icon>`)).to.eql(["28px", "28px"]);
    });
    it("is a 40px box when framed", async () => {
      expect(await px(html`<zeta-icon framed name="home"></zeta-icon>`)).to.eql(["40px", "40px"]);
    });
  });

  describe("Styling"", () => {
    it("inherits colour from its parent", async () => {
      const wrap = await fixture<HTMLElement>(html`<div style="color: rgb(1, 2, 3)"><zeta-icon name="home"></zeta-icon></div>`);
      expect(getComputedStyle(wrap.firstElementChild!).color).to.equal("rgb(1, 2, 3)");
    });
  });
});
