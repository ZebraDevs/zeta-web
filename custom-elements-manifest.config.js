import { customJSDocTagsPlugin } from "cem-plugin-custom-jsdoc-tags";
import { getTsProgram, typeParserPlugin } from "@wc-toolkit/type-parser";
import { JSXPluginWrapped } from './scripts/cem-plugin.js';

export default {
  globs: ["src/components/**/*.ts", "src/mixins/**/*.ts"],
  litelement: true,
  overrideModuleCreation({ ts, globs }) {
    const program = getTsProgram(ts, globs, "tsconfig.json");
    return program
      .getSourceFiles()
      .filter((sf) => globs.find((glob) => sf.fileName.includes(glob)));
  },
  plugins: [
    customJSDocTagsPlugin({
      tags: {
        figma: {
          isArray: true,
        },
        storybook: {},
      },
    }),
    JSXPluginWrapped(),
    typeParserPlugin({ propertyName: 'change-type', debug: true }),

  ],
};
