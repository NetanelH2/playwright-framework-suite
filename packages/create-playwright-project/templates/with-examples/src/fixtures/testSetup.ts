import {ExamplePage} from '@/pages'
import type {TestFixtures} from '@/types'
import {test as base} from '@playwright/test'

export const test = base.extend<TestFixtures>({
  // Example page fixture
  examplePage: async ({page}, use) => {
    const examplePage = new ExamplePage(page)
    await use(examplePage)
  },
})

export {expect} from '@playwright/test'
