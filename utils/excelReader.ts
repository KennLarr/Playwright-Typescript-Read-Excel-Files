import * as XLSX from 'xlsx';
import { Page, expect } from '@playwright/test';

export async function login(page: Page, user_type: string) {

    const path = 'C:/Users/kenneth/Documents/playwright_validation/data/Playwright.xlsx';
    const workbook = XLSX.readFile(path);
    const data = XLSX.utils.sheet_to_json(workbook.Sheets['Credentials']);

    const credential = (data as any[]).find(
        user => user.user_type === user_type
    );

    if (!credential) {
        throw new Error(`User type "${user_type}" not found`);
    }

    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill(credential.username);
    await page.locator('#password').fill(credential.password);
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(
        'https://www.saucedemo.com/inventory.html'
    );

    await page.screenshot({
        path: `screenshots/inventory-${user_type}.png`
    });
}


