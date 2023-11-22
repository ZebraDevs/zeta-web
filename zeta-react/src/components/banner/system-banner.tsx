import * as React from "react";
import { createComponent } from "@lit/react";
import { ZetaSystemBanner as ZetaSystemBannerWC } from "zeta-web";

export const ZetaSystemBanner = createComponent({
  tagName: "zeta-system-banner",
  elementClass: ZetaSystemBannerWC,
  react: React,
  events: {}
});