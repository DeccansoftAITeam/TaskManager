const { test, expect } = require('@playwright/test');

test.describe('Task Manager UI Tests', () => {

  test('Login and Project Creation Flow', async ({ page }) => {
    // 1. Visit Login Page
    await page.goto('/login');

    // 2. Perform Login
    await page.getByPlaceholder('username').fill('sandeep');
    await page.getByPlaceholder('password').fill('sand');
    await page.getByRole('button', { name: 'Login' }).click();

    // 3. Verify Dashboard Access
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Task Dashboard' })).toBeVisible();

    // 4. Create a New Project
    const projectName = `Auto Project ${Date.now()}`;
    await page.getByPlaceholder('Project Name').fill(projectName);
    await page.getByPlaceholder('Description').fill('Automated creation with E2E test');
    await page.getByPlaceholder('Owner').fill('sandeep');
    await page.getByRole('button', { name: 'Create' }).click();

    // 5. Verify Project in List
    await expect(page.getByText(projectName)).toBeVisible();
    await expect(page.getByText('Automated creation with E2E test')).toBeVisible();

    // 6. Navigation Check (Task List)
    await page.getByRole('link', { name: 'Add Task' }).first().click();
    await expect(page).toHaveURL('/task/create');
  });

  test('Registration Flow', async ({ page }) => {
    // 1. Visit Registration Page
    await page.goto('/register');

    // 2. Fill registration (unique username each time)
    const newUser = `testuser_${Date.now()}`;
    await page.getByPlaceholder('username').fill(newUser);
    await page.getByPlaceholder('password').fill('pass123');
    await page.getByPlaceholder('owner name extra field').fill('Automated Test User');
    await page.getByRole('button', { name: 'Register' }).click();

    // 3. Handle successful registration alert
    page.on('dialog', dialog => dialog.accept());
    
    // 4. Should redirect to login
    await expect(page).toHaveURL('/login');
  });

});
