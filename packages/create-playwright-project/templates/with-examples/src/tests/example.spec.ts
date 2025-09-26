import { test } from '@/fixtures'

test.describe('Example Page Tests @sanity', () => {
  test('should load the page and display main elements', async ({ examplePage }) => {
    await examplePage.navigateTo()
    await examplePage.validatePageLoaded()
  })

  test('should navigate through different sections', async ({ examplePage }) => {
    await examplePage.navigateTo()
    await examplePage.validatePageLoaded()
    
    // Test navigation
    await examplePage.clickNavigation('about')
    await examplePage.clickNavigation('contact')
    await examplePage.clickNavigation('home')
  })

  test('should fill and submit contact form', async ({ examplePage }) => {
    await examplePage.navigateTo()
    await examplePage.clickNavigation('contact')
    
    // Fill the form
    await examplePage.fillContactForm('John Doe', 'This is a test message')
    
    // Submit the form
    await examplePage.submitContactForm()
    
    // Validate success (adapt this to your application's behavior)
    // await examplePage.validateFormSubmitted()
  })
})

test.describe('Example Page Tests @regression', () => {
  test('should handle form validation errors', async ({ examplePage }) => {
    await examplePage.navigateTo()
    await examplePage.clickNavigation('contact')
    
    // Try to submit empty form
    await examplePage.submitContactForm()
    
    // Validate error messages are shown
    // Add your specific validation logic here
  })

  test('should display correct content in different sections', async ({ examplePage }) => {
    await examplePage.navigateTo()
    
    // Test content in different sections
    await examplePage.clickNavigation('about')
    // Add assertions for about page content
    
    await examplePage.clickNavigation('contact')
    // Add assertions for contact page content
  })

  test('should handle responsive design elements', async ({ examplePage }) => {
    await examplePage.navigateTo()
    await examplePage.validatePageLoaded()
    
    // Test responsive behavior
    // Add mobile/tablet specific tests if needed
  })
})