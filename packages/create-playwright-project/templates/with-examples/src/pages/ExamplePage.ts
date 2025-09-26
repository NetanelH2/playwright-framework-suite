import {test} from '@/fixtures'
import {EXAMPLE_PAGE_LOCATORS as L} from '@/locators'
import {BasePage} from '@netanelh2/playwright-framework'

export class ExamplePage extends BasePage {
  /**
   * Navigate to the example page
   */
  async navigateTo(): Promise<void> {
    await this.gotoURL('https://example.com')
  }

  /**
   * Validate that the page has loaded correctly
   */
  async validatePageLoaded(): Promise<void> {
    await this.validateVisibility(L.heading)
    await this.validateVisibility(L.navigation.home)
  }

  /**
   * Click on a navigation link
   * @param linkName - The navigation link to click
   */
  async clickNavigation(linkName: 'home' | 'about' | 'contact'): Promise<void> {
    await test.step(`Click ${linkName} navigation link`, async () => {
      await this.clickOnElement(L.navigation[linkName])
    })
  }

  /**
   * Fill and submit the contact form
   * @param name - Name to enter
   * @param message - Message to enter
   */
  async fillContactForm(name: string, message: string): Promise<void> {
    await test.step('Fill contact form', async () => {
      const nameLocator = this.extractLocator(L.contactForm.nameField)
      const messageLocator = this.extractLocator(L.contactForm.messageField)

      await nameLocator.fill(name)
      await messageLocator.fill(message)
    })
  }

  /**
   * Submit the contact form
   */
  async submitContactForm(): Promise<void> {
    await test.step('Submit contact form', async () => {
      await this.clickOnElement(L.contactForm.sendButton)
    })
  }

  /**
   * Validate form submission success
   */
  async validateFormSubmitted(): Promise<void> {
    // Example validation - adapt to your application's success indicators
    await this.validateVisibility('[role="alert"]')
  }

  /**
   * Get text content from an element
   * @param locator - The locator to get text from
   * @returns Promise with the text content
   */
  async getElementText(locator: typeof L.heading): Promise<string> {
    const extractedLocator = this.extractLocator(locator)
    return (await extractedLocator.textContent()) || ''
  }

  /**
   * Fill email input field
   * @param email - Email to enter
   */
  async fillEmailInput(email: string): Promise<void> {
    await test.step('Fill email input', async () => {
      const emailLocator = this.extractLocator(L.emailInput)
      await emailLocator.fill(email)
    })
  }

  /**
   * Click the submit button
   */
  async clickSubmitButton(): Promise<void> {
    await test.step('Click submit button', async () => {
      await this.clickOnElement(L.submitButton)
    })
  }

  /**
   * Fill the login form username field
   * @param username - Username to enter
   */
  async fillLoginUsername(username: string): Promise<void> {
    await test.step('Fill login username', async () => {
      const usernameLocator = this.extractLocator(L.loginForm)
      await usernameLocator.fill(username)
    })
  }

  /**
   * Interact with custom element (using string locator)
   */
  async clickCustomElement(): Promise<void> {
    await test.step('Click custom element', async () => {
      await this.clickOnElement(L.customElement)
    })
  }
}
