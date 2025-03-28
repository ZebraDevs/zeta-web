import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import { emulateMedia } from "@web/test-runner-commands";
import type { ZetaGlobalHeader } from "../../components/global-header/global-header.js";
import "../../components/global-header/global-header.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

describe("zeta-global-header", () => {
  let subject: ZetaGlobalHeader;

  const createComponent = (template = `<zeta-global-header></zeta-global-header>`) => {
    // prettier-ignore
    return fixture<ZetaGlobalHeader>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  // describe("Content", () => {});

  // describe("Dimensions", () => {});

  describe("Styling", () => {
    it("renders background color", async () => {
      await expect(getComputedStyle(subject!).backgroundColor).to.equal(getCssVarColorValue(subject!, "--surface-default"));
    });

    it("renders background in dark-mode", async () => {
      const lightVarColor = getCssVarColorValue(subject!, "--surface-default");
      await emulateMedia({ colorScheme: "dark" });
      const darkSubjectColor = getComputedStyle(subject!).backgroundColor;
      const darkVarColor = getCssVarColorValue(subject!, "--surface-default");
      await expect(darkSubjectColor).to.equal(darkVarColor);
      await expect(darkSubjectColor).to.not.equal(lightVarColor);
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
