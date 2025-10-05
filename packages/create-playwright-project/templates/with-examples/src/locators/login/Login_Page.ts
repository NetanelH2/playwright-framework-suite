export const LOGIN_PAGE_LOCATORS = {
  // Login form elements
  usernameField: '#user-name',
  passwordField: '#password',
  loginButton: '#login-button',

  // Error messages
  errorMessage: '[data-test="error"]',

  // Success elements (redirects to inventory page)
  inventoryContainer: '.inventory_container',
} as const
