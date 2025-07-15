import { fixture, html, unsafeStatic } from "@open-wc/testing";

import "../../components/action-menu/action-menu-button.js";
import type { ZetaAccordion } from "../../components/accordion/accordion.js";

describe("zeta-accordion", () => {
  let subject: ZetaAccordion;

  const createComponent = (template = ` `) => {
    // prettier-ignore
    return fixture<ZetaAccordion>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {});

  describe("Content", () => {});

  describe("Dimensions", () => {});

  describe("Styling", () => {});

  describe("Interaction", () => {});

  // describe("Golden", () => {
  // it("renders the action menu button correctly", () => {
  //   expect(subject).shadowDom.to.equalSnapshot();
  // });
  // });

  // describe("Performance", () => {});
});
