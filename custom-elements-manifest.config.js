import { customJSDocTagsPlugin } from "cem-plugin-custom-jsdoc-tags";

export default {
  globs: ["src/components/**/*.ts", "src/mixins/**/*.ts"],
  litelement: true,
  plugins: [
    customJSDocTagsPlugin({
      tags: {
        figma: {
          isArray: true
        },
        storybook: {}
      }
    })
  ]
};
