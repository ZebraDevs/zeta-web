import { fixture, html, expect } from "@open-wc/testing";
import type { ZetaTopAppbar } from "../../components/top-appbar/top-appbar.js";
import "../../components/top-appbar/top-appbar.js";

describe("zeta-top-appbar", () => {
  // let subject: ZetaAppbar;

  // const createComponent = (template = `<zeta-top-appbar></zeta-top-appbar>`) => {
  //   // prettier-ignore
  //   return fixture<ZetaAppbar>(html`${unsafeStatic(template)}`);
  // };

  // beforeEach(async () => {
  //   subject = await createComponent();
  // });

  // describe("Accessibility Tests", () => {});

  describe("Content Tests", () => {
    it("renders the appbar with default values", async () => {
      const appbar: ZetaTopAppbar = await fixture(html`<zeta-top-appbar></zeta-top-appbar>`);
      expect(appbar.centered).to.be.false;
      expect(appbar.extended).to.be.false;
    });

    it("renders the appbar with centered title", async () => {
      const appbar: ZetaTopAppbar = await fixture(html`<zeta-top-appbar centered></zeta-top-appbar>`);
      expect(appbar.centered).to.be.true;
      expect(appbar.extended).to.be.false;
    });

    it("renders the appbar with extended title", async () => {
      const appbar: ZetaTopAppbar = await fixture(html`<zeta-top-appbar extended></zeta-top-appbar>`);
      expect(appbar.centered).to.be.false;
      expect(appbar.extended).to.be.true;
    });

    it("renders content in the appbars leading slot", async () => {
      const appbar = await fixture(html`
        <zeta-top-appbar>
          <div slot="leading">Leading content</div>
        </zeta-top-appbar>
      `);

      const slot: HTMLSlotElement | null | undefined = appbar.shadowRoot?.querySelector("#leading-slot");
      expect(slot?.assignedElements()).to.not.be.empty;
    });

    it("renders content in the appbars trailing slot", async () => {
      const appbar = await fixture(html`
        <zeta-top-appbar>
          <div slot="trailing">trailing content</div>
        </zeta-top-appbar>
      `);

      const slot: HTMLSlotElement | null | undefined = appbar.shadowRoot?.querySelector("#trailing-slot");
      expect(slot?.assignedElements()).to.not.be.empty;
    });

    it("renders content in the appbar", async () => {
      const appbar = await fixture(html` <zeta-top-appbar> <div>Title</div> </zeta-top-appbar> `);

      const slot: HTMLSlotElement | null | undefined = appbar.shadowRoot?.querySelector("#content-slot");
      expect(slot?.assignedElements()).to.not.be.empty;
    });
  });

  // describe("Dimensions Tests", () => {});

  // describe("Styling Tests", () => {});

  // describe("Interaction Tests", () => {});

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});
