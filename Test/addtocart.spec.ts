import { test } from '@playwright/test';
import { login, addToCart } from '../utils/excelReader';

test('Add to cart functionality', async ({ page }) => {
    // Navigate to the login page
    await login(page, 'standard_user', 'https://www.saucedemo.com/'); 
    await addToCart(page, 'Sauce Labs Backpack');
    
    
});