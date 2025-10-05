import {BasePage, type Page} from '@netanelh2/playwright-framework'
import {test} from '../fixtures/testSetup'
import {LOGIN_PAGE_LOCATORS as L} from '../locators/login/Login_Page'

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  async navigateTo(): Promise<void> {
    await this.gotoURL('https://www.saucedemo.com')
  }

  /**
   * Validate that the login page has loaded correctly
   */
  async validatePageLoaded(): Promise<void> {
    await this.validateVisibility(L.usernameField)
    await this.validateVisibility(L.passwordField)
    await this.validateVisibility(L.loginButton)
  }

  /**
   * Fill the login form with username and password
   * @param username - Username to enter
   * @param password - Password to enter
   */
  async fillLoginForm(username: string, password: string): Promise<void> {
    await test.step('Fill login form', async () => {
      const usernameLocator = this.extractLocator(L.usernameField)
      const passwordLocator = this.extractLocator(L.passwordField)

      await usernameLocator.fill(username)
      await passwordLocator.fill(password)
    })
  }

  /**
   * Click the login button
   */
  async clickLoginButton(): Promise<void> {
    await test.step('Click login button', async () => {
      await this.clickOnElement(L.loginButton)
    })
  }

  /**
   * Perform login with username and password
   * @param username - Username to login with
   * @param password - Password to login with
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillLoginForm(username, password)
    await this.clickLoginButton()
  }

  /**
   * Validate successful login (redirects to inventory page)
   */
  async validateLoginSuccess(): Promise<void> {
    await this.validateVisibility(L.inventoryContainer)
  }

  /**
   * Validate login error message is displayed
   */
  async validateLoginError(): Promise<void> {
    await this.validateVisibility(L.errorMessage)
  }
}
