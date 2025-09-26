/**
 * Base fixtures for Playwright tests with consistent context and page management.
 * 
 * @example
 * ```typescript
 * import { test, expect } from '@netanelh2/playwright-framework/fixtures'
 * 
 * test('example test', async ({ page }) => {
 *   await page.goto('https://example.com')
 *   await expect(page).toHaveTitle(/Example/)
 * })
 * ```
 */
export { test, expect } from './testSetup.js'