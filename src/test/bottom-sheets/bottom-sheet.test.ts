import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaBottomSheet } from "../../components/bottom-sheets/bottom-sheet.js";
import "../../components/bottom-sheets/bottom-sheet.js";
const headerText = "Title";

describe("zeta-bottom-sheet + zeta-list-item", () => {
  let subject: ZetaBottomSheet;

  const createComponent = (
    template = `<zeta-bottom-sheet headerText=${headerText}>
    <zeta-list-item headline=${"Item 1"}></zeta-list-item>
    <zeta-list-item headline=${"Item 2"}></zeta-list-item>
    <zeta-list-item headline=${"Item 3"}></zeta-list-item>
    </zeta-bottom-sheet>`
  ) => {
    // prettier-ignore
    return fixture<ZetaBottomSheet>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility Tests", () => {
    it("it meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content Tests", () => {
    it("renders the bottom sheet", () => {
      expect(subject).to.exist;
    });

    it("displays the header text correctly", async () => {
      const headerText = "Custom Header Text";
      subject.headerText = headerText;
      await elementUpdated(subject);

      const headerElement = subject.shadowRoot?.querySelector(".header");
      await expect(headerElement?.textContent).to.equal(headerText);
    });

    it("updates when isExpanded changes", async () => {
      subject.isExpanded = true;
      await elementUpdated(subject);

      await expect(subject.isExpanded).to.not.equal(false);
    });
  });

  describe("Dimensions Tests", () => {
    it("applies the correct header alignment", async () => {
      const headerAlignment = "center";
      subject.headerAlignment = headerAlignment;
      await elementUpdated(subject);

      const headerElement = subject.shadowRoot?.querySelector(".header");
      await expect(getComputedStyle(headerElement!).justifyContent).to.equal(headerAlignment);

      const headerAlignmentStart = "start";
      subject.headerAlignment = headerAlignmentStart;
      await elementUpdated(subject);

      await expect(getComputedStyle(headerElement!).justifyContent).to.equal("flex-" + headerAlignmentStart);
    });

    it("applies the correct css display for list items", async () => {
      const sheetContent = subject.shadowRoot?.querySelector(".content");
      await expect(getComputedStyle(sheetContent!).display).to.equal("flex");
    });
  });

  // describe("Styling Tests", () => {});

  // describe("Interaction Tests", () => {});

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});

describe("zeta-bottom-sheet + zeta-grid-menu-item", () => {
  let subject: ZetaBottomSheet;

  const createComponent = (
    template = `<zeta-bottom-sheet headerText=${headerText}>
      <zeta-grid-menu-item>Item 1</zeta-grid-menu-item>
        <zeta-grid-menu-item>Item 2</zeta-grid-menu-item>
        <zeta-grid-menu-item>Item 3</zeta-grid-menu-item>
        <zeta-grid-menu-item>Item 4</zeta-grid-menu-item>
      </zeta-bottom-sheet>`
  ) => {
    // prettier-ignore
    return fixture<ZetaBottomSheet>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility Tests", () => {
    it("it meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content Tests", () => {
    it("renders the bottom sheet", () => {
      expect(subject).to.exist;
    });

    it("displays the header text correctly", async () => {
      const headerText = "Custom Header Text";
      subject.headerText = headerText;
      await elementUpdated(subject);

      const headerElement = subject.shadowRoot?.querySelector(".header");
      await expect(headerElement?.textContent).to.equal(headerText);
    });

    it("updates when isExpanded changes", async () => {
      subject.isExpanded = true;
      await elementUpdated(subject);

      await expect(subject.isExpanded).to.not.equal(false);
    });
  });

  describe("Dimensions Tests", () => {
    it("applies the correct header alignment", async () => {
      const headerAlignment = "center";
      subject.headerAlignment = headerAlignment;
      await elementUpdated(subject);

      const headerElement = subject.shadowRoot?.querySelector(".header");
      await expect(getComputedStyle(headerElement!).justifyContent).to.equal(headerAlignment);

      const headerAlignmentStart = "start";
      subject.headerAlignment = headerAlignmentStart;
      await elementUpdated(subject);

      await expect(getComputedStyle(headerElement!).justifyContent).to.equal("flex-" + headerAlignmentStart);
    });

    it("applies the correct css display for grid items", async () => {
      subject.isGrid = true;
      await elementUpdated(subject);

      const sheetContent = subject.shadowRoot?.querySelector(".content");
      await expect(getComputedStyle(sheetContent!).display).to.equal("grid");
    });
  });

  // describe("Styling Tests", () => {});

  // describe("Interaction Tests", () => {});

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});

describe("zeta-bottom-sheet + generic content", () => {
  let subject: ZetaBottomSheet;

  const createComponent = (
    template = `<zeta-bottom-sheet headerText=${headerText}>
      <div>
          <h1>Generic Content</h1>
          <p>This is generic content</p>
          <div>
            <h2>Section 1</h2>
            <p>This is the first section of the generic content.</p>
          </div>
          <div>
            <h2>Section 2</h2>
            <p>This is the second section of the generic content.</p>
          </div>
          <div>
            <h2>Section 3</h2>
            <p>This is the third section of the generic content.</p>
          </div>
          <div>
            <h2>Section 4</h2>
            <p>This is the fourth section of the generic content.</p>
          </div>
          <div>
            <h2>Section 5</h2>
            <p>This is the fifth section of the generic content.</p>
          </div>
        </div>
      </zeta-bottom-sheet>`
  ) => {
    // prettier-ignore
    return fixture<ZetaBottomSheet>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility Tests", () => {
    it("it meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content Tests", () => {
    it("renders the bottom sheet", () => {
      expect(subject).to.exist;
    });

    it("displays the header text correctly", async () => {
      const headerText = "Custom Header Text";
      subject.headerText = headerText;
      await elementUpdated(subject);

      const headerElement = subject.shadowRoot?.querySelector(".header");
      await expect(headerElement?.textContent).to.equal(headerText);
    });

    it("updates when isExpanded changes", async () => {
      subject.isExpanded = true;
      await elementUpdated(subject);

      await expect(subject.isExpanded).to.not.equal(false);
    });
  });

  describe("Dimensions Tests", () => {
    it("applies the correct header alignment", async () => {
      const headerAlignment = "center";
      subject.headerAlignment = headerAlignment;
      await elementUpdated(subject);

      const headerElement = subject.shadowRoot?.querySelector(".header");
      await expect(getComputedStyle(headerElement!).justifyContent).to.equal(headerAlignment);

      const headerAlignmentStart = "start";
      subject.headerAlignment = headerAlignmentStart;
      await elementUpdated(subject);

      await expect(getComputedStyle(headerElement!).justifyContent).to.equal("flex-" + headerAlignmentStart);
    });

    it("applies the correct css display for generic content", async () => {
      subject.isGenericContent = true;
      await elementUpdated(subject);

      const sheetContent = subject.shadowRoot?.querySelector(".content");
      await expect(getComputedStyle(sheetContent!).display).to.equal("block");
    });
  });

  // describe("Styling Tests", () => {});

  // describe("Interaction Tests", () => {});

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});
