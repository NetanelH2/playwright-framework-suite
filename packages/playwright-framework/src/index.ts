/**
 * @netanelh2/playwright-framework
 * A robust Playwright TypeScript testing framework with Page Object Model
 */

// Re-export common Playwright types for convenience
export type {
	Browser,
	BrowserContext,
	Locator,
	Page,
	PlaywrightTestConfig,
	TestInfo,
} from '@playwright/test'
// Core classes
export * from './core/BasePage.js'
export * from './core/LocatorUtils.js'
// Fixtures (also available as separate import)
export * from './fixtures/testSetup.js'

// Helpers
export * from './helpers/arrayUtils.js'
export * from './helpers/envUtils.js'
// Types
export * from './types/fixtureTypes.js'
export * from './types/locatorTypes.js'
