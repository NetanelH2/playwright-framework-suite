import type { StringOrRoleLocatorType } from "../types/locatorTypes.js";
import { expect, type Locator, type Page } from "@playwright/test";
import { LocatorUtils } from "./LocatorUtils.js";

export class BasePage extends LocatorUtils {
  constructor(page: Page) {
    super(page);
  }

  // Validate text of an element
  protected async validateText(
    locator: StringOrRoleLocatorType,
    text: string,
  ): Promise<void> | never {
    const extractedLocator = this.extractLocator(locator);
    const locatorTypes: (() => Promise<void>)[] = [
      (): Promise<void> => expect(extractedLocator).toHaveText(text),
      (): Promise<void> => expect(extractedLocator).toContainText(text),
    ];
    for (const locatorType of locatorTypes) {
      try {
        return await locatorType();
      } catch {
        continue;
      }
    }
    throw new Error(
      `Element with locator "${JSON.stringify(
        locator,
      )}" does not contain text "${text}".`,
    );
  }
  // Validate URL of the page
  protected async validateURL(expectedURL: string): Promise<void> {
    // Handle trailing slash inconsistency between environments
    // Create a regex pattern that accepts both "domain/?query" and "domain?query" formats
    const escapeRegex = (str: string): string =>
      str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Create pattern that allows optional slash before query parameters
    const urlPattern = new RegExp(
      "^" + escapeRegex(expectedURL).replace("/\\?", "/?\\?") + "$",
    );

    try {
      await expect(this.page).toHaveURL(urlPattern);
    } catch (error) {
      const currentUrl = this.page.url();
      throw new Error(
        `URL validation failed. Expected pattern: "${expectedURL}" (accepts both "/?query" and "?query"), ` +
          `but got: "${currentUrl}". Error: ${error}`,
      );
    }
  }
  // Navigate to a specific URL
  protected async gotoURL(url: string): Promise<void> {
    await this.page.goto(url);
  }
  // Click on an element
  protected async clickOnElement(
    locator: StringOrRoleLocatorType,
  ): Promise<void> {
    const extractedLocator: Locator = this.extractLocator(locator);
    await extractedLocator.click();
  }
  // Fill an input field with text
  protected async fillInput(locator: string, text: string): Promise<void> {
    const extractedLocator: Locator = this.extractLocator(locator);
    await extractedLocator.fill(text);
  }
  // Hover on an element
  protected async hoverOnElement(
    locator: StringOrRoleLocatorType,
  ): Promise<void> {
    const extractedLocator: Locator = this.extractLocator(locator);
    await extractedLocator.hover();
  }

  // Validate that an element is visible
  protected async validateVisibility(
    locator: StringOrRoleLocatorType,
  ): Promise<void> {
    const extractedLocator = this.extractLocator(locator);
    try {
      await expect(extractedLocator).toBeVisible();
    } catch {
      try {
        await expect(extractedLocator.first()).toBeVisible();
      } catch {
        throw new Error(
          `Element with locator "${JSON.stringify(locator)}" is not visible.`,
        );
      }
    }
  }

  // Wait for an element to be in a specific state
  protected async waitForSelectorState(
    locator: string,
    options?: { state?: "attached" | "detached" | "visible" | "hidden" },
  ): Promise<void> {
    await this.page.waitForSelector(
      locator,
      options?.state ? { state: options.state } : {},
    );
    await this.validateVisibility(locator);
  }
}
