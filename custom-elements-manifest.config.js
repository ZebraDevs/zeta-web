import { customJSDocTagsPlugin } from "cem-plugin-custom-jsdoc-tags";
import { customElementJsxPlugin } from "custom-element-jsx-integration";
import { getTsProgram, typeParserPlugin } from "@wc-toolkit/type-parser";
import { myPlugin } from './scripts/cem-plugin.js';

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
    myPlugin(),
    typeParserPlugin({ propertyName: 'change-type' }),
    //     customElementJsxPlugin({
    //       outdir: "dist",
    //       fileName: "jsx.d.ts",
    //       globalEvents: `
    //   /** Triggered when the element is clicked by the user by mouse or keyboard. */
    //   onClick?: (event: MouseEvent) => void;
    //   /** Fired when a key is pressed down. */
    //   onKeyDown?: (event: KeyboardEvent) => void;
    //   /** Fired when a key is released.. */
    //   onKeyUp?: (event: KeyboardEvent) => void;
    //   /** Fired when a key is pressed down. */
    //   onKeyPressed?: (event: KeyboardEvent) => void;
    //   /** Fired when the element receives focus, often triggered by tab navigation. */
    //   onFocus?: (event: FocusEvent) => void;
    //   /** Fired when the element loses focus. */
    //   onBlur?: (event: FocusEvent) => void;
    // `,
    //     }),
  ],
};
