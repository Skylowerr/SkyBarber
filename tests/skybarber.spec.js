const { test, expect } = require('@playwright/test');

test.describe('SkyBarber - User Interface (UI) & Interaction Flow Tests', () => {

  test('Login Form Components and Click Mechanics Should Function Properly', async ({ page }) => {
    // 1. Navigate to the local Auth page
    await page.goto('http://127.0.0.1:5500/Frontend/auth.html');
    await page.waitForLoadState('networkidle');

    // 2. Verify page document title
    await expect(page).toHaveTitle(/SkyBarber/i);

    // 3. Verify that form input fields are visible and accept text values
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    await emailInput.fill('testcustomer@gmail.com');
    await passwordInput.fill('123456');

    // 4. Verify that the Submit Button is enabled and clickable
    const loginButton = page.locator('button:has-text("Giriş Yap")'); // Keeps compatibility with your HTML button text
    await expect(loginButton).toBeEnabled();
    
    // Simulate click trigger
    await loginButton.click();
    await page.waitForTimeout(500);

    console.log("UI Test Success: Form elements rendered and login trigger dispatched successfully!");
  });

});