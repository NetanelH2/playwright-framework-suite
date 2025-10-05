import {
  INVALID_USER,
  LOCKED_OUT_USER,
  PROBLEM_USER,
  STANDARD_USER,
} from '../data/users'
import {test} from '../fixtures/testSetup'

test.describe('Login Page Tests @sanity', () => {
  test('should load the login page correctly', async ({loginPage}) => {
    await loginPage.navigateTo()
    await loginPage.validatePageLoaded()
  })

  test('should allow successful login with valid credentials', async ({
    loginPage,
  }) => {
    await loginPage.navigateTo()
    await loginPage.login(STANDARD_USER.username, STANDARD_USER.password)
    await loginPage.validateLoginSuccess()
  })

  test('should show error for invalid credentials', async ({loginPage}) => {
    await loginPage.navigateTo()
    await loginPage.login(INVALID_USER.username, INVALID_USER.password)
    await loginPage.validateLoginError()
  })
})

test.describe('Login Page Tests @regression', () => {
  test('should handle empty form submission', async ({loginPage}) => {
    await loginPage.navigateTo()
    await loginPage.clickLoginButton()
    await loginPage.validateLoginError()
  })

  test('should show error for locked out user', async ({loginPage}) => {
    await loginPage.navigateTo()
    await loginPage.login(LOCKED_OUT_USER.username, LOCKED_OUT_USER.password)
    await loginPage.validateLoginError()
  })

  test('should handle problem user login', async ({loginPage}) => {
    await loginPage.navigateTo()
    await loginPage.login(PROBLEM_USER.username, PROBLEM_USER.password)
    await loginPage.validateLoginSuccess()
  })
})
