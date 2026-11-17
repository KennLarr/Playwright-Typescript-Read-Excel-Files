import { test, expect } from '@playwright/test';
import { login } from '../utils/excelReader';

test('Login with standard_user', async ({ page }) => {
        await login(page, 'standard_user', 'https://www.saucedemo.com');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

});

test('Login with locked_out_user', async ({ page }) => {
        await login(page, 'locked_out_user', 'https://www.saucedemo.com');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});