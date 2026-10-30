import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaLabel } from "../../../components/badges/badges";
import "../../../components/badges/label/label";
import { contrastTest } from "../../accessibility-utils/accessibility-test-runner";
import "../../../css/styles.css";
import { getCssVarColorValue, getCssVarPxValue } from "../../utils";

describe("zeta-label", () => {
  let subject: ZetaLabel;
  const createComponent = (template = `<zeta-label></zeta-label>`) => {
    // prettier-ignore
    return fixture<ZetaLabel>(html`${unsafeStatic(template)}`);
  };
  beforeEach(async () => {
    subject = await createComponent();
  });
  describe("Accessibility", () => {
    const statuses = ["info", "positive", "warning", "negative", "neutral"] as const;
    const cases: { name: string; status: ZetaLabel["status"]; bold: boolean }[] = statuses.flatMap(status =>
      [true, false].map(bold => ({ name: `${status} (bold: ${bold})`, status, bold }))
    );

    cases.forEach(c => {
      it(`meets contrast requirements for ${c.name}`, async () => {
        subject.setAttribute("status", c.status);
        subject.setAttribute("label", `Label ${c.status}`);
        subject.bold = c.bold;
        await elementUpdated(subject);

        // Check color contrast between text and background
        const bg = subject.shadowRoot?.querySelector(".container");
        const fg = subject.shadowRoot?.querySelector(".text");
        expect(fg, "Text should exist").to.exist;
        expect(bg, "Container should exist").to.exist;
        await contrastTest(`Label ${c.name}`, fg!, bg!);
      });
    });

    statuses.forEach(status => {
      it(`meets aria requirements for ${status}`, async () => {
        subject.status = status;
        subject.label = `Label ${status}`;
        await elementUpdated(subject);
        await expect(subject).to.be.accessible();
        await expect(subject).shadowDom.to.be.accessible();
      });
    });
  });

  describe("Content", () => {
    it("sets the default properties correctly", () => {
      expect(subject.status).to.equal("neutral");
      expect(subject.bold).to.equal(true);
      expect(subject.outlined).to.equal(false);
      expect(subject.rounded).to.equal(true);
      expect(subject.label).to.equal(undefined);
    });

    it("reflects bold and outlined to attributes", async () => {
      expect(subject.hasAttribute("bold")).to.equal(true);
      expect(subject.hasAttribute("outlined")).to.equal(false);
      subject.bold = false;
      subject.outlined = true;
      await elementUpdated(subject);
      expect(subject.hasAttribute("bold")).to.equal(false);
      expect(subject.hasAttribute("outlined")).to.equal(true);
    });

    it("renders the label text", async () => {
      subject.label = "Testing";
      await elementUpdated(subject);
      expect(subject.shadowRoot?.querySelector(".text")?.textContent).to.contain("Testing");
    });
  });

  describe("Dimensions", () => {
    const px = (token: string) => getCssVarPxValue(subject, token);
    // Per side: padding + border. Outlined shrinks its padding by --stroke-thin, so the stroke sits inside the box.
    const cases: { name: string; bold: boolean; outlined: boolean; edge: string[] }[] = [
      { name: "bold", bold: true, outlined: false, edge: ["--space-xxs", "--stroke-thin"] },
      { name: "outlined", bold: false, outlined: true, edge: ["--space-xxs"] },
      { name: "plain", bold: false, outlined: false, edge: ["--space-xxs", "--stroke-base"] }
    ];

    cases.forEach(c => {
      it(`sets the ${c.name} dimensions correctly (bold: ${c.bold}, outlined: ${c.outlined})`, async () => {
        subject.label = "Label";
        subject.bold = c.bold;
        subject.outlined = c.outlined;
        await elementUpdated(subject);
        const size = subject.getBoundingClientRect();
        // Text width depends on font rendering, so it is measured rather than read from a token
        const text = subject.shadowRoot!.querySelector(".text")!.getBoundingClientRect().width;
        const edge = c.edge.reduce((sum, token) => sum + px(token), 0);

        expect(size.height).to.equal(px("--body-xsmall-line-height") + 2 * edge);
        expect(size.width).to.be.closeTo(text + 2 * edge, 0.5);
      });
    });
  });

  describe("Styling", () => {
    const container = () => subject.shadowRoot!.querySelector(".container")!;
    const text = () => subject.shadowRoot!.querySelector(".text")!;
    const color = (token: string) => getCssVarColorValue(subject, token);
    const px = (token: string) => getCssVarPxValue(subject, token);
    const cases: { status: ZetaLabel["status"]; strong: string; subtle: string; border: string; onStrong: string }[] = [
      {
        status: "neutral",
        strong: "--foreground-secondary",
        subtle: "--surface-subtle",
        border: "--border-strong",
        onStrong: "--foreground-inverse"
      },
      {
        status: "info",
        strong: "--feedback-info-background-strong",
        subtle: "--feedback-info-background-subtle",
        border: "--border-info",
        onStrong: "--interactive-primary-foreground-default"
      },
      {
        status: "positive",
        strong: "--feedback-success-background-strong",
        subtle: "--feedback-success-background-subtle",
        border: "--border-success",
        onStrong: "--interactive-primary-foreground-default"
      },
      {
        status: "warning",
        strong: "--feedback-warning-background-strong",
        subtle: "--feedback-warning-background-subtle",
        border: "--border-warning",
        onStrong: "--foreground-inverse"
      },
      {
        status: "negative",
        strong: "--feedback-error-background-strong",
        subtle: "--feedback-error-background-subtle",
        border: "--border-error",
        onStrong: "--interactive-destructive-foreground-default"
      }
    ];

    cases.forEach(c => {
      it(`bold ${c.status} uses ${c.strong} fill and border with ${c.onStrong} text`, async () => {
        subject.status = c.status;
        await elementUpdated(subject);
        const styles = getComputedStyle(container());
        expect(styles.backgroundColor).to.equal(color(c.strong));
        expect(styles.borderTopColor).to.equal(color(c.strong));
        expect(parseFloat(styles.borderTopWidth)).to.equal(px("--stroke-thin"));
        expect(getComputedStyle(text()).color).to.equal(color(c.onStrong));
      });

      it(`plain ${c.status} uses ${c.subtle} fill with a --stroke-base ${c.border} border`, async () => {
        subject.status = c.status;
        subject.bold = false;
        await elementUpdated(subject);
        const styles = getComputedStyle(container());
        expect(styles.backgroundColor).to.equal(color(c.subtle));
        expect(parseFloat(styles.borderTopWidth)).to.equal(px("--stroke-base"));
        expect(styles.borderTopColor).to.equal(color(c.border));
        expect(getComputedStyle(text()).color).to.equal(color("--foreground-primary"));
      });

      it(`outlined ${c.status} uses ${c.subtle} fill with a --stroke-thin ${c.border} border`, async () => {
        subject.status = c.status;
        subject.bold = false;
        subject.outlined = true;
        await elementUpdated(subject);
        const styles = getComputedStyle(container());
        expect(styles.backgroundColor).to.equal(color(c.subtle));
        expect(parseFloat(styles.borderTopWidth)).to.equal(px("--stroke-thin"));
        expect(styles.borderTopColor).to.equal(color(c.border));
      });
    });

    it("ignores outlined when bold", async () => {
      subject.outlined = true;
      await elementUpdated(subject);
      const styles = getComputedStyle(container());
      expect(styles.backgroundColor).to.equal(color("--foreground-secondary"));
      expect(styles.borderTopColor).to.equal(color("--foreground-secondary"));
    });

    it("uses --radius-element-sm when rounded and --radius-none when sharp", async () => {
      expect(parseFloat(getComputedStyle(container()).borderTopLeftRadius)).to.equal(px("--radius-element-sm"));
      subject.rounded = false;
      await elementUpdated(subject);
      expect(parseFloat(getComputedStyle(container()).borderTopLeftRadius)).to.equal(px("--radius-none"));
    });

    it("uses body-xsmall text", () => {
      const styles = getComputedStyle(text());
      expect(parseFloat(styles.fontSize)).to.equal(px("--body-xsmall-font-size"));
      expect(parseFloat(styles.lineHeight)).to.equal(px("--body-xsmall-line-height"));
    });
  });
  // describe("Interaction", () => {});
  // describe("Golden", () => {});
  // describe("Performance", () => {});
});
