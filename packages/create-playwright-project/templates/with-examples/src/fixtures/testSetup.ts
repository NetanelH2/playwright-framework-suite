import {LoginPage} from '@/pages'
import type {TestFixtures} from '@/types'
import {test as base} from '@playwright/test'

export const test = base.extend<TestFixtures>({
  // Login page fixture
  loginPage: async ({page}, use) => {
    const loginPage = new LoginPage(page)
    await use(loginPage)
  },
})

export {expect} from '@playwright/test'
