import {test, expect} from '@playwright/test'

test('test @youtube', async ({ page }) => {
    const title = page.locator("//a[@id='video-title' and @title='No code automation testing - Playwright Codegen tutorial!']");
  await page.goto('https://www.youtube.com/');
  await expect(page.getByRole('link', { name: 'YouTube Home' })).toBeVisible();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('playwright codegen');
  await page.locator('//button[@class="ytSearchboxComponentSearchButton"]').click();
  await title.click();
});
