import { spread as oldSpread } from "@open-wc/lit-helpers";
import type { LitElement, PropertyDeclaration } from "lit";
import type { DirectiveResult } from "lit/directive.js";

type SpreadData = {
  [key: string]: unknown;
};
type PropertyDeclarationMap = Map<string, PropertyDeclaration>;

const _spread = (_spreadData: SpreadData, properties: PropertyDeclarationMap): DirectiveResult => {
  const fixedSpreadData = Object.entries(_spreadData).reduce((acc, [key, value]) => {
    const property = properties.get(key) as (PropertyDeclaration & { type?: { name: string } }) | undefined;
    let newKey = key;
    /* Future '@' will set the event */
    if (property?.attribute === undefined || property?.attribute !== false) {
      newKey = `${property?.type && property.type.name == "Boolean" ? "?" : ""}${key}`;
    } else if (property?.attribute === false) {
      newKey = `.${key}`;
    }
    acc[newKey] = value;
    return acc;
  }, {} as SpreadData);
  const returnVal = oldSpread(fixedSpreadData) as SpreadData;
  console.log("Spread", _spreadData, fixedSpreadData, properties, returnVal);
  return returnVal;
};

export const spreadGenerator = (clas: typeof LitElement) => {
  return (spreadData: SpreadData) => _spread(spreadData, clas.elementProperties as PropertyDeclarationMap);
};
