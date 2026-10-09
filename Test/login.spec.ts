import { test, expect } from '@playwright/test';
import { login } from '../utils/excelReader';

test('Login with standard_user', async ({ page }) => {
        await login(page, 'standard_user');

});

test('Login with locked_out_user', async ({ page }) => {
        await login(page, 'locked_out_user');

});