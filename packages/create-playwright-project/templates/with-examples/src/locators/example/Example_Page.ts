import type { StringOrRoleLocatorType } from '@netanelh2/playwright-framework'

export const EXAMPLE_PAGE_LOCATORS = {
  // Example role-based locators (preferred)
  heading: { role: 'heading', name: 'Welcome' } as StringOrRoleLocatorType,
  submitButton: { role: 'button', name: 'Submit' } as StringOrRoleLocatorType,
  emailInput: { role: 'textbox', name: 'Email' } as StringOrRoleLocatorType,
  
  // Example with parent selector
  loginForm: {
    parent: '#login-form',
    role: 'textbox',
    name: 'Username'
  } as StringOrRoleLocatorType,
  
  // String selector fallback (use sparingly)
  customElement: '[data-testid="custom-element"]' as StringOrRoleLocatorType,
  
  // Navigation elements
  navigation: {
    home: { role: 'link', name: 'Home' } as StringOrRoleLocatorType,
    about: { role: 'link', name: 'About' } as StringOrRoleLocatorType,
    contact: { role: 'link', name: 'Contact' } as StringOrRoleLocatorType,
  },
  
  // Form elements
  contactForm: {
    nameField: { role: 'textbox', name: 'Name' } as StringOrRoleLocatorType,
    messageField: { role: 'textbox', name: 'Message' } as StringOrRoleLocatorType,
    sendButton: { role: 'button', name: 'Send Message' } as StringOrRoleLocatorType,
  },
} as const