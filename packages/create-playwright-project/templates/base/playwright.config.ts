import {defineConfig, devices} from '@playwright/test'

export default defineConfig({
  testDir: './src/tests',
  timeout: 60 * 1000, // 60 seconds
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  /* Retry on CI only - with specific retries for sanity and regression tests */
  retries: ((): number => {
    if (!process.env.CI) return 0

    // Check if running sanity or regression tests specifically
    const testTags = process.env.TEST_TAGS
    if (
      testTags &&
      (testTags.includes('@sanity') || testTags.includes('@regression'))
    ) {
      return 2 // 2 retries for sanity/regression tests
    } else {
      return 0 // No retries for other CI tests
    }
  })(),
  workers: process.env.CI ? 4 : undefined,
  grep: process.env.TEST_TAGS ? new RegExp(process.env.TEST_TAGS) : undefined,
  reporter: [
    [
      'html',
      {
        open: 'never',
        outputFolder: 'playwright-report',
      },
    ],
    ['list'],
  ],
  use: {
    trace: 'on',
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
})
