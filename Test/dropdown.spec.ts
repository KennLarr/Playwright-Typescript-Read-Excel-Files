
import { test, expect } from '@playwright/test';
import { login } from '../utils/excelReader';

test('Dropdown functionality', async ({ page }) => {

    // Step 1: Login
    await login(page, 'standard_user', 'https://www.saucedemo.com');

    // Step 2: Locate dropdown
    const dropdown = page.locator('[data-test="product-sort-container"]');

    // Step 3: Validate default selected option
    await expect(dropdown).toHaveValue('az');

    // Step 4: Select Z to A
    await dropdown.selectOption('za');

    // Step 5: Get product names after sorting
    const zaNames = await page.locator('.inventory_item_name').allTextContents();

    // Step 6: Validate Z to A sorting
    expect(zaNames).toEqual(
        [...zaNames].sort((a, b) => b.localeCompare(a))
    );

    // Step 7: Select Price Low to High
    await dropdown.selectOption('lohi');

    const lowHighPrices = await page.locator('.inventory_item_price').allTextContents();

    const lowHigh = lowHighPrices.map(price => Number(price.replace('$', '')));

    expect(lowHigh).toEqual([...lowHigh].sort((a, b) => a - b));

    // Step 8: Select Price High to Low
    await dropdown.selectOption('hilo');

    const highLowPrices = await page.locator('.inventory_item_price').allTextContents();

    const highLow = highLowPrices.map(price => Number(price.replace('$', '')));

    expect(highLow).toEqual([...highLow].sort((a, b) => b - a));

     // Step 4: Select Z to A
    await dropdown.selectOption('za');

});
