/**
 * @netanelh2/playwright-framework
 * A robust Playwright TypeScript testing framework with Page Object Model
 */

// Core classes
export * from './core/index.js'

// Types
export * from './types/index.js'

// Helpers
export * from './helpers/index.js'

// Fixtures (also available as separate import)
export * from './fixtures/index.js'

// Re-export common Playwright types for convenience
export type {
  Browser,
  BrowserContext,
  Locator,
  Page,
  PlaywrightTestConfig,
  TestInfo,
} from '@playwright/test'
