import type {Locator, Page} from '@playwright/test'
import type {StringOrRoleLocatorType} from '../types/locatorTypes'

export class LocatorUtils {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }

  // Find a locator by string, using multiple strategies
  protected findLocatorByString(locator: string): Locator {
    const locators: (() => Locator)[] = [
      (): Locator => this.page.locator(locator),
      (): Locator => this.page.getByLabel(locator),
      (): Locator => this.page.getByText(locator),
      (): Locator => this.page.getByAltText(locator),
    ]
    // Iterate through locators until one succeeds
    for (const locator of locators) {
      try {
        return locator()
      } catch {
        continue
      }
    }
    throw new Error(`Unable to find element with string locator: ${locator}`)
  }

  // Handle Generic Locator, byRole, byLabel, byText, and parent-child combinations
  protected extractLocator(locator: StringOrRoleLocatorType): Locator {
    try {
      // Try Generic Locator first
      if (typeof locator === 'string') {
        return this.findLocatorByString(locator)
      }
      // Handle byRole with and without parent
      if ('parent' in locator && locator.parent !== undefined) {
        const {parent, role, name} = locator
        return this.page.locator(parent).getByRole(role, {name: name})
      } else {
        const {role, name} = locator
        return this.page.getByRole(role, {name: name})
      }
    } catch {
      throw new Error(
        `Unable to find element with locator: ${JSON.stringify(locator)}`,
      )
    }
  }
}
