import { BasePage } from '@netanelh2/playwright-framework'
import { EXAMPLE_PAGE_LOCATORS as L } from '@/locators'

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
    await this.test.step(`Click ${linkName} navigation link`, async () => {
      await this.clickElement(L.navigation[linkName])
    })
  }

  /**
   * Fill and submit the contact form
   * @param name - Name to enter
   * @param message - Message to enter
   */
  async fillContactForm(name: string, message: string): Promise<void> {
    await this.test.step('Fill contact form', async () => {
      await this.fillField(L.contactForm.nameField, name)
      await this.fillField(L.contactForm.messageField, message)
    })
  }

  /**
   * Submit the contact form
   */
  async submitContactForm(): Promise<void> {
    await this.test.step('Submit contact form', async () => {
      await this.clickElement(L.contactForm.sendButton)
    })
  }

  /**
   * Validate form submission success
   */
  async validateFormSubmitted(): Promise<void> {
    // Example validation - adapt to your application's success indicators
    await this.validateVisibility({ role: 'alert', name: 'Message sent successfully' })
  }

  /**
   * Get text content from an element
   * @param locator - The locator to get text from
   * @returns Promise with the text content
   */
  async getElementText(locator: typeof L.heading): Promise<string> {
    return await this.getTextContent(locator)
  }
}