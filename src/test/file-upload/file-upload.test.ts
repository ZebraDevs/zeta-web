import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaFileUpload } from "../../components/file-upload/file-upload.js";
import "../../components/file-upload/file-upload.js";

describe("zeta-file-upload", () => {
  let subject: ZetaFileUpload;

  const createComponent = (template = `<zeta-file-upload></zeta-file-upload>`) => {
    // prettier-ignore
    return fixture<ZetaFileUpload>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility Tests", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  // describe("Content Tests", () => {});

  // describe("Dimensions Tests", () => {});

  // describe("Styling Tests", () => {});

  // describe("Interaction Tests", () => {});

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});
