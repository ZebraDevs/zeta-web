import fs from "fs/promises";
import path from "path";

const regex = /(([\r\n]|.)*)/;

export default () => {
  const suffix = "?inline";

  return {
    name: "esbuild-plugin-litify-inline-css",
    setup(build) {
      build.onResolve({ filter: /.*\.css\?inline$/ }, async (args) => {
        return {
          path: path.resolve(args.resolveDir, args.path.replace(suffix, "")),
          suffix: "?inline",
        };
      });
      build.onLoad({ filter: /.*\.css$/ }, async (args) => {
        // console.log("🥇 LitCss ", args.path, args.suffix);
        let fileData = await fs.readFile(args.path, "utf-8");
        if (args.suffix === suffix) {
          //   console.log("✅ LitCss", args.path);
          return {
            contents: fileData.replace(
              regex,
              (m) => `import { css } from "lit"; export default css\`${m}\`;`
            ),
            loader: "js",
          };
        }
        return {
          contents: fileData,
          loader: "css",
        };
      });
    },
  };
};
