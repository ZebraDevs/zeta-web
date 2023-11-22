import * as React from "react";
import { createComponent } from "@lit/react";
import { ZetaInPageBanner as ZetaInPageBannerWC } from "zeta-web";

export const ZetaInPageBanner = createComponent({
  tagName: "zeta-in-page-banner",
  elementClass: ZetaInPageBannerWC,
  react: React,
  events: {}
});