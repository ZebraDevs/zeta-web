/**
 * Adapted from cem-plugin-better-lit-types: https://github.com/Uscreen-video/cem-plugin-better-lit-types
 */

import { getComponentDeclaration, reduceTypes } from "cem-plugin-better-lit-types/storybook";
import { FIELD } from "../node_modules/cem-plugin-better-lit-types/dist/extractor/types";

export default (manifest, mapArgs?) => componentName => {
  const declaration: any = getComponentDeclaration(manifest, componentName);

  if (!declaration) return;

  return Object.fromEntries(
    Object.entries(
      Object.assign(
        Object.assign(
          Object.assign(
            Object.assign({}, reduceTypes(declaration.attributes, FIELD.attributes, mapArgs)),
            reduceTypes(declaration.members, FIELD.properties, mapArgs)
          ),
          reduceTypes(declaration.slots, FIELD.slots, mapArgs)
        ),
        reduceTypes(declaration.cssProperties, FIELD.css, mapArgs)
      )
    ).map(e => {
      //TODO: Extend this abomination to list values in union types.
      return e.map(f => {
        if (f!["type"] !== typeof String && f!["type"] && f!["type"]["text"] && f!["type"]["text"] != "boolean" && !f!["type"]["text"].includes("number")) {
          f!["type"] = f!["type"]["text"];
        }
        return f;
      });
    })
  );
};

