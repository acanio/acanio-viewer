import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: !!process.env.CI,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  // One worker per shard: concurrent heavy 3D volume renders in a single CI
  // container contend for GPU/memory and render black. Parallelism comes from
  // sharding across jobs instead.
  workers: process.env.CI ? 1 : undefined,
  snapshotPathTemplate: './tests/screenshots{/projectName}/{testFilePath}/{arg}{ext}',
  outputDir: './tests/test-results',
  reporter: [
    [process.env.CI ? 'blob' : 'html', { outputFolder: './tests/playwright-report' }],
    ['list'],
  ],
  globalTimeout: 800_000,
  timeout: 800_000,
  use: {
    baseURL: 'http://localhost:3335',
    trace: 'on-first-retry',
    video: 'on-first-retry',
    testIdAttribute: 'data-cy',
    actionTimeout: 30_000,
    // Disable web security / CSP so cross-origin DICOMweb fetches (the cloudfront
    // data sources) are not blocked by CORS in the CI browser.
    bypassCSP: true,
    launchOptions: {
      // do not hide the scrollbars so that we can assert their look-and-feel
      ignoreDefaultArgs: ['--hide-scrollbars'],
      args: ['--disable-web-security'],
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], deviceScaleFactor: 1 },
    },
    // TODO: Fix firefox tests
    // {
    //  name: 'firefox',
    //  use: { ...devices['Desktop Firefox'], deviceScaleFactor: 1 },
    // },
    // This is commented out until SharedArrayBuffer is enabled in WebKit
    // See: https://github.com/microsoft/playwright/issues/14043

    //{
    //  name: 'webkit',
    //  use: { ...devices['Desktop Safari'], deviceScaleFactor: 1 },
    //},
  ],
  webServer: {
    command: 'cross-env APP_CONFIG=config/e2e.js OHIF_PORT=3335 yarn start',
    url: 'http://localhost:3335',
    reuseExistingServer: !process.env.CI,
    timeout: 360_000,
  },
});
