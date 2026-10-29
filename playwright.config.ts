import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  globalSetup: './tests/globalSetup.ts',
  fullyParallel: !!process.env.CI,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  maxFailures: process.env.CI ? 10 : undefined,
  // Keep browser/volume rendering within GitHub-hosted runner memory limits.
  workers: process.env.CI ? 2 : undefined,
  snapshotPathTemplate: './tests/screenshots{/projectName}/{testFilePath}/{arg}{ext}',
  outputDir: './tests/test-results',
  reporter: [['html', { outputFolder: './tests/playwright-report' }]],
  // The complete imaging suite needs substantially longer than an individual test.
  globalTimeout: 60 * 60 * 1000,
  timeout: 5 * 60 * 1000,
  use: {
    baseURL: 'http://localhost:3335',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    testIdAttribute: 'data-cy',
    actionTimeout: 10_000,
    launchOptions: {
      // do not hide the scrollbars so that we can assert their look-and-feel
      ignoreDefaultArgs: ['--hide-scrollbars'],
      args: ['--use-gl=egl'],
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
    command:
      'cross-env APP_CONFIG=config/e2e.js COVERAGE=true OHIF_PORT=3335 OHIF_OPEN=false nyc pnpm --filter @ohif/app exec rspack serve --config .webpack/webpack.pwa.js',
    url: 'http://localhost:3335',
    reuseExistingServer: !process.env.CI,
    timeout: 360_000,
  },
});
