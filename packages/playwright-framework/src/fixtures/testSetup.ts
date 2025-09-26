import {test as base} from '@playwright/test'
import type {PageFixtures} from '../types/fixtureTypes.js'

/**
 * Base test fixtures that provide consistent browser context and page management.
 * Users can extend this in their projects to add their specific page objects.
 *
 * @example
 * ```typescript
 * // In user's project
 * import { test as baseTest } from '@netanelh2/playwright-framework/fixtures'
 * import { MainPage, LoginPage } from '@/pages'
 *
 * export const test = baseTest.extend({
 *   mainPage: async ({page}, use) => {
 *     await use(new MainPage(page))
 *   },
 *   loginPage: async ({page}, use) => {
 *     await use(new LoginPage(page))
 *   },
 * })
 * ```
 */
export const test = base.extend<PageFixtures>({
  context: async ({browser}, use) => {
    const context = await browser.newContext()
    await use(context)
    await context.close()
  },
  page: async ({context}, use) => {
    const page = await context.newPage()
    await use(page)
  },
})

export {expect} from '@playwright/test'
