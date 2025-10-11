import {test as baseTest} from '@netanelh2/playwright-framework'
import {LoginPage} from '../pages/LoginPage'
import type {PageFixtures} from '../types/fixtureTypes'

export const test = baseTest.extend<PageFixtures>({
	// Login page fixture
	loginPage: async ({page}, use) => {
		const loginPage = new LoginPage(page)
		await use(loginPage)
	},
})

export {expect} from '@playwright/test'
