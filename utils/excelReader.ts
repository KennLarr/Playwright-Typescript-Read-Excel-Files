import * as XLSX from 'xlsx';
import { Page, expect } from '@playwright/test';

interface Product {
    itemName: string;
    description: string;
    price: number;
}

export async function login(page: Page, user_type: string, url: string) {

    const path = 'C:/Users/kenneth/Documents/playwright_validation/data/Playwright.xlsx';
    const workbook = XLSX.readFile(path);
    const data = XLSX.utils.sheet_to_json(workbook.Sheets['Credentials']);

    const credential = (data as any[]).find(
        user => user.user_type === user_type
    );

    if (!credential) {
        throw new Error(`User type "${user_type}" not found`);
    }

    await page.goto(url);
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


export async function addToCart(page: Page, itemName: string) {
    const path = 'C:/Users/kenneth/Documents/playwright_validation/data/Playwright.xlsx';
    const workbook = XLSX.readFile(path);
    const productsSheet = workbook.Sheets['Product'];

    if (!productsSheet) {
        throw new Error('Product sheet not found in the workbook');
    }

    const products = XLSX.utils.sheet_to_json<Product>(productsSheet);
    const product = products.find(
        item => item.itemName.trim() === itemName.trim()
    );

    if (!product) {
        throw new Error(`Product "${itemName.trim()}" not found in the workbook`);
    }

    const productCard = page.locator('.inventory_item').filter({
        has: page.getByText(product.itemName, { exact: true }),
    });

    await expect(productCard).toHaveCount(1);
    await expect(productCard.locator('[data-test="inventory-item-desc"]')).toHaveText(product.description);
    await expect(productCard.locator('[data-test="inventory-item-price"]')).toHaveText(`$${product.price.toFixed(2)}`);
    await productCard.getByRole('button', { name: 'Add to cart' }).click();
    await expect(productCard.getByRole('button', { name: 'Remove' })).toBeVisible();

    await page.screenshot({
        path: `screenshots/inventory-${product.itemName}.png`
    });
}