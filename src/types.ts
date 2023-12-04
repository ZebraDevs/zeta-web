/** Defines how corners are shaped. Defaults to `rounded`. @public */
export type Contour =
  /** Applies 4px border-radius. */
  | "rounded"
  /** Applies 0px border-radius. */
  | "sharp";

export type Flavor = ButtonFlavor;

export type ButtonFlavor =
  /** Primary background color.*/
  | "primary"
  /** PrimaryVariant background color. */
  | "primary-variant"
  /** Negative background color. */
  | "negative"
  /** Primary outline color, no background. */
  | "outline"
  /** Subtle outline color, no background. */
  | "outline-subtle"
  /** Primary color text, no outline or background. */
  | "text"
  /** Inverted colors. */
  | "text-inverse";
export type Size = "medium" | "small" | "large";

export type Alignment = "center" | "start" | "end";

export type Status = "positive" | "warning" | "negative";

export type BannerStatus = "default" | "info" | Status;

export type BadgeStatus = Status | "neutral" | "info" | "positive" | "warning" | "negative";

