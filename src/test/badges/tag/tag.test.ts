import { fixture, html, elementUpdated, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaTag } from "../../../components/badges/tag/tag.js";
import "../../../components/badges/tag/tag.js";
import "../../../index.css";
import { contrastTest } from "../../accessibility-utils/accessibility-test-runner.js";
import { getCssVarColorValue, getCssVarPxValue } from "../../utils.js";

describe("zeta-tag", () => {
  let subject: ZetaTag;

  const createComponent = (template = "<zeta-tag></zeta-tag>") => {
    // prettier-ignore
    return fixture<ZetaTag>(html`${unsafeStatic(template)}`);
  };

  const getText = () => subject.shadowRoot!.querySelector(".text") as HTMLElement;

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("it meets contrast requirements", async () => {
      subject.setAttribute("label", "Label");
      await elementUpdated(subject);
      const element = subject.shadowRoot?.querySelector(".text");
      expect(element, "Element should exist").to.exist;
      await contrastTest("Tag", element!, element!);
    });
    it("meets aria requirements", async () => {
      await expect(subject).to.be.accessible();
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("sets the default properties correctly", () => {
      expect(subject.direction).to.equal("right");
      expect(subject.label).to.equal(undefined);
    });

    const directionCases: { name: string; direction: ZetaTag["direction"] }[] = [
      { name: "left", direction: "left" },
      { name: "right", direction: "right" }
    ];
    directionCases.forEach(c =>
      it(`manages direction attribute correctly: ${c.name}`, () => {
        subject.setAttribute("direction", c.direction);
        expect(subject.direction).to.equal(c.direction);
      })
    );

    const labelCases: { name: string; label: string }[] = [
      { name: "single word", label: "Tag" },
      { name: "multiple words", label: "Testing service" }
    ];
    labelCases.forEach(c => {
      it(`manages label attribute correctly: ${c.name}`, () => {
        subject.setAttribute("label", c.label);
        expect(subject.label).to.equal(c.label);
      });

      it(`renders the passed text into a span: ${c.name}`, async () => {
        subject.setAttribute("label", c.label);
        await elementUpdated(subject);
        expect(subject.shadowRoot!.querySelector("span")!.textContent).to.equal(c.label);
      });
    });
  });

  describe("Dimensions", () => {
    const TEXT_WIDTH = 26; // rendered width of "Tag"; font-dependent, no token drives it
    const POINT_WIDTH = 12; // fixed svg width attribute in tag.ts, no token drives it

    const cases: { name: string; direction: ZetaTag["direction"] }[] = [
      { name: "left", direction: "left" },
      { name: "right", direction: "right" }
    ];
    cases.forEach(c =>
      it(`sets the default dimensions correctly: direction ${c.name}`, async () => {
        subject.setAttribute("direction", c.direction);
        subject.setAttribute("label", "Tag");
        await elementUpdated(subject);

        // .text is content-box: height is --space-xl plus vertical --space-xs padding
        const expectedHeight = getCssVarPxValue(subject, "--space-xl") + 2 * getCssVarPxValue(subject, "--space-xs");
        const expectedWidth = TEXT_WIDTH + 2 * getCssVarPxValue(subject, "--space-sm") + POINT_WIDTH;
        const rect = subject.getBoundingClientRect();

        expect(Math.ceil(rect.width)).to.equal(expectedWidth);
        expect(rect.height).to.equal(expectedHeight);
      })
    );
  });

  describe("Styling", () => {
    it("uses --border-subtle for the text background and point fill", () => {
      const expected = getCssVarColorValue(subject, "--border-subtle");
      expect(getComputedStyle(getText()).backgroundColor).to.equal(expected);
      expect(getComputedStyle(subject.shadowRoot!.querySelector(".point")!).fill).to.equal(expected);
    });

    const cases: {
      name: string;
      direction: ZetaTag["direction"];
      rounded: boolean;
      radius: { topLeft: string; topRight: string; bottomRight: string; bottomLeft: string };
    }[] = [
      {
        name: "rounded, direction right",
        direction: "right",
        rounded: true,
        radius: { topLeft: "--radius-sm", topRight: "--radius-none", bottomRight: "--radius-none", bottomLeft: "--radius-sm" }
      },
      {
        name: "rounded, direction left",
        direction: "left",
        rounded: true,
        radius: { topLeft: "--radius-none", topRight: "--radius-sm", bottomRight: "--radius-sm", bottomLeft: "--radius-none" }
      },
      {
        name: "sharp, direction right",
        direction: "right",
        rounded: false,
        radius: { topLeft: "--radius-none", topRight: "--radius-none", bottomRight: "--radius-none", bottomLeft: "--radius-none" }
      },
      {
        name: "sharp, direction left",
        direction: "left",
        rounded: false,
        radius: { topLeft: "--radius-none", topRight: "--radius-none", bottomRight: "--radius-none", bottomLeft: "--radius-none" }
      }
    ];
    cases.forEach(c =>
      it(`sets the text border radius correctly: ${c.name}`, async () => {
        subject.direction = c.direction;
        subject.rounded = c.rounded;
        await elementUpdated(subject);
        const style = getComputedStyle(getText());

        expect(parseFloat(style.borderTopLeftRadius)).to.equal(getCssVarPxValue(subject, c.radius.topLeft));
        expect(parseFloat(style.borderTopRightRadius)).to.equal(getCssVarPxValue(subject, c.radius.topRight));
        expect(parseFloat(style.borderBottomRightRadius)).to.equal(getCssVarPxValue(subject, c.radius.bottomRight));
        expect(parseFloat(style.borderBottomLeftRadius)).to.equal(getCssVarPxValue(subject, c.radius.bottomLeft));
      })
    );
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
