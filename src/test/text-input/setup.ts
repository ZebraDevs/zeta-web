import { fixture, html } from "@open-wc/testing";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { ZetaTextInput } from "../../index.js";
import "../../index.js";
import { ifDefined } from "lit/directives/if-defined.js";

interface Props {
  disabled?: boolean;
  leadingIcon?: ZetaIconName;
  trailingIcon?: ZetaIconName;
  suffix?: string;
  prefix?: string;
  error?: boolean;
  required?: boolean;
  label?: string;
  hint?: string;
  errorText?: string;
  name?: string;
  value?: string;
  type?: "text" | "date" | "textarea" | "password" | "time";
}

export async function setup({
  hint = "",
  label = "",
  disabled = false,
  error = false,
  leadingIcon,
  trailingIcon,
  prefix = "",
  required = false,
  suffix = "",
  type = "text",
  errorText = undefined,
  name = undefined,
  value = undefined
}: Props) {
  return await fixture<ZetaTextInput>(
    html`<zeta-text-input
      ?required=${required}
      ?error=${error}
      hintText=${hint}
      suffix=${suffix}
      prefix=${prefix}
      ?disabled=${disabled}
      leadingIcon=${leadingIcon ?? ""}
      trailingIcon=${trailingIcon ?? ""}
      errorText=${errorText ?? ""}
      type=${type}
      name=${ifDefined(name)}
      value=${ifDefined(value)}
      label=${ifDefined(label)}
    ></zeta-text-input>`
  );
}
