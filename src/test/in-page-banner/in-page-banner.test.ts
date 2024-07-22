import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import { ZetaInPageBanner } from "../../index.js";
import "../../index.js";

describe("zeta-in-page-banner", () => {
    let subject: ZetaInPageBanner;

    const headingText = "Headline";
    const subHeadingText = "Subhead";
    // const status = "default";
    const status = "info";
    // const status = "positive";
    // const status = "warning";
    // const status = "negative";

    const createComponent = (
        template = `<zeta-in-page-banner title="${headingText}" body="${subHeadingText}" status="${status}"></zeta-in-page-banner>`
    ) => {
        return fixture<ZetaInPageBanner>(html`${unsafeStatic(template)}`);
    };

    beforeEach(async () => {
        subject = await createComponent();
    });

    it("sets the heading correctly", () => {
        const headerElement = subject.shadowRoot?.querySelector(".title");

        expect(headerElement).to.not.be.undefined;
        void expect(headerElement?.textContent).to.equal(headingText);
    });

    it("sets the subheading correctly", async () => {
        const subHeaderElement = subject.shadowRoot?.querySelector(".body");

        expect(subHeaderElement).to.not.be.undefined;
        await expect(subHeaderElement?.textContent).to.equal(subHeadingText);
    });

    it("meets accessibility requirements", async () => {
        await expect(subject).shadowDom.to.be.accessible();
    });
}
);