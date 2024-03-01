import { defineConfig } from "vite";
import { resolve } from "path";
import postcssLit from "rollup-plugin-postcss-lit";
import dts from "vite-plugin-dts";
import cp from "vite-plugin-cp";

export default defineConfig({
  server: {
    fs: {
      allow: ["..", "../.."]
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "zeta-web",
      fileName: "zeta-web",
      formats: ["es"]
    },
    rollupOptions: {
      external: ["lit"],
      output: {
        globals: {
          lit: "Lit"
        }
      }
    }
  },

  plugins: [
    postcssLit({
      exclude: ["./index.css", "**/*\?direct*"]
    }),
    dts({
      include: "./src/index.ts"
    }),
    cp({
      enforce: "post",
      targets: [
        { src: "./dist/index.d.ts", dest: "./dist/", rename: name => "zeta-web.d.ts" },
        { src: "./dist/index.d.ts.map", dest: "./dist/", rename: name => "zeta-web.d.ts.map" }
      ]
    })
  ]
});
