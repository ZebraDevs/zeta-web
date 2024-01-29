/** Defines how corners are shaped. Defaults to `rounded`. @public */
export type Contour =
  /** Applies 4px border-radius. */
  | "rounded"
  /** Applies 0px border-radius. */
  | "sharp";

export type Side = "left" | "right";

export type Flavor = ButtonFlavor | IconButtonFlavor;

export type ButtonFlavor =
  /** Primary background color.*/
  | "primary"
  /** PrimaryVariant background color. */
  | "secondary"
  /** Positive background color. */
  | "positive"
  /** Negative background color. */
  | "negative"
  /** Primary outline color, no background. */
  | "outline"
  /** Subtle outline color, no background. */
  | "outline-subtle"
  /** Primary color text, no outline or background. */
  | "text";

export type IconButtonFlavor =
  /** Primary background color.*/
  | "primary"
  /** PrimaryVariant background color. */
  | "secondary"
  /** Positive background color. */
  | "positive"
  /** Negative background color. */
  | "negative"
  /** Primary outline color, no background. */
  | "outline"
  /** Subtle outline color, no background. */
  | "outline-subtle"
  /** Basic colors */
  | "basic"
  /** Inverse basic colors. */
  | "basic-inverse"
  /** Negative basic colors. */
  | "basic-negative";

export type Size = "medium" | "small" | "large";

export type Alignment = "center" | "start" | "end";

export type Status = "positive" | "warning" | "negative";

export type BannerStatus = "default" | "info" | Status;

export type BadgeStatus = Status | "neutral" | "info" | "positive" | "warning" | "negative";
