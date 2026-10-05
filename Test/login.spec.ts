import { test, expect } from '@playwright/test';
import { login } from '../utils/excelReader';

test('Login with standard_user', async ({ page }) => {
        await login(page, 'standard_user');

});

