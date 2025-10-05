import type {BrowserContext, Page} from '@playwright/test'

/**
 * Base page fixtures interface that provides browser context and page instances.
 * This interface can be extended by users to add their specific page objects.
 *
 * @example
 * ```typescript
 * interface PageFixtures extends basePageFixtures {
 *   mainPage: MainPage
 *   loginPage: LoginPage
 * }
 *
 * export const test = baseTest.extend<PageFixtures>({
 *   mainPage: async ({page}, use) => {
 *     await use(new MainPage(page))
 *   },
 *   loginPage: async ({page}, use) => {
 *     await use(new LoginPage(page))
 *   },
 * })
 * ```
 */
export interface basePageFixtures {
  /**
   * Browser context instance with automatic cleanup
   */
  context: BrowserContext

  /**
   * Page instance within the context
   */
  page: Page
}
