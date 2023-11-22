import * as React from "react";
import { createComponent } from "@lit/react";
import { ZetaButton as ZetaButtonWC } from "zeta-web";

export const ZetaButton = createComponent({
  tagName: "zeta-button",
  elementClass: ZetaButtonWC,
  react: React,
  events: {}
});

