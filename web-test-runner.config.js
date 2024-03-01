import { vitePlugin } from '@remcovaes/web-test-runner-vite-plugin';
import {playwrightLauncher} from '@web/test-runner-playwright'
const getBrowser = product =>
  playwrightLauncher({
    product,
    createBrowserContext: ({browser}) => {
      return browser.newContext({permissions: ['clipboard-read']})
    },
  })

export default {
  coverage: true,
  coverageConfig: {
    include: ['src/**/*.{ts,tsx}', 'src/**/**/*.{ts,tsx}'],
  },
  files: ['test/**/*.js'],
  nodeResolve: true,
  plugins: [ vitePlugin() ],
  browsers: [getBrowser('chromium')],
  filterBrowserLogs: ({args}) => {return !args.some((log) => typeof log === "string" && log.includes("Lit is in dev mode"))},
  testFramework: {
    config: {
      timeout: 1000,
    },
  },
}
