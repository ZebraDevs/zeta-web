import { vitePlugin } from "@remcovaes/web-test-runner-vite-plugin";
import { playwrightLauncher } from "@web/test-runner-playwright";
import { defaultReporter } from "@web/test-runner";
import { junitReporter } from "@web/test-runner-junit-reporter";

const LOG_FILTER = ["Lit is in dev mode", "[vite] connecting..."];

const getBrowser = (product) =>
  playwrightLauncher({
    product,
    createBrowserContext: ({ browser }) => {
      return browser.newContext({ permissions: ["clipboard-read"] });
    },
  });

export default {
  coverage: true,
  coverageConfig: {
    include: ["src/**/*.{ts,tsx}", "src/**/**/*.{ts,tsx}"],
  },
  files: ["src/test/**/*.js", "src/test/**/*.ts", "src/index.js"],
  nodeResolve: true,
  plugins: [vitePlugin()],
  browsers: [getBrowser("chromium")],
  filterBrowserLogs: ({ args }) => {
    return !args.some((log) => {
      return (
        typeof log === "string" &&
        LOG_FILTER.some((filterTerm) => log.includes(filterTerm))
      );
    });
  },
  testFramework: {
    config: {
      timeout: 1000,
    },
  },
  reporters: [
    defaultReporter({ reportTestResults: true, reportTestProgress: true }),
    junitReporter({
      outputPath: "src/test/test-results.xml", // default `'./test-results.xml'`
      reportLogs: true, // default `false`
    }),
  ],
};
