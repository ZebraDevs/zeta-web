import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import { emulateMedia } from '@web/test-runner-commands';
import { ZetaGlobalHeader } from "../../index.js";
import "../../index.js";
import { getCssVarValue } from "../utils.js";

describe("zeta-global-header", () => {
  let subject: ZetaGlobalHeader;

  const createComponent = (template = `<zeta-global-header></zeta-global-header>`) => {
    return fixture<ZetaGlobalHeader>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });

  it("renders background color", async () => {
    await expect(getComputedStyle(subject!).backgroundColor).to.equal(getCssVarValue(subject!, "--surface-default"));
  });

  it("renders background in dark-mode", async () => {
    const lightVarColor = getCssVarValue(subject!, "--surface-default");
    await emulateMedia({ colorScheme: 'dark' });
    const darkSubjectColor = getComputedStyle(subject!).backgroundColor;
    const darkVarColor = getCssVarValue(subject!, "--surface-default");
    await expect(darkSubjectColor).to.equal(darkVarColor);
    await expect(darkSubjectColor).to.not.equal(lightVarColor);
  });
});