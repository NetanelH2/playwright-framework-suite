import { test as base } from '@playwright/test'
import { ExamplePage } from '@/pages'

interface TestFixtures {
  examplePage: ExamplePage
}

export const test = base.extend<TestFixtures>({
  // Example page fixture
  examplePage: async ({ page }, use) => {
    const examplePage = new ExamplePage(page, test)
    await use(examplePage)
  },
})

export { expect } from '@playwright/test'