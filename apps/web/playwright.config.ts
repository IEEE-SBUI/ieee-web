import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  // where the tests are located
  testDir: './e2e',

  // max time a test can run before it fails
  timeout: 30 * 1000,

  expect: {
    // how long we wait for checks like expect() to pass
    timeout: 5000,
  },

  // run tests in parallel to make things faster
  fullyParallel: true,

  // don't allow test.only in CI so we don't accidentally skip tests
  forbidOnly: !!process.env.CI,

  // retry failed tests on CI because CI can be flaky sometimes
  retries: process.env.CI ? 2 : 0,

  // on CI we keep it to 1 worker to avoid random failures
  workers: process.env.CI ? 1 : undefined,

  // generate a simple HTML report after tests
  reporter: 'html',

  use: {
    // base URL so we don't hardcode localhost everywhere
    baseURL,

    // save a trace only when a test fails and we retry it
    trace: 'on-first-retry',

    // only take screenshots when something fails
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // before running tests, start the dev server automatically
  webServer: {
    command: 'npm run dev',

    // wait for this URL before starting tests
    url: baseURL,

    // reuse server if it's already running locally
    reuseExistingServer: !process.env.CI,

    // go to repo root before running dev command
    cwd: '../../',

    // give the server time to start up
    timeout: 120 * 1000,
  },
});