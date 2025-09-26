import { defineConfig } from '@playwright/test'
import { getEnvCredentials } from '@netanelh2/playwright-framework'

const TEST_TAGS = getEnvCredentials('TEST_TAGS')
const CI = !!getEnvCredentials('CI')

// Apply tag filtering if TEST_TAGS is set
const grepOptions = TEST_TAGS
  ? {
      grep: new RegExp(TEST_TAGS.replace(/[@,]/g, '|').replace(/\|+/g, '|')),
    }
  : {}

// Enable retries only in CI and only when running tagged tests
const retries = CI && TEST_TAGS ? 2 : 0

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: CI,
  retries,
  workers: CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ...(CI ? [['github'] as [string]] : []),
  ],
  use: {
    baseURL: getEnvCredentials('BASE_URL'),
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...require('@playwright/test').devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: { 
        ...require('@playwright/test').devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: { 
        ...require('@playwright/test').devices['Desktop Safari'],
      },
    },
  ],
  ...grepOptions,
})