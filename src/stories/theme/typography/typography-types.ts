export class TextStyle {
  name: string;
  cssVar: string;
  fontSizeRem: number;
  fontWeight: string;
  lineHeightRem: number;
  alternativeName?: string;
  fontSizePx: number;
  lineHeightPx: number;

  constructor(name: string, fontSizeRem: number, lineHeightRem: number, fontWeight: string, alternativeName?: string) {
    this.name = name;
    this.cssVar = "var(--" + name.replace(/\s+/g, "-").toLowerCase() + ")";
    this.fontSizeRem = fontSizeRem;
    this.fontWeight = fontWeight;
    this.lineHeightRem = lineHeightRem;
    this.alternativeName = alternativeName;
    this.fontSizePx = fontSizeRem * 16;
    this.lineHeightPx = lineHeightRem * 16;
  }
}

export const typographyTypes: TextStyle[] = [
  new TextStyle("Display Large", 3.25, 3.75, "300"),
  new TextStyle("Display Medium", 2.75, 3.25, "300"),
  new TextStyle("Display Small", 2.25, 2.5, "300"),
  new TextStyle("Headline Large", 2, 2.25, "400", "H1"),
  new TextStyle("Headline Medium", 1.75, 2, "400", "H2"),
  new TextStyle("Headline Small", 1.5, 1.75, "400", "H3"),
  new TextStyle("Title Large", 1.25, 1.5, "500", "H4"),
  new TextStyle("Title Medium", 1, 1.25, "500", "H5"),
  new TextStyle("Title Small", 0.75, 1, "500", "H6"),
  new TextStyle("Body Large", 1.25, 1.5, "400"),
  new TextStyle("Body Medium", 1, 1.5, "400"),
  new TextStyle("Body Small", 0.875, 1.125, "400"),
  new TextStyle("Body X-Small", 0.75, 1, "400"),
  new TextStyle("Label Large", 1, 1.5, "500"),
  new TextStyle("Label Medium", 0.875, 1.25, "500"),
  new TextStyle("Label Small", 0.75, 1, "500"),
  new TextStyle("Label Indicator", 0.75, 0.875, "500")
];
