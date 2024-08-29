import { html } from "lit";
import { fixture, expect } from "@open-wc/testing";
import type { ZetaAppbar } from "../../components/appbar/appbar";
import "../../components/appbar/appbar";

describe("ZetaAppbar", () => {
  it("renders the appbar with default values", async () => {
    const appbar: ZetaAppbar = await fixture(html`<zeta-appbar></zeta-appbar>`);
    expect(appbar.centered).to.be.false;
    expect(appbar.extended).to.be.false;
  });

  it("renders the appbar with centered title", async () => {
    const appbar: ZetaAppbar = await fixture(html`<zeta-appbar centered></zeta-appbar>`);
    expect(appbar.centered).to.be.true;
    expect(appbar.extended).to.be.false;
  });

  it("renders the appbar with extended title", async () => {
    const appbar: ZetaAppbar = await fixture(html`<zeta-appbar extended></zeta-appbar>`);
    expect(appbar.centered).to.be.false;
    expect(appbar.extended).to.be.true;
  });

  it("renders content in the appbars leading slot", async () => {
    const appbar = await fixture(html`
      <zeta-appbar>
        <div slot="leading">Leading content</div>
      </zeta-appbar>
    `);

    const slot: HTMLSlotElement | null | undefined = appbar.shadowRoot?.querySelector("#leading-slot");
    expect(slot?.assignedElements()).to.not.be.empty;
  });

  it("renders content in the appbars trailing slot", async () => {
    const appbar = await fixture(html`
      <zeta-appbar>
        <div slot="trailing">trailing content</div>
      </zeta-appbar>
    `);

    const slot: HTMLSlotElement | null | undefined = appbar.shadowRoot?.querySelector("#trailing-slot");
    expect(slot?.assignedElements()).to.not.be.empty;
  });

  it("renders content in the appbar", async () => {
    const appbar = await fixture(html` <zeta-appbar> <div>Title</div> </zeta-appbar> `);

    const slot: HTMLSlotElement | null | undefined = appbar.shadowRoot?.querySelector("#content-slot");
    expect(slot?.assignedElements()).to.not.be.empty;
  });
});
