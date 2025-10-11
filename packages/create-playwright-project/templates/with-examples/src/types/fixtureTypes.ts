import type {basePageFixtures} from '@netanelh2/playwright-framework'
import type {LoginPage} from '../pages/LoginPage'

export interface PageFixtures extends basePageFixtures {
	loginPage: LoginPage
}
