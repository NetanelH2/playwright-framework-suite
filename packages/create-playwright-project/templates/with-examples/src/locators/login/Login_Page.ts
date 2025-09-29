export const LOGIN_PAGE_LOCATORS = {
  // Login form elements
  usernameField: '#user-name',
  passwordField: '#password',
  loginButton: '#login-button',

  // Error messages
  errorMessage: '[data-test="error"]',

  // Success elements (redirects to inventory page)
  inventoryContainer: '.inventory_container',

  // Navigation (not applicable for SauceDemo)
  // forgotPasswordLink: {role: 'link', name: 'Forgot Password'},
  // signUpLink: {role: 'link', name: 'Sign Up'},
} as const
