import {test as base} from '@playwright/test'
import {LoginPage} from '../pages/LoginPage'
import type {TestFixtures} from '../types/fixtureTypes'

export const test = base.extend<TestFixtures>({
  // Login page fixture
  loginPage: async ({page}, use) => {
    const loginPage = new LoginPage(page)
    await use(loginPage)
  },
})

export {expect} from '@playwright/test'
