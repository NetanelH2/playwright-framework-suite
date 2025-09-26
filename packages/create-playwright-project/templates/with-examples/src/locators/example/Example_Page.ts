export const EXAMPLE_PAGE_LOCATORS = {
  // Example role-based locators (preferred)
  heading: {role: 'heading', name: 'Welcome'},
  submitButton: {role: 'button', name: 'Submit'},
  emailInput: {role: 'textbox', name: 'Email'},

  // Example with parent selector
  loginForm: {
    parent: '#login-form',
    role: 'textbox',
    name: 'Username',
  },

  // String selector fallback (use sparingly)
  customElement: '[data-testid="custom-element"]',

  // Navigation elements
  navigation: {
    home: {role: 'link', name: 'Home'},
    about: {role: 'link', name: 'About'},
    contact: {role: 'link', name: 'Contact'},
  },

  // Form elements
  contactForm: {
    nameField: {role: 'textbox', name: 'Name'},
    messageField: {role: 'textbox', name: 'Message'},
    sendButton: {role: 'button', name: 'Send Message'},
  },
} as const
