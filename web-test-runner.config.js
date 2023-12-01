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
  testFramework: {
    config: {
      timeout: 1000,
    },
  },
}
